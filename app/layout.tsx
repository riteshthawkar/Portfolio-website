import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import localFont from 'next/font/local'
import { Analytics } from '@vercel/analytics/next'
import { profile } from '@/lib/profile'
import './globals.css'

const season = localFont({
  src: '../public/fonts/SeasonCollectionVF-TRIAL.ttf',
  variable: '--font-season',
  weight: '300 900',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

import { ThemeProvider } from '@/components/theme-provider'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''
const siteUrl = profile.links.portfolio

export const metadata: Metadata = {
  title: `${profile.person.name} | AI Researcher`,
  description: profile.person.summary,
  keywords: [
    'AI Researcher',
    'Machine Learning',
    'Computer Vision',
    'Large Language Models',
    'Agentic RAG',
    'MBZUAI',
  ],
  authors: [{ name: profile.person.name }],
  creator: profile.person.name,
  openGraph: {
    title: `${profile.person.name} | AI Researcher`,
    description: profile.person.summary,
    url: siteUrl,
    siteName: `${profile.person.name} Portfolio`,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200&h=630&auto=format&fit=crop',
        width: 1200,
        height: 630,
        alt: `${profile.person.name} - AI Researcher`,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${profile.person.name} | AI Researcher`,
    description: profile.person.summary,
    images: ['https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200&h=630&auto=format&fit=crop'],
  },
  icons: {
    icon: [
      {
        url: `${basePath}/icon-light-32x32.png`,
        media: '(prefers-color-scheme: light)',
      },
      {
        url: `${basePath}/icon-dark-32x32.png`,
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: `${basePath}/icon.svg`,
        type: 'image/svg+xml',
      },
    ],
    apple: `${basePath}/apple-icon.png`,
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${season.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
