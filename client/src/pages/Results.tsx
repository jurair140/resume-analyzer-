import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ScoreCircle from "@/components/ScoreCircle";
import { ArrowLeft, Download, TrendingUp, AlertCircle, Lightbulb, CheckCircle2 } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

// Mock data - will be replaced with actual AI analysis
const mockResults = {
  atsScore: 78,
  strengths: [
    {
      title: "Strong Technical Skills Section",
      description: "Your technical skills are well-organized and include relevant keywords that ATS systems look for.",
      impact: "high"
    },
    {
      title: "Clear Work Experience",
      description: "Work history is presented in reverse chronological order with clear job titles and dates.",
      impact: "high"
    },
    {
      title: "Quantifiable Achievements",
      description: "Good use of metrics and numbers to demonstrate impact in previous roles.",
      impact: "medium"
    }
  ],
  weaknesses: [
    {
      title: "Inconsistent Formatting",
      description: "Some sections use different font sizes and styles, which can confuse ATS parsers.",
      impact: "high",
      fix: "Use consistent formatting throughout your resume"
    },
    {
      title: "Missing Keywords",
      description: "Your resume lacks some important industry-specific keywords that appear in job descriptions.",
      impact: "medium",
      fix: "Add relevant keywords from target job descriptions"
    },
    {
      title: "Generic Objective Statement",
      description: "Your objective statement is too broad and doesn't target specific roles.",
      impact: "low",
      fix: "Replace with a targeted professional summary"
    }
  ],
  suggestions: [
    "Add a 'Certifications' section if you have relevant professional certifications",
    "Include links to your portfolio, GitHub, or LinkedIn profile",
    "Use action verbs at the beginning of each bullet point (e.g., 'Led', 'Developed', 'Implemented')",
    "Tailor your resume for each application by matching keywords from the job description",
    "Remove personal information like age, marital status, or photo unless specifically requested"
  ]
};

const Results = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get results from navigation state, fallback to mock data
  const results = location.state?.analysisResults || mockResults;

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-primary text-primary-foreground';
      case 'medium': return 'bg-yellow-500 text-white';
      case 'low': return 'bg-blue-500 text-white';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/upload')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Upload New Resume
          </Button>
          
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Download Report
          </Button>
        </div>

        <div className="max-w-6xl mx-auto space-y-8">
          {/* Score Section */}
          <Card className="p-8 text-center">
            <h1 className="text-3xl font-bold mb-8">Your ATS Resume Analysis</h1>
            <ScoreCircle score={results.atsScore} size={220} strokeWidth={14} />
            <p className="mt-6 text-muted-foreground max-w-2xl mx-auto">
              Your resume has good ATS compatibility. Follow the suggestions below to improve your score and increase your chances of landing interviews.
            </p>
          </Card>

          {/* Strengths Section */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Strengths</h2>
                <p className="text-muted-foreground">What your resume does well</p>
              </div>
            </div>
            
            <div className="grid gap-4">
              {results.strengths?.map((strength, index) => (
                <Card key={index} className="p-6 border-l-4 border-l-primary">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                        <h3 className="font-semibold">{strength.title}</h3>
                        <Badge className={getImpactColor(strength.impact)}>
                          {strength.impact} impact
                        </Badge>
                      </div>
                      <p className="text-muted-foreground ml-8">{strength.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Weaknesses Section */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-destructive flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-destructive-foreground" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Areas for Improvement</h2>
                <p className="text-muted-foreground">What needs attention</p>
              </div>
            </div>
            
            <div className="grid gap-4">
              {results.weaknesses?.map((weakness, index) => (
                <Card key={index} className="p-6 border-l-4 border-l-destructive">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                        <h3 className="font-semibold">{weakness.title}</h3>
                        <Badge className={getImpactColor(weakness.impact)}>
                          {weakness.impact} impact
                        </Badge>
                      </div>
                      <p className="text-muted-foreground ml-8 mb-3">{weakness.description}</p>
                      <div className="ml-8 p-3 bg-muted rounded-lg">
                        <p className="text-sm font-medium text-foreground">
                          💡 How to fix: {weakness.fix}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* AI Suggestions Section */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-accent-foreground" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">AI Suggestions</h2>
                <p className="text-muted-foreground">Personalized recommendations to boost your resume</p>
              </div>
            </div>
            
            <Card className="p-6">
            <ul className="space-y-4">
              {results.suggestions?.map((suggestion, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-semibold text-accent">{index + 1}</span>
                    </div>
                    <p className="text-foreground">{suggestion}</p>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* CTA Section */}
          <Card className="p-8 text-center bg-gradient-primary text-primary-foreground">
            <h3 className="text-2xl font-bold mb-4">Ready to improve your resume?</h3>
            <p className="mb-6 opacity-90">
              Apply these suggestions and re-upload to see your improved score
            </p>
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => navigate('/upload')}
            >
              Analyze Updated Resume
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Results;
