import { useState, useMemo } from "react";
import DisclaimerBanner from "@/components/DisclaimerBanner";
import SearchBar from "@/components/SearchBar";
import CommentCard from "@/components/CommentCard";
import CommentForm from "@/components/CommentForm";
import FounderCard from "@/components/FounderCard";
import aliceImage from "@/assets/alice.jpg";
import bobImage from "@/assets/bob.jpg";
import carolImage from "@/assets/carol.jpg";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const sampleComments = [
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      company: "TechCorp Inc.",
      comment: "VulnTech has been absolutely fantastic! The team is responsive and the platform helped us identify critical vulnerabilities before they became issues. Highly recommend their services.",
      rating: 5,
      timestamp: "2025-10-28T14:30:00Z",
      status: "published" as const,
    },
    {
      id: "2",
      name: "Mike Chen",
      email: "m.chen@example.com",
      comment: "Found a bug in the reporting module - when exporting large datasets, the CSV file gets corrupted. Otherwise great product! Hope this gets fixed soon.",
      rating: 3,
      timestamp: "2025-10-27T09:15:00Z",
      status: "published" as const,
    },
    {
      id: "3",
      name: "Anonymous User",
      email: "spam.bot@example.com",
      comment: "This is a pending comment awaiting moderation review. Contains potential spam indicators.",
      rating: 1,
      timestamp: "2025-10-29T08:00:00Z",
      status: "pending" as const,
      moderationNote: "Flagged for review - possible spam. Awaiting manual approval.",
    },
  ];

  const founders = [
    {
      name: "Alice",
      headline: "Chief Security Officer & Co-Founder",
      bio: "20+ years in cybersecurity. Previously led security teams at Fortune 500 companies. Passionate about making security accessible to all organizations.",
      email: "alice@vulntech.example",
      imageSrc: aliceImage,
      imageAlt: "Professional headshot of Alice, VulnTech co-founder, smiling woman with glasses in business casual attire",
    },
    {
      name: "Bob",
      headline: "Chief Technology Officer & Co-Founder",
      bio: "Former penetration tester turned software architect. Built enterprise security tools for over 15 years. Loves solving complex technical challenges.",
      email: "bob@vulntech.example",
      imageSrc: bobImage,
      imageAlt: "Professional headshot of Bob, VulnTech co-founder, friendly man in collared shirt",
    },
    {
      name: "Carol",
      headline: "Chief Executive Officer & Co-Founder",
      bio: "Entrepreneur with background in SaaS and security consulting. Dedicated to building tools that protect businesses. Believes security should be simple.",
      email: "carol@vulntech.example",
      imageSrc: carolImage,
      imageAlt: "Professional headshot of Carol, VulnTech co-founder, confident woman in business attire",
    },
  ];

  const filteredComments = useMemo(() => {
    if (!searchQuery.trim()) return sampleComments;
    
    const query = searchQuery.toLowerCase();
    return sampleComments.filter(
      (comment) =>
        comment.name.toLowerCase().includes(query) ||
        comment.comment.toLowerCase().includes(query) ||
        comment.company?.toLowerCase().includes(query) ||
        comment.email.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const filteredFounders = useMemo(() => {
    if (!searchQuery.trim()) return founders;
    
    const query = searchQuery.toLowerCase();
    return founders.filter(
      (founder) =>
        founder.name.toLowerCase().includes(query) ||
        founder.headline.toLowerCase().includes(query) ||
        founder.bio.toLowerCase().includes(query) ||
        founder.email.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-background">
      <DisclaimerBanner />
      
      <header className="bg-gradient-hero text-primary-foreground py-16 px-4 shadow-strong">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">VulnTech</h1>
          <p className="text-xl md:text-2xl opacity-95 mb-8">
            Fictional Security Solutions Platform
          </p>
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section id="about" className="mb-16" aria-labelledby="about-heading">
          <h2 id="about-heading" className="text-4xl font-bold mb-8 text-center">
            Meet Our Founders
          </h2>
          <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
            VulnTech was founded by three security professionals with a shared vision. 
            <strong className="text-destructive"> Remember: This is a demo company - these are fictional profiles.</strong>
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {filteredFounders.map((founder) => (
              <FounderCard key={founder.email} {...founder} />
            ))}
          </div>
        </section>

        <section id="comments" className="mb-12" aria-labelledby="comments-heading">
          <h2 id="comments-heading" className="text-4xl font-bold mb-8 text-center">
            Customer Comments & Questions
          </h2>
          
          <div className="max-w-4xl mx-auto mb-12">
            <CommentForm />
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            <h3 className="text-2xl font-semibold mb-4">Recent Comments</h3>
            {filteredComments.length > 0 ? (
              filteredComments.map((comment) => (
                <CommentCard key={comment.id} {...comment} />
              ))
            ) : (
              <p className="text-center text-muted-foreground py-12">
                No comments match your search query.
              </p>
            )}
          </div>
        </section>
      </main>

      <footer className="bg-muted border-t py-8 px-4 mt-16">
        <div className="container mx-auto text-center">
          <p className="text-sm text-muted-foreground mb-2">
            <strong>VulnTech</strong> - Fictional Demo Company
          </p>
          <p className="text-xs text-muted-foreground">
            This website is for demonstration and training purposes only. All content, contact information, and company details are entirely fictional.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
