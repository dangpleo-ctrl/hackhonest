import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { brand } from "@/lib/brand";
import { getLocaleAndT } from "@/lib/i18n/server";
import { getSessionUser } from "@/lib/auth";
import { isModerator } from "@/lib/admin";
import { getUnreadCount } from "@/lib/notifications";
import { LocaleProvider } from "@/lib/i18n/locale-provider";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

// IBM Plex Sans — the engineered, credible voice of "the record". Ships a
// `vietnamese` subset (this product is Vietnam & SE Asia first), so headlines
// and body keep full accented coverage. Not a variable font: pin our weights.
const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin", "latin-ext", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// IBM Plex Mono — the signature "ledger / receipt / terminal" voice: labels,
// record IDs, dates, scores, stamps. Used for short, mostly-ASCII strings, so
// latin + latin-ext cover it; any localized string falls back to Plex Sans.
const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
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
    <html lang={locale} className={`${plexSans.variable} ${plexMono.variable} h-full`}>
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground antialiased">
        {/* Apply the saved light/dark choice before first paint (no flash). */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var t=localStorage.getItem('hh-theme');if(t==='dark'||t==='light'){document.documentElement.setAttribute('data-theme',t);}}catch(e){}})();",
          }}
        />
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
