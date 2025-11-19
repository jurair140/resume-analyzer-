import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CTA = () => {
  const navigate = useNavigate();
  
  return (
    <section className="py-24 bg-gradient-primary relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center text-primary-foreground">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Optimize Your Resume?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Get instant AI-powered analysis and take the first step toward landing your dream job
          </p>
          
          <Button 
            size="lg" 
            variant="secondary"
            className="gap-2 text-lg px-8 py-6 shadow-xl hover:shadow-2xl transition-all"
            onClick={() => navigate('/upload')}
          >
            Analyze Your Resume Now
            <ArrowRight className="w-5 h-5" />
          </Button>
          
          <p className="text-sm mt-6 opacity-80">
            No credit card required • Free analysis • Results in seconds
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTA;
