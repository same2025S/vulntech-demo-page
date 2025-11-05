import { useState, useMemo } from "react";
import SearchBar from "@/components/SearchBar";
import CommentCard from "@/components/CommentCard";
import CommentForm from "@/components/CommentForm";
import FounderCard from "@/components/FounderCard";
import { Button } from "@/components/ui/button";
import { Shield, Clock, FileText } from "lucide-react";
import aliceImage from "@/assets/alice.jpg";
import bobImage from "@/assets/bob.jpg";
import carolImage from "@/assets/carol.jpg";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [comments, setComments] = useState([
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah.j@techcorp.com",
      company: "TechCorp Inc.",
      comment: "We needed a pentest before our Series A launch. VulnTech delivered in 3 days with a crystal-clear one-pager that our CTO could action immediately. Found 2 critical issues we missed. Worth every penny.",
      rating: 5,
      timestamp: "2025-10-15T14:30:00Z",
      status: "published" as const,
    },
    {
      id: "2",
      name: "Mike Chen",
      email: "m.chen@startupxyz.io",
      company: "StartupXYZ",
      comment: "The 30-minute risk check was eye-opening. They spotted our top 3 vulnerabilities in a week, exactly as promised. Now scheduling the full 72-hour engagement for our payment API.",
      rating: 5,
      timestamp: "2025-10-20T09:15:00Z",
      status: "published" as const,
    },
    {
      id: "3",
      name: "David Martinez",
      email: "dmartinez@cloudservices.com",
      company: "CloudServices Ltd",
      comment: "Finally, a pentest company that speaks our language. No 6-week wait times, no bloated reports. Just the critical stuff we need to fix this sprint. The technical appendix helped our devs understand context too.",
      rating: 5,
      timestamp: "2025-10-22T16:45:00Z",
      status: "published" as const,
    },
  ]);

  const founders = [
    {
      name: "Alice Wisemen",
      headline: "Chief Security Officer & Co-Founder",
      bio: "Ex-FAANG security lead with 20+ years pentesting at scale. Built the process that lets us validate findings by hand in 48 hours without cutting corners.",
      email: "alicewisemen@vulntech.com",
      imageSrc: aliceImage,
      imageAlt: "Alice Wisemen, Chief Security Officer at VulnTech",
    },
    {
      name: "Bob Backer",
      headline: "Lead Penetration Tester & Co-Founder",
      bio: "Former red-team operator who's seen every CVE twice. Believes the best pentest report fits on one page and gets fixed in one sprint.",
      email: "bobbacker@vulntech.com",
      imageSrc: bobImage,
      imageAlt: "Bob Backer, Lead Penetration Tester at VulnTech",
    },
    {
      name: "Carol Smith",
      headline: "CEO & Co-Founder",
      bio: "Shipped 4 SaaS products, dealt with 4 breaches. Started VulnTech because traditional pentests take too long and say too little. Speed + clarity wins.",
      email: "csmith@vulntech.com",
      imageSrc: carolImage,
      imageAlt: "Carol Smith, CEO at VulnTech",
    },
  ];

  const handleCommentSubmit = (newComment: {
    name: string;
    email: string;
    company?: string;
    comment: string;
    rating: number;
  }) => {
    const comment = {
      id: Date.now().toString(),
      name: newComment.name,
      email: newComment.email,
      company: newComment.company,
      comment: newComment.comment,
      rating: newComment.rating,
      timestamp: new Date().toISOString(),
      status: "published" as const,
    };
    setComments([comment, ...comments]);
  };

  const filteredComments = useMemo(() => {
    if (!searchQuery.trim()) return comments;
    
    const query = searchQuery.toLowerCase();
    return comments.filter(
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
      <header className="bg-gradient-hero text-primary-foreground py-20 px-4 shadow-strong">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">VulnTech</h1>
            <p className="text-xl md:text-2xl leading-relaxed mb-8 opacity-95">
              Hi — we're VulnTech. Think of us as the short, sharp fire alarm for your release: loud enough to wake you, and precise enough to tell you which room.
            </p>
            <p className="text-lg md:text-xl leading-relaxed opacity-90 mb-8">
              In <strong>48–72 hours</strong> we run a focused pentest, validate findings by hand, and hand you a <strong>prioritized one-pager</strong> plus a technical appendix. No long engagements, no jargon — just the risks you need to fix this sprint.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
                Book Free 30-Min Risk Check
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-white/10 border-white/20 hover:bg-white/20 text-white">
                See Sample Report
              </Button>
            </div>
            <p className="text-sm opacity-80">
              <strong>Remember:</strong> All tests are authorized and safely scoped.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <Clock className="h-12 w-12 mx-auto mb-3" />
              <h3 className="font-bold text-lg mb-2">48-72 Hours</h3>
              <p className="text-sm opacity-90">Fast turnaround, no waiting weeks</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <Shield className="h-12 w-12 mx-auto mb-3" />
              <h3 className="font-bold text-lg mb-2">Hand-Validated</h3>
              <p className="text-sm opacity-90">Every finding verified by experts</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <FileText className="h-12 w-12 mx-auto mb-3" />
              <h3 className="font-bold text-lg mb-2">One-Pager + Appendix</h3>
              <p className="text-sm opacity-90">Prioritized for your sprint cycle</p>
            </div>
          </div>
          
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section id="about" className="mb-16" aria-labelledby="about-heading">
          <h2 id="about-heading" className="text-4xl font-bold mb-8 text-center">
            Meet the Team
          </h2>
          <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
            Three pentesters who got tired of slow, bloated security reports. We built the service we'd want to use: fast, focused, and brutally clear.
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
            <CommentForm onSubmit={handleCommentSubmit} />
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

      <footer className="bg-muted border-t py-12 px-4 mt-16">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">Ready to find what's broken before your users do?</h3>
            <p className="text-muted-foreground mb-6">
              Book a free 30-minute risk check and we'll show you your top three issues in one week.
            </p>
            <Button size="lg" className="text-lg px-8">
              Schedule Your Risk Check
            </Button>
          </div>
          <div className="text-center border-t pt-6">
            <p className="text-sm text-muted-foreground mb-2">
              <strong>VulnTech</strong> — Fast, focused penetration testing
            </p>
            <p className="text-xs text-muted-foreground">
              All tests are authorized and safely scoped. © 2025 VulnTech. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
