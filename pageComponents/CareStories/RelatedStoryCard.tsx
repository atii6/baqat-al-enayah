import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { StoryType } from "@/utilities/types/storyTypes";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Props = { relatedStory: StoryType; index: number };

function RelatedStoryCard({ relatedStory, index }: Props) {
  return (
    <Link
      key={relatedStory.id}
      href={`/care-stories/${relatedStory.id}`}
      className="group"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <Card className="h-full overflow-hidden hover:shadow-2xl transition-all duration-500 py-0 transform hover:-translate-y-2 bg-white border-slate-200 cursor-pointer flex flex-col">
        <div className="relative h-40 overflow-hidden bg-slate-100">
          <Image
            src={relatedStory.family_photo || "/placeholder.svg"}
            alt={relatedStory.registry_title}
            width={250}
            height={250}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <Badge className="absolute top-4 right-4 bg-linear-to-r from-primary to-secondary text-white border-0 text-xs">
            {relatedStory.category}
          </Badge>
        </div>
        <div className="py-2 px-3 grow flex flex-col">
          <h4 className="font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {relatedStory.registry_title}
          </h4>
          <p className="text-sm text-slate-600 mb-4 line-clamp-2 grow">
            {relatedStory.registry_description}
          </p>
          <div className="flex items-center justify-between pt-4 border-t border-slate-200">
            <span className="text-xs text-slate-500">60% funded</span>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </div>
        </div>
      </Card>
    </Link>
  );
}

export default RelatedStoryCard;
