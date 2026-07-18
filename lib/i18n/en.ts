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
    moderate: "Moderate",
    writeReview: "Write a review",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    // Language toggle
    languageGroup: "Language",
    switchToEnglish: "Switch to English",
    switchToVietnamese: "Switch to Vietnamese",
    switchToDark: "Switch to dark theme",
    switchToLight: "Switch to light theme",
  },

  // Brand copy that used to live in lib/brand.ts (name stays untranslated).
  brand: {
    tagline: "A community keeping hackathons honest, together.",
    pitch:
      "Honest, first-hand reviews of the organizers, companies, and sponsors behind hackathons, shared by the builders who were there, so we can all find the events that pay their prizes, judge fairly, and keep their word.",
    posture:
      "We're a neutral home for what verified participants report. We never rate or accuse anyone ourselves; every number here is simply a count of what real attendees said.",
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
    recordEyebrow: "The public record",
    processEyebrow: "The process",
    postureEyebrow: "Our posture",
    heroTitleLead: "Building healthier hackathons, ",
    heroTitleAccent: "together",
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
      `A weekend of work is real work, and it deserves an organizer who keeps their word. ${brandName} is the community's shared, lasting record of who does, so what we learn together doesn't wash away in a Discord by Tuesday.`,
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
    title: "How we keep this honest, together",
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
    p1: 'AI made it possible for anyone to build fast, and hackathons exploded across the region. Most are great. But builders kept running into the same painful patterns: companies running "hackathons" whose tracks are their real, specced business problems, then taking the winning solutions into deployment instead of paying a dev team; organizers over-promising credits, prizes, and perks that never arrive; passionate developers giving away a weekend of real work on a promise.',
    p2: (brandName: string) =>
      `Today none of that leaves a searchable trace. A bad experience dies in a rage-tweet, an event Discord, or a group chat, and the next cohort walks in blind. So the community started keeping a shared record. ${brandName} is a durable, public account of which organizers, companies, and sponsors keep their word, built from the first-hand stories of the people who were actually there.`,
    p3: "It's balanced by design. We celebrate the events that get it right so more builders join them, and we document the ones that don't so fewer people get hurt. The platform never accuses anyone; it simply shows what verified attendees reported and lets you decide.",
    p4: (region: string) =>
      `This is a community project, starting in ${region}, where the need is sharpest right now. The platform is only the tool; the record belongs to the community that builds it, together.`,
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
    errCaptcha: "Please complete the anti-robot check, then try again.",
    errRateLimited: "You're submitting too often. Please wait a bit and try again.",
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
    community: "Community",
    disclaimer: (brandName: string) =>
      `This is not the organizer's official page. ${brandName} hosts independent, first-hand reviews from verified participants. Every number on this site is a count of what real attendees reported.`,
    copyright: (year: number, brandName: string) => `© ${year} ${brandName}`,
  },

  // ── Community forum ─────────────────────────────────────────────────────────
  forum: {
    navLink: "Community",
    metaTitle: "Community",
    metaDescription:
      "Compare notes with other builders about hackathon organizers, sponsors, prizes, and events.",
    title: "Community",
    subtitle:
      "Compare notes with other builders. Warn each other about bad actors, share how an event actually went, and ask before you commit a weekend.",
    startThread: "Start a discussion",
    loginToPost: "Log in to post",
    signedInAs: (handle: string) => `Posting as ${handle}`,
    categoriesHeading: "Categories",
    recentHeading: "Recent discussions",
    threadsIn: (name: string) => `Discussions in ${name}`,
    replyCount: (n: number) => `${n} ${n === 1 ? "reply" : "replies"}`,
    postCount: (n: number) => `${n} ${n === 1 ? "post" : "posts"}`,
    noThreadsYet: "No discussions here yet.",
    beFirst: "Start the first one",
    startedBy: (handle: string) => `by ${handle}`,
    by: "by",
    lastActivity: "Last activity",
    aboutActor: (name: string) => `About ${name} →`,

    // Thread detail
    backToForum: "← Community",
    backToCategory: (name: string) => `← ${name}`,
    repliesHeading: "Replies",
    noRepliesYet: "No replies yet. Be the first to weigh in.",
    replyHeading: "Add a reply",
    replyLabel: "Your reply",
    replyPlaceholder: "Share what you know. Keep it first-hand and factual.",
    replySubmit: "Post reply",
    replySubmitting: "Posting…",
    loginToReply: "Log in to reply",
    loginToReplyNote: "You need a free account to join the discussion.",
    locked: "Locked",
    lockedNote: "This discussion is locked. You can still read it, but new replies are closed.",

    // New thread
    newMetaTitle: "Start a discussion",
    newTitle: "Start a discussion",
    newSubtitle:
      "Keep it first-hand and factual. This is a public, durable record — treat organizers as you'd want to be treated, and back hard claims with evidence.",
    categoryLabel: "Category",
    categoryPlaceholder: "Choose a category…",
    titleLabel: "Title",
    titlePlaceholder: "One line: what's this about?",
    bodyLabel: "Your post",
    bodyPlaceholder:
      "What happened, what you're asking, or what others should know. State the facts first, then your view.",
    bodyHelp: "20 characters or more. Markdown isn't rendered yet — plain text is fine.",
    actorLabel: "Link an organizer or event (optional)",
    actorHelp: "Tie this discussion to a directory entry so others can find it.",
    actorNone: "Not linked to a specific one",
    createSubmit: "Post discussion",
    creating: "Posting…",

    // Errors + validation
    errTitle: "Please write a title (6–160 characters).",
    errBody: "Please write your post (at least 20 characters).",
    errCategory: "Please choose a category.",
    errAuth: "Please log in to post.",
    errGeneric: "Something went wrong. Please try again.",
    errNetwork: "Network error. Please try again.",
    errCaptcha: "Please complete the anti-robot check, then try again.",
    errRateLimited: "You're posting too often. Please wait a bit and try again.",
    errConfirmEmail:
      "Please confirm your email before posting. Check your inbox for the confirmation link.",

    // Relative time (unit words; the number is prepended by the formatter)
    justNow: "just now",
  },

  // ── Accounts / auth ─────────────────────────────────────────────────────────
  auth: {
    // Shared field labels
    emailLabel: "Email",
    emailPlaceholder: "you@example.com",
    emailHelp: "Private. Used only to sign in and to verify you — never shown, never shared.",
    passwordLabel: "Password",
    passwordPlaceholder: "At least 8 characters",
    handleLabel: "Username",
    handleHelp:
      "Your public username in the community. Lowercase letters, numbers, and underscores; 3–24 characters. This is all anyone sees — your email stays private.",
    handlePlaceholder: "e.g. weekend_builder",

    // Log in
    loginMetaTitle: "Log in",
    loginTitle: "Log in",
    loginSubtitle: "Welcome back. Log in to post in the community.",
    loginSubmit: "Log in",
    loginSubmitting: "Logging in…",
    noAccountPrompt: "New here?",
    signUpLink: "Create an account",

    // Sign up
    signupMetaTitle: "Create an account",
    signupTitle: "Create an account",
    signupSubtitle:
      "Pick a username and you're in. You stay pseudonymous — your email is never shown, so you can speak honestly without an organizer coming after you.",
    signupSubmit: "Create account",
    signupSubmitting: "Creating…",
    haveAccountPrompt: "Already have an account?",
    loginLink: "Log in",

    // Outcomes
    confirmEmailHeading: "Check your email",
    confirmEmailBody:
      "We sent you a link to confirm your account. Click it, then come back and log in.",
    privacyNote:
      "Your email is private and never shown. Your username is your public identity.",

    // Errors
    errEmail: "Please enter a valid email.",
    errPassword: "Password must be at least 8 characters.",
    errHandle:
      "Username must be 3–24 characters: lowercase letters, numbers, and underscores.",
    errHandleTaken: "That username is taken. Try another.",
    errInvalidCredentials: "Wrong email or password.",
    errEmailInUse: "That email already has an account. Try logging in.",
    errGeneric: "Something went wrong. Please try again.",
    errNetwork: "Network error. Please try again.",
    errCaptcha: "Please complete the anti-robot check, then try again.",
    errDisposableEmail:
      "Please use a permanent email address. Temporary or disposable email services aren't allowed.",
    errRateLimited: "You're doing that too often. Please wait a bit and try again.",
    errResetLinkInvalid:
      "This reset link is invalid or has expired. Please request a new one.",

    // Password reset — request a link
    forgotPasswordLink: "Forgot your password?",
    resetMetaTitle: "Reset your password",
    resetTitle: "Reset your password",
    resetSubtitle:
      "Enter your email and we'll send you a link to set a new password.",
    resetSubmit: "Send reset link",
    resetSubmitting: "Sending…",
    resetSentHeading: "Check your email",
    resetSentBody:
      "If an account exists for that email, we've sent a link to reset your password. It expires in an hour.",
    resetBackToLogin: "Back to log in",

    // Password reset — set a new password
    newPasswordMetaTitle: "Set a new password",
    newPasswordTitle: "Set a new password",
    newPasswordSubtitle: "Choose a new password for your account.",
    newPasswordLabel: "New password",
    newPasswordSubmit: "Update password",
    newPasswordSubmitting: "Updating…",
    newPasswordSuccessHeading: "Password updated",
    newPasswordSuccessBody:
      "Your password has been changed. You can now use it to log in.",

    // Confirmation / reset link error page
    confirmErrorTitle: "This link didn't work",
    confirmErrorBody:
      "The confirmation or reset link is invalid or has expired. Try logging in, or request a new link below.",
  },

  // ── Account page ────────────────────────────────────────────────────────────
  account: {
    navLink: "Account",
    metaTitle: "Your account",
    title: "Your account",
    signedInAs: "Signed in as",
    publicHandle: "Username",
    privateEmail: "Private email (never shown)",
    memberSince: (date: string) => `Member since ${date}`,
    signOut: "Log out",
    myThreads: "Your discussions",
    noThreads: "You haven't started any discussions yet.",
    startOne: "Start one",
    reputation: "Reputation",
    viewProfile: "View public profile",
    moderation: "Moderation queue",
  },

  // ── Public profile / reputation ─────────────────────────────────────────────
  profile: {
    metaTitle: (handle: string) => `${handle}`,
    metaDescription: (handle: string) =>
      `${handle}'s activity on the HackHonest community.`,
    notFound: "That member doesn't exist.",
    reputation: "Reputation",
    memberSince: (date: string) => `Member since ${date}`,
    discussionsStarted: (n: number) =>
      `${n} ${n === 1 ? "discussion" : "discussions"} started`,
    repliesPosted: (n: number) => `${n} ${n === 1 ? "reply" : "replies"} posted`,
    threadsHeading: "Discussions",
    noThreads: "No discussions yet.",
  },

  // ── Organizer claim + right-of-reply ────────────────────────────────────────
  claim: {
    metaTitle: (name: string) => `Claim ${name}`,
    title: (name: string) => `Claim ${name}`,
    intro:
      "If you represent this organizer, claim this page so you can reply to reviews. You can respond in public, but you can never delete a review.",
    loginToClaim: "Log in to claim this page",
    emailNote: (email: string) =>
      `We'll record your account email (${email}) so a human can verify you represent this organizer.`,
    domainMatch: (domain: string) =>
      `Your email domain matches ${domain}, so your claim should be approved quickly.`,
    domainNoMatch:
      "Your account email doesn't match the website domain, so your claim will go to manual review.",
    submit: "Submit claim",
    submitting: "Submitting…",
    successHeading: "Claim submitted",
    successBody:
      "We'll verify that you represent this organizer, then you'll be able to reply to reviews here.",
    pending: "Your claim for this page is pending review.",
    claimedByYou: "You manage this page — you can reply to reviews below.",
    claimedBadge: "Claimed",
    claimedByName: (handle: string) => `Claimed by ${handle}`,
    replyCta: "Reply as the organizer",
    replyHeading: "Your response",
    replyPlaceholder:
      "Respond to this review. State the facts. You can't delete the review, only add your side.",
    replySubmit: "Post reply",
    replySubmitting: "Posting…",
    errAuth: "Please log in first.",
    errActor: "Unknown organizer.",
    errAlready: "You've already submitted a claim for this page.",
    errReplyBody: "Please write a reply (2–5000 characters).",
    errReplyDenied: "Only a verified owner of this page can reply.",
    errGeneric: "Something went wrong. Please try again.",
  },

  // ── Admin moderation queue ──────────────────────────────────────────────────
  moderate: {
    metaTitle: "Moderation",
    title: "Moderation queue",
    subtitle:
      "Approve or reject what the community submits — reviews, directory entries, and organizer page claims.",
    allClear: "Nothing pending — you're all caught up.",
    reviewsHeading: (n: number) => `Pending reviews (${n})`,
    suggestionsHeading: (n: number) => `Pending directory entries (${n})`,
    claimsHeading: (n: number) => `Pending page claims (${n})`,
    approve: "Approve",
    reject: "Reject",
    reviewFor: (name: string) => `Review of ${name}`,
    reviewForUnknown: "Review (no linked entry)",
    byAuthor: (author: string) => `by ${author}`,
    anon: "anonymous",
    proofLabel: "Attendance proof",
    contactLabel: "Private contact",
    claimHeadline: (handle: string, name: string) => `${handle} claims ${name}`,
    domainMatches: "account email matches the website domain",
    domainNoMatch: "email domain does not match the website",
    sourceLabel: "Source link",
    submittedByLabel: "Submitted by",

    // Moderator capability notice (shown to moderators, not admins)
    modNoticeTitle: "You're a moderator",
    modNoticeBody:
      "You can approve or reject items that are still pending. You can't undo a decision once it's made, delete anything, or manage the team — those stay with an admin.",

    // Team management (admin-only)
    team: {
      heading: "Team",
      subtitle:
        "Admins have full control. Moderators can approve or reject pending items and nothing else.",
      empty: "No teammates yet. Add one below.",
      you: "you",
      unknownUser: "unknown account",
      roleAdmin: "Admin",
      roleModerator: "Moderator",
      makeAdmin: "Make admin",
      makeModerator: "Make moderator",
      remove: "Remove",
      confirmRemove: (who: string) => `Remove ${who} from the team?`,
      addTitle: "Add a teammate",
      usernameLabel: "Username",
      usernamePlaceholder: "their username",
      roleLabel: "Role",
      addButton: "Add",
      addedOk: (who: string, role: string) => `Added ${who} as ${role}.`,
      errNoHandle: "Enter a username.",
      errNotFound: "No account with that username.",
      errFailed: "Couldn't update the team. Please try again.",
    },
  },

  // ── Notifications ───────────────────────────────────────────────────────────
  notifications: {
    navAria: "Notifications",
    metaTitle: "Notifications",
    title: "Notifications",
    empty: "No notifications yet. When someone replies to your discussions, you'll see it here.",
    markAllRead: "Mark all as read",
    threadReply: (handle: string, title: string) =>
      `${handle} replied to your discussion "${title}"`,
    threadReplyNoTitle: (handle: string) => `${handle} replied to your discussion`,
  },
};
