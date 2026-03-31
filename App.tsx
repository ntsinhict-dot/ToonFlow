import React, { useState, useRef } from 'react';
import Header from './components/Header';
import StudioConfigPanel from './components/StudioConfig';
import StyleSelector from './components/StyleSelector';
import ResultDashboard from './components/ResultDashboard';
import { StudioConfig, StyleOption, GeneratedResult, GeneratedStory } from './types';
import { DEFAULT_STUDIO_CONFIG, MOCK_RESULT_DATA, STYLE_CATEGORIES } from './constants';
import { Loader2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const App: React.FC = () => {
  const [config, setConfig] = useState<StudioConfig>(DEFAULT_STUDIO_CONFIG);
  const [selectedStyle, setSelectedStyle] = useState<StyleOption | null>(STYLE_CATEGORIES[0].styles[0]);
  const [userApiKey, setUserApiKey] = useState<string>(() => localStorage.getItem('toonflow_api_key') || '');
  
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedData, setGeneratedData] = useState<GeneratedResult | null>(null);
  const [progressStep, setProgressStep] = useState<string>('');
  
  const resultRef = useRef<HTMLDivElement>(null);

  // Helper to generate image with retry and exponential backoff
  const generateImageWithRetry = async (ai: any, prompt: string, retries = 4): Promise<string | null> => {
    for (let i = 0; i < retries; i++) {
      try {
        const imgResponse = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: {
            parts: [{ text: prompt }]
          },
          config: {
            imageConfig: {
              aspectRatio: config.aspectRatio === '9:16' ? '9:16' : '16:9',
            }
          }
        });

        for (const part of imgResponse.candidates?.[0]?.content?.parts || []) {
          if (part.inlineData) {
            return `data:image/png;base64,${part.inlineData.data}`;
          }
        }
      } catch (e: any) {
        const isQuotaExceeded = e?.message?.includes('429') || e?.message?.includes('RESOURCE_EXHAUSTED');
        console.warn(`Image generation attempt ${i + 1} failed ${isQuotaExceeded ? '(Quota Exceeded)' : ''}:`, e);
        
        if (i === retries - 1) throw e;
        
        // Exponential backoff: 2s, 4s, 8s...
        const waitTime = isQuotaExceeded ? Math.pow(2, i + 1) * 2000 : 1000 * (i + 1);
        await new Promise(r => setTimeout(r, waitTime));
      }
    }
    return null;
  };

  // Helper to generate content using Gemini
  const generateComic = async () => {
    const activeKey = userApiKey || process.env.API_KEY;
    
    if (!activeKey) {
      alert("Vui lòng nhập Gemini API Key ở phía trên để bắt đầu tạo truyện!");
      return;
    }

    setIsGenerating(true);
    setGeneratedData(null);
    
    try {
      const ai = new GoogleGenAI({ apiKey: activeKey });
        
        // 1. GENERATE SCRIPT
        setProgressStep('Đang viết kịch bản chi tiết...');
        
        const scriptPrompt = `
          You are a professional manga/comic author.
          Create a ${config.mangaRule} comic script.
          Language: Vietnamese.
          Story Idea: ${config.storyIdea}.
          Style: ${selectedStyle?.name} (${selectedStyle?.promptModifier}).
          Episodes: ${config.episodeCount}.
          Pages per Episode: ${config.pagesPerEpisode}.
          
          CRITICAL: The "prompt" field for each panel MUST be a highly detailed English visual description 
          optimized for AI image generation. Include lighting, camera angle, character appearance, 
          and background details. Do NOT include text in the images.
          
          Return a JSON object with this exact structure:
          {
            "title": "Comic Title",
            "episodes": [
              {
                "id": 1,
                "title": "Episode Title",
                "coverPrompt": "Description for the cover image",
                "pages": [
                  {
                    "pageNumber": 1,
                    "panels": [
                      {
                        "id": 1,
                        "description": "Visual description of the scene",
                        "dialogue": "Character dialogue",
                        "prompt": "Detailed Stable Diffusion prompt in English",
                        "layout": "square" (or "wide" or "tall"),
                        "bubblePos": "top-left" (or other positions)
                      }
                    ]
                  }
                ]
              }
            ]
          }
        `;

        const scriptResponse = await ai.models.generateContent({
           model: 'gemini-3-flash-preview',
           contents: scriptPrompt,
           config: {
             responseMimeType: 'application/json'
           }
        });
        
        let scriptText = scriptResponse.text || '{}';
        // Basic sanitization in case the model returns markdown blocks
        if (scriptText.includes('```json')) {
          scriptText = scriptText.split('```json')[1].split('```')[0].trim();
        } else if (scriptText.includes('```')) {
          scriptText = scriptText.split('```')[1].split('```')[0].trim();
        }
        
        const scriptJson = JSON.parse(scriptText) as GeneratedResult;
        
        if (!scriptJson.title) throw new Error("Failed to parse script");

        // 2. GENERATE IMAGES
        setProgressStep('Đang chuẩn bị vẽ tranh...');
        
        // Deep clone to mutate
        const finalResult = { ...scriptJson };
        
        // Calculate total panels for progress tracking
        let totalPanels = 0;
        for (const ep of finalResult.episodes) {
          for (const page of ep.pages) {
            totalPanels += page.panels.length;
          }
        }
        
        let panelsProcessed = 0;

        for (const ep of finalResult.episodes) {
          for (const page of ep.pages) {
            for (const panel of page.panels) {
              setProgressStep(`Đang vẽ khung hình ${panelsProcessed + 1}/${totalPanels}...`);
              
              // Generate Image
              try {
                const fullPrompt = `${selectedStyle?.promptModifier}, ${panel.prompt}, high resolution, sharp focus, vibrant colors, professional digital art, masterpiece, no text, no watermark, ${config.negativePrompt ? `negative prompt: ${config.negativePrompt}` : ''}`;
                
                const imageUrl = await generateImageWithRetry(ai, fullPrompt);
                if (imageUrl) {
                  panel.imageUrl = imageUrl;
                } else {
                  panel.imageUrl = `https://placehold.co/600x600/1e293b/ffffff?text=Generation+Failed`;
                }
              } catch (e: any) {
                console.error("Image gen error after retries", e);
                const isQuota = e?.message?.includes('429') || e?.message?.includes('RESOURCE_EXHAUSTED');
                panel.imageUrl = `https://placehold.co/600x600/1e293b/ffffff?text=${isQuota ? 'Hết+Quota+API' : 'Lỗi+Hình+Ảnh'}`;
              }
              panelsProcessed++;
              
              // Add a small delay between panels to avoid hitting rate limits too fast
              await new Promise(r => setTimeout(r, 500));
            }
          }
        }
        
        setGeneratedData(finalResult);
    } catch (error) {
      console.error("Generation failed:", error);
      alert("Có lỗi xảy ra khi tạo truyện. Vui lòng thử lại.");
    } finally {
      setIsGenerating(false);
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans selection:bg-pink-500/30">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-900/20 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-cyan-900/10 rounded-full blur-[150px]" />
      </div>

      <Header apiKey={userApiKey} onApiKeyChange={(key) => {
        setUserApiKey(key);
        localStorage.setItem('toonflow_api_key', key);
      }} />

      <main className="relative w-full max-w-7xl mx-auto px-4 md:px-6 py-8 flex flex-col">
        
        {/* SECTION A: CONFIGURATION */}
        <StudioConfigPanel 
          config={config} 
          onChange={setConfig} 
          onGenerate={generateComic}
          isGenerating={isGenerating}
        />

        {/* SECTION B: STYLE SELECTOR */}
        <StyleSelector 
          selectedStyle={selectedStyle} 
          onSelect={setSelectedStyle} 
        />

        {/* Loading Overlay Modal */}
        {isGenerating && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm">
            <div className="bg-slate-900 border border-cyan-500/30 p-8 rounded-2xl flex flex-col items-center space-y-6 shadow-2xl max-w-md w-full mx-4">
              <div className="relative">
                <div className="absolute inset-0 bg-cyan-500 blur-xl opacity-20 animate-pulse"></div>
                <Loader2 className="w-16 h-16 text-cyan-400 animate-spin relative z-10" />
              </div>
              <div className="text-center space-y-2">
                 <h3 className="text-2xl font-bold text-white tracking-tight">{progressStep}</h3>
                 <p className="text-sm text-slate-400">
                   Hệ thống đang sử dụng Gemini 3 Flash để xử lý {config.episodeCount} tập truyện với phong cách {selectedStyle?.name}.
                 </p>
              </div>
              
              {/* Progress Bar Simulation */}
              <div className="w-full bg-slate-800 rounded-full h-2 mt-4 overflow-hidden relative">
                <div className="absolute inset-0 bg-slate-800/50"></div>
                <div className="bg-gradient-to-r from-cyan-400 via-blue-500 to-pink-500 h-full w-2/3 animate-[shimmer_2s_infinite] relative z-10"></div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION C: RESULT DASHBOARD */}
        <div ref={resultRef}>
          {generatedData && (
             <ResultDashboard data={generatedData} />
          )}
        </div>

      </main>
      
      {/* Footer */}
      <footer className="py-8 text-center text-slate-600 text-xs border-t border-white/5 mt-12">
        ToonFlow Studio © 2024. Powered by Gemini.
      </footer>

    </div>
  );
};

export default App;