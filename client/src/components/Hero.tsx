import { Button } from "@/components/ui/button";
import { Upload, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  
  return (
    <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden bg-gradient-to-r from-[#9209cc33] to-[#ffffff]">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            <span>AI-Powered Resume Analysis</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            Get Your{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              ATS Score
            </span>
            {" "}Instantly
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Upload your resume and get comprehensive AI-powered analysis including 
            ATS compatibility score, strengths, weaknesses, and personalized improvement suggestions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button size="lg" className="gap-2 text-lg px-8 py-6" onClick={() => navigate('/upload')}>
              <Upload className="w-5 h-5" />
              Analyze Resume
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6" onClick={() => navigate('/results')}>
              View Sample Report
            </Button>
          </div>
          
          <div className="pt-8 flex items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <span>Free Analysis</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <span>Instant Results</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <span>AI-Powered</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
