"use client";

import React from "react";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Users, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/router";
import ContributionCTA from "./ContributionCTA";
import RelatedStoryCard from "./RelatedStoryCard";
import useGetGiftWellByUserID from "@/hooks/gift-well/useGiftWellByUserID";
import useGetAllGiftWells from "@/hooks/gift-well/useGetAllGiftwells";
import { Badge } from "@/components/ui/badge";
import { SUPPORT_CATEGORY_MAP } from ".";
import useGetBlogsByUserID from "@/hooks/blog/useGetBlogsByUserID";
import BlogCard from "../Blog/BlogCard";
import type { BlogsType } from "@/utilities/types/blog";

export function CareStoryDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const userID = id ? parseInt(id.toString()) : null;
  const { data: story } = useGetGiftWellByUserID(userID || 0);
  const { data: allStories } = useGetAllGiftWells();
  const { data: blogs } = useGetBlogsByUserID(userID || 0);

  const relatedStories = allStories
    ?.filter(
      (p) =>
        p.support_category === story?.support_category && p.id !== story?.id,
    )
    .slice(0, 3);

  const handleBlogClick = (blog: BlogsType) => {
    router.push(`/support-resources/${blog.user_id}`);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-slate-50">
      {/* Header with Back Button */}
      <div className="bg-linear-to-r from-primary via-secondary to-primary text-white min-h-100 flex items-center">
        <div className="w-3/5 mx-auto px-6 py-20">
          <Link
            href="/stories"
            className="flex items-center gap-2 text-white/90 hover:text-white transition-colors mb-6 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Stories</span>
          </Link>
          <div className="animate-fade-in">
            <Badge className="bg-white/30 text-white border-white/50 mb-4">
              {SUPPORT_CATEGORY_MAP[story?.support_category || ""]}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {story?.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>{story?.organizer_name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-4/5 mx-auto px-6 py-16">
        {/* Featured Image */}
        <div className="mb-12 animate-fade-in-delay">
          <div className="relative overflow-hidden rounded-md h-96 md:h-125 bg-accent group shadow-sm">
            <Image
              src={story?.family_photo || "/placeholder.svg"}
              alt={story?.title || ""}
              width={500}
              height={500}
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>

        {/* Story Content */}
        <div className="bg-white rounded-md shadow-md p-8 md:p-12 mb-12 animate-fade-in-delay-2">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">
            Their Story
          </h2>
          <div className="prose prose-lg max-w-none text-slate-700 leading-relaxed space-y-6">
            <p className="text-base leading-relaxed">{story?.description}</p>
            {story?.description && (
              <div
                dangerouslySetInnerHTML={{ __html: story.description }}
                className="space-y-6"
              />
            )}
          </div>
        </div>

        {/* Fundraising Progress */}
        {blogs && blogs.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-6">
              From the Organizer
            </h3>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {blogs?.map((blog) => (
                <BlogCard
                  key={blog.id}
                  blog={blog}
                  isEditable={false}
                  onClick={handleBlogClick}
                />
              ))}
            </div>
          </div>
        )}

        {/* Donate CTA */}
        <ContributionCTA />

        {/* Related Stories */}
        {relatedStories && relatedStories.length > 0 && (
          <div className="animate-fade-in-delay-4">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">
              Similar Stories
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedStories.map((relatedStory, index) => (
                <RelatedStoryCard
                  key={relatedStory.id}
                  relatedStory={relatedStory || []}
                  index={index}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer CTA */}
      <div className="mt-10 bg-linear-to-r from-primary via-secondary to-primary text-white py-16 px-6 rounded-t-4xl">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-4">
            Your Support Changes Lives
          </h3>
          <p className="text-white/90 mb-8">
            Every contribution helps families access the care and support they
            need
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/stories">
              <Button
                variant="outline"
                className="cursor-pointer bg-primary text-white hover:text-primary font-semibold px-8 shadow-md border"
              >
                View All Stories
              </Button>
            </Link>
            <Button
              variant="outline"
              className="cursor-pointer bg-primary text-white hover:text-primary font-semibold px-8 shadow-md border"
            >
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
