import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import { Inter } from 'next/font/google';
import Script from 'next/script';

const inter = Inter({
  subsets: ['latin'],
});

// Assuming LayoutProps is defined in your environment or imported
export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/assets/Devcoder.png" />
      </head>
      <body className="flex flex-col min-h-screen">
        <RootProvider>{children}</RootProvider>

        {/* --- Google Analytics --- */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-5RJ2J9BRKS"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-5RJ2J9BRKS');
          `}
        </Script>
        {/* ------------------------- */}
      </body>
    </html>
  );
}