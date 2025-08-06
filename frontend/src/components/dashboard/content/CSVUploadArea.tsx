import { useState, useCallback } from "react";
import { Upload, FileText, CheckCircle, X } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export const CSVUploadArea = () => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  }, []);

  const handleFileUpload = async (file: File) => {
    if (!file.name.endsWith('.csv')) {
      setUploadStatus('error');
      return;
    }

    setUploadStatus('uploading');
    setUploadProgress(0);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:3001/api/upload-csv", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const result = await res.json();
      console.log("Upload success:", result);

      // ✅ Animate to 100% before success
      setUploadProgress(100);
      setTimeout(() => setUploadStatus('success'), 500);

      setTimeout(() => {
        setUploadStatus('idle');
        setUploadProgress(0);
      }, 3000);
    } catch (err) {
      console.error(err);
      setUploadStatus('error');
    }
  };


  const handleFileSelect = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        handleFileUpload(file);
      }
    };
    input.click();
  };

  return (
    <Card className="card-elevated">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          📁 CSV Upload
        </CardTitle>
        <CardDescription>
          Upload bank statements or ledger files
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className={`
            border-2 border-dashed rounded-lg p-6 text-center transition-all duration-200
            ${isDragOver ? 'border-primary bg-primary/5' : 'border-border'}
            ${uploadStatus === 'success' ? 'border-green-500 bg-green-50 dark:bg-green-950' : ''}
            ${uploadStatus === 'error' ? 'border-red-500 bg-red-50 dark:bg-red-950' : ''}
          `}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {uploadStatus === 'idle' && (
            <>
              <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
              <p className="text-sm font-medium text-foreground mb-2">
                Drag & drop your CSV files here
              </p>
              <p className="text-xs text-muted-foreground mb-4">
                Supports bank statements and ledger exports
              </p>
              <Button variant="outline" onClick={handleFileSelect}>
                Browse Files
              </Button>
            </>
          )}

          {uploadStatus === 'uploading' && (
            <>
              <FileText className="h-8 w-8 text-primary mx-auto mb-3 animate-pulse" />
              <p className="text-sm font-medium text-foreground mb-3">
                Uploading CSV file...
              </p>
              <Progress value={uploadProgress} className="w-full" />
              <p className="text-xs text-muted-foreground mt-2">
                {uploadProgress}% complete
              </p>
            </>
          )}

          {uploadStatus === 'success' && (
            <>
              <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <p className="text-sm font-medium text-green-700 dark:text-green-400 mb-2">
                File uploaded successfully!
              </p>
              <p className="text-xs text-muted-foreground">
                Processing will begin shortly...
              </p>
            </>
          )}

          {uploadStatus === 'error' && (
            <>
              <X className="h-8 w-8 text-red-600 mx-auto mb-3" />
              <p className="text-sm font-medium text-red-700 dark:text-red-400 mb-2">
                Upload failed
              </p>
              <p className="text-xs text-muted-foreground mb-3">
                Please ensure the file is a valid CSV
              </p>
              <Button variant="outline" size="sm" onClick={() => setUploadStatus('idle')}>
                Try Again
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};