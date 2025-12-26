import { QUERY_RUN_STALE_TIME, QUERY_RUNS_STALE_TIME } from "@/constants/query";
import { mockApi } from "@/services/mockApiData";
import type { UseRunsQueryProps } from "@/types/agentRun";
import { useQuery } from "@tanstack/react-query";

export const useRunsQuery = (params: UseRunsQueryProps) => {
  return useQuery({
    queryKey: ["runs", params],
    queryFn: () =>
      mockApi.getRuns({
        page: params.page,
        pageSize: params.pageSize,
        search: params.search,
        status: params.statusFilter,
        sortOrder: params.sortOrder,
      }),
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
