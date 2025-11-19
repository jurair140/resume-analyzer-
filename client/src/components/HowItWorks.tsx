import { Upload, Brain, FileText } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Upload Your Resume",
    description: "Simply upload your resume in PDF, DOC, or DOCX format"
  },
  {
    icon: Brain,
    title: "AI Analysis",
    description: "Our advanced AI analyzes your resume against ATS standards and industry best practices"
  },
  {
    icon: FileText,
    title: "Get Detailed Report",
    description: "Receive a comprehensive report with score, strengths, weaknesses, and actionable suggestions"
  }
];

const HowItWorks = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground">
            Three simple steps to optimize your resume
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative text-center">
              <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-primary mb-6">
                <step.icon className="w-10 h-10 text-primary-foreground" />
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent text-accent-foreground font-bold flex items-center justify-center text-sm">
                  {index + 1}
                </div>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary to-transparent"></div>
              )}
              
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
