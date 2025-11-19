import { Card } from "@/components/ui/card";
import { Target, TrendingUp, FileCheck, Lightbulb, Zap, Shield } from "lucide-react";

const features = [
  {
    icon: Target,
    title: "ATS Compatibility Score",
    description: "Get an accurate score showing how well your resume passes Applicant Tracking Systems used by recruiters."
  },
  {
    icon: TrendingUp,
    title: "Strengths Analysis",
    description: "Discover what makes your resume stand out with detailed analysis of your strongest points."
  },
  {
    icon: FileCheck,
    title: "Weakness Detection",
    description: "Identify areas that might hurt your chances and understand exactly what needs improvement."
  },
  {
    icon: Lightbulb,
    title: "Smart Suggestions",
    description: "Receive AI-powered recommendations tailored to your industry and target role."
  },
  {
    icon: Zap,
    title: "Instant Analysis",
    description: "Upload and get comprehensive results in seconds, no waiting required."
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "Your resume data is processed securely and never stored or shared with third parties."
  }
];

const Features = () => {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Powerful Features for Your Success
          </h2>
          <p className="text-xl text-muted-foreground">
            Everything you need to optimize your resume and land your dream job
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="p-6 hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20 bg-card"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
