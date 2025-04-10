
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner"; // Import directly from sonner package, not from the UI component

export interface PMFFormProps {
  onSubmit: (formData: PMFFormData) => void;
  isLoading: boolean;
}

export interface PMFFormData {
  problem: string;
  audience: string;
  alternatives: string;
  unique_value: string;
  solution: string;
  channels: string;
  revenue: string;
  timing: string;
}

const PMFForm = ({ onSubmit, isLoading }: PMFFormProps) => {
  const [formData, setFormData] = useState<PMFFormData>({
    problem: "",
    audience: "",
    alternatives: "",
    unique_value: "",
    solution: "",
    channels: "",
    revenue: "",
    timing: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation to ensure all fields have content
    const emptyFields = Object.entries(formData)
      .filter(([_, value]) => value.trim() === "")
      .map(([key, _]) => key);
    
    if (emptyFields.length > 0) {
      toast(`Please fill in all fields: ${emptyFields.join(", ")}`);
      return;
    }
    
    onSubmit(formData);
  };

  return (
    <div className="pmf-form-container">
      <Card className="pmf-card">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-center mb-2">
            PMF Score Calculator
          </h1>
          <p className="text-center text-muted-foreground">
            Fill out the form below to evaluate your startup's product-market fit
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Problem Field */}
            <div>
              <Label htmlFor="problem" className="pmf-input-label">
                Problem
              </Label>
              <Textarea
                id="problem"
                name="problem"
                placeholder="What problem are you solving?"
                className="pmf-textarea"
                value={formData.problem}
                onChange={handleChange}
              />
            </div>

            {/* Audience Field */}
            <div>
              <Label htmlFor="audience" className="pmf-input-label">
                Target Audience
              </Label>
              <Textarea
                id="audience"
                name="audience"
                placeholder="Who is your target customer?"
                className="pmf-textarea"
                value={formData.audience}
                onChange={handleChange}
              />
            </div>

            {/* Alternatives Field */}
            <div>
              <Label htmlFor="alternatives" className="pmf-input-label">
                Current Alternatives
              </Label>
              <Textarea
                id="alternatives"
                name="alternatives"
                placeholder="What are current alternatives?"
                className="pmf-textarea"
                value={formData.alternatives}
                onChange={handleChange}
              />
            </div>

            {/* Unique Value Field */}
            <div>
              <Label htmlFor="unique_value" className="pmf-input-label">
                Unique Value Proposition
              </Label>
              <Textarea
                id="unique_value"
                name="unique_value"
                placeholder="What makes you different?"
                className="pmf-textarea"
                value={formData.unique_value}
                onChange={handleChange}
              />
            </div>

            {/* Solution Field */}
            <div>
              <Label htmlFor="solution" className="pmf-input-label">
                Solution
              </Label>
              <Textarea
                id="solution"
                name="solution"
                placeholder="What's your core solution?"
                className="pmf-textarea"
                value={formData.solution}
                onChange={handleChange}
              />
            </div>

            {/* Channels Field */}
            <div>
              <Label htmlFor="channels" className="pmf-input-label">
                Distribution Channels
              </Label>
              <Textarea
                id="channels"
                name="channels"
                placeholder="How will you reach your customers?"
                className="pmf-textarea"
                value={formData.channels}
                onChange={handleChange}
              />
            </div>

            {/* Revenue Field */}
            <div>
              <Label htmlFor="revenue" className="pmf-input-label">
                Revenue Model
              </Label>
              <Textarea
                id="revenue"
                name="revenue"
                placeholder="What's your revenue model?"
                className="pmf-textarea"
                value={formData.revenue}
                onChange={handleChange}
              />
            </div>

            {/* Timing Field */}
            <div>
              <Label htmlFor="timing" className="pmf-input-label">
                Market Timing
              </Label>
              <Textarea
                id="timing"
                name="timing"
                placeholder="Why is now the right time?"
                className="pmf-textarea"
                value={formData.timing}
                onChange={handleChange}
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Analyzing..." : "Calculate PMF Score"}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default PMFForm;
