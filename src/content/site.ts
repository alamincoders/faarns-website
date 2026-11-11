/**
 * FAARNS site content.
 * Edit copy, prices, services and FAQs here. Every page reads from this file.
 * Keep US English, USD, and "Book a 30-minute call" as the one CTA.
 */

export const settings = {
  /** Calendly / Cal.com link. Every "Book a 30-minute call" button uses it. Empty = buttons go to /contact. */
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL ?? "",
  ctaLabel: "Book a 30-minute call",
  tagline: "AI automation and growth, under one roof.",
  /** First-visit loading animation (logo + counter). */
  preloader: true,
};

export const nav = [
  { label: "How we work", href: "/#how" },
  { label: "AI automation", href: "/services/ai-agents" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/#work" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const home = {
  eyebrow: "AI automation + growth, under one roof",
  headline: ["We automate the work.", "Then we grow the business."],
  subhead:
    "FAARNS builds AI agents and automations that answer leads, run operations and cut busywork, plus the website, search and ads that bring in more customers. One team. Built around how you already work.",
  secondaryCta: { label: "See how we deliver", href: "/#automate" },
  proof: { count: 50, text: "startups and growing brands across the US, UK, Europe and Asia." },
  flow: {
    title: "An AI sales agent, start to finish",
    steps: [
      { title: "New lead arrives", text: "Website form, WhatsApp or email", status: "New lead from your website form" },
      { title: "Agent replies in seconds", text: "From your approved info only", status: "AI agent is replying" },
      { title: "Lead scored, CRM updated", text: "Your team gets a Slack alert", status: "Scoring the lead and updating your CRM" },
      { title: "Call booked", text: "Straight into your calendar", status: "Call booked in your calendar" },
    ],
    doneStatus: "Done. Ready for the next lead",
  },
  stack: {
    label: "The AI and growth stack we build on, and train your team to use.",
    tools: ["OpenAI", "Anthropic", "Google Gemini", "n8n", "Make", "Zapier", "HubSpot", "WhatsApp", "Next.js", "Shopify"],
  },
  difference: {
    label: "Why FAARNS",
    headline: "Everyone builds websites. We build systems that work while you sleep.",
    body: "Any agency can redesign your site. Very few can wire AI into your sales, support and operations, then make sure it actually runs. We do both, so your growth doesn’t stop at a pretty homepage.",
  },
  automate: {
    label: "How we deliver",
    headline: "Real AI systems and digital growth built for real business outcomes.",
    cards: [
      {
        team: "Web & Platforms",
        tagline: "Modern websites built to convert visitors into paying clients.",
        bullets: [
          "High-converting, responsive layout",
          "Blazing-fast Next.js architecture",
          "Seamless CRM & tool integrations",
          "Engineered for scalable growth",
        ],
        image: "/services/custom-web-solutions.png",
        href: "/services/web-design",
      },
      {
        team: "Product Design",
        tagline: "Clean, intuitive user experiences that customers love using.",
        bullets: [
          "Interactive Figma prototypes",
          "Frictionless user journey flows",
          "Mobile-first design systems",
          "Polished, accessible UI components",
        ],
        image: "/services/ui-ux-design.png",
        href: "/services/web-design",
      },
      {
        team: "AI Automation",
        tagline: "Cut the busywork and let intelligent systems handle the routine.",
        bullets: [
          "24/7 AI lead qualification & booking",
          "Automated invoicing & team reports",
          "Smart data sync across all your tools",
          "Seamless human handoff on demand",
        ],
        image: "/services/aeo.png",
        href: "/services/ai-agents",
      },
      {
        team: "Search & Growth",
        tagline: "Get found on Google and cited by ChatGPT, Perplexity, and Claude.",
        bullets: [
          "Optimized for conversational AI queries",
          "High-intent organic search rankings",
          "Technical audits & Core Web Vitals",
          "Consistent inbound buyer pipeline",
        ],
        image: "/services/seo.png",
        href: "/services/seo",
      },
      {
        team: "Brand Identity",
        tagline: "Look like the market leader your company is growing into.",
        bullets: [
          "Distinct logo & visual identity",
          "Clear brand voice & style guide",
          "Polished digital & pitch assets",
          "Differentiated market positioning",
        ],
        image: "/services/brand.png",
        href: "/services/brand",
      },
    ],
  },
  growth: {
    label: "Then we grow it",
    headline: "The website, search and ads that feed the machine.",
    rows: [
      {
        title: "Website",
        text: "A site that sells, built to plug into your automations.",
        href: "/services/web-design",
        image: "/services/custom-web-solutions.png",
      },
      {
        title: "Search",
        text: "Found on Google. Quoted by AI.",
        href: "/services/seo",
        image: "/services/seo.png",
      },
      {
        title: "Ads",
        text: "Every dollar tracked to revenue.",
        href: "/services/paid-ads",
        image: "/services/paid-ads.png",
      },
      {
        title: "Brand",
        text: "Look like the company you’re becoming.",
        href: "/services/brand",
        image: "/services/brand.png",
      },
    ],
  },
  services: {
    label: "Services",
    headline: "Everything between the first click and the finished task.",
    integrations: { title: "Works inside the tools your team already uses.", text: "CRM, email, WhatsApp, Slack, sheets, payments, booking and 100+ more." },
  },
  work: {
    label: "Work",
    headline: "What it looks like when it sticks.",
    /** Add `image: "/work/presio.jpg"` (file in /public/work) and `href` when you have them. */
    cases: [
      { client: "Presio", sector: "SaaS", result: "Branded quotes in minutes, not hours." },
      { client: "Dropout Skool", sector: "Education", result: "A learning platform students actually finish." },
      { client: "Al Majlis Arabian", sector: "Hospitality", result: "From menu browse to booked table in three taps." },
    ] as { client: string; sector: string; result: string; image?: string; href?: string }[],
  },
  pricing: { label: "Pricing", headline: ["Start small. Prove it.", "Then grow."] },
  faqLabel: "FAQ",
  faqHeadline: "Good questions. Straight answers.",
};

export const workProcess = {
  label: "How we work",
  headline: "Four steps. One partner. No guesswork.",
  steps: [
    { title: "Assess", text: "We map your workflows, site and funnel, and find where AI and automation pay off first.", get: "a prioritized plan in week one" },
    { title: "Build", text: "We ship working agents, automations and pages inside the tools you already use.", get: "your first automation live in 2 to 4 weeks" },
    { title: "Train", text: "Short, role-based sessions and playbooks so your team runs it without us.", get: "a team that trusts the system" },
    { title: "Grow & support", text: "We monitor, tune and expand every month.", get: "a monthly review and the next thing to automate" },
  ],
};

export type Service = {
  slug: string; name: string; group: string; tagline: string;
  headline: string; subhead: string; problem: string | null; problemLabel: string;
  deliverables: string[]; results: string;
  price: { amount: string; label: string; timeline: string; note: string };
  faq: { q: string; a: string }[];
};

export const services: Service[] = [
  {
    "slug": "ai-agents",
    "name": "AI agents",
    "group": "AI automation",
    "tagline": "Answer leads and support customers, 24/7.",
    "headline": "AI that does the work, not just the talking.",
    "subhead": "Custom AI agents that answer leads, support customers and update your systems, 24/7, inside rules you set.",
    "problem": "Leads wait hours for a reply. Your team answers the same 20 questions every day. Good people spend half their week on copy-paste.",
    "problemLabel": "The problem",
    "deliverables": [
      "Sales agents that qualify and book calls",
      "Support agents on website, WhatsApp, email and voice",
      "Internal agents that pull reports and update your CRM",
      "Trained on your docs, prices and tone",
      "Human handoff and approval steps",
      "Logs of every action"
    ],
    "results": "First agent live in 2 to 4 weeks. Replies in seconds, not hours.",
    "price": {
      "amount": "$3,000",
      "label": "Starting price",
      "timeline": "First agent live in 2 to 4 weeks",
      "note": "Extra agents from $2,000. Monitoring and upkeep from $300/month."
    },
    "faq": [
      {
        "q": "Will it make things up?",
        "a": "Agents answer only from your approved info, and pass anything unclear to a person."
      },
      {
        "q": "Is it safe to let AI talk to customers?",
        "a": "Yes, with guardrails. Agents follow your rules, and hand off to a person when unsure."
      },
      {
        "q": "Does my team need to be technical?",
        "a": "No. We build inside your tools and train your team in plain English."
      }
    ]
  },
  {
    "slug": "workflow-automation",
    "name": "Workflow automation",
    "group": "AI automation",
    "tagline": "Data, tasks and follow-ups that move on their own.",
    "headline": "Less chasing. Fewer spreadsheets.",
    "subhead": "We connect your tools so data, tasks and follow-ups move on their own.",
    "problem": "Your business runs on people moving data between apps. It’s slow, and things slip.",
    "problemLabel": "The problem",
    "deliverables": [
      "Process mapping",
      "Automations in n8n, Make or Zapier, or custom code",
      "CRM and sales pipeline automation",
      "Onboarding, invoicing and reporting flows",
      "Alerts when something breaks",
      "Docs your team can follow"
    ],
    "results": "Hours back every week, fewer dropped balls, and a clear view of what saved what.",
    "price": {
      "amount": "$3,000",
      "label": "Starting price",
      "timeline": "Live in 2 to 4 weeks",
      "note": "One workflow built inside your tools, with team training."
    },
    "faq": [
      {
        "q": "What can you actually automate?",
        "a": "Lead replies, follow-ups, booking, support, onboarding, invoicing, reporting and data entry between tools. If a person does it the same way every day, we can likely automate it."
      },
      {
        "q": "Does my team need to be technical?",
        "a": "No. We build inside your tools and train your team in plain English."
      },
      {
        "q": "How fast will I see results?",
        "a": "First automation in 2 to 4 weeks. Sites in 4 to 8 weeks. Ads in 14 to 30 days. SEO over 3 to 6 months."
      }
    ]
  },
  {
    "slug": "ai-strategy",
    "name": "AI strategy & readiness",
    "group": "AI automation",
    "tagline": "Know where AI pays off before you spend.",
    "headline": "Know where AI pays off before you spend a dollar.",
    "subhead": "A fixed-price assessment that maps your workflows and ranks what to automate first.",
    "problem": "If AI isn’t worth it for you yet, the report will say so.",
    "problemLabel": "Honest line",
    "deliverables": [
      "Workflow and tool audit",
      "Top opportunities ranked by time and money saved",
      "Tool recommendations",
      "Build plan with costs",
      "Team training plan"
    ],
    "results": "A clear plan in 7 days. The fee is credited to your first build.",
    "price": {
      "amount": "$750",
      "label": "Fixed price",
      "timeline": "Plan in 7 days",
      "note": "The fee is credited to your first build."
    },
    "faq": [
      {
        "q": "We’ve never used AI. Where do we start?",
        "a": "With the audit. We find one workflow that pays off fast and build that first."
      },
      {
        "q": "What does it cost to start?",
        "a": "Audits from $750. See pricing for details."
      },
      {
        "q": "What’s an AI agent?",
        "a": "Software that reads, decides and acts, like answering a customer or updating your CRM, inside rules you set."
      }
    ]
  },
  {
    "slug": "web-design",
    "name": "Web design & development",
    "group": "Growth",
    "tagline": "A site that sells, built to plug into your automations.",
    "headline": "A website that sells while you sleep.",
    "subhead": "Fast, secure, conversion-led sites on Next.js, Webflow or Shopify. Built to bring in leads, not just to look good.",
    "problem": "Most sites look fine and do nothing. Slow pages, vague messaging, no clear next step.",
    "problemLabel": "The problem",
    "deliverables": [
      "Conversion-led page structure",
      "Core Web Vitals in the green",
      "CMS your team can edit",
      "E-commerce and payments",
      "CRM, booking and API integrations",
      "Analytics and event tracking from day one"
    ],
    "results": "Live in 4 to 8 weeks. Faster pages, clearer paths, more enquiries.",
    "price": {
      "amount": "$2,500",
      "label": "Starting price",
      "timeline": "Live in 4 to 8 weeks",
      "note": "Up to 8 pages. Custom or e-commerce from $6,000. Extra landing pages from $400."
    },
    "faq": [
      {
        "q": "Which platform should I use?",
        "a": "We’ll recommend one on the call, based on your team and budget."
      },
      {
        "q": "Do you still build websites and do SEO?",
        "a": "Yes. Automation works best with a site and search presence that bring in demand."
      },
      {
        "q": "How fast will I see results?",
        "a": "First automation in 2 to 4 weeks. Sites in 4 to 8 weeks. Ads in 14 to 30 days. SEO over 3 to 6 months."
      }
    ]
  },
  {
    "slug": "ui-ux",
    "name": "UI/UX design",
    "group": "Growth",
    "tagline": "Products people get on the first try.",
    "headline": "Products people get on the first try.",
    "subhead": "Research-backed UX and clean UI for websites, SaaS and apps.",
    "problem": "Confusing flows quietly kill signups and sales.",
    "problemLabel": "The problem",
    "deliverables": [
      "User flows and wireframes",
      "Clickable Figma prototypes",
      "Usability testing",
      "Design system and components",
      "Dev-ready handoff"
    ],
    "results": "Fewer drop-offs, faster builds, a design system that scales.",
    "price": {
      "amount": "$3,000",
      "label": "Starting price",
      "timeline": "Scoped on the call",
      "note": "UI/UX for product: SaaS, apps and complex flows."
    },
    "faq": [
      {
        "q": "Does my team need to be technical?",
        "a": "No. We build inside your tools and train your team in plain English."
      },
      {
        "q": "How fast will I see results?",
        "a": "First automation in 2 to 4 weeks. Sites in 4 to 8 weeks. Ads in 14 to 30 days. SEO over 3 to 6 months."
      },
      {
        "q": "What does it cost to start?",
        "a": "Audits from $750. See pricing for details."
      }
    ]
  },
  {
    "slug": "seo",
    "name": "SEO",
    "group": "Growth",
    "tagline": "Found on Google. Month after month.",
    "headline": "Found on Google. Month after month.",
    "subhead": "Technical SEO, content and links that compound, so you stop paying for every click.",
    "problem": "Great product, page five of Google.",
    "problemLabel": "The problem",
    "deliverables": [
      "Technical audit and fixes",
      "Keyword and topic strategy",
      "On-page optimization",
      "Content that ranks",
      "Quality link building",
      "Local SEO",
      "Monthly reporting in plain English"
    ],
    "results": "Early wins in 6 to 8 weeks, compounding growth over 3 to 6 months.",
    "price": {
      "amount": "$2,000/mo",
      "label": "Growth Partner",
      "timeline": "Early wins in 6 to 8 weeks",
      "note": "Runs inside the Growth Partner retainer, alongside your automations."
    },
    "faq": [
      {
        "q": "How fast will I see results?",
        "a": "First automation in 2 to 4 weeks. Sites in 4 to 8 weeks. Ads in 14 to 30 days. SEO over 3 to 6 months."
      },
      {
        "q": "Do you still build websites and do SEO?",
        "a": "Yes. Automation works best with a site and search presence that bring in demand."
      },
      {
        "q": "What does it cost to start?",
        "a": "Audits from $750. See pricing for details."
      }
    ]
  },
  {
    "slug": "aeo",
    "name": "AEO (AI search visibility)",
    "group": "Growth",
    "tagline": "Quoted by AI. Chosen by buyers.",
    "headline": "Quoted by AI. Chosen by buyers.",
    "subhead": "Get your business named in ChatGPT, Perplexity, Gemini and Google AI Overviews.",
    "problem": "Your buyers ask AI first. If it doesn’t know you, you’re not on the shortlist.",
    "problemLabel": "The problem",
    "deliverables": [
      "AI visibility audit",
      "Entity and brand optimization",
      "Schema markup",
      "Answer-ready content",
      "Mentions on sources AI trusts",
      "Monthly AI citation tracking"
    ],
    "results": "A clear baseline in week two, and a monthly view of where AI mentions you.",
    "price": {
      "amount": "$2,000/mo",
      "label": "Growth Partner",
      "timeline": "Baseline in week two",
      "note": "Runs inside the Growth Partner retainer, alongside your automations."
    },
    "faq": [
      {
        "q": "Do you still build websites and do SEO?",
        "a": "Yes. Automation works best with a site and search presence that bring in demand."
      },
      {
        "q": "How fast will I see results?",
        "a": "First automation in 2 to 4 weeks. Sites in 4 to 8 weeks. Ads in 14 to 30 days. SEO over 3 to 6 months."
      },
      {
        "q": "What does it cost to start?",
        "a": "Audits from $750. See pricing for details."
      }
    ]
  },
  {
    "slug": "paid-ads",
    "name": "Paid ads",
    "group": "Growth",
    "tagline": "Every dollar tracked to revenue.",
    "headline": "Every dollar tracked. Every test counted.",
    "subhead": "Google, Meta and LinkedIn campaigns tied to pipeline, not vanity metrics.",
    "problem": "Ad spend goes up. Leads don’t.",
    "problemLabel": "The problem",
    "deliverables": [
      "Account audit",
      "Tracking and conversion setup",
      "Audience and creative testing",
      "Landing pages built to convert",
      "Budget optimization",
      "Weekly reports in plain English"
    ],
    "results": "First signals in 14 to 30 days. Clear cost-per-lead from month one.",
    "price": {
      "amount": "$2,000/mo",
      "label": "Growth Partner",
      "timeline": "First signals in 14 to 30 days",
      "note": "Runs inside the Growth Partner retainer. Ad spend is billed separately."
    },
    "faq": [
      {
        "q": "How fast will I see results?",
        "a": "First automation in 2 to 4 weeks. Sites in 4 to 8 weeks. Ads in 14 to 30 days. SEO over 3 to 6 months."
      },
      {
        "q": "What does it cost to start?",
        "a": "Audits from $750. See pricing for details."
      },
      {
        "q": "Where are you based?",
        "a": "Our team works across North America, Europe and Asia, in your time zone."
      }
    ]
  },
  {
    "slug": "brand",
    "name": "Brand identity",
    "group": "Growth",
    "tagline": "Look like the company you’re becoming.",
    "headline": "Look like the company you’re becoming.",
    "subhead": "Logo, visual system and voice that make you look as good as your product.",
    "problem": null,
    "problemLabel": "The problem",
    "deliverables": [
      "Brand strategy and positioning",
      "Logo and wordmark",
      "Color, type and visual system",
      "Voice and messaging",
      "Brand guidelines",
      "Social and pitch-deck templates"
    ],
    "results": "A full brand in 3 to 5 weeks, ready for your new site.",
    "price": {
      "amount": "$1,500",
      "label": "Starting price",
      "timeline": "A full brand in 3 to 5 weeks",
      "note": "Strategy, logo, visual system, voice and guidelines."
    },
    "faq": [
      {
        "q": "What does it cost to start?",
        "a": "Audits from $750. See pricing for details."
      },
      {
        "q": "Where are you based?",
        "a": "Our team works across North America, Europe and Asia, in your time zone."
      },
      {
        "q": "How fast will I see results?",
        "a": "First automation in 2 to 4 weeks. Sites in 4 to 8 weeks. Ads in 14 to 30 days. SEO over 3 to 6 months."
      }
    ]
  }
];

export const pricing = {
  headline: ["Start small. Prove it.", "Then grow."],
  subhead: "Clear starting prices. Fixed scopes. No surprise invoices.",
  ladderLabel: "The path most clients take",
  ladderHeadline: "Three steps, each one paying for the next.",
  ladder: [
    { step: "Step 1", name: "AI & Growth Audit", prefix: "", amount: "$300", suffix: " fixed", tagline: "Know exactly what to automate and fix first.", includes: ["Workflow, site, SEO and funnel review", "Ranked list of automations", "90-day plan", "Delivered in 7 days", "Credited to your first build"], cta: "Start with an audit", highlight: false },
    { step: "Step 2", name: "Automation Quick Win", prefix: "from ", amount: "$2,000", suffix: "", tagline: "One workflow, live and paying off.", includes: ["One AI agent or automation", "Built inside your tools", "Team training", "Live in 2 to 4 weeks"], cta: "Automate my first workflow", highlight: false },
    { step: "Step 3", name: "Growth Partner", prefix: "from ", amount: "$1399", suffix: "/mo", tagline: "Your AI and growth team, on retainer.", includes: ["Ongoing automation builds and tuning", "Plus SEO, AEO or ads (ad spend separate)", "Monthly review", "Cancel with 30 days’ notice"], cta: "See the Growth Partner plan", highlight: true },
  ],
  tableLabel: "Every service",
  tableHeadline: "Pricing by service.",
  addOns: [
    { name: "Extra AI agent", amount: "$2,000", monthly: false, timeline: "Once your first agent is live", note: "Add another agent to sales, support or operations.", slug: "ai-agents" },
    { name: "Agent monitoring and upkeep", amount: "$300/mo", monthly: true, timeline: "Monthly", note: "We watch, tune and fix your agents so they keep running.", slug: "ai-agents" },
    { name: "Extra landing page", amount: "$400", monthly: false, timeline: "Per page", note: "Campaign or service pages that match your site.", slug: "web-design" },
    { name: "Site care plan", amount: "$150/mo", monthly: true, timeline: "Monthly", note: "Updates, backups, fixes and small changes.", slug: "web-design" },
  ],
  promisesLabel: "What you can count on",
  promisesHeadline: "No surprises, in writing.",
  promises: [
    { title: "Audit fee credited", text: "Your $750 audit is credited to your first build." },
    { title: "Tools billed at cost", text: "AI model and tool subscriptions (e.g. OpenAI, n8n) are billed at cost, so you always know what you pay for." },
    { title: "Paid in stages", text: "Projects are paid in stages: kickoff, sign-off, build, launch." },
    { title: "No lock-in", text: "Growth Partner cancels with 30 days’ notice. You own everything we build." },
  ],
  closer: { headline: "Not sure which fits?", subhead: "Book a 30-minute call and we’ll tell you honestly." },
};

export const faqs = {
  home: [
    { q: "What can you actually automate?", a: "Lead replies, follow-ups, booking, support, onboarding, invoicing, reporting and data entry between tools. If a person does it the same way every day, we can likely automate it." },
    { q: "What’s an AI agent?", a: "Software that reads, decides and acts, like answering a customer or updating your CRM, inside rules you set." },
    { q: "We’ve never used AI. Where do we start?", a: "With the audit. We find one workflow that pays off fast and build that first." },
    { q: "Does my team need to be technical?", a: "No. We build inside your tools and train your team in plain English." },
    { q: "Is it safe to let AI talk to customers?", a: "Yes, with guardrails. Agents follow your rules, and hand off to a person when unsure." },
    { q: "Do you still build websites and do SEO?", a: "Yes. Automation works best with a site and search presence that bring in demand." },
    { q: "How fast will I see results?", a: "First automation in 2 to 4 weeks. Sites in 4 to 8 weeks. Ads in 14 to 30 days. SEO over 3 to 6 months." },
    { q: "Where are you based?", a: "Our team works across North America, Europe and Asia, in your time zone." },
    { q: "What does it cost to start?", a: "Audits from $750. See pricing for details." },
  ],
  pricing: [
    { q: "What does it cost to start?", a: "Audits from $750, credited to your first build." },
    { q: "Why are SEO, AEO and ads monthly?", a: "Search and ads compound over months, so they run inside the Growth Partner retainer, alongside your automations. Ad spend is billed separately." },
    { q: "Are AI tools included in the price?", a: "AI model and tool subscriptions (e.g. OpenAI, n8n) are billed at cost, so you always know what you pay for." },
    { q: "How do payments work?", a: "Projects are paid in stages: kickoff, sign-off, build, launch." },
    { q: "Can I cancel the Growth Partner plan?", a: "Yes, with 30 days’ notice." },
  ],
};

export const closer = {
  headline: "Ready to put AI to work in your business?",
  subhead: "Thirty minutes. Your workflows, our honest take, and a clear first thing to automate.",
  secondary: { label: "See what we’ve built", href: "/#work" },
};

export const about = {
  eyebrow: "About FAARNS",
  headline: "We build the systems behind growing businesses.",
  intro: "FAARNS started with a simple idea: your website should be your best salesperson. Today we’re a distributed team of AI engineers, designers, developers and marketers. We’ve helped 50+ startups and brands automate their work and grow online.",
  beliefsLabel: "What we believe",
  beliefsHeadline: "Four rules we work by.",
  beliefs: [
    { title: "Outcomes over output.", text: "We measure leads and revenue, not pages delivered." },
    { title: "Straight talk.", text: "If something won’t work, we’ll say so before you pay for it." },
    { title: "One team, end to end.", text: "AI automation, web and growth under one roof. No handoffs." },
    { title: "Built to hand over.", text: "You own everything, and your team can run it." },
  ],
  team: { label: "The team", text: "Spread across North America, Europe and Asia,", muted: "so someone’s always awake for you." },
};

export const contact = {
  eyebrow: "Contact",
  headline: "Let’s talk about what’s next.",
  subhead: "Book a 30-minute call or send a message. We reply within one business day.",
  callLabel: "What happens on the call",
  callSteps: ["You share your goals.", "We give our honest take.", "You leave with a clear next step, whether or not you work with us."],
  needs: ["AI automation", "Website", "Search", "Ads", "Brand", "Not sure yet"],
  budgets: ["Audit ($750)", "$1,500 to $3,000", "$3,000 to $6,000", "$6,000+", "Monthly retainer (from $2,000/mo)"],
  button: "Send message",
  success: "Got it. We’ll be in touch within one business day.",
};

export const careers = {
  eyebrow: "Careers",
  headline: ["Do the best work of your career.", "From anywhere."],
  subhead: "We’re a remote team that cares about craft, clear thinking and real results.",
  perksLabel: "Why FAARNS",
  perks: ["Fully remote", "Flexible hours", "Global clients", "Real ownership", "Learning budget"],
  /** Add roles here: { title, team, type, href }. Leave empty to hide the list. */
  roles: [] as { title: string; team: string; type: string; href: string }[],
  closer: { headline: "Don’t see your role? Send us your work anyway.", subhead: "Tell us what you do best and show us something you’re proud of.", cta: "Send us your work" },
};

export const footer = {
  groups: [
    { title: "AI automation", links: [{ label: "AI agents", href: "/services/ai-agents" }, { label: "Workflow automation", href: "/services/workflow-automation" }, { label: "AI strategy", href: "/services/ai-strategy" }] },
    { title: "Growth", links: [{ label: "Websites", href: "/services/web-design" }, { label: "UI/UX design", href: "/services/ui-ux" }, { label: "SEO", href: "/services/seo" }, { label: "AEO", href: "/services/aeo" }, { label: "Paid ads", href: "/services/paid-ads" }, { label: "Brand", href: "/services/brand" }] },
    { title: "Company", links: [{ label: "About", href: "/about" }, { label: "Careers", href: "/careers" }, { label: "Pricing", href: "/pricing" }, { label: "Contact", href: "/contact" }] },
  ],
  /** Add { label: "LinkedIn", href: "https://..." } etc. */
  social: [] as { label: string; href: string }[],
  legal: "© 2026 FAARNS Ltd.",
};
