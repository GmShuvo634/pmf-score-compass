
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScoreResponse, formatBlockScoresForChart } from "@/utils/api";
import RadarChart from "./RadarChart";
import BlockList from "./BlockList";
import { RefreshCw } from "lucide-react";

interface ScoreResultProps {
  scoreData: ScoreResponse;
  onReset: () => void;
}

const ScoreResult = ({ scoreData, onReset }: ScoreResultProps) => {
  const { labels, data } = formatBlockScoresForChart(scoreData.block_scores);

  // Function to determine score color
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 dark:text-green-400";
    if (score >= 60) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  return (
    <div className="pmf-result-container">
      <Card className="pmf-card mb-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">Your PMF Score</h2>
          <div className="flex flex-col items-center justify-center">
            <div className="text-5xl font-bold my-4 flex items-baseline">
              <span className={getScoreColor(scoreData.pmf_score)}>
                {scoreData.pmf_score}
              </span>
              <span className="text-xl text-muted-foreground">/100</span>
            </div>
          </div>
          <div className="text-sm text-muted-foreground max-w-2xl mx-auto bg-muted/50 p-4 rounded-lg">
            {scoreData.summary}
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4 text-center">Score Breakdown</h3>
          <RadarChart labels={labels} data={data} />
        </div>

        <BlockList blockScores={scoreData.block_scores} />

        <div className="mt-6 text-center">
          <Button onClick={onReset} className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Start Over
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ScoreResult;
