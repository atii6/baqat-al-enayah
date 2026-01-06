import React from "react";
import LeafDecoration, { LeafCluster } from "../LeafDecoration";
import FamilyStoryCard from "../HeroSection/FamilyStoryCard";
import CustomCarousel from "@/components/shared/CustomCarousel";
import Typography from "@/components/ui/typography";

function FamilyCardCarousel() {
  const registryDetails = [
    {
      family_photo:
        "https://images.unsplash.com/photo-1609220136736-443140cffec6?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      registry_title: "The Thompson Family's Circle of Hope",
      registry_description: "Standing together through Cancer Recovery",
      organizer_name: "Sarah Thompson",
      story:
        "Our family is navigating the challenges of cancer recovery. By sharing our story, we hope to receive emotional support, care visits, and small acts of kindness that make each day easier.",
    },
    {
      family_photo:
        "https://images.unsplash.com/photo-1588979355313-6711a095465f?q=80&w=744&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      registry_title: "A Helping Hand for the Martinez Family",
      registry_description: "Support during post-surgery recovery",
      organizer_name: "Carlos Martinez",
      story:
        "After a major surgery, daily tasks have become difficult. We’re reaching out to our community for meal support, check-ins, and encouragement as we focus on healing.",
    },
    {
      family_photo:
        "https://images.unsplash.com/photo-1542037104857-ffbb0b9155fb?q=80&w=1508&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      registry_title: "Welcoming Baby Noor with Love",
      registry_description: "Care and support for new parents",
      organizer_name: "Ayesha Khan",
      story:
        "As new parents, adjusting to life with our newborn has been both joyful and overwhelming. Any help with meals, errands, or guidance would mean the world to us.",
    },
    {
      family_photo:
        "https://images.unsplash.com/photo-1559734840-f9509ee5677f?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      registry_title: "Caring for Dad: The Wilson Family",
      registry_description: "Long-term care and companionship",
      organizer_name: "Emily Wilson",
      story:
        "We’re caring for our father during his long-term recovery. Support through visits, companionship, or shared responsibilities would help us stay strong together.",
    },
    {
      family_photo:
        "https://images.unsplash.com/photo-1506836467174-27f1042aa48c?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      registry_title: "The Thompson Family's Circle of Hope",
      registry_description: "Standing together through Cancer Recovery",
      organizer_name: "Sarah Thompson",
      story:
        "Our family is navigating the challenges of cancer recovery. By sharing our story, we hope to receive emotional support, care visits, and small acts of kindness that make each day easier.",
    },
    {
      family_photo:
        "https://images.unsplash.com/photo-1602255680702-c47261041a97?q=80&w=776&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      registry_title: "A Helping Hand for the Martinez Family",
      registry_description: "Support during post-surgery recovery",
      organizer_name: "Carlos Martinez",
      story:
        "After a major surgery, daily tasks have become difficult. We’re reaching out to our community for meal support, check-ins, and encouragement as we focus on healing.",
    },
  ];

  const carouselItems = registryDetails.map((item, index) => (
    <FamilyStoryCard key={index} registryDetails={item} />
  ));

  return (
    <section className="relative my-36 px-2 md:px-8 lg:px-12 overflow-hidden w-3/4 mx-auto">
      <LeafCluster className="top-5 left-5" />
      <LeafDecoration
        variant="large"
        className="absolute top-20 right-0 animate-float-slow"
        flip
      />
      <LeafDecoration
        variant="medium"
        className="absolute -bottom-1 left-1/4 animate-float delay-500"
      />

      <div className="w-full space-y-4">
        <div className="space-y-2">
          <Typography
            variant="h1"
            className="font-semibold text-5xl text-primary text-center"
          >
            Care Stories
          </Typography>
          <Typography
            variant="caption"
            className="text-muted-foreground text-center"
          >
            Support starts here
          </Typography>
        </div>

        <CustomCarousel items={carouselItems} />
      </div>
    </section>
  );
}

export default FamilyCardCarousel;
