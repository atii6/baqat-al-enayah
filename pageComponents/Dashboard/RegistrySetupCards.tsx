import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Typography from "@/components/ui/typography";
import { CheckCircle } from "lucide-react";
import { GridItem } from "@/components/grid";
import { useWindowSize } from "@/hooks/useWindowSize";
import { cn } from "@/lib/utils";

export type CardData = {
  id: number;
  title: string;
  isCompleted?: boolean;
};

type RegistrySetupCardsProps = {
  cardData: CardData;
  renderIcons?: boolean;
  onCardClick?: (cardData?: CardData) => void;
};

function RegistrySetupCards({
  cardData,
  renderIcons = true,
  onCardClick,
}: RegistrySetupCardsProps) {
  const handleCardClick = (cardData: CardData) => {
    if (onCardClick) {
      onCardClick(cardData);
    }
  };
  const { width } = useWindowSize();

  const isMobile = width <= 768;
  const isDesktop = width > 768 && width <= 1024;

  return (
    <GridItem
      key={cardData.id}
      className="py-5 group"
      size={isMobile ? 12 : isDesktop ? 6 : 3}
    >
      <Card
        onClick={() => handleCardClick(cardData)}
        className="hover:bg-gray-100 bg-white border-0 gap-0 min-h-28 shadow-sm w-full p-4 cursor-pointer transition-all duration-300 group-hover:scale-110 group-hover:shadow-md"
      >
        <CardContent className="p-0 w-full">
          <div
            className={
              renderIcons
                ? "flex flex-col items-start gap-4"
                : "flex items-center justify-center w-full"
            }
          >
            {renderIcons && (
              <CheckCircle
                className={cn(
                  "text-muted-foreground",
                  cardData.isCompleted ? "fill-secondary text-white" : ""
                )}
              />
            )}
            <Typography
              size="sm"
              className="font-medium text-muted-foreground leading-tight pr-2"
            >
              {cardData.title}
            </Typography>
          </div>
        </CardContent>
      </Card>
    </GridItem>
  );
}

export default RegistrySetupCards;
