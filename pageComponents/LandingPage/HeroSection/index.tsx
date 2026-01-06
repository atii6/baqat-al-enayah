import React from "react";
// import LeafDecoration, { LeafCluster } from "../LeafDecoration";
// import CommunityCard from "./CommunityCard";
// import FamilyStoryCard from "./FamilyStoryCard";
import Typography from "@/components/ui/typography";
import Navigation from "@/components/navbar";
import HeroForm from "../HeroForm";
import { Grid, GridItem } from "@/components/grid";

const HeroSection = () => {
  return (
    // <section className="relative py-8 px-2 md:px-8 lg:px-8 overflow-hidden">
    //   <LeafCluster className="top-5 left-5" />
    //   <LeafDecoration
    //     variant="large"
    //     className="absolute top-20 right-0 animate-float-slow"
    //     flip
    //   />
    //   <LeafDecoration
    //     variant="medium"
    //     className="absolute bottom-0 left-1/4 animate-float delay-500"
    //   />

    //   <div className="w-full">
    //     <CommunityCard />
    //     {/* <div className="grid lg:grid-cols-2 gap-8 items-start">
    //       <FamilyStoryCard />
    //     </div> */}
    //   </div>
    // </section>
    <section className="relative flex flex-col items-center justify-between bg-primary min-h-screen w-full z-20 bg-[url('/hero_image.jpg')] bg-cover bg-[position:50%_30%] bg-black/40">
      <Navigation />
      <div className="absolute inset-0 z-0 bg-black/50 px-6 sm:px-12 lg:px-20 flex items-center">
        <Grid className="items-center space-y-6">
          <GridItem className="flex-1 space-y-4 animate-fade-in-left col-span-12 md:col-span-8 lg:col-span-9">
            <div className=" space-y-2">
              <Typography
                variant="h1"
                className="text-2xl text-white lg:text-5xl font-semibold leading-tight"
              >
                A Community of Care,
              </Typography>
              <Typography
                variant="h1"
                className="text-2xl text-white lg:text-5xl font-semibold leading-tight"
              >
                Connected By Heart.
              </Typography>
            </div>
            <Typography variant="caption" className="text-muted">
              Receive and give support, limitless, and build strength together.
            </Typography>
          </GridItem>
          <GridItem className="animate-fade-in-right col-end-12 md:col-span-4 lg:col-span-3">
            <HeroForm />
          </GridItem>
        </Grid>
      </div>
    </section>
  );
};

export default HeroSection;
