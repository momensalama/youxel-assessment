import { QUERY_RUN_STALE_TIME, QUERY_RUNS_STALE_TIME } from "@/constants/query";
import { mockApi } from "@/services/mockApiData";
import type { UseRunsQueryProps } from "@/types/agentRun";
import { useQuery } from "@tanstack/react-query";

export const useRunsQuery = (params: UseRunsQueryProps) => {
  return useQuery({
    queryKey: ["runs", params],
    queryFn: () => mockApi.getRuns(params),
    staleTime: QUERY_RUNS_STALE_TIME,
  });
};

export const useRunQuery = (runId: string) => {
  return useQuery({
    queryKey: ["run", runId],
    queryFn: () => mockApi.getRun(runId),
    staleTime: QUERY_RUN_STALE_TIME,
    enabled: !!runId,
  });
};
