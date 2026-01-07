import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Typography from "@/components/ui/typography";
import EllipsisTypography from "@/components/shared/EllipsisTypography";
import Image from "next/image";
import { useRouter } from "next/router";
import type { StoryType } from "@/utilities/types/storyTypes";

type FamilyStoryCardProps = {
  story: StoryType;
};

function FamilyStoryCard({ story }: FamilyStoryCardProps) {
  const router = useRouter();

  const {
    registry_title,
    registry_description,
    organizer_name,
    family_photo,
    category,
  } = story;

  return (
    <Card className="bg-card p-6 rounded-md border-0 shadow-md min-h-80">
      {/* Family image area */}
      <div className="flex items-start gap-6 relative">
        <div className="w-32 h-24 bg-linear-to-br from-accent to-leaf-light rounded-2xl flex items-center shadow-md justify-center overflow-hidden">
          <Image
            src={family_photo}
            alt="Family photo"
            width={100}
            height={100}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <Typography variant="h3" className="font-semibold text-foreground">
              {registry_title}
            </Typography>
          </div>
          <EllipsisTypography
            title={registry_description}
            className="line-clamp-1 text-sm text-muted-foreground"
          >
            {registry_description}
          </EllipsisTypography>

          <Typography size="sm" className="text-muted-foreground">
            {organizer_name}
          </Typography>
        </div>
        {category && (
          <span className="bg-linear-to-r from-primary to-secondary text-primary-foreground text-xs font-medium px-2 py-1 rounded-full">
            {category}
          </span>
        )}
      </div>

      {/* Our Story Section */}
      <div className="border-t border-border pt-4">
        <div className="flex items-end justify-between">
          <div className="flex-1 space-y-4">
            <div className="space-y-2">
              <Typography variant="h4" className="text-foreground font-medium">
                Our Story
              </Typography>
              <EllipsisTypography
                title={story.story}
                className="text-sm text-muted-foreground line-clamp-2"
              >
                {story.story}
              </EllipsisTypography>
            </div>

            <Button
              variant="link"
              className="p-0 cursor-pointer"
              onClick={() => router.push(`/care-stories/${story.id}`)}
            >
              Read More
            </Button>
          </div>
        </div>
      </div>
      {/* <div className="space-y-3 w-2/4">
          <div className="space-y-1">
            <Typography size="xs" className="text-muted-foreground">
              Organizer Name
            </Typography>
            <Typography size="sm" className="font-medium">
              {organizer_name}
            </Typography>
          </div>

          <Card className="bg-secondary/60 p-2 rounded-lg gap-1 border-0 shadow-sm">
            <div className="flex items-center gap-2">
              <Typography size="xs" className="text-white">
                Post it community
              </Typography>
              <Settings className="w-4 h-4 text-white" />
            </div>
          </Card>
        </div> */}
    </Card>
  );
}

export default FamilyStoryCard;
