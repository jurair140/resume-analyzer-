import OpenAI from "openai";
import dotenv from 'dotenv';
import { PDFParse } from 'pdf-parse';
import 'pdf-parse/worker';
dotenv.config();

const AI = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

export const analyzeResumeController = async (req, res) => {
  let parser;
  try {
    const resume = req.file;

    if (!resume) {
      return res.status(400).json({ 
        success: false, 
        message: "No resume uploaded",
        error: "No resume uploaded" 
      });
    }

    if (resume.size > 5 * 1024 * 1024) {
      return res.status(400).json({
        success: false,
        message: "Resume file size exceeds allowed size (5MB).",
        error: "File too large"
      });
    }

    // Parse PDF directly from buffer
    let resumeText;
    try {
      parser = new PDFParse({ data: resume.buffer });
      const pdfResult = await parser.getText();
      resumeText = pdfResult?.text?.trim();
      
      console.log('PDF parsed successfully. Text length:', resumeText?.length);
      
      if (!resumeText || resumeText.length === 0) {
        return res.status(400).json({
          success: false,
          message: "PDF appears to be empty or contains only images.",
          error: "Empty PDF"
        });
      }
    } catch (pdfError) {
      console.error('PDF parsing error:', pdfError);
      return res.status(400).json({
        success: false,
        message: "Failed to parse PDF. Ensure it's a valid PDF file.",
        error: pdfError.message
      });
    }

    // Create AI prompt
    const prompt = `Analyze this resume as an ATS system. Respond in JSON format only, no markdown.

Resume:
${resumeText}

Required JSON fields:
- atsScore: number between 0-100,
- strengths: [
    {
      title: "",
      description: "",
      impact: "high | medium | low"
    },
  ],
- weaknesses: [
    {
      title: "",
      description: "",
      impact: "high | medium | low",
      fix: "how to fix the weakness",
  }
  ],
  suggestions: [
    " ",
  ]

    `
;

    // Try multiple model names
     let aiResponse = null;
    let lastError = null;

    
      try {
       
        const response = await AI.chat.completions.create({
          model: "gemini-2.0-flash",
          messages: [
            { 
              role: "system", 
              content: "You are an ATS system. Always respond with valid JSON only, no markdown or additional text." 
            },
            { 
              role: "user", 
              content: prompt 
            },
          ],
          temperature: 0.7,
          max_tokens: 1000,
        });

        aiResponse = response?.choices?.[0]?.message?.content;
        
      
        }
       catch (error) {
        console.error(`Failed with model ${modelName}:`, error.message);
        lastError = error;
        
        // If rate limited, stop trying other models
        if (error.status === 429) {
        }
        
      }
    

    if (!aiResponse) {
      throw lastError || new Error("All model attempts failed");
    }


    // Clean the response
    let cleanedResponse = aiResponse.trim();
    
    // Remove markdown code blocks
    cleanedResponse = cleanedResponse.replace(/```json\s*/g, '').replace(/```\s*/g, '');
    
    // Try to find JSON object in the response
    const jsonMatch = cleanedResponse.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      cleanedResponse = jsonMatch[0];
    }

    let parsed;
    try {
      parsed = JSON.parse(cleanedResponse);
      
      //
      
      // Return data directly (not wrapped in {success, data})
      return res.json(parsed);
      
    } catch (err) {
      console.error('JSON parse error:', err);
      console.error('Raw response:', aiResponse);
      
      // Return a default response if parsing fails
      
    }

  } catch (error) {
    console.error("Resume review error:", error);
    
    // Handle 429 specifically
    if (error.status === 429) {
      return res.status(429).json({
        success: false,
        message: "API rate limit exceeded. Please wait a moment and try again.",
        error: "Rate limit exceeded"
      });
    }
    
    return res.status(500).json({
      success: false,
      message: "Failed to review resume. Please try again.",
      error: error.message || "Internal server error",
    });
  } finally {
    if (parser) await parser.destroy();
  }
};