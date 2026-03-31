import { AspectRatio, MangaRule, ReadingDirection, StudioConfig, StyleOption, GeneratedResult } from "./types";

export const DEFAULT_STUDIO_CONFIG: StudioConfig = {
  episodeCount: 1,
  pagesPerEpisode: 1,
  aspectRatio: AspectRatio.MOBILE_9_16,
  mangaRule: MangaRule.MANGA_PAGE,
  readingDirection: ReadingDirection.LTR,
  authorName: "Thầy Sinh AI",
  negativePrompt: "low quality, text overlay, watermark, blurry, bad anatomy",
  storyIdea: "Doraemon chế tạo bảo bối mới giúp Nobita."
};

export const STYLE_CATEGORIES: { name: string; styles: StyleOption[] }[] = [
  {
    name: "Đời sống",
    styles: [
      { id: 'vn-real', name: 'Vietnam Realism', category: 'Life', promptModifier: 'vietnamese street style, realistic lighting, 8k, detailed background' },
      { id: 'shin-chan', name: 'Shin-chan Funny', category: 'Life', promptModifier: 'crayon shin-chan style, simple lines, funny expressions, flat colors' },
      { id: 'family', name: 'Gia đình ấm áp', category: 'Life', promptModifier: 'warm colors, ghibli vibe, cozy atmosphere, soft lighting' },
    ]
  },
  {
    name: "Hư cấu / Sci-fi",
    styles: [
      { id: 'doraemon', name: 'Doraemon Style', category: 'Sci-fi', promptModifier: 'doraemon anime style, bright colors, clean lines, futuristic gadgets, fujiko f fujio style' },
      { id: 'cyber', name: 'Cyberpunk 2077', category: 'Sci-fi', promptModifier: 'neon lights, high tech, dark atmosphere, detailed city, cinematic lighting' },
      { id: 'mecha', name: 'Gundam Mecha', category: 'Sci-fi', promptModifier: 'mecha robot, metallic textures, space background, epic scale' },
    ]
  },
  {
    name: "Học đường",
    styles: [
      { id: 'shoujo', name: 'Shoujo Romance', category: 'School', promptModifier: 'sparkling eyes, pastel colors, flower petals background, dreamy atmosphere' },
      { id: 'conan', name: 'Conan Mystery', category: 'School', promptModifier: 'detective conan style, suspense atmosphere, sharp lines, dramatic shadows' },
    ]
  },
  {
    name: "Điện ảnh",
    styles: [
      { id: 'ghibli', name: 'Ghibli Art', category: 'Cinema', promptModifier: 'studio ghibli style, watercolor texture, detailed background, lush nature' },
      { id: '4dx', name: '4DX Action', category: 'Cinema', promptModifier: 'dynamic angle, motion blur, cinematic lighting, marvel style, intense action' },
    ]
  },
  {
    name: "Kinh dị / Tâm lý",
    styles: [
      { id: 'horror-dark', name: 'Dark Horror', category: 'Horror', promptModifier: 'junji ito style, high contrast, eerie atmosphere, detailed shadows, monochromatic with red accents, psychological horror' },
      { id: 'mystery-noir', name: 'Noir Detective', category: 'Horror', promptModifier: 'film noir style, black and white, dramatic lighting, rainy streets, cinematic shadows, 1940s aesthetic' },
    ]
  },
  {
    name: "Cổ trang / Kiếm hiệp",
    styles: [
      { id: 'wuxia-ink', name: 'Thủy mặc (Ink)', category: 'Historical', promptModifier: 'traditional chinese ink wash painting style, brush strokes, elegant, historical china, soft paper texture' },
      { id: 'vn-ancient', name: 'Cổ phong Việt', category: 'Historical', promptModifier: 'ancient vietnamese clothing, hussar style, imperial hue architecture, traditional patterns, vibrant silk colors' },
    ]
  },
  {
    name: "Mỹ thuật / Hội họa",
    styles: [
      { id: 'oil-paint', name: 'Sơn dầu (Oil)', category: 'Art', promptModifier: 'oil painting texture, thick brushwork, van gogh style, vibrant colors, expressive, masterpiece' },
      { id: 'watercolor', name: 'Màu nước', category: 'Art', promptModifier: 'watercolor illustration, soft edges, bleeding colors, hand-drawn, delicate, dreamy' },
      { id: 'sketch', name: 'Phác thảo chì', category: 'Art', promptModifier: 'pencil sketch, hand-drawn, graphite texture, cross-hatching, artistic, rough lines' },
    ]
  }
];

export const MOCK_RESULT_DATA: GeneratedResult = {
  title: "NOBITA & RẠP CHIẾU PHIM 4DX",
  episodes: [
    {
      id: 1,
      title: "Tập 1: Trải nghiệm cảm giác mạnh",
      coverPrompt: "Anime style cover art, Doraemon holding a 4DX ticket, Nobita looking scared, Jaian laughing, cinema background",
      pages: [
        {
          pageNumber: 1,
          panels: [
            {
              id: 1,
              description: "Jaian khoe với Nobita về rạp phim 4DX mới mở.",
              dialogue: "Này Jaian, cậu đã thử rạp 4DX mới mở chưa? Đỉnh của chóp luôn!",
              prompt: "Nobita and Jaian standing on a japanese street, Jaian looking excited gesturing with hands, Nobita listening curiously, anime style --ar 4:3",
              layout: "square",
              bubblePos: "top-left",
              imageUrl: "https://placehold.co/600x400/22c55e/ffffff?text=Jaian+Talking"
            },
            {
              id: 2,
              description: "Nobita nằm nhà than thở với Doraemon.",
              dialogue: "Haizzz, mình ước gì mình có thể xem phim hành động mà không bị sợ!",
              prompt: "Nobita lying on tatami floor looking sad, Doraemon sitting nearby eating dorayaki, japanese room interior, anime style --ar 4:3",
              layout: "square",
              bubblePos: "top-right",
              imageUrl: "https://placehold.co/600x400/3b82f6/ffffff?text=Nobita+Sad"
            },
            {
              id: 3,
              description: "Nobita tưởng tượng cảnh rạp phim đáng sợ.",
              dialogue: "Rạp 4DX ư? Nghe có vẻ thú vị... nhưng cũng đáng sợ quá!",
              prompt: "Close up of Nobita's face looking worried, thought bubble showing a scary movie monster, anime style --ar 4:3",
              layout: "square",
              bubblePos: "bottom-left",
              imageUrl: "https://placehold.co/600x400/f59e0b/ffffff?text=Scary+Thoughts"
            },
            {
              id: 4,
              description: "Jaian diễn tả cảm giác thật.",
              dialogue: "Gió thổi, nước bắn, ghế rung lắc y như thật! Cảm giác như đang ở trong phim ấy!",
              prompt: "Jaian holding a movie ticket, big confident smile, thumbs up, dynamic background lines, anime style --ar 4:3",
              layout: "square",
              bubblePos: "top-right",
              imageUrl: "https://placehold.co/600x400/ef4444/ffffff?text=Jaian+Excited"
            },
            {
              id: 5,
              description: "Shizuka rủ đi xem phim.",
              dialogue: "Tớ nghe nói có phim phiêu lưu mới chiếu ở rạp 4DX đấy, Nobita! Cậu có muốn đi không?",
              prompt: "Shizuka standing at the door holding a movie flyer, smiling sweetly, Nobita looking shy, anime style --ar 16:9",
              layout: "wide",
              bubblePos: "top-left",
              imageUrl: "https://placehold.co/800x450/ec4899/ffffff?text=Shizuka+Invites"
            },
            {
              id: 6,
              description: "Nobita sợ hãi tè ra quần trong tưởng tượng.",
              dialogue: "Nhỡ đâu mình tè ra quần thì sao...",
              prompt: "Nobita sitting in a corner hugging his knees, shivering, dark blue gloom lines, thought bubble of a dinosaur chasing him --ar 16:9",
              layout: "wide",
              bubblePos: "top-right",
              imageUrl: "https://placehold.co/800x450/6366f1/ffffff?text=Nobita+Scared"
            },
             {
              id: 7,
              description: "Nobita cầu cứu Doraemon.",
              dialogue: "Doraemon! Giúp mình với! Có bảo bối nào không?",
              prompt: "Nobita grabbing Doraemon's arm crying, Doraemon looking confused, anime style --ar 4:3",
              layout: "square",
              bubblePos: "top-left",
              imageUrl: "https://placehold.co/600x400/0ea5e9/ffffff?text=Help+Me"
            },
             {
              id: 8,
              description: "Nobita chạy đi quyết tâm.",
              dialogue: "Hả? Đi á...?",
              prompt: "Doraemon looking surprised as Nobita runs out the door unexpectedly, motion blur, anime style --ar 4:3",
              layout: "square",
              bubblePos: "bottom-right",
              imageUrl: "https://placehold.co/600x400/10b981/ffffff?text=Running+Away"
            }
          ]
        }
      ]
    }
  ]
};