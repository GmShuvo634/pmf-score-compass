
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface BlockItemProps {
  title: string;
  score: number;
  description: string;
}

const BlockItem = ({ title, score, description }: BlockItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Color gradient based on score
  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <Card
      className={cn(
        "border p-4 mb-3 transition-all duration-200",
        isExpanded ? "shadow-md" : "shadow-sm"
      )}
    >
      <div 
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <div className={`${getScoreColor(score)} w-10 h-10 rounded-full flex items-center justify-center text-white font-medium`}>
            {score}
          </div>
          <h3 className="font-medium">{title}</h3>
        </div>
        <button
          type="button"
          className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          aria-expanded={isExpanded}
          aria-label={isExpanded ? "Collapse" : "Expand"}
        >
          {isExpanded ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </button>
      </div>

      {isExpanded && (
        <div className="mt-3 pt-3 border-t text-sm text-muted-foreground">
          <p>{description}</p>
        </div>
      )}
    </Card>
  );
};

export default BlockItem;
