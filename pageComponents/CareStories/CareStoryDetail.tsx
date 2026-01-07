"use client";

import React from "react";
import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Heart,
  Share2,
  Users,
  Target,
  Calendar,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { StoryType } from "@/utilities/types/storyTypes";
import Image from "next/image";
import { DUMMY_STORIES } from "../LandingPage/FamilyCardCarousel";
import { useRouter } from "next/router";
import { Badge } from "@/components/ui/badge";

export function CareStoryDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const storyID = id ? parseInt(id.toString()) : null;
  const story = React.useMemo(
    () => DUMMY_STORIES.find((p) => p.id === storyID),
    [storyID]
  );
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(10);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  const relatedStories = DUMMY_STORIES.filter(
    (p) => p.category === story?.category && p.id !== story.id
  ).slice(0, 3);

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
            {/* <Badge className="bg-white/30 text-white border-white/50 mb-4">
              {story.category}
            </Badge> */}
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {story?.registry_title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>{story?.organizer_name}</span>
              </div>
              {/* <div className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                <span>{story} supporters</span>
              </div> */}
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
          <div className="relative overflow-hidden rounded-md h-96 md:h-125 bg-slate-100 group">
            <Image
              src={story?.family_photo || "/placeholder.svg"}
              alt={story?.registry_title || ""}
              width={500}
              height={500}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>

        {/* Fundraising Progress */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card className="p-8 bg-white shadow-lg animate-fade-in-delay-2s">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-slate-600">
                Funds Raised
              </h3>
              <Target className="w-5 h-5 text-primary" />
            </div>
            <p className="text-3xl font-bold text-primary mb-2">$80K</p>
            <p className="text-sm text-slate-500">of $100K goal</p>
          </Card>

          <Card className="p-8 bg-white shadow-lg animate-fade-in-delay-3">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-slate-600">Progress</h3>
              <Zap className="w-5 h-5 text-secondary" />
            </div>
            <p className="text-3xl font-bold text-secondary mb-2">75%</p>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div
                className="h-full bg-linear-to-r from-primary to-secondary rounded-full"
                style={{ width: `75%` }}
              ></div>
            </div>
          </Card>

          <Card className="p-8 bg-white shadow-lg animate-fade-in-delay-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-slate-600">
                Supporters
              </h3>
              <Users className="w-5 h-5 text-primary" />
            </div>
            <p className="text-3xl font-bold text-primary mb-2">49</p>
            <p className="text-sm text-slate-500">People helping this family</p>
          </Card>
        </div>

        {/* Story Content */}
        <div className="bg-white rounded-md shadow-xl p-8 md:p-12 mb-12 animate-fade-in-delay-2">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">
            Their Story
          </h2>
          <div className="prose prose-lg max-w-none text-slate-700 leading-relaxed space-y-6">
            <p className="text-lg leading-relaxed">{story?.story}</p>
            {story?.content && (
              <div
                dangerouslySetInnerHTML={{ __html: story.content }}
                className="space-y-6"
              />
            )}
          </div>

          {/* Engagement Section */}
          <div className="mt-12 pt-8 border-t border-slate-200 flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <button
                onClick={handleLike}
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors duration-300"
              >
                <Heart
                  className={`w-6 h-6 transition-all duration-300 ${
                    isLiked ? "fill-secondary text-secondary" : "text-slate-400"
                  }`}
                />
                <span className="font-semibold text-slate-700">{likes}</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors duration-300">
                <Users className="w-6 h-6 text-slate-400" />
                <span className="font-semibold text-slate-700">49</span>
              </button>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors duration-300">
              <Share2 className="w-6 h-6 text-slate-400" />
              <span className="font-semibold text-slate-700">Share</span>
            </button>
          </div>
        </div>

        {/* Donate CTA */}
        <div className="bg-linear-to-r from-primary to-secondary text-white rounded-md p-8 md:p-12 mb-12 animate-fade-in-delay-3">
          <h3 className="text-2xl font-bold mb-3">Help This Family</h3>
          <p className="text-white/90 mb-6">
            Your contribution makes a direct impact on this family&apos;s
            wellbeing and recovery.
          </p>
          <Button
            variant="outline"
            className="cursor-pointer bg-primary text-white hover:text-primary font-semibold px-8 shadow-md border"
          >
            Contribute Now
          </Button>
        </div>

        {/* Related Stories */}
        {relatedStories.length > 0 && (
          <div className="animate-fade-in-delay-4">
            <h3 className="text-3xl font-bold text-slate-900 mb-8">
              Similar Stories
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedStories.map((relatedStory: StoryType, index: number) => (
                <Link
                  key={relatedStory.id}
                  href={`/stories/${relatedStory.id}`}
                  className="group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Card className="h-full overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white border-slate-200 cursor-pointer flex flex-col">
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
                    <div className="p-6 grow flex flex-col">
                      <h4 className="font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {relatedStory.registry_title}
                      </h4>
                      <p className="text-sm text-slate-600 mb-4 line-clamp-2 grow">
                        {relatedStory.registry_description}
                      </p>
                      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                        <span className="text-xs text-slate-500">
                          60% funded
                        </span>
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </Card>
                </Link>
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

// Helper icon for Zap
function Zap(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
    </svg>
  );
}
