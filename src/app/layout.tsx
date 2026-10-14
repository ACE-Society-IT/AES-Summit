import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  themeColor: '#1B0805',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://www.alphaace.com.pk'),
  title: 'Alpha Entrepreneurship Summit (AES) 2026 | Flagship Gathering for Next-Gen Founders',
  description: 'Join the next generation of founders at our flagship event. Engage with industry leaders, develop your skills, and launch your innovative ideas. Lahore / Islamabad, Nov 07-09, 2026.',
  alternates: {
    canonical: 'https://www.alphaace.com.pk/'
  },
  keywords: [
    'Alpha Entrepreneurship Summit',
    'AES 2026',
    'Alpha ACE',
    'Founders Summit Pakistan',
    'Venture Capital',
    'Startup Simulation',
    'Next-Gen Founders'
  ],
  authors: [{ name: 'Alpha Entrepreneurship Summit' }],
  openGraph: {
    title: 'Alpha Entrepreneurship Summit (AES) 2026',
    description: 'Join the next generation of founders at our flagship event. Engage with industry leaders, develop your skills, and launch your innovative ideas.',
    url: 'https://www.alphaace.com.pk/',
    siteName: 'Alpha Entrepreneurship Summit',
    images: [
      {
        url: '/assets/aes_hero_stage.jpg',
        width: 1200,
        height: 630,
        alt: 'Alpha Entrepreneurship Summit Main Arena'
      }
    ],
    locale: 'en_US',
    type: 'website'
  },
  icons: {
    icon: '/assets/aes-logo.png',
    apple: '/assets/aes-logo.png'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,600;1,700&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  if (window.location.hash) {
                    var hashId = window.location.hash.replace('#', '');
                    if (hashId) {
                      sessionStorage.setItem('scroll_target', hashId);
                    }
                    window.history.replaceState(null, '', window.location.pathname + window.location.search);
                  }
                } catch (e) {}
              })();
            `
          }}
        />
      </head>
      <body className="bg-[rgb(27,8,5)] text-[rgb(248,244,237)] antialiased selection:bg-[rgb(234,224,211)] selection:text-[rgb(27,8,5)] overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
