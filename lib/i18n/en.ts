// English message dictionary — the canonical shape. `vi.ts` must satisfy the
// `Messages` type derived from this file, so any key added here is required there
// too (parity is enforced at build time). Interpolated strings are functions so
// they stay type-safe.

export const en = {
  // Native name of THIS locale, shown on the language toggle.
  languageName: "English",

  nav: {
    ariaPrimary: "Primary",
    directory: "Directory",
    addEntry: "Add an entry",
    howItWorks: "How it works",
    trust: "Trust & safety",
    writeReview: "Write a review",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    // Language toggle
    languageGroup: "Language",
    switchToEnglish: "Switch to English",
    switchToVietnamese: "Switch to Vietnamese",
  },

  // Brand copy that used to live in lib/brand.ts (name stays untranslated).
  brand: {
    tagline: "The community record of hackathon organizers.",
    pitch:
      "Verified, first-hand reviews of the companies, organizers, and sponsors behind hackathons — so you can see who pays prizes, judges fairly, and keeps their promises before you burn a weekend.",
    posture:
      "We host what verified participants report. We never rate or accuse anyone ourselves — every number on this site is a count of what real attendees said.",
    region: "Vietnam & Southeast Asia",
  },

  common: {
    of: "of",
    review: "review",
    reviews: "reviews",
    noReviewsYet: "No reviews yet",
    writeReview: "Write a review",
    browseDirectory: "Browse the full directory",
    seeAllN: (n: number) => `See all ${n} →`,
    reviewCount: (n: number) => `${n} ${n === 1 ? "review" : "reviews"}`,
    reviewsWithCount: (n: number) => `Reviews (${n})`,
  },

  home: {
    heroBadge: "Vietnam & Southeast Asia",
    heroTitleLead: "Hold hackathons ",
    heroTitleAccent: "accountable.",
    searchAria: "Search an organizer, sponsor, or event",
    searchPlaceholder: "Search an organizer, sponsor, or event…",
    searchButton: "Search",
    writeReview: "Write a review",
    statOrganizers: "organizers on record",
    statVerifiedReviews: "verified reviews",
    statEvents: "events tracked",

    onTheRecord: "On the record",
    featuredProblemsLabel: "Problem statements",
    featuredProblemsSub: "each a sponsor's real production problem",
    featuredAdvertisedLabel: "Advertised",
    featuredAdvertisedValue: "$1M+ perks",
    featuredAdvertisedSub: "mostly third-party programs & free tiers",
    featuredReportedLabel: "Reported",
    featuredReportedValue: "Credits not delivered",
    featuredReportedSub: "applied via the portal, received $0",
    seeFullRecord: "See the full record",
    communityRecord: "Community record",

    howItWorksTitle: "How it works",
    step1Title: "Search the organizer",
    step1Body: "Reputation follows the actor across events, not just one weekend.",
    step2Title: "Read the record",
    step2Body: "A neutral count of what verified attendees actually reported.",
    step3Title: "Add yours",
    step3Body: "Took part? Post a verified review. You stay anonymous.",
    howItWorksLink: "How it works",

    organizersOnRecord: "Organizers on record",
    howWeKeepItHonest: "How we keep it honest",
  },

  howItWorks: {
    metaTitle: "How it works",
    metaDescription:
      "Check an organizer before you commit a weekend, and add your own verified review.",
    eyebrow: "How it works",
    title: "Know who you're building for",
    intro: (brandName: string) =>
      `A weekend of work is real work. ${brandName} is the community's durable record of which hackathon organizers keep their word, so the signal doesn't wash away in a Discord by Tuesday.`,
    steps: [
      {
        title: "Search the organizer",
        body: "Look up the company, organizer, or sponsor behind an event. Reputation follows the actor across events, because the same people re-run hackathons under new names.",
      },
      {
        title: "Read the record",
        body: "See a neutral summary of what verified attendees reported: were prizes paid, were the advertised credits real, was judging fair, did the reality match the marketing?",
      },
      {
        title: "Add your own",
        body: "Took part? Write a verified, first-person review. State the facts, attach evidence for any hard claim. You stay anonymous; your identity signal is stored separately and never shown.",
      },
      {
        title: "Organizers reply",
        body: "Organizers can claim their page and respond in public. Good actors get to show they made it right; the record stays for everyone.",
      },
    ],
    ctaDirectory: "Browse the directory",
    ctaReview: "Write a review",
  },

  trust: {
    metaTitle: "Trust & Safety",
    metaDescription:
      "How verification, anonymity, moderation, and the right of reply work on HackHonest.",
    eyebrow: "Trust & Safety",
    title: "How this stays honest",
    sections: {
      host: {
        title: "We host, we don't judge",
        body: (brandName: string) =>
          `${brandName} is a neutral host of what verified participants report. We never write reviews, and we never rate or accuse anyone ourselves. Every number you see is a plain count of what real attendees said, for example "3 of 4 verified reviewers reported prizes were not paid as promised." The conclusion is yours to draw.`,
      },
      verified: {
        title: "Verified, first-hand only",
        body: "Reviews come from people who actually took part. We verify participation before publishing, using signals the reviewer can prove they control, a GitHub identity tied to the event's project repo, a confirmation email from the event's own domain, or documentary evidence such as an acceptance email or dashboard. We do not accept second-hand or hypothetical reviews.",
      },
      anonymous: {
        title: "Verified, but anonymous",
        body: "Reviewers post under a pseudonym. The identity signal we use to verify you is stored separately from your review and is never shown publicly, so an organizer cannot retaliate against you for an honest account. We keep as little as possible.",
      },
      facts: {
        title: "Facts over insults",
        body: "The review form is built to capture what happened, not name-calling. State the facts, then your view. Attach evidence for any hard claim (a promised prize, an undelivered credit). A documented, first-hand account is both more useful to the next builder and far more defensible than a rant.",
      },
      reply: {
        title: "Right of reply, for organizers",
        body: "Any organizer can claim their page and post a public reply to any review. They get the last word, but they cannot delete a review they simply disagree with. We remove content only for clear policy violations (doxxing, off-topic, illegal, or a review from someone who did not attend), never because a business asked us to take down honest criticism.",
      },
      report: {
        title: "Report a problem",
        body: "Spotted a fake review, a review from a non-attendee, or content that should come down? Report it and we will look. Abuse of the report tool is itself a violation.",
      },
    },
    footnote: (region: string) =>
      `This is a community project in ${region}. It is not legal advice, and a page here is not the organizer's official page.`,
  },

  about: {
    metaTitle: "About",
    metaDescription:
      "Why a community record of hackathon organizers exists, and who it's for.",
    eyebrow: "About",
    title: "Why this exists",
    p1: 'AI made it possible for anyone to build fast, so hackathons exploded. With them came a wave of abuse: companies running "hackathons" whose tracks are their real, specced business problems, then taking the winning solutions into deployment instead of paying a dev team. Organizers over-promising credits, prizes, and perks that never arrive. Young, passionate developers giving away a weekend of real work on a promise.',
    p2: (brandName: string) =>
      `Today none of that leaves a searchable trace. A bad experience dies in a rage-tweet, an event Discord, or a group chat, and the next cohort walks in blind. ${brandName} is the fix: a durable, public record of which organizers, companies, and sponsors keep their word, built from the first-hand accounts of people who were actually there.`,
    p3: "It is balanced by design. Praise the good events so more people join them; document the bad ones so fewer people get burned. The platform never accuses anyone, it only shows what verified attendees reported, and lets you decide.",
    p4: (region: string) =>
      `This is a community project, starting in ${region}, where the need is sharpest right now. The platform is only the tool. The record belongs to the community that builds it.`,
  },

  tos: {
    metaTitle: "Terms & content policy",
    metaDescription: "The rules for posting, and how content is handled.",
    eyebrow: "Terms & content policy",
    title: "The rules, in plain language",
    intro: (brandName: string) =>
      `${brandName} is a neutral host of user reviews. These are the ground rules; a full legal version will accompany public launch.`,
    rules: [
      {
        h: "You are the author",
        p: "You, the reviewer, are the sole author and owner of your review. The platform hosts it; it does not adopt it or write it for you.",
      },
      {
        h: "First-hand and true",
        p: "Only post about events you personally took part in. Warrant that what you write is true to your own experience, and that you have the rights and consents for any evidence you upload.",
      },
      {
        h: "Opinions and disclosed facts",
        p: "State the facts you rely on, then your view. A conclusion drawn from facts you've disclosed is your protected opinion. Don't state as fact things you can't back.",
      },
      {
        h: "No fabrication",
        p: "No fake reviews, in either direction. No reviewing your own event, and no paying for or coercing reviews. This is a hard rule.",
      },
      {
        h: "Protect other people",
        p: "Redact third parties' names, faces, emails, and phone numbers from any evidence. Don't post other people's private information.",
      },
      {
        h: "Right of reply, not deletion",
        p: "Reviewed organizers can claim their page and reply publicly, but cannot delete honest criticism. Content is removed only for clear policy violations.",
      },
      {
        h: "Report and takedown",
        p: "Report fakes, non-attendee reviews, doxxing, or illegal content and we'll review it. We honor valid legal requests and notify affected reviewers where we can.",
      },
    ],
    footnote: (region: string) =>
      `This is a community project in ${region} and is not legal advice. A page here is not the organizer's official page.`,
  },

  directory: {
    metaTitle: "Directory",
    metaDescription:
      "Browse and search hackathon organizers, companies, and sponsors, and see what verified participants reported.",
    title: "Directory",
    subtitle:
      "Search the companies, organizers, and sponsors behind hackathon events.",
    searchAria: "Search organizers, sponsors, companies, and events",
    searchPlaceholder: "Search organizers, sponsors, events…",
    clearSearch: "Clear search",
    filterGroupAria: "Filter directory by category",
    tabAll: "All",
    tabOrganizers: "Organizers",
    tabEvents: "Events",
    tabCompanies: "Companies",
    tabSponsors: "Sponsors",
    noMatches: (q: string) => `No matches for "${q}".`,
    addFirstReviewArrow: "Add the first review →",
    addToDirectoryArrow: "Add it to the directory →",
    nothingHereYet: "Nothing here yet.",
    addFirstReview: "Add the first review",
    alsoKnownAs: (list: string) => `Also known as ${list}`,
    claimed: "Claimed",
  },

  reviewNew: {
    metaTitle: "Write a review",
    metaDescription:
      "Add your verified, first-hand review of a hackathon organizer or event.",
    eyebrow: "Write a review",
    title: "Share what actually happened",
    intro: (posture: string) =>
      `Only review events you took part in. You stay anonymous, and we verify participation before anything is published. ${posture}`,
  },

  reviewForm: {
    errChooseTarget: "Please choose what you're reviewing.",
    errOverall: "Please give an overall rating.",
    errHeadline: "Please write a short headline (at least 6 characters).",
    errBody: "Please describe what happened (at least 40 characters).",
    errGeneric: "Something went wrong. Please try again.",
    errNetwork: "Network error. Please try again.",
    successBody: "Your review has been received and is pending verification.",
    successHeading: "Thank you",
    successNote:
      "We verify that reviewers actually attended before anything is published. Your identity is stored separately from your review and is never shown.",

    targetLabel: "What are you reviewing?",
    targetPlaceholder: "Choose an organizer or event…",
    optgroupEvents: "Events",
    optgroupOrganizers: "Organizers",

    overallLabel: "Overall rating",

    dimensionsLabel: "Score what actually happened",
    dimensionsHelp: "Skip any that don't apply.",

    headlineLabel: "Headline",
    headlinePlaceholder: "One line: what should the next builder know?",

    bodyLabel: "What happened?",
    bodyHelp:
      "State the facts first, then your view. Attach evidence for any hard claim (a promised prize, an undelivered credit).",
    bodyPlaceholder:
      "I attended [event]. They promised… I received… Here is what I can show…",

    proofLabel: "How can you prove you attended?",
    proofHelp:
      "For our verification only — never published. e.g. a Devpost project link, a confirmation email, a Discord handle, or a photo.",
    proofPlaceholder: "Link or description of your proof of participation",

    authorLabel: "Display name (optional)",
    authorHelp:
      "A pseudonym shown with your review. Leave blank to post as anonymous.",
    authorPlaceholder: "e.g. Verified participant",

    contactLabel: "Private contact (optional)",
    contactHelp: "Only for verification. Never shown, never shared.",
    contactPlaceholder: "email or handle",

    submit: "Submit for verification",
    submitting: "Submitting…",
    submitNote: "Reviews are checked before they're published.",
  },

  suggest: {
    metaTitle: "Suggest an entry",
    metaDescription:
      "Paste an event or organizer link and AI helps you add it to the directory. You review and confirm everything before it's submitted.",
    navLink: "Add an event or organizer",
    eyebrow: "Suggest an entry",
    title: "Add an event or organizer",
    intro:
      "Paste a link to a hackathon, its organizer, or a sponsor. AI reads the page, fills in the details, and checks the directory for duplicates. You review and edit everything before it goes to our moderation queue — nothing is published automatically.",
    urlLabel: "Event or organizer link",
    urlPlaceholder: "https://…",
    urlHelp: "A link to the event page, the organizer's site, or a sponsor page.",
    analyze: "Analyze with AI",
    analyzing: "Analyzing…",
    fillManually: "Or fill in the form manually",
    errUrlRequired: "Please paste a link first.",
    errUrlInvalid: "Please enter a valid http(s) link.",
    aiDisabledNote:
      "AI analysis isn't configured yet — fill in the form manually below. Your entry still goes to the moderation queue.",
    analysisFailedNote:
      "We couldn't analyze that link automatically. Fill in the form manually below.",
    prefilledNote:
      "AI pre-filled this from the link. Check every field and fix anything that's off before you submit.",
  },

  suggestForm: {
    duplicatesTitle: "This may already be in the directory",
    duplicatePrefix: "This looks like",
    duplicateSuffix: "— an entry may already exist.",
    duplicatesHelp:
      "If your entry is one of these, add your review there instead of creating a duplicate.",
    typeLabel: "Entry type",
    typeOrganizer: "Organizer",
    typeEvent: "Event",
    typeCompany: "Company",
    typeSponsor: "Sponsor",
    nameLabel: "Name",
    namePlaceholder: "e.g. Zenith AI Ventures",
    websiteLabel: "Website",
    websitePlaceholder: "https://…",
    locationLabel: "Location",
    locationPlaceholder: "e.g. Ho Chi Minh City, Vietnam",
    datesLabel: "Dates",
    datesHelp: "For events only.",
    datesPlaceholder: "e.g. Aug 20–24, 2026",
    blurbLabel: "Description",
    blurbHelp: "A neutral, factual sentence or two — no accusations, just what it is.",
    blurbPlaceholder: "What is this event or organizer? Keep it factual.",
    sponsorsLabel: "Detected sponsors",
    sponsorsHelp: "Comma-separated. Edit or clear as needed.",
    sponsorsPlaceholder: "e.g. Crestline Bank, SwiftCart",
    submittedByLabel: "Your name or handle (optional)",
    submittedByHelp: "So we can credit or follow up. Never shown publicly.",
    submittedByPlaceholder: "e.g. a Devpost handle or email",
    errName: "Please enter a name (at least 2 characters).",
    errType: "Please choose an entry type.",
    errWebsite: "Website must be a valid http(s) link.",
    errGeneric: "Something went wrong. Please try again.",
    errNetwork: "Network error. Please try again.",
    submit: "Submit for review",
    submitting: "Submitting…",
    submitNote: "Suggestions are checked by a human before anything is added.",
    successHeading: "Thank you",
    successBody: "Your suggestion has been received and is pending review.",
    successNote:
      "We check every suggestion before adding it to the directory. Nothing is published automatically.",
    startOver: "Suggest another",
  },

  ratingBand: {
    good: "Well reviewed",
    mixed: "Mixed reviews",
    poor: "Poorly reviewed",
  },

  verified: {
    attendee: "Verified attendee",
    methods: {
      "founder-attested": {
        label: "Founder-attested",
        detail: "A named founder confirmed this reviewer attended.",
      },
      github: {
        label: "GitHub-verified",
        detail: "Linked to a GitHub account with a matching submission.",
      },
      evidence: {
        label: "Evidence-backed",
        detail: "Reviewer supplied supporting screenshots or documents.",
      },
      "email-dkim": {
        label: "Email-verified",
        detail: "Confirmed via a signed (DKIM) email from the event.",
      },
    },
  },

  aggregate: {
    defaultTitle: "Community record",
    ariaRecord: (title: string) => `${title}: community record`,
    basedOnPrefix: "Based on",
    verifiedSuffix: "verified",
    noReviewsCta:
      "No reviews yet. Be the first verified attendee to share what happened.",
    noRatingsYet: "No ratings yet",
    dimAriaNone: (label: string) => `${label}: no ratings yet`,
    dimAriaValue: (label: string, avg: string, count: number) =>
      `${label}: ${avg} out of 5 from ${count} reviewers`,
    whatReported: "What verified reviewers reported",
    reviewersReported: "verified reviewers reported",
    ratedLow: (dimLabel: string) => `rated "${dimLabel}" 2 stars or lower`,
    postureNote: (brandName: string) =>
      `These are counts of what verified attendees reported — not ratings issued by ${brandName}.`,
  },

  actorKinds: {
    organizer: "Organizer",
    company: "Company",
    sponsor: "Sponsor",
    event: "Event",
  },

  reviewCard: {
    evidenceProvided: "Evidence provided",
    evidenceKinds: {
      screenshot: "Screenshot",
      email: "Email",
      link: "Link",
    },
    evidenceTitle: (kind: string) => `${kind} evidence`,
    byline: "· pseudonymous, identity kept private",
    responseFrom: (author: string) => `Response from ${author}`,
    organizerReply: "Organizer reply",
  },

  organizerPage: {
    metaTitleFallback: "Organizer",
    metaTitle: (name: string) => `${name} — hackathon reviews & record`,
    metaDescription: (name: string, blurb: string) =>
      `Is ${name} a good hackathon organizer/sponsor? What verified participants reported: ${blurb}`,
    crumbOrganizer: "Organizer",
    crumbSponsor: "Sponsor",
    alsoSeenAs: (list: string) => `Also seen as: ${list}`,
    writeReview: "Write a review",
    claimPage: "Claim this page",
    claimTooltip: "Right of reply — coming with public launch",
    aggregateTitle: "What verified reviewers reported",
    eventsHeading: "Events",
    roleOrganized: "Organized",
    roleSponsored: "Sponsored",
    noReviews: "No reviews yet.",
    beFirst: "Be the first to review",
  },

  eventPage: {
    metaTitleFallback: "Event",
    metaTitle: (name: string) => `${name} — reviews & record`,
    metaDescription: (name: string, dates: string, location: string) =>
      `What verified participants reported about ${name} (${dates}, ${location}): prizes, perks, judging, and the sponsor-problem structure.`,
    crumbEvent: "Event",
    organizedBy: "organized by",
    howItWorked: "How it worked: ",
    writeReview: "Write a review",
    aggregateTitle: "What verified attendees reported",
    advertisedHeading: "What was advertised",
    perksHeading:
      "Advertised perks & credits, vs. what a verified attendee reported",
    perksColProvider: "Provider",
    perksColAdvertised: "Advertised",
    perksColReported: "Reported",
    tracksHeading: "Tracks & problem statements",
    tracksSubtitle: (problems: number, tracks: number) =>
      `${problems} problem statements across ${tracks} tracks, each owned by a named enterprise. Every submission had to solve one of these.`,
    problemsBadge: (n: number) => `${n} problems`,
    sponsoredBy: "Sponsored by",
    winnersHeading: "Shortlisted teams & winners",
    winnersSubtitleMapped: (count: number) =>
      `As posted by the organizer. Every one of the ${count} projects on record was built to solve a named sponsor's production problem.`,
    winnersSubtitlePlain: "As posted by the organizer.",
    forSponsor: (name: string) => `for ${name}`,
    factsHeading: "On the record",
    factsSubtitle:
      "Sourced facts about this event. We state them; we don't interpret them.",
    source: (src: string) => `Source: ${src}`,
    problemsHeading: (n: number) => `The ${n} problem statements`,
    problemsSubtitle: "Each is a named enterprise's real production problem.",
    noReviews: "No reviews yet. Were you there?",
    beFirst: "Be the first to review",
    sponsorsOnRecord: (list: string) => `Sponsors on record: ${list}.`,
  },

  perkStatus: {
    not_received: "Not received",
    third_party_program: "Third-party program",
    out_of_stock: "Out of stock",
    delivered: "Delivered",
    unknown: "Unverified",
  },

  placement: {
    Winner: "Winner",
    "Runner-up": "Runner-up",
    Shortlist: "Shortlist",
  },

  // Keyed off REVIEW_DIMENSIONS[].key so seed reviews / aggregates render the
  // right label + help without touching the data layer.
  reviewDimensions: {
    prizes: {
      label: "Prizes delivered as promised",
      help: "Were advertised prizes actually paid, in full, on time?",
    },
    perks: {
      label: "Perks & credits were real",
      help: "Were the listed credits/perks actually provided by the organizer, not a reskinned third-party program?",
    },
    judging: {
      label: "Judging was fair & transparent",
      help: "Clear criteria, no conflicts, results explained?",
    },
    organization: {
      label: "Well organized",
      help: "Venue, schedule, comms, support?",
    },
    honesty: {
      label: "Honest marketing",
      help: "Did the reality match what was advertised?",
    },
    respect: {
      label: "Respected participants' work",
      help: "Fair treatment of your time, IP, and effort?",
    },
  },

  starRating: {
    ratingWithMax: (max: number) => `Rating, ${max} stars`,
    starOfMax: (i: number, max: number) => `${i} of ${max} stars`,
    valueOutOfMax: (value: string, max: number) =>
      `${value} out of ${max} stars`,
  },

  footer: {
    explore: "Explore",
    trust: "Trust",
    disclaimer: (brandName: string) =>
      `This is not the organizer's official page. ${brandName} hosts independent, first-hand reviews from verified participants. Every number on this site is a count of what real attendees reported.`,
    copyright: (year: number, brandName: string) => `© ${year} ${brandName}`,
  },
};
