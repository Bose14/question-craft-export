
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Users, TrendingUp, Clock } from "lucide-react";

const DashboardStats = () => {
  const [stats, setStats] = useState({
    totalPapers: 0,
    activeUsers: 0,
    avgTime: 0,
    satisfaction: 0
  });

  const finalStats = {
    totalPapers: 15647,
    activeUsers: 3241,
    avgTime: 3,
    satisfaction: 98
  };

  useEffect(() => {
    // Animate counters
    const duration = 2000; // 2 seconds
    const steps = 60;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;

      setStats({
        totalPapers: Math.floor(finalStats.totalPapers * progress),
        activeUsers: Math.floor(finalStats.activeUsers * progress),
        avgTime: Math.floor(finalStats.avgTime * progress),
        satisfaction: Math.floor(finalStats.satisfaction * progress)
      });

      if (step >= steps) {
        clearInterval(timer);
        setStats(finalStats);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const statCards = [
    {
      title: "Question Papers Generated",
      value: stats.totalPapers.toLocaleString() + "+",
      icon: <FileText className="w-8 h-8" />,
      description: "Papers created by educators worldwide",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "Active Users",
      value: stats.activeUsers.toLocaleString() + "+",
      icon: <Users className="w-8 h-8" />,
      description: "Educators trusting our platform",
      gradient: "from-emerald-500 to-green-500"
    },
    {
      title: "Average Generation Time",
      value: stats.avgTime + " min",
      icon: <Clock className="w-8 h-8" />,
      description: "From upload to ready paper",
      gradient: "from-orange-500 to-red-500"
    },
    {
      title: "Satisfaction Rate",
      value: stats.satisfaction + "%",
      icon: <TrendingUp className="w-8 h-8" />,
      description: "Users rating us 5 stars",
      gradient: "from-purple-500 to-pink-500"
    }
  ];

  return (
    <section className="py-20 bg-gradient-features">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Trusted by Educators <span className="bg-gradient-primary bg-clip-text text-transparent">Worldwide</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Join thousands of educators who have revolutionized their question paper creation process
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, index) => (
            <Card key={index} className="relative overflow-hidden bg-gradient-card border-accent/20 hover:shadow-xl transition-all duration-300 hover:scale-105 group">
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-5 group-hover:opacity-10 transition-opacity`} />
              <CardHeader className="pb-3">
                <div className={`w-16 h-16 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
                  <div className="text-white">
                    {stat.icon}
                  </div>
                </div>
                <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  {stat.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground mb-2 font-mono">
                  {stat.value}
                </div>
                <p className="text-sm text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DashboardStats;
