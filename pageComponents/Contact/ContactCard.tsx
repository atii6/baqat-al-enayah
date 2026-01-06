import React from "react";
import type { LucideProps } from "lucide-react";
import Link from "next/link";

type Props = {
  contact_info: {
    label: string;
    value: string;
    href: string;
    icon: React.ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
    >;
  };
  activeCard: number;
};

function ContactCard({ contact_info, activeCard }: Props) {
  const { label, href, value } = contact_info;
  return (
    <Link
      key={label}
      href={href}
      className="block group"
      style={{ animationDelay: `${0.3 + activeCard * 0.1}s` }}
    >
      <div className="bg-card/80 backdrop-blur-sm rounded-md p-6 shadow-lg border border-border/50 hover:shadow-xl hover:border-primary/30 transition-all duration-300 hover:-translate-y-1">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
            <contact_info.icon className="w-7 h-7 text-primary" />
          </div>
          <div>
            <h3 className="font-heading text-lg font-semibold text-foreground mb-1">
              {label}
            </h3>
            <p className="text-muted-foreground group-hover:text-foreground transition-colors">
              {value}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ContactCard;
