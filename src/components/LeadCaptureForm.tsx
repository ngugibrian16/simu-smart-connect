import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { UserPlus, Phone, DollarSign, MessageSquare } from "lucide-react";

interface LeadCaptureFormProps {
  onSubmit?: (leadData: LeadFormData) => void;
}

export interface LeadFormData {
  name: string;
  phone: string;
  budget: string;
  interest: string;
  notes?: string;
}

export const LeadCaptureForm = ({ onSubmit }: LeadCaptureFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<LeadFormData>({
    name: '',
    phone: '',
    budget: '',
    interest: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const budgetRanges = [
    { value: '10000-20000', label: 'KES 10,000 - 20,000' },
    { value: '20000-35000', label: 'KES 20,000 - 35,000' },
    { value: '35000-50000', label: 'KES 35,000 - 50,000' },
    { value: '50000-75000', label: 'KES 50,000 - 75,000' },
    { value: '75000+', label: 'KES 75,000+' },
  ];

  const interestTypes = [
    { value: 'individual', label: 'Personal Use' },
    { value: 'business', label: 'Business/Work' },
    { value: 'bulk', label: 'Bulk Order (5+ units)' },
    { value: 'family', label: 'Family Package' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Basic validation
      if (!formData.name || !formData.phone || !formData.budget || !formData.interest) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required fields.",
          variant: "destructive",
        });
        return;
      }

      // Phone validation (basic Kenyan format)
      const phoneRegex = /^(\+254|0)[7-9]\d{8}$/;
      if (!phoneRegex.test(formData.phone)) {
        toast({
          title: "Invalid Phone Number",
          description: "Please enter a valid Kenyan phone number.",
          variant: "destructive",
        });
        return;
      }

      // Simulate submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onSubmit?.(formData);
      
      toast({
        title: "Lead Captured Successfully!",
        description: "We'll contact you within 24 hours with personalized smartphone recommendations.",
      });

      // Reset form
      setFormData({
        name: '',
        phone: '',
        budget: '',
        interest: '',
        notes: ''
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit your information. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="card-elevated">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <UserPlus className="w-5 h-5 text-primary" />
          <span>Get Personalized Recommendations</span>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Tell us what you're looking for and we'll find the perfect smartphone for your needs and budget.
        </p>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center space-x-1">
              <Phone className="w-4 h-4" />
              <span>Phone Number *</span>
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="0712345678 or +254712345678"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center space-x-1">
              <DollarSign className="w-4 h-4" />
              <span>Budget Range *</span>
            </Label>
            <Select value={formData.budget} onValueChange={(value) => setFormData({ ...formData, budget: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select your budget range" />
              </SelectTrigger>
              <SelectContent>
                {budgetRanges.map((range) => (
                  <SelectItem key={range.value} value={range.value}>
                    {range.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Purchase Type *</Label>
            <Select value={formData.interest} onValueChange={(value) => setFormData({ ...formData, interest: value })}>
              <SelectTrigger>
                <SelectValue placeholder="What are you buying for?" />
              </SelectTrigger>
              <SelectContent>
                {interestTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes" className="flex items-center space-x-1">
              <MessageSquare className="w-4 h-4" />
              <span>Additional Notes (Optional)</span>
            </Label>
            <Textarea
              id="notes"
              placeholder="Any specific requirements, preferred brands, or questions?"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Get My Recommendations'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};