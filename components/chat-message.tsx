"use client";

import { cn } from "@/lib/utils";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
}

export function ChatMessage({ role, content }: ChatMessageProps) {
  return (
    <div
      className={cn(
        "flex w-full gap-4 p-4 rounded-lg",
        role === "user" ? "bg-secondary/50" : "bg-card border border-border"
      )}
    >
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-medium",
          role === "user"
            ? "bg-primary text-primary-foreground"
            : "bg-accent text-accent-foreground"
        )}
      >
        {role === "user" ? "U" : "AI"}
      </div>
      <div className="flex-1 space-y-2 overflow-hidden">
        <p className="text-sm font-medium text-muted-foreground">
          {role === "user" ? "You" : "Interview Trainer AI"}
        </p>
        <div className="prose prose-invert prose-sm max-w-none">
          <p className="text-foreground whitespace-pre-wrap leading-relaxed">
            {content}
          </p>
        </div>
      </div>
    </div>
  );
}
