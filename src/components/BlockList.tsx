
import BlockItem from "./BlockItem";
import { BlockScore } from "@/utils/api";

interface BlockListProps {
  blockScores: BlockScore;
}

const BlockList = ({ blockScores }: BlockListProps) => {
  // Feedback/suggestions based on scores
  const getFeedback = (category: string, score: number) => {
    const suggestions = {
      problem: {
        low: "Your problem definition needs more clarity. Focus on identifying a specific pain point that customers urgently need solved.",
        medium: "Your problem definition is solid but could benefit from more specificity and evidence of customer pain.",
        high: "Excellent problem definition. You've clearly identified a specific, urgent pain point."
      },
      audience: {
        low: "Your target audience is too broad. Try narrowing down to a more specific customer segment with clear demographics and psychographics.",
        medium: "Good start with your target audience. Consider further segmentation for better targeting.",
        high: "Well-defined target audience with clear characteristics. You know exactly who you're building for."
      },
      alternatives: {
        low: "You need a better understanding of existing alternatives. Research competitors and current solutions thoroughly.",
        medium: "You've identified some alternatives, but deeper competitive analysis would strengthen your positioning.",
        high: "Comprehensive understanding of the competitive landscape and alternatives."
      },
      unique_value: {
        low: "Your unique value proposition lacks clarity. What makes you truly different from alternatives?",
        medium: "Your value proposition has potential but needs to more clearly articulate your unique advantages.",
        high: "Strong, differentiated value proposition that clearly sets you apart from competitors."
      },
      solution: {
        low: "Your solution needs more development. Consider how it directly addresses the problem for your specific audience.",
        medium: "Solid solution but consider strengthening the connection to your unique value proposition.",
        high: "Well-crafted solution that elegantly addresses the problem and delivers on your value proposition."
      },
      channels: {
        low: "Your distribution strategy needs work. How will you efficiently reach your target customers?",
        medium: "You have identified some channels, but need a more comprehensive acquisition strategy.",
        high: "Strong, efficient channel strategy aligned with your target customer behavior."
      },
      revenue: {
        low: "Your revenue model needs more development. Consider if it aligns with customer willingness to pay.",
        medium: "Reasonable revenue model, but consider optimizing pricing or exploring additional revenue streams.",
        high: "Strong, sustainable revenue model with clear unit economics."
      },
      timing: {
        low: "The market timing justification isn't compelling. Why now vs. a year ago or a year from now?",
        medium: "You've identified some timing factors, but could strengthen the case for why now is optimal.",
        high: "Excellent market timing with clear catalysts or trends supporting your launch now."
      }
    };

    if (score < 60) return suggestions[category as keyof typeof suggestions].low;
    if (score < 80) return suggestions[category as keyof typeof suggestions].medium;
    return suggestions[category as keyof typeof suggestions].high;
  };

  // Format the category name for display
  const formatCategoryName = (category: string) => {
    if (category === "unique_value") return "Unique Value";
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  return (
    <div className="space-y-2">
      <h2 className="text-xl font-semibold mb-4">Detailed Analysis</h2>
      
      {Object.entries(blockScores).map(([category, score]) => (
        <BlockItem
          key={category}
          title={formatCategoryName(category)}
          score={score}
          description={getFeedback(category, score)}
        />
      ))}
    </div>
  );
};

export default BlockList;
