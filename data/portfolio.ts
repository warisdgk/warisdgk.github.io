/**
 * ============================================================================
 *  PORTFOLIO CONTENT  ‑  your words live here.
 * ============================================================================
 *
 *  Edit the values below. The types guide you: your editor will autocomplete
 *  fields and flag anything missing. To add an experience, copy an existing
 *  object in the `experience` array and change the values. To remove a whole
 *  section, set its toggle to false in config/site.config.ts instead of
 *  deleting content here.
 */

export interface About {
  /** Two or three short paragraphs. Plain sentences read best. */
  paragraphs: string[];
  /** A few quick facts shown beside the text. Keep them scannable. */
  highlights: { label: string; value: string }[];
}

export interface SkillGroup {
  title: string;
  items: string[];
}

export interface Experience {
  role: string;
  company: string;
  /** e.g. "Berlin, Germany" or "Remote". */
  location: string;
  /** e.g. "Jul 2021" */
  start: string;
  /** "Present" for current roles. */
  end: string;
  /** Optional context line, e.g. "via Toptal". */
  via?: string;
  /** Bullet points. Lead with impact where you can. */
  points: string[];
  tech: string[];
}

export interface Project {
  name: string;
  /** Short description, one or two sentences. */
  description: string;
  href: string;
  tech: string[];
  icon?: string;
  /** Optional tag shown on the card, e.g. "Live" or "Open Source". */
  tag?: string;
}

export interface Education {
  degree: string;
  school: string;
  location: string;
  period: string;
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
  href?: string;
}

export interface PortfolioData {
  about: About;
  skills: SkillGroup[];
  experience: Experience[];
  projects: Project[];
  education: Education[];
  certifications: Certification[];
}

export const portfolio: PortfolioData = {
  about: {
    paragraphs: [
      'I’m a Senior **Android Engineer** with a decade of industry experience, currently contributing to e& UAE’s Etisalat Digital App, serving **10M+ users**. Previously, I worked on ImagineArt AI, a large-scale generative AI platform for the creative industry that has processed **2.5+ billion images**. My EMM based enterprise solution DAO/BK, supporting **4,000+ couriers** responsible for **80%** of distribution in Denmark.',
      'My extensive experience in **FinTech** has fundamentally shaped how I engineer software, with a strong emphasis on **security**, **scalability**, **reliability**, **compliance**, and **trust** while navigating the complexities of **financial transactions**, data protection, **fraud prevention**, KYC/AML compliance, and regulatory requirements. I’m open to Senior, Lead, or Staff Engineer roles, remote or hybrid.',
    ],
    highlights: [
      { label: 'Experience', value: '10+ years' },
      { label: 'Focus', value: 'Android, AI' },
      { label: 'Based in', value: 'Islamabad, Pakistan' },
    ],
  },

  skills: [
    {
      title: 'Core Android',
      items: ['Jetpack Compose', 'Android SDK', 'Kotlin', 'Kotlin Coroutines', 'Flow', 'Java','RxJava'],
    },
    {
      title: 'Architecture',
      items: ['MVVM','Clean Architecture', 'SOLID','Design Patterns', 'Modularization', 'Dependency Injection (Koin | Hilt | Dagger)'],
    },
    {
      title: 'Security & Privacy',
      items: [
        'OAUTH 2.0',
        'Certificate Pinning',
        'Key Pinning',
        'BioMetric Prompt',
        'Encrypted Shared Preferences',
        'Play Integrity API',
      ],
    },
    {
      title: 'Testing & Quality',
      items: ['Unit Testing', 'BDD', 'TDD', 'Mockito', 'WireMock', 'Semantics/Compose UI Testing', 'Espresso / Kakao UI Testing'],
    },
    {
      title: 'AI & APIs',
      items: ['Claude', 'Cursor', 'OpenAI  API', 'AI Integration'],
    },
    {
      title: 'CI/CD & DevOps',
      items: ['Fastlane', 'GitHub Actions', 'CircleCI', 'Firebase', 'GooglePlay'],
    },
  ],

  experience: [
    {
      role: 'Senior Android Engineer',
      company: 'e & UAE | Etisalat',
      location: 'Hybrid, Pakistan',
      start: 'April 2024',
      end: 'Present',
      points: [
        'Responsible for overseeing multiple projects under the MOI (Ministry of Interior) track',
        'Integration and management of critical third-party SDKs such as Kofax, facial liveness detection, facial recognition, and OCR',
        "Day to day responsibilities include driving effective bug triage leading the investigation and resolution of performance and security-critical issues",
        "Collaborating closely with cross-functional teams to drive UI/UX decisions, coordinate feature development, code merging, and release management within a trunk-based development and release workflow",
        "Leveraging AI-assisted development tools such as Cursor to improve engineering productivity and accelerate delivery.",
      ],
      tech: [ 'Kofax-SDK','OCR-SDK','Facial-Liveness-SDK','SonarQube','BioMetric Prompt', 'MVVM','WireMock','Mockito','Cursor',"Firebase"],
    },
    {
      role: 'Senior Consultant Mobile',
      company: 'Systems LTD.',
      location: 'On-Site, Pakistan',
      start: 'September 2023',
      end: ' April 2024',
      points: [
        'Led a team of two Android developers in the development and delivery of the Sharjah Executive Council mobile application',
        'Collaborated closely with the on-site mobile team to ensure seamless integration of the complete Support module, streamlining complaint management and support workflows across 40+ government entities.',
        'Owned the UI/UX implementation in accordance with established product design guidelines',
        'Maintained an incremental PR-driven development process, ensuring each contribution aligned with product goals, quality standards, and delivery milestones.',
      ],
      tech: ['Modularization', 'OAUTH2.0', 'Clean Architecture','Hilt | Dagger', 'Kotlin','Kotlin Coroutines','Flow', 'Jetpack Compose'],
    },
    {
      role: 'Senior Android Engineer',
      company: 'Vyro.ai',
      location: 'Remote, Pakistan',
      start: 'Dec 2022',
      end: 'September 2023',
      points: [
        'Responsible for designing and improving core Android architecture across Vyro’s product ecosystem, with a focus on scalability, maintainability, and developer experience.',
        'Worked extensively on in-house libraries, streamlining their integration and consumption across multiple products.',
        'Architected the Authentication Library and contributed to the architecture of the flagship generative AI application, ImagineArt AI.',
        'Introduced a feature flag workflow to enable controlled rollout and experimentation of new features across products.',
        'Drove architectural improvements to enhance application scalability, code cohesion, reusability, and long-term maintainability.',
      ],
      tech: ['Play Integrity API','MVI','Modularization','Kotlin', 'Jetpack Compose','KMP', 'OpenAI APIs','Koin','Kotlin Coroutines','Flow',],
    },
    {
      role: 'Staff Engineer',
      company: 'Scal.io',
      location: 'Remote, San Francisco, USA',
      start: 'August 2021',
      end: 'Dec 2022',
      points: [
        'Worked as a Staff Android Engineer, leading the Android team while overseeing multiple Android projects and driving technical direction across the product portfolio.',
        'Contributed to FinTech-based fractional investment platforms, with a strong focus on KYC/AML processes, regulatory compliance, application security, and secure financial workflows.',
        'Led the migration of CI/CD pipelines from CircleCI to GitHub Actions, leveraging Fastlane to streamline and automate the release process.',
        'introduced an automated bug distribution and notification workflow using Sentry and Slack integration, improving issue visibility, ownership, and response times across the engineering team.',
      ],
      tech: ['GraphQL','Fastlane','CircleCI','Github Actions','Sentry', 'KYC & AML','Encrypted Shared Preferences','Play Integrity API', 'Certificate Pinning','Kotlin','Kotlin Coroutines','Jetpack Compose','Espresso UI / Kakao Testing','Unit Testing','Mockito',],
    },
    {
      role: 'Android Developer',
      company: 'Embrace-IT',
      location: 'Islamabad, Pakistan',
      start: 'August 2019',
      end: 'August 2021',
      points: [
        'Worked on the DAO/BK Android applications, supporting the distribution of newspapers, magazines, packages, and parcels across Denmark.',
        'Served as a frontline developer responsible for resolving production issues, managing releases, and maintaining application stability through Enterprise Mobility Management (EMM).',
        'Improved QR code scanning performance and refactored a major XML parsing module while maintaining zero crash reports.',
        'Developed safety-critical features, including Security Alarm and Rain Detection, to improve courier safety during parcel deliveries.',
        'Also contributed to the development of the company’s in-house EMM solution, CubiLock, supporting device and application management across the courier fleet.',
      ],
      tech: ['Enterprise Mobility Management | EMM', 'ZXing Scanner', 'MVVM','Java', 'RxJava', 'SOAP APIs','Dagger',],
    },
    {
      role: 'Android Developer',
      company: 'Vizteck Solutions',
      location: 'Islamabad, Pakistan',
      start: 'January 2017',
      end: 'August 2019',
      points: [
        'Worked within a fast-paced on-demand startup environment, responsible for developing and shipping multiple MVP applications across diverse markets and service categories, including on-demand grocery delivery, doctor appointments, and ride-hailing platforms inspired by solutions such as Uber and Careem.',
        'Worked closely with clients to understand requirements, iterate rapidly, and deliver production-ready solutions within tight timelines.',
        'Developed reusable, plug-and-play application components to accelerate product delivery across projects.',
        'Also Worked on location-based features including real-time GPS route tracking, Google Maps integration, route correction, and dynamic fare calculation, contributing to reliable and scalable mobility solutions.',
      ],
      tech: ['Twillio', 'Google Maps', 'Git','Firebase Auth','Firebase Push Notifications','Firebase Crashlytics','Firebase Remote Config','MVP','Java','XML Views'],
    },
  ],

  projects: [
    {
      icon: '/projects/ic-etisalat.png',
      name: 'etisalat UAE',
      description:
        'The official etisalat UAE app. Everything etisalat, right in your pocket. Manage your mobile, home internet, devices and more from one simple app. Recharge in seconds, pay bills, unlock deals you wont find anywhere else, and get help around the clock. No queues, no store visits.',
      href: 'https://play.google.com/store/apps/details?id=com.Etisalat.ETIDA&hl=en',
      tech: ['Jetpack Compose', 'Kotlin', 'Java',],
      tag: 'Live on Google Play',
    },
    {
      icon: '/projects/ic-digital-sharjah.png',
      name: 'Digital Sharjah',
      description:
        '“Digital Sharjah” is a unified platform designed to facilitate rapid access to the services provided by the governmental entities of the Emirate of Sharjah.',
      href: 'https://play.google.com/store/apps/details?id=ae.sharjah.ds&hl=en',
      tech: ['Jetpack Compose', 'Kotlin', 'Java',],
      tag: 'Live on Google Play',
    },
    {
      icon: '/projects/ic-imagine-art.png',
      name: 'ImagineArt AI',
      description:
        'Discover the easiest way to create stunning visuals like images, logos, posters, flyers, stickers, and more with the power of Generative AI! Whether it’s for business, personal use, or just for fun, ImagineArt empowers everyone to design anything from anywhere.',
      href: 'https://play.google.com/store/apps/details?id=com.vyroai.aiart&hl=en',
      tech: ['Jetpack Compose', 'Kotlin',],
      tag: 'Live on Google Play',
    },
    {
      icon: '/projects/ic-gokada.png',
      name: 'Gokada superapp',
      description: 'Gokada is an on-demand motorcycle delivery service and food ordering/delivery service available in Lagos, Nigeria.',
      href: 'https://play.google.com/store/apps/details?id=ng.gokada.superapp_client&hl=en&gl=US',
      tech: ['XML Views', 'Jetpack Compose', 'Java', 'Kotlin',],
      tag: 'Live on Google Play',
    },
    {
      icon: '/projects/ic-dao.png',
      name: 'DAO',
      description: 'DAO delivers your parcels, letters, magazines, and newspapers every day, all year round, and always to wherever suits you best - to the kiosk, in the mailbox, or right to your door.',
      href: 'https://dao.as/en/',
      tech: ['Enterprise Mobility Management', 'ScaleFusion', 'Kotlin', 'XML Views',],
      tag: 'Live | EMM Managed',
    },
  ],

  education: [
    {
      degree: 'B.Sc. Software Engineering program',
      school: 'University of Engineering and Technology (UET)',
      location: 'Taxila, Pakistan',
      period: '2012 - 2016',
    },
  ],

  certifications: [
    { name: 'Jetpack Compose Crash course for Android with Kotlin', issuer: 'Udemy', year: '2020', href: 'https://www.udemy.com/certificate/UC-a11efdea-e1a4-43b2-b083-07bcddaeb35b/' },
    { name: 'Cultural Awareness - Middle East', issuer: 'VisionetSystems', year: '2026', href: 'https://www.linkedin.com/in/mwarisdev/overlay/Certifications/456313349/treasury/?profileId=ACoAAAuSGjoBByfVad_I_s5nvneWLQvppWa7f9s' },
    { name: 'GenAI Advance Tech Beyond Prompting', issuer: 'VisionetSystems', year: '2026', href: 'https://www.linkedin.com/in/mwarisdev/overlay/Certifications/456636805/treasury/?profileId=ACoAAAuSGjoBByfVad_I_s5nvneWLQvppWa7f9s'},
    { name: 'Generative AI & Business', issuer: 'VisionetSystems', year: '2026', href: 'https://www.linkedin.com/in/mwarisdev/overlay/Certifications/456241668/treasury/?profileId=ACoAAAuSGjoBByfVad_I_s5nvneWLQvppWa7f9s'},
    { name: 'Generative AI for Everyone', issuer: 'VisionetSystems', year: '2025', href: 'https://www.linkedin.com/in/mwarisdev/overlay/Certifications/456123213/treasury/?profileId=ACoAAAuSGjoBByfVad_I_s5nvneWLQvppWa7f9s' },
    { name: 'Information Security Foundation', issuer: 'VisionetSystems', year: '2024',href: 'https://www.linkedin.com/in/mwarisdev/overlay/Certifications/456046474/treasury/?profileId=ACoAAAuSGjoBByfVad_I_s5nvneWLQvppWa7f9s' },
  ],
};
