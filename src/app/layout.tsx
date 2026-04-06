import type { Metadata, Viewport } from "next";
import { Inter, Newsreader, Public_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["300", "400", "700"],
  display: "swap",
});

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#005ab4',
};

export const metadata: Metadata = {
  title: "Notaría | Servicios Notariales",
  description: "Trámites y servicios notariales en línea. Rápido, seguro y transparente.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full">
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${newsreader.variable} ${publicSans.variable} font-sans antialiased flex flex-col min-h-screen bg-slate-50`}
      >
        {/* Non-blocking Material Symbols font load */}
        <Script
          id="material-symbols-loader"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              var l = document.createElement('link');
              l.rel = 'stylesheet';
              l.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap';
              document.head.appendChild(l);
            `,
          }}
        />
        <Header />
        <main className="flex-grow flex flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
