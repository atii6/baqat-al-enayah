import React from "react";
import { Facebook, Instagram, Linkedin } from "lucide-react";

const Footer: React.FC = () => {
  const links = ["About", "FAQ", "Registry", "Privacy", "Contact"];

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
          {links.map((link, index) => (
            <a
              key={`${link}-${index}`}
              href="#"
              className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              {link}
            </a>
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
