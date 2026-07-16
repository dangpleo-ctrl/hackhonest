import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import { brand } from "@/lib/brand";
import { getLocaleAndT } from "@/lib/i18n/server";
import { getSessionUser } from "@/lib/auth";
import { isModerator } from "@/lib/admin";
import { getUnreadCount } from "@/lib/notifications";
import { LocaleProvider } from "@/lib/i18n/locale-provider";
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

const OG_LOCALE: Record<"en" | "vi", string> = {
  en: "en_US",
  vi: "vi_VN",
};

export async function generateMetadata(): Promise<Metadata> {
  const { locale, t } = await getLocaleAndT();
  const title = `${brand.name} — ${t.brand.tagline}`;
  return {
    title: {
      default: title,
      template: `%s · ${brand.name}`,
    },
    description: t.brand.pitch,
    applicationName: brand.name,
    openGraph: {
      title,
      description: t.brand.pitch,
      type: "website",
      locale: OG_LOCALE[locale],
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [{ locale }, user] = await Promise.all([getLocaleAndT(), getSessionUser()]);
  const [unreadCount, isStaff] = user
    ? await Promise.all([getUnreadCount(user.id), isModerator()])
    : [0, false];
  return (
    <html lang={locale} className={`${beVietnamPro.variable} h-full`}>
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground antialiased">
        <LocaleProvider initialLocale={locale}>
          <SiteNav
            user={user ? { handle: user.handle } : null}
            unreadCount={unreadCount}
            isStaff={isStaff}
          />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </LocaleProvider>
      </body>
    </html>
  );
}
