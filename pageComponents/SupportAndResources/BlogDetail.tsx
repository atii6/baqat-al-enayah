"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Heart,
  MessageCircle,
  Share2,
  Calendar,
  User,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { BLOG_POSTS } from ".";
import Image from "next/image";
import { useRouter } from "next/router";
import RelatedBlogsCard from "./RelatedBlogsCard";
import Typography from "@/components/ui/typography";

function BlogDetailPage() {
  console.log("BlogDetailPage");
  const router = useRouter();
  const { id } = router.query;
  const blogID = id ? parseInt(id.toString()) : null;
  const post = React.useMemo(
    () => BLOG_POSTS.find((p) => p.id === blogID),
    [blogID]
  );

  const [isLiked, setIsLiked] = React.useState(false);
  const [comment, setComment] = React.useState("");
  const [likes, setLikes] = React.useState(post ? post.likes : 0);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 to-slate-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Post Not Found
          </h1>
          <p className="text-slate-600 mb-8">
            The blog post you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link href="/blog">
            <Button className="bg-primary hover:bg-primary/90 text-white">
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const relatedPosts = BLOG_POSTS.filter(
    (p) => p.category === post.category && p.id !== post.id
  ).slice(0, 3);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-slate-50">
      {/* Header with Back Button */}
      <div className="bg-linear-to-r from-primary via-secondary to-primary text-white">
        <div className="w-3/5 mx-auto px-6 py-20">
          <Link
            href="/blog"
            className="flex items-center gap-2 text-white/90 hover:text-white transition-colors mb-6 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Blog</span>
          </Link>
          <div className="animate-fade-in">
            <Badge className="bg-white/30 text-white border-white/50 mb-4">
              {post.category}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{post.readTime} read</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Featured Image */}
        <div className="mb-12 animate-fade-in-delay">
          <div className="relative overflow-hidden rounded-2xl h-96 md:h-125 bg-slate-100 group">
            <Image
              src={post.image || "/placeholder.svg"}
              alt={post.title}
              width={200}
              height={200}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12 animate-fade-in-delay-2">
          <div className="prose prose-lg max-w-none text-slate-700 leading-relaxed">
            {post.content ? (
              <div
                dangerouslySetInnerHTML={{ __html: post.content }}
                className="space-y-6"
              />
            ) : (
              <p>{post.excerpt}</p>
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
                <MessageCircle className="w-6 h-6 text-slate-400" />
                <span className="font-semibold text-slate-700">
                  {post.comments}
                </span>
              </button>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors duration-300">
              <Share2 className="w-6 h-6 text-slate-400" />
              <span className="font-semibold text-slate-700">Share</span>
            </button>
          </div>
        </div>

        {/* Comments Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12 animate-fade-in-delay-3">
          <h3 className="text-2xl font-bold text-slate-900 mb-8">
            Leave a Comment
          </h3>
          <div className="space-y-4">
            <Textarea
              placeholder="Share your thoughts and experiences..."
              className="min-h-32 resize-none border-2 border-slate-200 rounded-lg focus:border-primary"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button className="bg-primary hover:bg-primary/90 text-white w-full sm:w-auto">
              Post Comment
            </Button>
          </div>

          {/* Sample Comments */}
          <div className="mt-12 space-y-6">
            <div className="border-t border-slate-200 pt-8">
              <div className="flex gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-linear-to-br from-primary to-secondary"></div>
                <div className="flex-1">
                  <h4 className="font-semibold text-slate-900">
                    Sarah Mitchell
                  </h4>
                  <p className="text-sm text-slate-500">2 days ago</p>
                </div>
              </div>
              <p className="text-slate-700 leading-relaxed">
                This article was incredibly helpful! I found out about three
                programs I didn&apos;t know existed. Thank you for the detailed
                explanations.
              </p>
            </div>

            <div className="border-t border-slate-200 pt-8">
              <div className="flex gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-linear-to-br from-secondary to-primary"></div>
                <div className="flex-1">
                  <h4 className="font-semibold text-slate-900">James Cooper</h4>
                  <p className="text-sm text-slate-500">1 week ago</p>
                </div>
              </div>
              <p className="text-slate-700 leading-relaxed">
                Would love to see more information about application timelines.
                That would really help with planning.
              </p>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="animate-fade-in-delay-4">
            <Typography size="3xl" className="font-bold text-slate-900 mb-8">
              Related Articles
            </Typography>

            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost, index) => (
                <RelatedBlogsCard
                  key={relatedPost.id}
                  relatedPost={relatedPost}
                  index={index}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* CTA Footer */}
      <div className="mt-20 bg-linear-to-r from-primary via-secondary to-primary text-white py-16 px-6">
        <div className="w-full text-center space-y-8">
          <div className="space-y-4">
            <Typography variant="h3" size="3xl" className="font-bold">
              Need More Support?
            </Typography>
            <Typography variant="body1" className="text-white/90">
              Browse more articles or contact our support team for personalized
              assistance
            </Typography>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/blog">
              <Button
                variant="outline"
                className="bg-primary text-white hover:text-primary border-0 font-semibold rounded-md px-8 h-12"
              >
                View All Articles
              </Button>
            </Link>
            <Button
              variant="outline"
              className="bg-primary text-white hover:text-primary border-0 font-semibold rounded-md px-8 h-12"
            >
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogDetailPage;
