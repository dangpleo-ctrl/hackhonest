import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getActor } from "@/lib/data";
import { getT } from "@/lib/i18n/server";
import { getSessionUser, getSessionEmail } from "@/lib/auth";
import {
  getActorOwnerHandle,
  getViewerClaimStatus,
  actorWebsiteDomain,
  domainOf,
} from "@/lib/claims";
import { ClaimForm } from "./claim-form";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const t = await getT();
  const actor = getActor(slug);
  return { title: actor ? t.claim.metaTitle(actor.name) : t.organizerPage.metaTitleFallback };
}

export default async function ClaimPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const actor = getActor(slug);
  if (!actor) notFound();

  const user = await getSessionUser();
  if (!user) redirect(`/login?next=${encodeURIComponent(`/o/${slug}/claim`)}`);

  const t = await getT();
  const [ownerHandle, myStatus, email] = await Promise.all([
    getActorOwnerHandle(slug),
    getViewerClaimStatus(slug, user.id),
    getSessionEmail(),
  ]);
  const siteDomain = actorWebsiteDomain(slug);
  const domainMatch = Boolean(email && siteDomain && domainOf(email) === siteDomain);

  return (
    <div className="mx-auto w-full max-w-lg px-5 py-12">
      <Link
        href={`/o/${slug}`}
        className="text-sm text-muted transition-colors hover:text-foreground"
      >
        ← {actor.name}
      </Link>
      <h1 className="mt-3 text-2xl font-bold tracking-tight text-foreground">
        {t.claim.title(actor.name)}
      </h1>
      <p className="mt-2 text-[15px] leading-relaxed text-muted">{t.claim.intro}</p>

      {ownerHandle ? (
        <div className="mt-6 rounded-xl border border-border bg-surface p-5 text-sm text-muted">
          {t.claim.claimedByName(ownerHandle)}
        </div>
      ) : myStatus === "verified" ? (
        <div className="mt-6 rounded-xl border border-success-border bg-success-subtle p-5 text-sm text-success-strong">
          {t.claim.claimedByYou}
        </div>
      ) : myStatus === "pending" ? (
        <div className="mt-6 rounded-xl border border-warning-border bg-warning-subtle p-5 text-sm text-warning-strong">
          {t.claim.pending}
        </div>
      ) : (
        <ClaimForm
          actorSlug={slug}
          email={email ?? ""}
          domainMatch={domainMatch}
          siteDomain={siteDomain}
        />
      )}
    </div>
  );
}
