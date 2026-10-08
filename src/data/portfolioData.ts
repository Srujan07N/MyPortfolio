/**
 * Centralized, verified portfolio data for Srujan N.
 * CRITICAL DATA INTEGRITY:
 * - No fabricated statistics, no fake years of experience, no fake proficiency percentages.
 * - All metrics are computed programmatically or represent qualitative dashboard information.
 */
import experienceImg from '../assets/Experience.png';
import ppcImg from '../assets/ppc.png';
import sriDurgaImg from '../assets/sridurga.png';
import bhoomiCardImg from '../assets/bhomicard.png';
import shreeDEviImg from '../assets/shreedevi.png';

export interface Project {
  id: string;
  number: string;
  title: string;
  category: string;
  shortDescription: string;
  problem: string;
  solution: string;
  architecture: string;
  technologies: string[];
  features: string[];
  githubUrl: string;
  liveUrl?: string;
  image?: string;
  status: 'Completed' | 'Active';
}

export interface SkillNode {
  id: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'Database' | 'Tools';
  role: string;
  context: string;
  related: string[];
  projectsUsedIn: string[];
  accent?: boolean;
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  description: string;
  highlights: string[];
}

export interface ExperienceItem {
  role: string;
  context: string;
  period: string;
  description: string;
  techStack: string[];
  location?: string;
  image?: string;
  imageLink?: string;
}

export const PROFILE_INFO = {
  name: "Srujan N",
  title: "Full Stack Developer",
  subTitle: "MCA Graduate · Modern Web Architecture · MERN Stack",
  greeting: "I build scalable, modern web applications with clean architecture and thoughtful UX.",
  bio: "Full Stack Developer and MCA graduate with deep focus on the MERN stack (MongoDB, Express.js, React, Node.js). Passionate about architecting scalable REST APIs, implementing robust authentication mechanisms, creating responsive user interfaces, and ensuring high data integrity. Committed to clean code, performance, and building digital tools that solve practical problems.",
  email: "srujann2203@gmail.com",
  github: "https://github.com/Srujan07N",
  linkedin: "https://www.linkedin.com/in/srujan-n-360559285/?isSelfProfile=true",
  status: "Available for work",
  statusMessage: "Open for Full Stack Engineer roles & innovative tech projects",
  location: "Karnataka, India",
  timezone: "Asia/Kolkata (IST)",
};

export const PROJECTS: Project[] = [
  {
    id: "e-voting-system",
    number: "01",
    title: "E-Voting System",
    category: "Security & Governance",
    shortDescription: "A secure and tamper-resistant electronic voting platform with role-based authentication, voter identity verification, real-time ballot counting, and admin-controlled election lifecycle management.",
    problem: "Traditional paper voting and basic online polls suffer from ballot stuffing, lack of audit trails, and poor access control — making them unreliable for credible elections.",
    solution: "Built a full MERN stack e-voting platform with JWT-based voter authentication, atomic vote submission with duplicate-prevention constraints, role-separated admin and voter interfaces, and live result aggregation.",
    architecture: "React frontend with protected route guards for Admin and Voter roles, communicating with a Node.js/Express REST API. MongoDB uses unique index constraints and atomic $inc operators to enforce one-vote-per-voter integrity with zero race conditions.",
    technologies: ["React", "Node.js", "Express.js", "MongoDB", "JWT", "Role-Based Access"],
    features: [
      "JWT-secured voter registration and authentication",
      "Atomic vote submission with duplicate-vote prevention",
      "Admin panel: create elections, manage candidates, open/close polls",
      "Real-time vote tally and result visualization",
      "Role-based access control (Admin vs Voter separation)",
      "Auditable ballot log with timestamp tracking"
    ],
    githubUrl: "https://github.com/Srujan07N/E-VotingSystem",
    status: "Completed"
  },
  {
    id: "powerplate",
    number: "02",
    title: "PowerPlate",
    category: "Full Stack Web App",
    shortDescription: "A full-featured fitness and workout tracking web app enabling users to build training plans, log exercise sets and progressions, and monitor performance history over time.",
    problem: "Fitness enthusiasts lack a streamlined tool to track complex workout splits, log progressive overload, and maintain structured training history without switching between multiple apps or spreadsheets.",
    solution: "Engineered a MERN stack fitness platform where users can create custom training routines, log sets, reps, and weights per session, and review historical performance trends across exercises.",
    architecture: "React SPA with custom state hooks for real-time session logging, backed by a Node.js/Express REST API secured with JWT. MongoDB stores exercise schemas, user routines, and session logs with query indexing for fast history retrieval.",
    technologies: ["React", "Node.js", "Express.js", "MongoDB", "JWT", "Tailwind CSS"],
    features: [
      "Custom training routine and split builder",
      "Real-time set, rep, and weight progression logging per session",
      "JWT authentication with secure user-specific data isolation",
      "Historical exercise log with filters and session timeline",
      "Responsive mobile and desktop interface",
      "Progress tracking across multiple workout categories"
    ],
    githubUrl: "https://github.com/Srujan07N/powerplate",
    status: "Completed"
  },
  {
    id: "pigmy-collection",
    number: "03",
    title: "Pigmy Collection",
    category: "Finance & Management",
    shortDescription: "A digital pigmy (micro-savings) collection management system for tracking daily deposits, member accounts, collection agents, and generated interest — replacing traditional manual ledger workflows.",
    problem: "Pigmy collection agents and cooperative societies manage hundreds of daily micro-deposit transactions manually through paper ledgers, making it error-prone, time-consuming, and difficult to audit or report on.",
    solution: "Developed a MERN stack management system where agents can register members, log daily pigmy collections, track deposit histories, calculate interest, and generate collection summaries — replacing physical registers.",
    architecture: "React frontend with a dashboard for collection agents and an admin overview panel. Express REST API handles CRUD operations for members, deposits, and collection records stored in MongoDB with date-indexed queries for fast reporting.",
    technologies: ["React", "Node.js", "Express.js", "MongoDB", "REST APIs"],
    features: [
      "Member registration and account management",
      "Daily pigmy deposit logging with date and agent tracking",
      "Deposit history and ledger view per member",
      "Collection summary and reporting per agent/period",
      "Interest calculation based on deposit duration",
      "Admin overview dashboard for all agents and collections"
    ],
    githubUrl: "https://github.com/Srujan07N/PigmyCollection",
    status: "Completed"
  },
  {
    id: "poornaprajna-college",
    number: "04",
    title: "Poornaprajna College Website",
    category: "Institutional Web Platform",
    shortDescription: "A fully responsive institutional website for Poornaprajna College, Udupi — an autonomous college affiliated to Mangalore University. Built with a professional dark-maroon aesthetic, rich multi-section layout, and dynamic content.",
    problem: "Poornaprajna College required a modern, professional digital presence that conveys academic credibility, surfaces information across departments, admissions, notices, and placements, while remaining accessible and performant for all users.",
    solution: "Designed and developed a multi-page responsive website with a cohesive brand identity using a dark maroon-gold palette. Implemented dynamic announcement banners, multi-level navigation, admissions CTA, and all institutional sections.",
    architecture: "Static frontend architecture built with Next.js for fast page loads and SEO optimization. Fully responsive across mobile, tablet, and desktop viewports with optimized image assets and semantic HTML5 structure for institutional accessibility standards.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel", "Responsive Design"],
    features: [
      "Multi-level navigation with department and campus sections",
      "Live admission notification banner with year-specific updates",
      "Hero section with institutional tagline and dual CTAs",
      "Autonomous status, NAAC re-accreditation, and affiliation badges",
      "Student & faculty login portals and alumni section",
      "Results lookup, examination, and placement sections",
      "Fully responsive layout across all device breakpoints"
    ],
    githubUrl: "https://github.com/Srujan07N/poornaprajna-college",
    liveUrl: "https://poornaprajna-college.vercel.app/",
    image: ppcImg,
    status: "Active"
  },
  {
    id: "sri-durga-properties",
    number: "05",
    title: "Sri Durga Properties",
    category: "Business Landing Page",
    shortDescription: "A premium dark-themed real-estate business website for Sri Durga Properties, showcasing commercial, residential, agricultural and coffee estate properties across Karnataka with an elegant gold accent identity.",
    problem: "Sri Durga Properties needed a high-trust digital presence to attract premium land buyers and sellers across Karnataka, with clear sections for property exploration, services, gallery, and direct contact — while projecting a luxury brand image.",
    solution: "Designed a sleek full-page landing site with a cinematic hero section, multi-section navigation (Home, About, Properties, Services, Gallery, Contact), gold-black luxury palette, and prominent dual CTAs — 'Explore Properties' and 'Sell Your Property'.",
    architecture: "Static site built with Next.js for zero-latency page loads and optimal SEO. Elegant typography with serif display fonts, optimized image assets, a live WhatsApp chat widget, and fully responsive layout for mobile and desktop clients.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel", "Responsive Design"],
    features: [
      "Cinematic dark hero with gold serif typography and tagline",
      "Multi-section navigation: Properties, Services, Gallery, Contact",
      "Dual CTA buttons — Explore Properties & Sell Your Property",
      "Luxury gold-on-black brand identity with custom logo",
      "Integrated live WhatsApp chat widget for instant enquiries",
      "Fully responsive design for all screen sizes",
      "SEO-optimized structure for local property searches"
    ],
    githubUrl: "https://github.com/Srujan07N/durga-properties",
    liveUrl: "https://durga-properties-delta.vercel.app/",
    image: sriDurgaImg,
    status: "Active"
  },
  {
    id: "bhoomi-cards",
    number: "06",
    title: "Bhoomi Cards",
    category: "Business Landing Page",
    shortDescription: "An elegant wedding invitation showcase website for Bhoomi Cards (Est. 2011), Sultanpete — featuring premium collections including Royal Velvet Boxes, Temple Folios and Frosted Acrylic Suites with a warm ivory-maroon brand aesthetic.",
    problem: "Bhoomi Cards, a 15+ year-old wedding invitation brand, required a refined digital storefront to showcase their bespoke collections, convey craftsmanship heritage, and make it easy for customers to explore products and reach the Sultanpete showroom.",
    solution: "Built a sophisticated multi-section website with a cream-maroon-gold palette that reflects the brand's celebration heritage. Includes product collections, services, gallery, showroom experience section, WhatsApp integration, and rich typographic hierarchy.",
    architecture: "Next.js static site architecture with SEO-first structure, optimized imagery, and elegant serif + sans-serif typography pairing. WhatsApp CTA button for direct customer engagement and responsive layout covering mobile through desktop.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel", "Responsive Design"],
    features: [
      "Hero section with split layout — tagline and featured invitation card",
      "Collections menu: Wedding, Engagement, Reception, Traditional, Special",
      "15+ years of craftsmanship credibility section with trust stats",
      "Premium product showcases: Royal Velvet, Temple Folio, Acrylic Suites",
      "Gallery, Services, and Sultanpete Showroom Experience sections",
      "WhatsApp Us CTA for direct customer communication",
      "Cream-maroon-gold luxury palette with refined serif typography"
    ],
    githubUrl: "https://github.com/Srujan07N/bhoomi-cards",
    liveUrl: "https://bhoomi-cards.vercel.app/",
    image: bhoomiCardImg,
    status: "Active"
  },
  {
    id: "shree-devi-institute",
    number: "07",
    title: "Shree Devi Institute of Technology",
    category: "Institutional Web Platform",
    shortDescription: "A comprehensive institutional website for Shree Devi Institute of Technology, Kenjar, Mangaluru — a VTU-affiliated, AICTE-recognized engineering college established in 2006, with portals for students, faculty, and admin.",
    problem: "SDIT needed a modern, authoritative web presence that showcases its engineering and management programs, campus highlights, placement records, and institutional credentials, while providing direct portal access to students, faculty, and administrators.",
    solution: "Built a content-rich multi-section institutional site with a bold red-white brand palette, split-layout hero, campus highlights sidebar, multi-level navigation across Academics, Admissions, Placements, Campus, Student Life and Faculty sections.",
    architecture: "Next.js static site architecture for fast SEO-optimized page delivery. Semantic HTML5 structure, responsive multi-column layouts, optimized image assets, and integrated digital portal links (Student Login, Faculty, Admin) for institutional access.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel", "Responsive Design"],
    features: [
      "Bold hero section: 'Empowering Minds. Engineering the Future.' with 3 CTAs",
      "Campus Highlights sidebar: 12+ Acre Tech Campus, location, governing body",
      "Multi-level navigation: Academics, Admissions, Placements, Campus, Faculty",
      "VTU Affiliation, AICTE Approval, and Established 2006 trust badges",
      "Student / Faculty / Admin digital portal access links",
      "Careers, Contact, and Enquire Now quick-access header links",
      "Fully responsive layout for all device sizes"
    ],
    githubUrl: "https://github.com/Srujan07N/shree-devi-institute",
    liveUrl: "https://shree-devi-eta.vercel.app/",
    image: shreeDEviImg,
    status: "Active"
  },
  {
    id: "service-provider",
    number: "08",
    title: "Service Provider Platform",
    category: "Web Application",
    shortDescription: "A PHP-based platform connecting service providers with customers, offering seamless booking and service management.",
    problem: "Customers struggle to find reliable local service providers, and providers lack a centralized platform to manage bookings and showcase their skills.",
    solution: "Developed a web application that bridges the gap, allowing users to browse services, book appointments, and leave reviews while providing professionals with a management dashboard.",
    architecture: "Monolithic architecture built with PHP and MySQL, featuring session-based authentication and a responsive frontend for both providers and customers.",
    technologies: ["PHP", "MySQL", "HTML/CSS", "JavaScript"],
    features: [
      "User and provider registration/authentication",
      "Service booking and scheduling",
      "Provider dashboard for managing appointments",
      "Search and filter for local services",
      "Customer reviews and ratings"
    ],
    githubUrl: "https://github.com/Srujan07N/serviceprovider",
    status: "Completed"
  },
  {
    id: "agro-mart",
    number: "09",
    title: "AgroMart",
    category: "E-Commerce",
    shortDescription: "An agricultural e-commerce platform designed for farmers to sell their produce directly to consumers without intermediaries.",
    problem: "Farmers often face low profit margins due to middlemen, while consumers pay higher prices for agricultural products.",
    solution: "Built a digital marketplace where farmers can list their harvest and consumers can purchase fresh produce directly at fair prices.",
    architecture: "Built using PHP and MySQL, featuring a shopping cart, order management system, and an admin panel.",
    technologies: ["PHP", "MySQL", "HTML/CSS", "JavaScript"],
    features: [
      "Farmer and consumer role-based authentication",
      "Product catalog with categorization for crops/produce",
      "Shopping cart and checkout functionality",
      "Order tracking and history",
      "Admin dashboard for platform management"
    ],
    githubUrl: "https://github.com/Srujan07N/agromart",
    status: "Completed"
  }
];

export const SKILL_NODES: SkillNode[] = [
  // Frontend
  {
    id: "react",
    name: "React",
    category: "Frontend",
    role: "Core Frontend Library",
    context: "Building reusable component architectures, state hooks, and dynamic client-side rendering.",
    related: ["Next.js", "TypeScript", "Tailwind CSS", "React Native"],
    projectsUsedIn: ["Fitness Tracker", "Club Tracker", "Notes Creation App", "SecurePoll"],
    accent: true
  },
  {
    id: "nextjs",
    name: "Next.js",
    category: "Frontend",
    role: "Full-Stack React Framework",
    context: "Server-side rendering, routing architecture, and production frontend performance.",
    related: ["React", "TypeScript", "Node.js"],
    projectsUsedIn: ["Modern Web Architecture", "SRUJAN.N"],
    accent: true
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "Frontend",
    role: "Typed JavaScript",
    context: "Strict static typing, interfaces, and compile-time contract enforcement across application layers.",
    related: ["React", "Next.js", "Node.js"],
    projectsUsedIn: ["Fitness Tracker", "SRUJAN.N", "API Clients"],
    accent: true
  },
  {
    id: "javascript",
    name: "JavaScript (ES6+)",
    category: "Frontend",
    role: "Core Language",
    context: "Asynchronous programming, closures, event-driven paradigms, and modern language features.",
    related: ["React", "Node.js", "Express.js"],
    projectsUsedIn: ["All Projects"]
  },
  {
    id: "tailwindcss",
    name: "Tailwind CSS",
    category: "Frontend",
    role: "Utility-First CSS",
    context: "Designing custom dark interfaces, responsive layouts, and consistent spacing systems.",
    related: ["React", "Next.js"],
    projectsUsedIn: ["Fitness Tracker", "Notes Creation App", "SRUJAN.N"]
  },
  {
    id: "react-native",
    name: "React Native",
    category: "Frontend",
    role: "Mobile Framework",
    context: "Building cross-platform mobile views using shared React component paradigms.",
    related: ["React", "JavaScript"],
    projectsUsedIn: ["Mobile Architecture Exploration"]
  },

  // Backend
  {
    id: "nodejs",
    name: "Node.js",
    category: "Backend",
    role: "Runtime Environment",
    context: "Server-side execution, non-blocking asynchronous event loops, and backend service development.",
    related: ["Express.js", "MongoDB", "REST APIs"],
    projectsUsedIn: ["Fitness Tracker", "Club Tracker", "Notes Creation App", "SecurePoll"],
    accent: true
  },
  {
    id: "express",
    name: "Express.js",
    category: "Backend",
    role: "Web Framework",
    context: "Developing modular routing, middleware pipelines, error handlers, and REST API controllers.",
    related: ["Node.js", "JWT", "REST APIs"],
    projectsUsedIn: ["Fitness Tracker", "Club Tracker", "Notes Creation App", "SecurePoll"],
    accent: true
  },
  {
    id: "rest-apis",
    name: "REST APIs",
    category: "Backend",
    role: "API Architecture",
    context: "Designing clean endpoint schemas, HTTP status handling, request sanitization, and structured JSON payloads.",
    related: ["Express.js", "Node.js", "Postman"],
    projectsUsedIn: ["Fitness Tracker", "Club Tracker", "Notes Creation App", "SecurePoll"]
  },
  {
    id: "jwt",
    name: "JWT & Auth",
    category: "Backend",
    role: "Security & Authorization",
    context: "Stateless authentication tokens, password hashing with bcrypt, role-based access control guards.",
    related: ["Express.js", "Node.js"],
    projectsUsedIn: ["Fitness Tracker", "SecurePoll"],
    accent: true
  },

  // Database
  {
    id: "mongodb",
    name: "MongoDB",
    category: "Database",
    role: "NoSQL Document Store",
    context: "Schema modeling with Mongoose, document indexing, aggregation pipelines, and atomic updates.",
    related: ["Node.js", "Express.js"],
    projectsUsedIn: ["Fitness Tracker", "Club Tracker", "Notes Creation App", "SecurePoll"],
    accent: true
  },
  {
    id: "mysql",
    name: "MySQL",
    category: "Database",
    role: "Relational Database",
    context: "Relational schema design, ACID transactions, table normalization, and SQL query structure.",
    related: ["Node.js", "Backend"],
    projectsUsedIn: ["Academic Projects", "Relational Modeling"]
  },

  // Tools
  {
    id: "git",
    name: "Git & GitHub",
    category: "Tools",
    role: "Version Control & Collaboration",
    context: "Git branching strategies, semantic commit conventions, pull request workflows, and repository management.",
    related: ["VS Code"],
    projectsUsedIn: ["All Projects"]
  },
  {
    id: "postman",
    name: "Postman",
    category: "Tools",
    role: "API Testing & Validation",
    context: "Automating API endpoint verification, environment variables, authentication tokens, and request debugging.",
    related: ["REST APIs", "Express.js"],
    projectsUsedIn: ["Fitness Tracker", "SecurePoll", "Club Tracker"]
  },
  {
    id: "vite",
    name: "Vite",
    category: "Tools",
    role: "Build Tool & Bundler",
    context: "Rapid development server configuration, asset optimization, and lightning-fast builds.",
    related: ["React", "TypeScript"],
    projectsUsedIn: ["Fitness Tracker", "SRUJAN.N"]
  },
  {
    id: "vscode",
    name: "VS Code",
    category: "Tools",
    role: "Development Environment",
    context: "Configured workspace with TypeScript tooling, ESLint, Prettier, and debugging extensions.",
    related: ["Git"],
    projectsUsedIn: ["All Development Work"]
  }
];

export const EDUCATION_DATA: EducationItem[] = [
  {
    degree: "Master of Computer Applications (MCA)",
    institution: "Shree Devi Institute of Technology, Mangalore",
    period: "2024 — 2026",
    description: "Postgraduate master's degree concentrating on advanced software engineering paradigms, distributed architectures, database design, and modern web application development.",
    highlights: [
      "Full stack web development specialization (MERN architecture)",
      "Database management, query optimization, and normalization",
      "Software development lifecycle, system analysis, and design",
      "Hands-on architectural project implementations"
    ]
  },
  {
    degree: "Bachelor of Computer Applications",
    institution: "Alva's Degree College, Moodbidri",
    period: "2021 — 2024",
    description: "Foundational computer science curriculum establishing core competencies in computer programming, data structures, algorithms, and relational databases.",
    highlights: [
      "Object-Oriented Programming (OOP) principles and methodologies",
      "Data Structures and Algorithms fundamentals",
      "Relational Database Management Systems (RDBMS)",
      "Web fundamentals (HTML, CSS, JavaScript)"
    ]
  }
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    role: "Intern Software Developer",
    context: "CodeLab Systems",
    location: "Ground Floor, Light House Condominium, Light House Hill Rd, Bavutagudda, Mangaluru, Karnataka 575001",
    period: "Feb 2026 — May 2026",
    description: "Worked as an Intern Software Developer as part of a team. Contributed to software development, demonstrating a sincere, hardworking, and technically sound approach to achieve result-oriented goals.",
    techStack: ["Software Development", "Teamwork", "Problem Solving"],
    image: experienceImg,
    imageLink: "https://www.linkedin.com/feed/update/urn:li:activity:7467875274035154944/?lipi=urn%3Ali%3Apage%3Ad_flagship3_detail_base%3B924cw7XbTiCtGXFe54yqaw%3D%3D"
  }
];

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image: string;
  link: string;
}

import mernImg from '../assets/MERN.png';
import ccImg from '../assets/CC.png';
import uwsImg from '../assets/UWS.png';

export const CERTIFICATION_DATA: CertificationItem[] = [
  {
    id: "mern",
    title: "MERN Stack Development",
    issuer: "Offline Certification",
    date: "2026",
    image: mernImg,
    link: "https://www.linkedin.com/feed/update/urn:li:activity:7467874418254344192/?lipi=urn%3Ali%3Apage%3Ad_flagship3_detail_base%3BzSHvT%2FVOSriCkDQ19W9JDg%3D%3D"
  },
  {
    id: "cc",
    title: "Cloud Computing",
    issuer: "Online Certification",
    date: "2026",
    image: ccImg,
    link: "https://www.linkedin.com/feed/update/urn:li:activity:7487368113836097536/?lipi=urn%3Ali%3Apage%3Ad_flagship3_detail_base%3BoulUol1VTwOezb%2F7z7NC7w%3D%3D"
  },
  {
    id: "uws",
    title: "Web Design",
    issuer: "Offline Certification",
    date: "2024",
    image: uwsImg,
    link: "https://www.linkedin.com/feed/update/urn:li:activity:7512776338450055168/?lipi=urn%3Ali%3Apage%3Ad_flagship3_detail_base%3BpkhcrayaTPGPX5g2WrG0ow%3D%3D"
  }
];

/**
 * Derived metrics strictly based on verified data.
 * Zero fabricated stats.
 */
export const VERIFIED_METRICS = {
  projectsCount: PROJECTS.length,
  technologiesCount: SKILL_NODES.length,
  educationCurrent: "MCA (2024 — 2026)",
  statusLabel: "Available for work"
};
