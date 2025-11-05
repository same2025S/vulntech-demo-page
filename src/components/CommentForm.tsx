import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

interface CommentFormProps {
  onSubmit: (comment: {
    name: string;
    email: string;
    company?: string;
    comment: string;
    rating: number;
  }) => void;
}

const CommentForm = ({ onSubmit }: CommentFormProps) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [captchaChecked, setCaptchaChecked] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!captchaChecked) {
      toast.error("Please verify you are not a robot");
      return;
    }
    if (rating === 0) {
      toast.error("Please provide a rating");
      return;
    }
    
    const formData = new FormData(e.currentTarget);
    onSubmit({
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      company: formData.get("company") as string || undefined,
      comment: formData.get("comment") as string,
      rating,
    });
    
    e.currentTarget.reset();
    setRating(0);
    setCaptchaChecked(false);
    toast.success("Comment posted successfully!");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-card border rounded-lg p-6 shadow-soft">
      <h3 className="text-xl font-semibold mb-6">Share Your Experience</h3>
      
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div>
          <Label htmlFor="name" className="required">
            Name *
          </Label>
          <Input
            id="name"
            name="name"
            required
            placeholder="Your full name"
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="email" className="required">
            Email *
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            placeholder="your@email.com"
            className="mt-1.5"
          />
        </div>
      </div>

      <div className="mb-4">
        <Label htmlFor="company">Company (Optional)</Label>
        <Input
          id="company"
          name="company"
          placeholder="Your company name"
          className="mt-1.5"
        />
      </div>

      <div className="mb-4">
        <Label htmlFor="comment" className="required">
          Your Comment *
        </Label>
        <Textarea
          id="comment"
          name="comment"
          required
          placeholder="Share your thoughts, questions, or bug reports..."
          className="mt-1.5 min-h-[120px]"
        />
      </div>

      <div className="mb-6">
        <Label className="required mb-2 block">Rating *</Label>
        <div className="flex items-center gap-2" role="radiogroup" aria-label="Rating selection">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              className="transition-transform hover:scale-110"
              aria-label={`Rate ${star} out of 5 stars`}
            >
              <Star
                className={`h-8 w-8 transition-colors ${
                  star <= (hoveredRating || rating)
                    ? "fill-accent text-accent"
                    : "text-muted"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 mb-6">
        <Checkbox
          id="captcha"
          checked={captchaChecked}
          onCheckedChange={(checked) => setCaptchaChecked(checked === true)}
        />
        <Label htmlFor="captcha" className="font-normal cursor-pointer">
          I'm not a robot (Demo CAPTCHA)
        </Label>
      </div>

      <Button type="submit" size="lg" className="w-full">
        Submit Comment
      </Button>
      
      <p className="text-xs text-muted-foreground mt-4 text-center">
        All comments are reviewed before publishing. Spam detection is active.
      </p>
    </form>
  );
};

export default CommentForm;
