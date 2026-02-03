import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import BottomNavigation from "@/components/ui/bottom-navigation";
import BreadcrumbWrapper from "@/components/layout/breadcrumb-wrapper";
import StructuredData from "@/components/seo/structured-data";
import PerformanceOptimizer from "@/components/seo/performance-optimizer";
import SocialProfileSchema from "@/components/seo/social-profile-schema";
import WebPageSchema from "@/components/seo/webpage-schema";
import ThemeToggle from "@/components/ui/theme-toggle";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Henry Kobutra - CTO & Co-founder | Full-Stack Technology Leader",
    template: "%s | Henry Kobutra"
  },
  description: "Henry Kobutra - CTO & Co-founder at Redii with 15+ years of technical leadership in fintech, AI/ML, and digital transformation. Expert in Python, JavaScript, AWS, cybersecurity, and cross-cultural team management.",
  keywords: [
    "Henry Kobutra",
    "CTO",
    "Co-founder",
    "Redii",
    "Full-stack developer",
    "Technical leadership",
    "Fintech",
    "AI/ML",
    "Digital transformation",
    "Python",
    "JavaScript",
    "AWS",
    "Cybersecurity",
    "Cross-cultural leadership",
    "Remote work",
    "Technology consultant",
    "Software architect"
  ],
  authors: [{ name: "Henry Kobutra" }],
  creator: "Henry Kobutra",
  publisher: "Henry Kobutra",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://kobutra.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kobutra.com",
    title: "Henry Kobutra - CTO & Co-founder | Full-Stack Technology Leader",
    description: "Henry Kobutra - CTO & Co-founder at Redii with 15+ years of technical leadership in fintech, AI/ML, and digital transformation. Expert in Python, JavaScript, AWS, cybersecurity, and cross-cultural team management.",
    siteName: "Henry Kobutra",
    images: [
      {
        url: "/images/og/henry-kobutra-og.jpg",
        width: 1200,
        height: 630,
        alt: "Henry Kobutra - CTO & Co-founder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Henry Kobutra - CTO & Co-founder | Full-Stack Technology Leader",
    description: "Henry Kobutra - CTO & Co-founder at Redii with 15+ years of technical leadership in fintech, AI/ML, and digital transformation.",
    images: ["/images/og/henry-kobutra-twitter.jpg"],
    creator: "@henrykobutra",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
};

const themeInitScript = `
(() => {
  try {
    const storageKey = "theme";
    const root = document.documentElement;
    const stored = localStorage.getItem(storageKey);
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const preference = stored === "dark" || stored === "light" || stored === "system"
      ? stored
      : "system";
    const theme = preference === "system" ? (prefersDark ? "dark" : "light") : preference;
    root.classList.toggle("dark", theme === "dark");
    root.style.colorScheme = theme;
    root.dataset.theme = preference;
  } catch {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <StructuredData />
        <SocialProfileSchema />
        <WebPageSchema />
        <PerformanceOptimizer />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <BreadcrumbWrapper />
        <ThemeToggle />
        {children}
        <BottomNavigation />
      </body>
    </html>
  );
}
