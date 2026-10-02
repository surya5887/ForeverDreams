export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/'],
    },
    sitemap: 'https://www.glossixdesign.in/sitemap.xml',
  }
}
