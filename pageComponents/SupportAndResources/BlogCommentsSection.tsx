import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Typography from "@/components/ui/typography";

const DUMMY_COMMENTS = [
  {
    id: 1,
    username: "Sarah Mitchell",
    dateAdded: "Jan 15, 2025",
    comment:
      "This article was incredibly helpful! I found out about three programs I didn't know existed. Thank you for the detailed explanations.",
  },
  {
    id: 2,
    username: "James Cooper",
    dateAdded: "Dec 15, 2025",
    comment:
      "Would love to see more information about application timelines. That would really help with planning.",
  },
];

function BlogCommentsSection() {
  const [comment, setComment] = React.useState("");
  return (
    <div className="bg-white rounded-md shadow-xl p-8 md:p-12 mb-12 animate-fade-in-delay-3">
      <Typography
        variant="h3"
        size="2xl"
        className="font-bold text-slate-900 mb-8"
      >
        Leave a Comment
      </Typography>
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
        {DUMMY_COMMENTS.map((comment) => (
          <div key={comment.id} className="border-t border-slate-200 pt-8">
            <div className="flex gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-linear-to-br from-primary to-secondary"></div>
              <div className="flex-1">
                <Typography className="font-semibold text-muted-foreground">
                  {comment.username}
                </Typography>
                <Typography
                  variant="body1"
                  size="sm"
                  className="text-slate-400"
                >
                  {comment.dateAdded}
                </Typography>
              </div>
            </div>
            <Typography className="text-muted-foreground leading-relaxed">
              {comment.comment}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlogCommentsSection;
