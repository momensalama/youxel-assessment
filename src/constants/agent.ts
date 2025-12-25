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
