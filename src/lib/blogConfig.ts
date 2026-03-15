export const blogConfig = {
  id: process.env.NEXT_PUBLIC_BLOG_ID ?? 'blog-a',
  name: process.env.NEXT_PUBLIC_BLOG_NAME ?? 'mybestie',
  description: process.env.NEXT_PUBLIC_BLOG_DESCRIPTION ?? 'personal blog',
  blogger: {
    name: process.env.NEXT_PUBLIC_BLOGGER_NAME ?? '블로거',
    profileImage: process.env.NEXT_PUBLIC_BLOGGER_PROFILE_IMAGE ?? '',
  },
  colors: {
    primary: process.env.NEXT_PUBLIC_COLOR_PRIMARY ?? '#0ea5e9',
    primaryHover: process.env.NEXT_PUBLIC_COLOR_PRIMARY_HOVER ?? '#0284c7',
  },
  metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID ?? '',
  product: {
    name: process.env.NEXT_PUBLIC_PRODUCT_NAME ?? '',
    url: process.env.NEXT_PUBLIC_PRODUCT_URL ?? '',
    price: process.env.NEXT_PUBLIC_PRODUCT_PRICE ?? '',
  },
  storageKey: `${process.env.NEXT_PUBLIC_BLOG_ID ?? 'blog-a'}-posts`,
} as const;
