import type { RunStatus } from "@/types/agentRun";

export const AGENT_NAMES = [
  "DataProcessor",
  "ContentAnalyzer",
  "ImageClassifier",
  "SentimentAnalyzer",
  "CodeGenerator",
  "DocumentParser",
  "QueryOptimizer",
  "RecommendationEngine",
];

export const ERROR_MESSAGES = [
  "Network timeout exceeded",
  "Invalid API credentials",
  "Resource not found",
  "Rate limit exceeded",
  "Internal server error",
  "Database connection failed",
];

export const STATUSES = ["Queued", "Running", "Succeeded", "Failed"] as const;

export const STATUS_OPTIONS: { value: RunStatus | "all"; label: string }[] = [
  { value: "all", label: "All Statuses" },
  { value: "Queued", label: "Queued" },
  { value: "Running", label: "Running" },
  { value: "Succeeded", label: "Succeeded" },
  { value: "Failed", label: "Failed" },
];
