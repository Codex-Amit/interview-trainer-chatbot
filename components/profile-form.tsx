"use client";

import { useState } from "react";

interface ProfileFormProps {
  onProfileSet: (profile: {
    name: string;
    experience: string;
    role: string;
  }) => void;
}

export function ProfileForm({ onProfileSet }: ProfileFormProps) {
  const [name, setName] = useState("");
  const [experience, setExperience] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && experience && role) {
      onProfileSet({ name, experience, role });
    }
  };

  const experienceLevels = [
    "Fresher / Entry Level",
    "1-2 Years",
    "3-5 Years",
    "5-10 Years",
    "10+ Years",
  ];

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
          <svg
            className="w-8 h-8 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          Set Up Your Profile
        </h2>
        <p className="text-muted-foreground">
          Help us personalize your interview preparation experience
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-foreground"
          >
            Your Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full px-4 py-3 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
            required
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="experience"
            className="block text-sm font-medium text-foreground"
          >
            Experience Level
          </label>
          <select
            id="experience"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all appearance-none cursor-pointer"
            required
          >
            <option value="" disabled>
              Select your experience level
            </option>
            {experienceLevels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="role"
            className="block text-sm font-medium text-foreground"
          >
            Target Job Role
          </label>
          <input
            type="text"
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="e.g., Software Engineer, Data Analyst"
            className="w-full px-4 py-3 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
        >
          Start Interview Prep
        </button>
      </form>
    </div>
  );
}
