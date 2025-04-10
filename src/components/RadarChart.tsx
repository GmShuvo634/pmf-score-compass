
import { useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions
} from "chart.js";
import { Radar } from "react-chartjs-2";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface RadarChartProps {
  labels: string[];
  data: number[];
}

const RadarChart = ({ labels, data }: RadarChartProps) => {
  // Fix: Use correct type for the chart ref
  const chartRef = useRef<ChartJS<"radar"> | null>(null);
  
  // Check if dark mode is enabled
  const isDarkMode = document.documentElement.classList.contains("dark");
  
  // Update chart colors when theme changes
  useEffect(() => {
    const observer = new MutationObserver(() => {
      if (chartRef.current) {
        const darkMode = document.documentElement.classList.contains("dark");
        const gridColor = darkMode ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.1)";
        const textColor = darkMode ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.8)";
        
        // Update chart options
        chartRef.current.options.scales = {
          r: {
            grid: {
              color: gridColor
            },
            pointLabels: {
              color: textColor
            },
            angleLines: {
              color: gridColor
            }
          }
        };
        
        // Update and redraw
        chartRef.current.update();
      }
    });
    
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);
  
  const gridColor = isDarkMode ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.1)";
  const textColor = isDarkMode ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.8)";
  
  const chartData = {
    labels,
    datasets: [
      {
        label: "PMF Score Components",
        data,
        backgroundColor: "rgba(139, 92, 246, 0.3)",
        borderColor: "rgba(139, 92, 246, 1)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(139, 92, 246, 1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(139, 92, 246, 1)",
      },
    ],
  };

  const chartOptions = {
    scales: {
      r: {
        beginAtZero: true,
        min: 0,
        max: 100,
        ticks: {
          stepSize: 20,
          showLabelBackdrop: false,
          color: textColor,
        },
        grid: {
          color: gridColor,
        },
        pointLabels: {
          color: textColor,
          font: {
            size: 12,
          },
        },
        angleLines: {
          color: gridColor,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    responsive: true,
    maintainAspectRatio: true,
  };

  return (
    <div className="aspect-square max-w-md mx-auto my-4">
      <Radar 
        data={chartData} 
        options={chartOptions}
        ref={chartRef}
      />
    </div>
  );
};

export default RadarChart;
