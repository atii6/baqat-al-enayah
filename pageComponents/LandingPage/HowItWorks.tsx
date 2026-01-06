import React from "react";
import { BookOpen, ShoppingBag, Heart, CalendarCheck } from "lucide-react";
import Typography from "@/components/ui/typography";

const HowItWorks = () => {
  const steps = [
    { icon: BookOpen, label: "Post Your Story" },
    { icon: ShoppingBag, label: "Share Your Needs" },
    { icon: Heart, label: "Care Visits" },
    { icon: CalendarCheck, label: "Receive & Manage Support" },
  ];

  // const testimonials = [
  //   { icon: Baby, label: "Childcare" },
  //   { icon: HandCoins, label: "Pending Donations" },
  //   { icon: Gift, label: "Pending Help" },
  //   { icon: ListTodo, label: "Pending Tasks" },
  // ];

  return (
    <section className="grid md:grid-cols-1 my-36 w-3/5 mx-auto gap-16">
      <div className="w-full space-y-16">
        <div className="flex flex-col items-center justify-center space-y-8 animate-fade-in-left">
          {/* Headline */}
          <Typography
            variant="h1"
            className="text-5xl text-primary text-center"
          >
            Make it easier for people to care
          </Typography>

          {/* Intro Text */}
          <div className="space-y-4 max-w-3xl text-center text-muted-foreground">
            <span className="text-lg">
              We make it{" "}
              <span className="font-semibold text-primary">
                simple for people to help
              </span>{" "}
              by connecting stories with those who want to support.
            </span>
            <span className="text-lg">
              <span className="font-semibold">Share your needs</span> and get
              the right help quickly. From posting your story to receiving care,
              we make sure everyone feels supported.
            </span>
          </div>

          {/* Visual Anchor / Dotted Line */}
          <div className="w-full flex justify-center mt-4">
            <div className="border-t-2 border-dashed border-primary w-1/4"></div>
          </div>
        </div>
        <div className="grid md:grid-cols-1 gap-8 animate-fade-in-right">
          {/* How It Works */}
          <div className="animate-fade-in-up space-y-12">
            <div className="space-y-2">
              <Typography
                variant="h1"
                // size="7xl"
                className="font-semibold text-5xl text-primary text-center"
              >
                How It Works
              </Typography>
              <Typography
                variant="caption"
                className="text-muted-foreground text-center"
              >
                Bringing stories and support together
              </Typography>
            </div>

            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <React.Fragment key={step.label}>
                  <div className="flex flex-col items-center gap-3 group min-h-28 w-32">
                    <div className="icon-circle transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
                      <step.icon className="w-6 h-6" strokeWidth={1.5} />
                    </div>
                    <Typography
                      size="xs"
                      className="text-center text-muted-foreground font-medium "
                    >
                      {step.label}
                    </Typography>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="dotted-line hidden sm:block self-start mt-7" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Testimonials */}
          {/* <div className="animate-fade-in-up delay-200">
            <Typography
              variant="h1"
              size="2xl"
              className="font-semibold text-foreground mb-8"
            >
              Testimonials
            </Typography>
            <div className="flex items-center justify-between">
              {testimonials.map((item, index) => (
                <React.Fragment key={item.label}>
                  <div className="flex flex-col items-center gap-3 group min-h-28 w-20">
                    <div className="icon-circle transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
                      <item.icon className="w-6 h-6" strokeWidth={1.5} />
                    </div>
                    <Typography
                      size="xs"
                      className="text-center text-foreground font-medium"
                    >
                      {item.label}
                    </Typography>
                  </div>

                  {index < testimonials.length - 1 && (
                    <div className="dotted-line hidden sm:block self-start mt-7" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
