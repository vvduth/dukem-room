import { CheckCircle2, ImageIcon, UploadIcon } from "lucide-react";
import React, { useState } from "react";
import { useOutletContext } from "react-router";
import { REDIRECT_DELAY_MS, UPLOAD_INCREMENT, UPLOAD_INTERVAL_MS } from "../lib/constants";

interface UploadProps {
  onComplete: (base64: string) => void;
}

const Upload: React.FC<UploadProps> = ({ onComplete }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [progress, setProgress] = useState(0);
  const { isSignedIn } = useOutletContext<AuthContext>();

  const processFile = (selectedFile: File) => {
    if (!selectedFile) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        const base64 = e.target.result as string;
        
        let currentProgress = 0;
        const interval = setInterval(() => {
            currentProgress += UPLOAD_INCREMENT;
            if (currentProgress > 100) {
                currentProgress = 100;
                clearInterval(interval);
                setTimeout(() => {
                    onComplete(base64);
                }, REDIRECT_DELAY_MS);
            }
            setProgress(currentProgress);
        }, UPLOAD_INTERVAL_MS);
      }
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isSignedIn) return;
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
        setFile(selectedFile);
        processFile(selectedFile);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!isSignedIn) return;
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (!isSignedIn) return;
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && (droppedFile.type === "image/jpeg" 
      || droppedFile.type === "image/png")) {
        setFile(droppedFile);
        processFile(droppedFile);
    }
  };

  return (
    <div className="upload">
      {!file ? (
        <div 
            className={`dropzone ${isDragging ? "is-dragging" : ""}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
          <input
            type="file"
            className="drop-input"
            accept=".jpeg,.jpg,.png"
            disabled={!isSignedIn}
            onChange={handleFileChange}
          />
          <div className="drop-content">
            <div className="drop-icon">
              <UploadIcon size={20} />
            </div>
            <p>
              {isSignedIn
                ? "Drag and drop your floor plan here, or click to select a file"
                : "Please log in to upload your floor plan"}
            </p>
            <p className="help">Maximum file size 50MB.</p>
          </div>
        </div>
      ) : (
        <div className="upload-status">
          <div className="status-content">
            <div className="status-icon">
              {progress === 100 ? (
                <CheckCircle2 className="check" />
              ) : (
                <ImageIcon className="image" />
              )}
            </div>
            <h3>{file.name}</h3>
            <div className="progress">
              <div
                className="bar"
                style={{
                  width: `${progress}%`,
                }}
              />
              <div className="status-text">
                {progress < 100
                  ? `Uploading... ${progress}%`
                  : "Upload complete!  Redirecting..."}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Upload;
