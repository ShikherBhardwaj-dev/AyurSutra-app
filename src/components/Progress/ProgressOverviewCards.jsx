import React from "react";
import { BarChart3, Heart, TrendingUp } from "lucide-react";

const ProgressOverviewCards = ({ patientProgress }) => {
  const cards = [
    {
      title: "Sessions Completed",
      value: patientProgress.completedSessions,
      subtitle: `of ${patientProgress.totalSessions} total`,
      icon: BarChart3,
      gradient: "from-blue-500 to-blue-600",
      iconColor: "text-blue-200",
    },
    {
      title: "Wellness Score",
      value: "8.5",
      subtitle: "+0.8 from last week",
      icon: Heart,
      gradient: "from-green-500 to-green-600",
      iconColor: "text-green-200",
    },
    {
      title: "Recovery Rate",
      value: `${patientProgress.overallProgress}%`,
      subtitle: "On track",
      icon: TrendingUp,
      gradient: "from-purple-500 to-purple-600",
      iconColor: "text-purple-200",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card, index) => {
        const IconComponent = card.icon;
        return (
          <div
            key={index}
            className={`bg-gradient-to-br ${card.gradient} rounded-lg p-6 text-white`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 opacity-80">{card.title}</p>
                <p className="text-3xl font-bold">{card.value}</p>
                <p className="text-blue-100 text-sm opacity-80">
                  {card.subtitle}
                </p>
              </div>
              <IconComponent className={`h-12 w-12 ${card.iconColor}`} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProgressOverviewCards;
