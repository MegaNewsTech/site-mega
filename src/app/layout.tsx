import type { Metadata } from 'next'
import { Suspense } from 'react'
import Header from '@/components/layout/Header'
import SiteFooter from '@/components/layout/SiteFooter'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'Mega News — Tecnologia que impulsiona o seu negócio',
  description:
    'Mega News: sistemas de automação comercial para postos, varejo e vendas externas. Implantação, treinamento e suporte desde 1996 em Irecê-BA.',
  keywords: [
    'Mega News',
    'Mega Posto',
    'Mega Ágil',
    'Mega Flex',
    'automação comercial',
    'software posto de combustível',
    'gestão varejo',
    'Irecê',
    'Bahia',
  ],
  authors: [{ name: 'Mega News' }],
  metadataBase: new URL('https://meganews.com.br'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Mega News',
    url: 'https://meganews.com.br/',
    title: 'Mega News — Tecnologia que impulsiona o seu negócio',
    description:
      'Sistemas para postos, varejo e vendas externas. Implantação, treinamento e suporte especializados.',
  },
  twitter: {
    card: 'summary',
    title: 'Mega News — Tecnologia que impulsiona o seu negócio',
    description:
      'Sistemas para postos, varejo e vendas externas. Implantação, treinamento e suporte desde 1996.',
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700;800&family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Suspense fallback={null}>
          <Header />
        </Suspense>
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}
