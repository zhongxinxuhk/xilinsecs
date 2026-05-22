import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-data";
import { ThemeProvider } from "@/components/ui/theme-provider";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import ReadingProgress from "@/components/interactive/reading-progress";
import BackToTop from "@/components/interactive/back-to-top";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.domain),
  title: {
    default: "海口希灵赛斯：一家专注于信息化解决方案的科技公司",
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.seoDescription,
  keywords: [
    "海口希灵赛斯",
    "信息化解决方案",
    "私有云建设",
    "信息安全咨询",
    "网站建设",
    "Pages 托管",
    "企业服务",
  ],
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.seoDescription,
    url: siteConfig.domain,
    siteName: siteConfig.name,
    type: "website",
    images: [
      {
        url: siteConfig.heroImage,
        width: 1616,
        height: 940,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.seoDescription,
    images: [siteConfig.heroImage],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#f8f4ec" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#0f172a" />
        {/* Prevent flash of wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('hkx-theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (stored === 'dark' || (!stored && prefersDark)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          <ReadingProgress />
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 pt-24 md:pt-28">{children}</main>
            <Footer />
          </div>
          <BackToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
