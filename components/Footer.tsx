import React from "react";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";

const Footer: React.FC = () => {
  const footerTabs = [
    { name: "Shop", path: "/shop" },
    { name: "Support & Resources", path: "/support-resources" },
    { name: "Care Stories", path: "/care-stories" },
    { name: "FAQ", path: "/FAQ" },
    { name: "Contact", path: "/contact" },
  ];

  const socialIcons = [
    { icon: Linkedin, label: "Twitter" },
    { icon: Facebook, label: "Facebook" },
    { icon: Instagram, label: "Instagram" },
  ];

  return (
    <footer className="py-8 px-4 md:px-8 lg:px-16 border-t border-border animate-fade-in-up">
      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Navigation Links */}
        <nav className="flex flex-wrap items-center gap-6">
          {footerTabs.map((link, index) => (
            <Link
              key={`${link}-${index}`}
              href={link.path}
              className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Social Icons */}
        <div className="flex items-center gap-4">
          {socialIcons.map((social, index) => (
            <a
              key={index}
              href="#"
              className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200 hover:scale-110"
              aria-label={social.label}
            >
              <social.icon className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
