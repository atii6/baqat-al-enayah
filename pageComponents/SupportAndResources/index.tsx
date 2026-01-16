"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FeaturedBlogCard from "./FeaturedBlogCard";
import CategoryFilters from "./CategoryFilters";
import BlogCard from "./BlogCard";
import NoBlogsFoundCard from "./NoBlogsFoundCard";
import PagesHeroSection from "@/components/shared/PagesHeroSection";
import SearchField from "@/components/shared/SearchField";

export const BLOG_POSTS = [
  {
    id: 1,
    title: "Understanding Financial Aid Options for Medical Treatment",
    excerpt:
      "Explore various financial assistance programs available for patients needing medical care and treatment options.",
    category: "Financial Aid",
    author: "Dr. Sarah Chen",
    date: "Jan 15, 2025",
    readTime: "5 min",
    image:
      "https://images.unsplash.com/photo-1609220136736-443140cffec6?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    featured: true,
    content: "",
    likes: 234,
    comments: 18,
  },
  {
    id: 2,
    title: "Childcare Support Services: What You Need to Know",
    excerpt:
      "Comprehensive guide to accessing childcare assistance programs during medical treatment.",
    category: "Childcare",
    author: "Emma Rodriguez",
    date: "Jan 12, 2025",
    readTime: "4 min",
    image:
      "https://images.unsplash.com/photo-1501686637-b7aa9c48a882?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: "",
    likes: 156,
    comments: 12,
  },
  {
    id: 3,
    title: "Essential Medical Products and Where to Get Them",
    excerpt:
      "A detailed review of recommended medical products and assistance programs to obtain them.",
    category: "Products",
    author: "Michael Torres",
    date: "Jan 10, 2025",
    readTime: "6 min",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: "",
    likes: 198,
    comments: 24,
  },
  {
    id: 4,
    title: "Cash Donation Programs: How to Apply Successfully",
    excerpt:
      "Step-by-step guide to applying for emergency cash assistance and donation programs.",
    category: "Donations",
    author: "Lisa Johnson",
    date: "Jan 8, 2025",
    readTime: "7 min",
    image:
      "https://images.unsplash.com/photo-1527788263495-3518a5c1c42d?q=80&w=1808&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: "",
    likes: 287,
    comments: 31,
  },
  {
    id: 5,
    title: "Managing Healthcare Costs: Budget-Friendly Tips",
    excerpt:
      "Practical strategies to manage and reduce your healthcare expenses without compromising quality care.",
    category: "Financial Aid",
    author: "Dr. James Wilson",
    date: "Jan 5, 2025",
    readTime: "5 min",
    image:
      "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: "",
    likes: 142,
    comments: 8,
  },
  {
    id: 6,
    title: "Nutrition Tips for Recovery and Wellness",
    excerpt:
      "Expert nutritional guidance to support your recovery journey and overall health.",
    category: "Wellness",
    author: "Dr. Patricia Lee",
    date: "Jan 2, 2025",
    readTime: "6 min",
    image:
      "https://images.unsplash.com/photo-1600618528240-fb9fc964b853?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: "",
    likes: 203,
    comments: 19,
  },
  {
    id: 7,
    title: "Supporting a Loved One Through Treatment",
    excerpt:
      "Guidance for caregivers and family members supporting patients during medical treatment.",
    category: "Support",
    author: "Emma Rodriguez",
    date: "Dec 28, 2024",
    readTime: "5 min",
    image:
      "https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: "",
    likes: 312,
    comments: 28,
  },
  {
    id: 8,
    title: "Mental Health Resources for Patients",
    excerpt:
      "Comprehensive resources and support services for mental health during medical journeys.",
    category: "Support",
    author: "Dr. Marcus Brown",
    date: "Dec 25, 2024",
    readTime: "4 min",
    image:
      "https://images.unsplash.com/photo-1544027993-37dbfe43562a?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: "",
    likes: 167,
    comments: 14,
  },
];

function SupportAndResourcesPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("All");
  const [likedPosts, setLikedPosts] = React.useState<number[]>([]);

  const filteredPosts = React.useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const featuredPost =
    BLOG_POSTS.find((post) => post.featured) || filteredPosts[0];
  const gridPosts = filteredPosts.filter(
    (post) => post.id !== featuredPost?.id
  );

  const toggleLike = (postId: number) => {
    setLikedPosts((prev) =>
      prev.includes(postId)
        ? prev.filter((id) => id !== postId)
        : [...prev, postId]
    );
  };

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <PagesHeroSection
        title="Care & Compassion Journals"
        description="Stories, guidance, and insights to support patients, families, and
          those who care for them."
      />

      {/* Main Content */}
      <div className="relative px-4 md:px-8 lg:px-16 py-16">
        {featuredPost && <FeaturedBlogCard featuredPost={featuredPost} />}

        <div className="mb-12 animate-fade-in-delay-2">
          <div className="relative">
            <SearchField
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              placeholder="Search articles, authors, topics..."
            />
          </div>
        </div>

        {/* Category Tags */}
        <CategoryFilters
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        {/* Blog Posts Grid */}
        {gridPosts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gridPosts.map((post, index) => (
              <BlogCard
                key={index}
                blogPost={post}
                index={index}
                likedPosts={likedPosts}
                onLike={toggleLike}
              />
            ))}
          </div>
        ) : (
          <NoBlogsFoundCard
            setSearchQuery={setSearchQuery}
            setSelectedCategory={setSelectedCategory}
          />
        )}
      </div>

      {/* Footer CTA */}
      {/* Updated footer gradient to use primary and secondary brand colors */}
      <div className="mt-20 bg-linear-to-r from-primary via-secondary to-primary text-white py-16 px-6 rounded-t-4xl">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-4">
            Subscribe for More Support Resources
          </h3>
          <p className="text-white/90 mb-8">
            Get the latest articles and healthcare tips delivered to your inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              placeholder="Your email address"
              type="email"
              className="bg-white/20 border-white/30 text-white placeholder:text-white/50 rounded-md py-3"
            />
            {/* Updated subscribe button to use secondary color */}
            <Button
              variant="outline"
              className="bg-primary text-white hover:text-primary border-0 font-semibold rounded-md px-8 h-12"
            >
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SupportAndResourcesPage;
