import React from "react";
import { Button } from "@/components/ui/button";
import { DUMMY_STORIES } from "../LandingPage/FamilyCardCarousel";
import PagesHeroSection from "@/components/shared/PagesHeroSection";
import FamilyStoryCard from "../LandingPage/HeroSection/FamilyStoryCard";
import Typography from "@/components/ui/typography";
import SearchField from "@/components/shared/SearchField";
import { useCreateCareRegistryModal } from "@/context/CreateRegistryModalContext";

export const STORY_CATEGORIES = [
  "All",
  "Medical Emergency",
  "Childcare",
  "Cancer Treatment",
  "Living Expenses",
  "Nutrition",
  "Caregiver Support",
  "Mental Health",
];

function CareStoriesPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("All");
  const { openModal } = useCreateCareRegistryModal();

  const filteredStories = React.useMemo(() => {
    return DUMMY_STORIES.filter((story) => {
      const matchesSearch =
        story.registry_title
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        story.registry_description
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        story.organizer_name
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        story.story.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || story.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  // const toggleLike = (storyId: number) => {
  //   setLikedStories((prev) =>
  //     prev.includes(storyId)
  //       ? prev.filter((id) => id !== storyId)
  //       : [...prev, storyId]
  //   );
  // };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-slate-50">
      {/* Header Section */}
      <PagesHeroSection
        title="Patient Care Stories"
        description="Real stories of families receiving support and finding hope during
            their healthcare journey"
      />

      {/* Main Content */}
      <div className="relative w-full px-4 md:px-8 lg:px-16 py-16">
        {/* Search Section */}
        <div className="mb-12 animate-fade-in-delay-2">
          <div className="relative">
            <SearchField
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              placeholder="Search by family name, story, or support type..."
            />
          </div>
        </div>

        {/* Category Tags */}
        <div className="mb-16 animate-fade-in-delay-3">
          <p className="text-sm font-semibold text-slate-600 mb-4">
            Filter by support type
          </p>
          <div className="flex flex-wrap gap-3">
            {STORY_CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === category
                    ? "bg-linear-to-r from-primary to-secondary text-white shadow-lg scale-105"
                    : "bg-white text-slate-700 border-2 border-slate-200 hover:border-primary/50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Stories Grid */}
        {filteredStories.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-8">
            {filteredStories.map((story, index) => (
              <div
                key={story.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 75}ms` }}
              >
                <FamilyStoryCard story={story} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 animate-fade-in">
            <h3 className="text-2xl font-bold text-slate-900 mb-3">
              No stories found
            </h3>
            <p className="text-slate-600 mb-8">
              Try adjusting your search or filter criteria
            </p>
            <Button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="bg-primary hover:bg-primary/90 text-white border-0"
            >
              Reset Filters
            </Button>
          </div>
        )}
      </div>

      {/* CTA Footer */}
      <div className="mt-20 bg-linear-to-r from-primary via-secondary to-primary text-white py-16 px-6 rounded-t-4xl">
        <div className="w-full text-center space-y-4">
          <div className="space-y-2">
            <Typography size="3xl" className="font-bold">
              Share Your Story
            </Typography>
            <Typography variant="body1" className="text-primary-foreground">
              Do you have a care story to share? We&apos;d love to hear from you
              and help connect you with support.
            </Typography>
          </div>

          <Button
            variant="outline"
            className="cursor-pointer bg-primary text-white hover:text-primary border-0 font-semibold rounded-md px-8 h-12"
            onClick={() => openModal()}
          >
            Create Your Registry
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CareStoriesPage;
