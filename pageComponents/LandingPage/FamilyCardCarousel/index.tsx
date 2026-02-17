import React from "react";
import LeafDecoration, { LeafCluster } from "../LeafDecoration";
import FamilyStoryCard from "../HeroSection/FamilyStoryCard";
import CustomCarousel from "@/components/shared/CustomCarousel";
import Typography from "@/components/ui/typography";
import useGetAllGiftWells from "@/hooks/gift-well/useGetAllGiftwells";
import { SUPPORT_CATEGORY_MAP } from "@/pageComponents/CareStories";

function FamilyCardCarousel() {
  const { data: allGiftwells } = useGetAllGiftWells();
  const userStories = allGiftwells?.map((story) => {
    const categoryValue = story.support_category?.toLowerCase();

    return {
      ...story,
      support_category: SUPPORT_CATEGORY_MAP[categoryValue || ""],
    };
  });
  const carouselItems = userStories?.map((item, index) => (
    <FamilyStoryCard key={index} story={item} />
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

        <CustomCarousel items={carouselItems || []} />
      </div>
    </section>
  );
}

export default FamilyCardCarousel;
