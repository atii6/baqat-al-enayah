import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

export type BlogPostType = {
  id: number;
  image: string;
  title: string;
  category: string;
  excerpt: string;
  date: string;
  author: string;
  readTime: string;
  likes: number;
  comments: number;
};

type Props = {
  featuredPost: BlogPostType;
};

function FeaturedBlogCard({ featuredPost }: Props) {
  const router = useRouter();
  return (
    <div className="mb-20 animate-fade-in-delay-4">
      <div className="group relative overflow-hidden rounded-md bg-white shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Featured Image */}
          <div className="relative h-96 md:h-full overflow-hidden bg-slate-100">
            <Image
              src={featuredPost.image || "/placeholder.svg"}
              alt={featuredPost.title}
              width={700}
              height={700}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>

          {/* Featured Content */}
          <div className="p-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                {/* Updated badge colors to use primary and secondary */}
                <Badge className="bg-linear-to-r from-primary to-secondary text-white border-0 text-xs py-1.5">
                  Featured
                </Badge>
                <Badge
                  variant="outline"
                  className="text-primary border-primary/30"
                >
                  {featuredPost.category}
                </Badge>
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4 leading-tight group-hover:text-primary transition-colors duration-300">
                {featuredPost.title}
              </h2>
              <p className="text-slate-600 text-lg mb-6 leading-relaxed">
                {featuredPost.excerpt}
              </p>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-slate-200">
              <div className="flex items-center gap-4 text-sm text-slate-500">
                <span className="font-medium">{featuredPost.author}</span>
                <span>•</span>
                <span>{featuredPost.date}</span>
              </div>
              {/* Updated button to use primary color */}
              <Button
                onClick={() =>
                  router.push(`/support-resources/${featuredPost.id}`)
                }
                className="cursor-pointer text-white border-0 rounded-md transition-all duration-300 hover:shadow-lg hover:scale-105"
              >
                Read Article
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeaturedBlogCard;
