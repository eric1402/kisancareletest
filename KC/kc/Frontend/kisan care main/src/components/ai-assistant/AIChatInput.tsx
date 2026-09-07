import React, { useState, useRef } from "react";
import { SendHorizontal, ImagePlus, Mic, ScanLine, X, MicOff } from "lucide-react";

interface AIChatInputProps {
  onSendMessage: (message: string, imageFile?: File) => void;
  disabled?: boolean;
}

export default function AIChatInput({ onSendMessage, disabled = false }: AIChatInputProps) {
  const [inputValue, setInputValue] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{ file: File; url: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if ((!inputValue.trim() && !selectedImage) || disabled) return;

    onSendMessage(
      inputValue.trim() || (selectedImage ? "Please analyze this crop image." : ""),
      selectedImage?.file
    );
    setInputValue("");
    if (selectedImage) {
      URL.revokeObjectURL(selectedImage.url);
      setSelectedImage(null);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setSelectedImage({ file, url });
    }
    // Reset input so same file can be re-selected
    e.target.value = "";
  };

  const handleVoiceToggle = () => {
    if (typeof window === "undefined") return;

    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) {
      setInputValue((prev) => prev || "What is the recommended fertilizer for potato?");
      return;
    }

    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
      return;
    }

    const recognition = new SR();
    recognition.lang = "en-IN";
    recognition.interimResults = false;
    recognitionRef.current = recognition;

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInputValue((prev) => (prev ? prev + " " + transcript : transcript));
    };
    recognition.onerror = () => setIsRecording(false);
    recognition.onend = () => setIsRecording(false);

    setIsRecording(true);
    recognition.start();
  };

  const handleDiseaseScan = () => {
    onSendMessage(
      "Crop Disease Scan: Please diagnose any visible disease on my wheat crop leaf based on symptoms like yellow/brown streaks, spots, or rust."
    );
  };

  return (
    <div className="w-full flex flex-col gap-2">
      {/* Attached Image Preview */}
      {selectedImage && (
        <div className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-[#f4faf5] border border-[#d4eedb] self-start max-w-full">
          <img
            src={selectedImage.url}
            alt="Preview"
            className="w-7 h-7 rounded-lg object-cover border border-[#c3e6cc] shrink-0"
          />
          <span className="text-xs text-gray-700 font-medium truncate max-w-[140px] leading-tight">
            {selectedImage.file.name}
          </span>
          <button
            type="button"
            onClick={() => {
              URL.revokeObjectURL(selectedImage.url);
              setSelectedImage(null);
            }}
            className="p-0.5 hover:bg-[#e0f2e4] rounded-full text-gray-400 hover:text-gray-700 transition-colors shrink-0"
            aria-label="Remove image"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Main Input Container */}
      <div className="w-full flex items-center bg-[#f9fafb] border border-gray-200 rounded-xl px-3 py-2 gap-2 transition-all duration-200 focus-within:bg-white focus-within:border-[#2f9e44] focus-within:ring-2 focus-within:ring-[#2f9e44]/12 focus-within:shadow-xs">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask me anything about farming..."
          disabled={disabled}
          className="flex-1 bg-transparent text-sm text-gray-900 placeholder:text-gray-400 outline-none min-w-0 py-0.5"
        />

        {/* Green Send Button */}
        <button
          type="button"
          onClick={() => handleSubmit()}
          disabled={disabled || (!inputValue.trim() && !selectedImage)}
          aria-label="Send message"
          className="w-8 h-8 rounded-lg bg-[#2f9e44] hover:bg-[#278a3b] active:scale-95 disabled:opacity-35 disabled:pointer-events-none text-white flex items-center justify-center transition-all duration-150 shrink-0 cursor-pointer shadow-xs hover:shadow-sm"
        >
          <SendHorizontal className="w-4 h-4" strokeWidth={2.3} />
        </button>
      </div>

      {/* 3 Premium Action Tool Buttons */}
      <div className="flex items-center gap-2">
        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Upload Image */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          title="Upload a crop photo for AI analysis"
          className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[11.5px] font-semibold transition-all duration-150 cursor-pointer active:scale-95 ${
            selectedImage
              ? "border-[#2f9e44]/50 bg-[#eaf7ec] text-[#2f9e44]"
              : "border-gray-200 bg-white text-gray-600 hover:border-[#2f9e44]/40 hover:bg-[#f5fcf6] hover:text-[#2f9e44]"
          }`}
        >
          <ImagePlus
            className={`w-3.5 h-3.5 transition-transform duration-150 group-hover:scale-110 ${
              selectedImage ? "text-[#2f9e44]" : "text-gray-400 group-hover:text-[#2f9e44]"
            }`}
            strokeWidth={2}
          />
          <span>{selectedImage ? "Image Added" : "Upload Image"}</span>
        </button>

        {/* Voice Input */}
        <button
          type="button"
          onClick={handleVoiceToggle}
          title={isRecording ? "Stop listening" : "Speak your farming question"}
          className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[11.5px] font-semibold transition-all duration-150 cursor-pointer active:scale-95 ${
            isRecording
              ? "border-red-400/60 bg-red-50 text-red-600"
              : "border-gray-200 bg-white text-gray-600 hover:border-[#2f9e44]/40 hover:bg-[#f5fcf6] hover:text-[#2f9e44]"
          }`}
        >
          {isRecording ? (
            <>
              <span className="relative flex h-3.5 w-3.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-50"></span>
                <MicOff className="relative w-3.5 h-3.5 text-red-500" strokeWidth={2} />
              </span>
              <span>Listening…</span>
            </>
          ) : (
            <>
              <Mic
                className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#2f9e44] transition-colors"
                strokeWidth={2}
              />
              <span>Voice Input</span>
            </>
          )}
        </button>

        {/* Crop Disease Scan */}
        <button
          type="button"
          onClick={handleDiseaseScan}
          title="AI-powered crop disease scan"
          className="group flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-[11.5px] font-semibold text-gray-600 hover:border-[#2f9e44]/40 hover:bg-[#f5fcf6] hover:text-[#2f9e44] transition-all duration-150 cursor-pointer active:scale-95"
        >
          <ScanLine
            className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#2f9e44] transition-colors"
            strokeWidth={2}
          />
          <span>Crop Disease Scan</span>
        </button>
      </div>

      {/* Disclaimer */}
      <p className="text-[11px] text-gray-400 font-normal leading-snug select-none">
        AI responses may not be 100% accurate. Please verify important information.
      </p>
    </div>
  );
}
