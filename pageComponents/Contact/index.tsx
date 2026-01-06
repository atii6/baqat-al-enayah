import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Sparkles,
  Heart,
  MessageCircle,
} from "lucide-react";
import LeafDecoration from "../LandingPage/LeafDecoration";
import Typography from "@/components/ui/typography";
import ContactForm from "./ContactForm";
import ContactCard from "./ContactCard";
import FAQCard from "./FAQCard";

const ContactPage: React.FC = () => {
  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "hello@carebridge.com",
      href: "mailto:hello@carebridge.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+1 (555) 123-4567",
      href: "tel:+15551234567",
    },
    {
      icon: MapPin,
      label: "Address",
      value: "123 Care Street, Hope City, HC 12345",
      href: "#",
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden my-8">
      {/* Decorative gradient orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />

      <div
        className="absolute top-60 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="absolute bottom-20 left-1/4 w-80 h-80 bg-secondary/20 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "2s" }}
      />

      {/* Floating decorative icons */}
      <div
        className="absolute top-32 right-[12%] text-primary/20 animate-bounce"
        style={{ animationDuration: "3s" }}
      >
        <Heart className="w-8 h-8" />
      </div>
      <div
        className="absolute top-48 left-[8%] text-primary/15 animate-bounce"
        style={{ animationDuration: "4s", animationDelay: "0.5s" }}
      >
        <Sparkles className="w-6 h-6" />
      </div>
      <div
        className="absolute bottom-[35%] right-[6%] text-primary/20 animate-bounce"
        style={{ animationDuration: "3.5s", animationDelay: "1s" }}
      >
        <MessageCircle className="w-7 h-7" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <LeafDecoration />
        {/* Page Header */}
        <div className="text-center mt-12 mb-12 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <MessageCircle className="w-4 h-4" />
            We&apos;d Love to Hear From You
          </div>
          <div className="space-y-3">
            <Typography
              variant="h1"
              className="font-semibold text-5xl text-primary text-center"
            >
              Get In Touch
            </Typography>
            <Typography
              variant="caption"
              className="text-muted-foreground text-center"
            >
              Have questions, suggestions, or just want to say hello? We&apos;re
              here to help and would love to connect with you.
            </Typography>
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 mb-16 min-h-120">
          {/* Contact Form */}
          <div className="lg:col-span-3 animate-fade-in-left">
            <div className="h-full bg-card/80 backdrop-blur-sm rounded-md p-8 md:p-10 shadow-xl border border-border/50 relative overflow-hidden">
              <ContactForm />
            </div>
          </div>

          {/* Contact Info Cards */}
          <div className="lg:col-span-2 space-y-6 animate-fade-in-right">
            {/* Info Cards */}
            {contactInfo.map((info, index) => (
              <ContactCard
                key={info.label}
                contact_info={info}
                activeCard={index}
              />
            ))}

            {/* FAQ Teaser */}
            <FAQCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
