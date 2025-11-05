import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const BookRiskCheck = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    companyName: "",
    companyEmail: "",
    companyAddress: "",
    creditCard: "",
    ipRange: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from("bookings").insert({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        company_name: formData.companyName,
        company_email: formData.companyEmail,
        company_address: formData.companyAddress,
        credit_card: formData.creditCard,
        ip_range: formData.ipRange,
      });

      if (error) throw error;

      toast({
        title: "Booking Received",
        description: "We'll contact you within 24 hours to confirm your risk check.",
      });

      // Reset form
      setFormData({
        name: "",
        phone: "",
        email: "",
        companyName: "",
        companyEmail: "",
        companyAddress: "",
        creditCard: "",
        ipRange: "",
      });
    } catch (error: any) {
      toast({
        title: "Submission failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>

        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Book Your Risk Check</h1>
          <p className="text-muted-foreground mb-8">
            Fill out the form below and we'll get started on your 48-72 hour focused pentest.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Your Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Your Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Your Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyEmail">Company Email</Label>
              <Input
                id="companyEmail"
                name="companyEmail"
                type="email"
                value={formData.companyEmail}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyAddress">Company Address</Label>
              <Textarea
                id="companyAddress"
                name="companyAddress"
                value={formData.companyAddress}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="creditCard">Credit Card Information</Label>
              <Input
                id="creditCard"
                name="creditCard"
                value={formData.creditCard}
                onChange={handleChange}
                placeholder="Card number"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ipRange">IP Range</Label>
              <Input
                id="ipRange"
                name="ipRange"
                value={formData.ipRange}
                onChange={handleChange}
                placeholder="e.g., 192.168.1.0/24"
                required
              />
            </div>

            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              {loading ? "Submitting..." : "Submit Booking Request"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookRiskCheck;
