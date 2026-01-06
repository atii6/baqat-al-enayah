import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import type { BlogPostType } from "./FeaturedBlogCard";
import EllipsisTypography from "@/components/shared/EllipsisTypography";

type Props = { relatedPost: BlogPostType; index: number };

function RelatedBlogsCard({ relatedPost, index }: Props) {
  return (
    <Link
      key={relatedPost.id}
      href={`/support-resources/${relatedPost.id}`}
      className="group"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <Card className="h-full py-0 gap-2 overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white border-slate-200 cursor-pointer">
        <div className="relative h-40 overflow-hidden bg-slate-100">
          <Image
            src={relatedPost.image || "/placeholder.svg"}
            alt={relatedPost.title}
            width={200}
            height={200}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <Badge className="absolute top-4 right-4 bg-linear-to-r from-primary to-secondary text-white border-0 text-xs">
            {relatedPost.category}
          </Badge>
        </div>
        <div className="px-6 py-3">
          <EllipsisTypography
            title={relatedPost.title}
            className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-300 leading-tight"
          >
            {relatedPost.title}
          </EllipsisTypography>
          <EllipsisTypography
            title={relatedPost.excerpt}
            className="text-slate-600 text-sm mb-4 line-clamp-2 grow leading-relaxed"
          >
            {relatedPost.excerpt}
          </EllipsisTypography>
        </div>
      </Card>
    </Link>
  );
}

export default RelatedBlogsCard;
