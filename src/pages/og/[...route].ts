import { OGImageRoute } from 'astro-og-canvas';

export const { getStaticPaths, GET } = await OGImageRoute({
  pages: {
    'evonera': {
      title: 'Evonera Technologies',
      description: 'Finish your Lovable or Emergent app.',
    },
    'lovable': {
      title: 'Fix Your Lovable Site',
      description: 'Get help finishing, fixing, and launching your Lovable app.',
    },
    'emergent': {
      title: 'Finish Your Emergent App',
      description: 'Get help finishing, fixing, and launching your Emergent app.',
    },
    'pricing': {
      title: 'AI App Project Pricing',
      description: 'A clear, fixed quote after the project scope is understood.',
    },
  },
  getImageOptions: (_path, page: any) => ({
    title: page.title,
    description: page.description,
    bgGradient: [[25, 25, 25], [10, 10, 10]],
    border: { color: [59, 130, 246], width: 6 },
    font: {
      title: {
        color: [255, 255, 255],
        size: 54,
        weight: 'Bold',
      },
      description: {
        color: [160, 160, 160],
        size: 28,
        lineHeight: 1.4,
      },
    },
  }),
});
