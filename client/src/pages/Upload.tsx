import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import FileDropzone from "@/components/FileDropzone";
import { ArrowLeft, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios"

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
  };

  const handleAnalyze = async () => {
    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please upload a resume first",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    try {
      // Create FormData to send the file
      const formData = new FormData();
      formData.append('resume', selectedFile);

      // Build endpoint from environment variable
      const baseUrl = import.meta.env.VITE_BASE_URL ?? "";
      const url = `${baseUrl}/api/ai/analyze-resume`;

      // Send the file to the backend; axios returns parsed JSON on response.data
      const response = await axios.post(url, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      if (!response || !response.data) {
        throw new Error('Analysis failed');
      }

      const analysisData = response.data;

      /* Expected backend response format:
      {
        score: number,
        strengths: [{ title: string, description: string, impact: 'high'|'medium'|'low' }],
        weaknesses: [{ title: string, description: string, impact: string, fix: string }],
        suggestions: string[]
      }
      */

      // Navigate to results page with the backend data
      navigate('/results', { 
        state: { analysisResults: analysisData } 
      });
    } catch (error) {
      toast({
        title: "Analysis failed",
        description: "There was an error analyzing your resume. Please try again.",
        variant: "destructive",
      });
      console.error('Analysis error:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              <span>AI-Powered Analysis</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Upload Your Resume
            </h1>
            <p className="text-xl text-muted-foreground">
              Get instant ATS score and detailed feedback to improve your resume
            </p>
          </div>

          <Card className="p-8 mb-8">
            <FileDropzone onFileSelect={handleFileSelect} />
          </Card>

          <div className="space-y-6">
            <div className="bg-card border rounded-lg p-6">
              <h3 className="font-semibold mb-4">What we analyze:</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                  <span className="text-muted-foreground">
                    <strong className="text-foreground">ATS Compatibility:</strong> How well your resume passes applicant tracking systems
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                  <span className="text-muted-foreground">
                    <strong className="text-foreground">Content Quality:</strong> Keywords, formatting, and structure analysis
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                  <span className="text-muted-foreground">
                    <strong className="text-foreground">Improvement Areas:</strong> Specific suggestions to enhance your resume
                  </span>
                </li>
              </ul>
            </div>

            <Button
              size="lg"
              className="w-full text-lg py-6"
              onClick={handleAnalyze}
              disabled={!selectedFile || isAnalyzing}
            >
              {isAnalyzing ? (
                <>
                  <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2"></div>
                  Analyzing Resume...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Analyze Resume
                </>
              )}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Your data is processed securely and never stored
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
