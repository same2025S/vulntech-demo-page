import { Flag, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface CommentCardProps {
  id: string;
  name: string;
  email: string;
  company?: string;
  comment: string;
  rating: number;
  timestamp: string;
  status: "published" | "pending" | "moderation";
  moderationNote?: string;
}

const CommentCard = ({
  name,
  email,
  company,
  comment,
  rating,
  timestamp,
  status,
  moderationNote,
}: CommentCardProps) => {
  return (
    <article className="bg-card border rounded-lg p-6 shadow-soft hover:shadow-medium transition-all duration-300">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-card-foreground">{name}</h3>
            {status === "pending" && (
              <Badge variant="secondary" className="text-xs">
                Pending Review
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground truncate">
            {email} {company && `• ${company}`}
          </p>
          <div className="flex items-center gap-1 mt-2" aria-label={`Rating: ${rating} out of 5 stars`}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-4 w-4 ${
                  star <= rating ? "fill-accent text-accent" : "text-muted"
                }`}
              />
            ))}
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="flex-shrink-0"
          onClick={() => console.log("Report comment")}
          aria-label="Report inappropriate comment"
        >
          <Flag className="h-4 w-4" />
        </Button>
      </div>
      
      <div 
        className="text-card-foreground mb-3 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: comment }}
      />
      
      <time className="text-xs text-muted-foreground" dateTime={timestamp}>
        Posted: {new Date(timestamp).toLocaleString()}
      </time>
      
      {moderationNote && (
        <div className="mt-4 p-3 bg-muted rounded-md border-l-4 border-warning">
          <p className="text-xs font-medium text-muted-foreground">
            <strong>Moderator Note:</strong> {moderationNote}
          </p>
        </div>
      )}
    </article>
  );
};

export default CommentCard;
