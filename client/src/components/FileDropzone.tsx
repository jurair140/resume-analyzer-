import { useCallback, useState } from "react";
import { Upload, FileText, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface FileDropzoneProps {
  onFileSelect: (file: File) => void;
  acceptedFormats?: string[];
  maxSizeMB?: number;
}

const FileDropzone = ({ 
  onFileSelect, 
  acceptedFormats = ['.pdf', '.doc', '.docx'],
  maxSizeMB = 10 
}: FileDropzoneProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();

  const validateFile = (file: File): boolean => {
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    
    if (!acceptedFormats.includes(fileExtension)) {
      toast({
        title: "Invalid file format",
        description: `Please upload a file in one of these formats: ${acceptedFormats.join(', ')}`,
        variant: "destructive",
      });
      return false;
    }

    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxSizeMB) {
      toast({
        title: "File too large",
        description: `File size must be less than ${maxSizeMB}MB`,
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleFile = (file: File) => {
    if (validateFile(file)) {
      setSelectedFile(file);
      onFileSelect(file);
      toast({
        title: "File uploaded successfully",
        description: `${file.name} is ready for analysis`,
      });
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFile(files[0]);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
  };

  return (
    <div className="w-full">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={cn(
          "relative border-2 border-dashed rounded-lg p-12 transition-all duration-300",
          isDragging 
            ? "border-primary bg-primary/5 scale-105" 
            : "border-border hover:border-primary/50 hover:bg-secondary/50",
          selectedFile && "border-primary bg-primary/5"
        )}
      >
        <input
          type="file"
          id="file-upload"
          className="hidden"
          accept={acceptedFormats.join(',')}
          onChange={handleFileInput}
        />

        {!selectedFile ? (
          <label
            htmlFor="file-upload"
            className="flex flex-col items-center justify-center cursor-pointer"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center mb-4">
              <Upload className="w-8 h-8 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Drop your resume here
            </h3>
            <p className="text-muted-foreground mb-4">
              or click to browse files
            </p>
            <p className="text-sm text-muted-foreground">
              Supported formats: {acceptedFormats.join(', ')} (max {maxSizeMB}MB)
            </p>
          </label>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-medium">{selectedFile.name}</p>
                <p className="text-sm text-muted-foreground">
                  {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            </div>
            <button
              onClick={removeFile}
              className="p-2 hover:bg-destructive/10 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-destructive" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileDropzone;
