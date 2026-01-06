import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { DollarSign, FileText, Wallet, HandHeart, Plus } from "lucide-react";
import LeafDecoration from "../LeafDecoration";

const SupportDashboard: React.FC = () => {
  const supportMessages = [
    {
      name: "Sarah Johnson",
      message: "Donated $100 - Stay strong!",
      avatar: "👤",
      toggle: false,
    },
    {
      name: "Mike Thompson",
      message: "Signed up for meal delivery",
      avatar: "👤",
      toggle: false,
    },
    {
      name: "Meals Coordinator",
      message: "Scheduled 7 meal deliveries",
      avatar: "🍽️",
      toggle: true,
    },
    {
      name: "Gift Registry",
      message: "New gift added to wishlist",
      avatar: "🎁",
      toggle: false,
    },
    {
      name: "Community Gifts",
      message: "Received care package from neighbors",
      avatar: "💝",
      toggle: true,
    },
    {
      name: "Share Update",
      message: "Story shared 24 times",
      avatar: "➕",
      toggle: false,
    },
  ];

  return (
    <section className="my-36 px-4 md:px-8 lg:px-16 support-section-bg relative overflow-hidden">
      {/* Decorative elements */}
      <LeafDecoration variant="large" className="top-10 left-0 opacity-40" />
      <LeafDecoration
        variant="medium"
        className="bottom-20 right-0 opacity-40"
        flip
      />

      <div className="w-full relative z-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Support Stats */}
          <div className="lg:col-span-2">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Total Support Received */}
              <Card className="bg-card p-6 rounded-2xl shadow-soft card-hover animate-fade-in-up">
                <div className="flex items-start gap-4">
                  <div className="icon-circle">
                    <DollarSign className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Total Support
                    </p>
                    <p className="text-sm font-medium">Received</p>
                    <p className="text-xs text-muted-foreground mt-2 italic">
                      &quot;Every little bit helps us move forward!&quot;
                    </p>
                  </div>
                </div>
              </Card>

              {/* Financial Card */}
              <Card className="bg-card p-6 rounded-2xl shadow-soft card-hover animate-fade-in-up delay-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="icon-circle-sm">
                      <FileText className="w-4 h-4" />
                    </div>
                    <span className="font-medium text-foreground">
                      Financial
                    </span>
                  </div>
                  <Plus className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="text-sm text-muted-foreground mb-2">
                  View Financial Summary
                </div>
                <div className="text-xs text-muted-foreground mb-4">
                  Track donations and fund allocation
                </div>
                <Button
                  size="sm"
                  className="bg-primary text-primary-foreground rounded-full text-xs"
                >
                  Read More
                </Button>
              </Card>

              {/* Contribute Funds */}
              <Card className="bg-card p-6 rounded-2xl shadow-soft card-hover animate-fade-in-up delay-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="icon-circle-sm">
                      <Wallet className="w-4 h-4" />
                    </div>
                    <span className="font-medium text-foreground">
                      Contribute Funds
                    </span>
                  </div>
                  <Plus className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="text-sm text-muted-foreground mb-2">
                  Help cover medical expenses
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-semibold">
                    $7,000 of $10,000
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Funds Raised
                  </span>
                </div>
                <div className="w-full bg-accent rounded-full h-2 mb-4">
                  <div
                    className="bg-primary h-2 rounded-full"
                    style={{ width: "70%" }}
                  />
                </div>
                <Button
                  size="sm"
                  className="w-full bg-primary text-primary-foreground rounded-full"
                >
                  Launch My Community
                </Button>
              </Card>

              {/* Help with Tasks */}
              <Card className="bg-card p-6 rounded-2xl shadow-soft card-hover animate-fade-in-up delay-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="icon-circle-sm">
                      <HandHeart className="w-4 h-4" />
                    </div>
                    <span className="font-medium text-foreground">
                      Help with Tasks
                    </span>
                  </div>
                  <Plus className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="text-sm text-muted-foreground mb-2">
                  Volunteer for daily tasks
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-semibold">85 of 100</span>
                  <span className="text-xs text-muted-foreground">
                    Tasks Completed
                  </span>
                </div>
                <div className="w-full bg-accent rounded-full h-2 mb-4">
                  <div
                    className="bg-primary h-2 rounded-full"
                    style={{ width: "85%" }}
                  />
                </div>
                <Button
                  size="sm"
                  className="w-full bg-primary text-primary-foreground rounded-full"
                >
                  Send a Gift
                </Button>
              </Card>
            </div>
          </div>

          {/* Right Column - Messages of Support */}
          <div className="animate-fade-in-right delay-300">
            <Card className="bg-card p-6 rounded-2xl shadow-soft h-full">
              <h3 className="font-serif font-semibold text-foreground mb-6">
                Messages of Support
              </h3>
              <div className="space-y-4">
                {supportMessages.map((message, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-accent/50 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-lg">
                      {message.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {message.name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {message.message}
                      </p>
                    </div>
                    {message.toggle && (
                      <Switch
                        defaultChecked
                        className="data-[state=checked]:bg-primary"
                      />
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupportDashboard;
