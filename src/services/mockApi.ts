import { AGENT_NAMES, ERROR_MESSAGES, STATUSES } from "@/constants/agent";
import type { AgentRun, RunsFilters } from "@/types/agentRun";

export const generateMockRuns = (count: number): AgentRun[] => {
  const now = Date.now();

  const runs = Array.from({ length: count }, (_, i) => {
    const status = STATUSES[Math.floor(Math.random() * STATUSES.length)];
    const run: AgentRun = {
      runId: `run-${(i + 1).toString().padStart(2, "0")}`,
      agentName: AGENT_NAMES[Math.floor(Math.random() * AGENT_NAMES.length)],
      status,
      startedAt: new Date(
        now - Math.random() * 7 * 24 * 60 * 60 * 1000
      ).toISOString(),
      duration: Math.floor(Math.random() * 3600),
      tokensUsed: Math.floor(Math.random() * 50000),
    };

    if (status === "Failed") {
      run.errorMessage =
        ERROR_MESSAGES[Math.floor(Math.random() * ERROR_MESSAGES.length)];
    }

    return run;
  });

  return runs.sort(
    (a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime()
  );
};

const mockData = generateMockRuns(50);

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

let shouldThrowError = false;
let errorCount = 0;

export const mockApi = {
  async getRuns(params: RunsFilters) {
    await delay(800 + Math.random() * 400);

    if (shouldThrowError && errorCount < 2) {
      errorCount++;
      shouldThrowError = false;
      throw new Error("Mock API error");
    }

    errorCount = 0;

    if (Math.random() < 0.1) {
      shouldThrowError = true;
    }

    let filteredRuns = [...mockData];

    if (params.search) {
      const searchLower = params.search.toLowerCase();
      filteredRuns = filteredRuns.filter(
        (run) =>
          run.runId.toLowerCase().includes(searchLower) ||
          run.agentName.toLowerCase().includes(searchLower)
      );
    }

    if (params.status && params.status !== "all") {
      filteredRuns = filteredRuns.filter((run) => run.status === params.status);
    }

    if (params.sortOrder === "asc") {
      filteredRuns.sort(
        (a, b) =>
          new Date(a.startedAt).getTime() - new Date(b.startedAt).getTime()
      );
    } else {
      filteredRuns.sort(
        (a, b) =>
          new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime()
      );
    }

    const start = (params.page - 1) * params.pageSize;
    const end = start + params.pageSize;
    const paginatedData = filteredRuns.slice(start, end);

    return {
      runs: paginatedData,
      total: filteredRuns.length,
      page: params.page,
      pageSize: params.pageSize,
      totalPages: Math.ceil(filteredRuns.length / params.pageSize),
    };
  },
  getRun: async (runId: string): Promise<AgentRun> => {
    await delay(1000);
    const run = mockData.find((r) => r.runId === runId);
    if (!run) {
      throw new Error("Run not found");
    }

    return run;
  },
};
