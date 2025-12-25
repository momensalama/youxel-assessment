import type { RunStatus } from "@/types/AgentRun";

export const getStatusVariant = (
  status: RunStatus
): "success" | "warning" | "info" | "destructive" => {
  switch (status) {
    case "Succeeded":
      return "success";
    case "Failed":
      return "destructive";
    case "Running":
      return "info";
    case "Queued":
      return "warning";
    default:
      return "info";
  }
};

export const getExecutionSteps = (status: RunStatus) => {
  const steps = [
    { label: "Queued", completed: true },
    {
      label: "Running",
      completed:
        status === "Running" || status === "Succeeded" || status === "Failed",
    },
    {
      label: status === "Failed" ? "Failed" : "Completed",
      completed: status === "Succeeded" || status === "Failed",
    },
  ];

  return steps;
};
