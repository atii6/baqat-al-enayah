import React from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

type Props = {
  items: React.ReactNode[];
  isSlideCountVisible?: boolean;
};

function CustomCarousel({ items, isSlideCountVisible = false }: Props) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  // Group items into pairs (2 per slide)
  const groupedItems = [];
  for (let i = 0; i < items.length; i += 2) {
    groupedItems.push(items.slice(i, i + 2));
  }

  React.useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="mx-auto max-w-5xl">
      <Carousel setApi={setApi}>
        <CarouselContent className="py-4">
          {groupedItems.map((group, index) => (
            <CarouselItem key={index}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {group.map((item, idx) => (
                  <div key={idx}>{item}</div>
                ))}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      {isSlideCountVisible && (
        <div className="text-muted-foreground py-2 text-center text-sm">
          Slide {current} of {groupedItems.length}
        </div>
      )}
    </div>
  );
}

export default CustomCarousel;
