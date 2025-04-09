
interface PMFFormData {
  problem: string;
  audience: string;
  alternatives: string;
  unique_value: string;
  solution: string;
  channels: string;
  revenue: string;
  timing: string;
}

export interface BlockScore {
  problem: number;
  audience: number;
  alternatives: number;
  unique_value: number;
  solution: number;
  channels: number;
  revenue: number;
  timing: number;
}

export interface ScoreResponse {
  pmf_score: number;
  summary: string;
  block_scores: BlockScore;
}

// For development: mocked API response
const mockResponse: ScoreResponse = {
  pmf_score: 73,
  summary: "Your startup idea shows strong potential with a clear problem definition and target audience. To improve, focus on strengthening your unique value proposition and distribution channels strategy.",
  block_scores: {
    problem: 85,
    audience: 80,
    alternatives: 70,
    unique_value: 60,
    solution: 75,
    channels: 65,
    revenue: 78,
    timing: 72
  }
};

export const scorePMF = async (formData: PMFFormData): Promise<ScoreResponse> => {
  try {
    // In production, uncomment this code to use the actual API
    /*
    const response = await fetch("http://localhost:3001/api/score", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
    */
    
    // For development, use mocked response
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockResponse), 1000);
    });
  } catch (error) {
    console.error("Error scoring PMF:", error);
    throw error;
  }
};

// Convert block scores to format needed for radar chart
export const formatBlockScoresForChart = (blockScores: BlockScore) => {
  const labels = [
    "Problem",
    "Audience",
    "Alternatives",
    "Unique Value",
    "Solution",
    "Channels",
    "Revenue",
    "Timing",
  ];
  
  const data = [
    blockScores.problem,
    blockScores.audience,
    blockScores.alternatives,
    blockScores.unique_value,
    blockScores.solution,
    blockScores.channels,
    blockScores.revenue,
    blockScores.timing,
  ];
  
  return { labels, data };
};
