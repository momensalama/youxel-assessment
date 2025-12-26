export type RunStatus = "Queued" | "Running" | "Succeeded" | "Failed";

export interface AgentRun {
  runId: string;
  agentName: string;
  status: RunStatus;
  startedAt: string;
  duration: number;
  tokensUsed: number;
  errorMessage?: string;
}

export interface RunsFilters {
  page: number;
  pageSize: number;
  search: string;
  status: RunStatus | "all";
  sortOrder: "asc" | "desc";
}

export interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
}

export interface UseRunsQueryProps {
  page: number;
  pageSize: number;
  search: string;
  status: RunStatus | "all";
  sortOrder: "asc" | "desc";
}
