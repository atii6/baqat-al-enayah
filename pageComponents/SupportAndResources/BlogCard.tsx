import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import React from "react";
import { BlogPostType } from "./FeaturedBlogCard";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import EllipsisTypography from "@/components/shared/EllipsisTypography";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

type Props = {
  blogPost: BlogPostType;
  index: number;
  onLike: (postId: number) => void;
  likedPosts: number[];
};

function BlogCard({ blogPost, index, onLike, likedPosts }: Props) {
  const router = useRouter();
  return (
    <div
      key={blogPost.id}
      className="animate-fade-in-up"
      style={{ animationDelay: `${index * 75}ms` }}
    >
      <Card className="h-full py-0 rounded-md gap-2 overflow-hidden group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white border-slate-200">
        {/* Card Image */}
        <div
          onClick={() => router.push(`/support-resources/${blogPost.id}`)}
          className="cursor-pointer relative h-48 overflow-hidden bg-slate-100"
        >
          <Image
            src={blogPost.image || "/placeholder.svg"}
            alt={blogPost.title}
            width={200}
            height={200}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-4 right-4">
            {/* Updated category badge to use primary and secondary colors */}
            <Badge className="bg-linear-to-r from-primary to-secondary text-white border-0 text-xs">
              {blogPost.category}
            </Badge>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-6 flex flex-col h-[calc(100%-12rem)]">
          <EllipsisTypography
            title={blogPost.title}
            className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-300 leading-tight"
          >
            {blogPost.title}
          </EllipsisTypography>
          <EllipsisTypography
            title={blogPost.excerpt}
            className="text-slate-600 text-sm mb-4 line-clamp-2 grow leading-relaxed"
          >
            {blogPost.excerpt}
          </EllipsisTypography>

          {/* Metadata */}
          <div className="flex flex-col gap-4 pt-4 border-t border-slate-200">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="font-medium">{blogPost.author}</span>
              <span>•</span>
              <span>{blogPost.date}</span>
            </div>

            {/* Engagement Stats */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-4 text-sm text-slate-500">
                <Button
                  onClick={() => onLike(blogPost.id)}
                  variant="ghost"
                  className="p-0! flex items-center gap-1 hover:text-secondary hover:bg-transparent cursor-pointer transition-colors duration-300"
                >
                  <Heart
                    className={`w-4 h-4 transition-all duration-300 ${
                      likedPosts.includes(blogPost.id)
                        ? "fill-secondary text-secondary"
                        : ""
                    }`}
                  />
                  <span className="text-xs">
                    {blogPost.likes +
                      (likedPosts.includes(blogPost.id) ? 1 : 0)}
                  </span>
                </Button>
                <Button
                  variant="ghost"
                  className="p-0! flex items-center gap-1 hover:text-secondary hover:bg-transparent cursor-pointer transition-colors duration-300"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-xs">{blogPost.comments}</span>
                </Button>
              </div>
              <Button
                variant="ghost"
                className="p-0! flex items-center gap-1 hover:text-secondary hover:bg-transparent cursor-pointer transition-colors duration-300"
              >
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default BlogCard;
