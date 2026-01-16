import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Typography from "@/components/ui/typography";
import { CheckCircle } from "lucide-react";
import { GridItem } from "@/components/grid";
import { useWindowSize } from "@/hooks/useWindowSize";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export type CardData = {
  id: number;
  title: string;
  isCompleted?: boolean;
  isDisabled?: boolean;
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
  const { width } = useWindowSize();

  const isMobile = width <= 768;
  const isDesktop = width > 768 && width <= 1024;

  const isDisabled = !!cardData.isDisabled;

  const handleCardClick = () => {
    if (isDisabled) return;
    onCardClick?.(cardData);
  };

  const card = (
    <Card
      onClick={handleCardClick}
      className={cn(
        "border-0 gap-0 min-h-28 w-full p-4 transition-all duration-300",
        isDisabled
          ? "bg-gray-100 cursor-not-allowed opacity-60"
          : "bg-white cursor-pointer shadow-sm hover:bg-gray-100 group-hover:scale-[1.03] group-hover:shadow-sm"
      )}
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
                cardData.isCompleted && "fill-secondary text-white"
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
  );

  return (
    <GridItem
      key={cardData.id}
      className="py-5 group"
      size={isMobile ? 12 : isDesktop ? 6 : 3}
    >
      {isDisabled ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>{card}</TooltipTrigger>
            <TooltipContent className="text-xs">
              Complete the previous step
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        card
      )}
    </GridItem>
  );
}

export default RegistrySetupCards;
