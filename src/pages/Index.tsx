
import { useState } from "react";
import { ScoreResponse, scorePMF } from "@/utils/api";
import PMFForm, { PMFFormData } from "@/components/PMFForm";
import ScoreResult from "@/components/ScoreResult";
import ThemeToggle from "@/components/ThemeToggle";
import { Toaster } from "@/components/ui/sonner";

const Index = () => {
  const [scoreData, setScoreData] = useState<ScoreResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (formData: PMFFormData) => {
    try {
      setIsLoading(true);
      const response = await scorePMF(formData);
      setScoreData(response);
    } catch (error) {
      console.error("Error scoring PMF:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setScoreData(null);
  };

  return (
    <main className="min-h-screen pb-12">
      <header className="border-b">
        <div className="pmf-container flex justify-between items-center py-4">
          <h1 className="text-xl font-bold text-primary">PMF Score Compass</h1>
          <ThemeToggle />
        </div>
      </header>
      
      <div className="pmf-container mt-8">
        {scoreData ? (
          <ScoreResult scoreData={scoreData} onReset={handleReset} />
        ) : (
          <PMFForm onSubmit={handleSubmit} isLoading={isLoading} />
        )}
      </div>
      
      <Toaster position="top-center" />
    </main>
  );
};

export default Index;
