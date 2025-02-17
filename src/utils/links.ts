type NavLink = {
  href: string;
  label: string;
};

export const links: NavLink[] = [
  { href: "/", label: "home" },
  { href: "/about", label: "about" },
  { href: "/careers", label: "careers" },
  { href: "/careers/jobs", label: "jobs" },
  { href: "/faq", label: "faq" },
];

export const footerLinks: NavLink[] = [
  { href: "/legal", label: "legal" },
  { href: "/policies", label: "policies" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "contact" },
];
