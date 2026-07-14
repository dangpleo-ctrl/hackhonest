import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import { brand } from "@/lib/brand";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

// Be Vietnam Pro — designed for Vietnamese + Latin. Not a variable font, so we
// pin the weights we use. `vietnamese` subset ships the full accented glyph set.
const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-be-vietnam-pro",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${brand.name} — ${brand.tagline}`,
    template: `%s · ${brand.name}`,
  },
  description: brand.pitch,
  applicationName: brand.name,
  openGraph: {
    title: `${brand.name} — ${brand.tagline}`,
    description: brand.pitch,
    type: "website",
    locale: brand.locale,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang={brand.locale}
      className={`${beVietnamPro.variable} h-full`}
    >
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground antialiased">
        <SiteNav />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
