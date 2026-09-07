import React, { useState, useEffect, useRef } from "react";
import {
  CheckCheck,
  Lightbulb,
  ThumbsUp,
  ThumbsDown,
  Copy,
  Check,
  Share2,
  Volume2,
  VolumeX,
} from "lucide-react";
import KisanAIAvatar from "./KisanAIAvatar";

export interface ChatMessage {
  id: string;
  sender: "user" | "assistant";
  text: string;
  time: string;
  recommendations?: string[];
  whyThisWorks?: string;
  liked?: boolean;
  disliked?: boolean;
}

interface AIChatThreadProps {
  messages: ChatMessage[];
  isThinking?: boolean;
  onReaction?: (id: string, type: "like" | "dislike") => void;
}

export default function AIChatThread({
  messages,
  isThinking = false,
  onReaction,
}: AIChatThreadProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking]);

  const handleCopy = (message: ChatMessage) => {
    let fullContent = message.text;
    if (message.recommendations?.length) {
      fullContent += "\n\nRecommended:\n" + message.recommendations.map((r) => `• ${r}`).join("\n");
    }
    if (message.whyThisWorks) {
      fullContent += `\n\nWhy this works?\n${message.whyThisWorks}`;
    }
    navigator.clipboard.writeText(fullContent);
    setCopiedId(message.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSpeak = (message: ChatMessage) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    if (speakingId === message.id) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }

    window.speechSynthesis.cancel();
    let textToSpeak = message.text;
    if (message.recommendations?.length) {
      textToSpeak += ". Recommended: " + message.recommendations.join(", ");
    }
    if (message.whyThisWorks) {
      textToSpeak += ". Why this works: " + message.whyThisWorks;
    }

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = 1.0;
    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);
    setSpeakingId(message.id);
    window.speechSynthesis.speak(utterance);
  };

  const handleShare = async (message: ChatMessage) => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: "Kisan Care AI Recommendation",
          text: message.text,
        });
      } catch {
        // Ignored or cancelled
      }
    } else {
      handleCopy(message);
    }
  };

  return (
    <div className="w-full flex flex-col space-y-6">
      {/* Centered Date Badge */}
      <div className="flex items-center justify-center my-2">
        <span className="px-3.5 py-1 rounded-full bg-gray-100 text-gray-500 text-xs font-semibold tracking-wide shadow-2xs select-none">
          Today
        </span>
      </div>

      {/* Messages */}
      {messages.map((msg) => {
        if (msg.sender === "user") {
          return (
            <div key={msg.id} className="flex justify-end w-full">
              <div className="max-w-[85%] sm:max-w-[70%] bg-[#eaf7ec] border border-[#d4eed8]/70 rounded-2xl rounded-tr-xs px-4 py-2.5 shadow-2xs">
                <div className="flex items-baseline justify-between gap-4">
                  <p className="text-sm font-medium text-gray-800 leading-relaxed">
                    {msg.text}
                  </p>
                  <div className="shrink-0 flex items-center gap-1 select-none text-[11px] text-gray-500 font-medium">
                    <span>{msg.time}</span>
                    <CheckCheck className="w-3.5 h-3.5 text-[#2f9e44]" strokeWidth={2.2} />
                  </div>
                </div>
              </div>
            </div>
          );
        }

        // Assistant Message
        return (
          <div key={msg.id} className="flex items-start gap-3 w-full">
            <KisanAIAvatar size="sm" className="mt-1 shrink-0" />

            <div className="flex-1 max-w-[92%] sm:max-w-[85%]">
              <div className="bg-white border border-gray-200/90 rounded-2xl rounded-tl-xs p-4 sm:p-5 shadow-2xs">
                {/* Main Text */}
                <p className="text-sm text-gray-800 leading-relaxed font-normal">
                  {msg.text}
                </p>

                {/* Recommendations List */}
                {msg.recommendations && msg.recommendations.length > 0 && (
                  <div className="mt-3">
                    <p className="font-bold text-sm text-gray-900 mb-1.5">
                      Recommended:
                    </p>
                    <ul className="space-y-1 text-sm text-gray-700">
                      {msg.recommendations.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-gray-400 select-none">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Why this works highlight box */}
                {msg.whyThisWorks && (
                  <div className="mt-3.5 p-3 sm:p-3.5 rounded-xl bg-[#f4faf4] border border-[#d8eedb]/80 flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-md bg-[#eaf7ec] flex items-center justify-center shrink-0 mt-0.5">
                      <Lightbulb className="w-3.5 h-3.5 text-[#2f9e44]" strokeWidth={2.2} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900 leading-snug">
                        Why this works?
                      </h4>
                      <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
                        {msg.whyThisWorks}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Icons and Timestamp Below Card */}
              <div className="flex items-center justify-between mt-2 px-1 text-gray-400">
                <div className="flex items-center gap-3">
                  {/* Like Button */}
                  <button
                    type="button"
                    onClick={() => onReaction?.(msg.id, "like")}
                    aria-label="Like response"
                    className={`p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 transition cursor-pointer ${
                      msg.liked ? "text-[#2f9e44] font-bold" : ""
                    }`}
                  >
                    <ThumbsUp className={`w-3.5 h-3.5 ${msg.liked ? "fill-[#2f9e44]" : ""}`} />
                  </button>

                  {/* Dislike Button */}
                  <button
                    type="button"
                    onClick={() => onReaction?.(msg.id, "dislike")}
                    aria-label="Dislike response"
                    className={`p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 transition cursor-pointer ${
                      msg.disliked ? "text-red-500 font-bold" : ""
                    }`}
                  >
                    <ThumbsDown className={`w-3.5 h-3.5 ${msg.disliked ? "fill-red-500" : ""}`} />
                  </button>

                  {/* Copy Button */}
                  <button
                    type="button"
                    onClick={() => handleCopy(msg)}
                    aria-label="Copy to clipboard"
                    className="p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 transition cursor-pointer"
                    title={copiedId === msg.id ? "Copied!" : "Copy response"}
                  >
                    {copiedId === msg.id ? (
                      <Check className="w-3.5 h-3.5 text-[#2f9e44]" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>

                  {/* Share Button */}
                  <button
                    type="button"
                    onClick={() => handleShare(msg)}
                    aria-label="Share recommendation"
                    className="p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 transition cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                  </button>

                  {/* Speaker Button */}
                  <button
                    type="button"
                    onClick={() => handleSpeak(msg)}
                    aria-label="Read aloud"
                    className={`p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 transition cursor-pointer ${
                      speakingId === msg.id ? "text-[#2f9e44]" : ""
                    }`}
                    title={speakingId === msg.id ? "Stop voice" : "Read aloud"}
                  >
                    {speakingId === msg.id ? (
                      <VolumeX className="w-3.5 h-3.5 text-[#2f9e44] animate-pulse" />
                    ) : (
                      <Volume2 className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                {/* Timestamp */}
                <span className="text-[11px] text-gray-400 font-medium select-none">
                  {msg.time}
                </span>
              </div>
            </div>
          </div>
        );
      })}

      {/* Thinking Indicator */}
      {isThinking && (
        <div className="flex items-start gap-3 w-full animate-in fade-in duration-300">
          <KisanAIAvatar size="sm" className="mt-1 shrink-0 animate-pulse" />
          <div className="bg-white border border-gray-200/90 rounded-2xl rounded-tl-xs px-4 py-3 shadow-2xs flex items-center gap-2">
            <span className="text-xs text-gray-500 font-medium">Analyzing farm data</span>
            <span className="flex gap-1 items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2f9e44] animate-bounce" style={{ animationDelay: "0ms" }}></span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#2f9e44] animate-bounce" style={{ animationDelay: "150ms" }}></span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#2f9e44] animate-bounce" style={{ animationDelay: "300ms" }}></span>
            </span>
          </div>
        </div>
      )}

      {/* Auto-scroll anchor */}
      <div ref={bottomRef} className="h-0 w-full" />
    </div>
  );
}
