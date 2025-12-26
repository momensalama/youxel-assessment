import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { getStatusVariant, getExecutionSteps } from "@/lib/statusHelpers";
import { formatDate, formatDuration, formatNumber } from "@/lib/dateFormatters";
import {
  Loader2,
  AlertCircle,
  CheckCircle2,
  Circle,
  Clock,
} from "lucide-react";
import { useRunByIdQuery } from "@/hooks/useRunsQuery";

interface RunDetailsProps {
  readonly runId: string;
  readonly onClose: () => void;
}

function RunDetails({ runId, onClose }: RunDetailsProps) {
  const { data: run, isLoading, error } = useRunByIdQuery(runId);

  const getStepIcon = (step: { completed: boolean; label: string }) => {
    if (!step.completed) {
      return <Circle className="h-5 w-5 text-gray-300" />;
    }

    if (step.label === "Failed") {
      return <AlertCircle className="h-5 w-5 text-red-500" />;
    }

    if (step.label === "Running") {
      return <Clock className="h-5 w-5 text-blue-500" />;
    }

    return <CheckCircle2 className="h-5 w-5 text-green-500" />;
  };

  const getStepDescription = (label: string) => {
    if (label === "Failed") {
      return "Execution encountered an error";
    }

    if (label === "Running") {
      return "Processing in progress";
    }

    return "Successfully completed";
  };

  return (
    <Dialog open={!!runId} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        {isLoading && (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mb-3" />
            <p className="text-gray-600">Failed to load run details</p>
          </div>
        )}

        {run && (
          <div>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                Run Details: {run.runId}
              </DialogTitle>
              <DialogDescription>
                View execution details and status
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium text-gray-500">
                    Run ID
                  </div>
                  <p className="mt-1 text-sm font-mono">{run.runId}</p>
                </div>

                <div>
                  <div className="text-sm font-medium text-gray-500">
                    Agent Name
                  </div>
                  <p className="mt-1 text-sm">{run.agentName}</p>
                </div>

                <div>
                  <div className="text-sm font-medium text-gray-500">
                    Status
                  </div>
                  <div className="mt-1">
                    <Badge variant={getStatusVariant(run.status)}>
                      {run.status}
                    </Badge>
                  </div>
                </div>

                <div>
                  <div className="text-sm font-medium text-gray-500">
                    Started At
                  </div>
                  <p className="mt-1 text-sm">{formatDate(run.startedAt)}</p>
                </div>

                <div>
                  <div className="text-sm font-medium text-gray-500">
                    Duration
                  </div>
                  <p className="mt-1 text-sm">{formatDuration(run.duration)}</p>
                </div>

                <div>
                  <div className="text-sm font-medium text-gray-500">
                    Tokens Used
                  </div>
                  <p className="mt-1 text-sm">{formatNumber(run.tokensUsed)}</p>
                </div>
              </div>

              {run.errorMessage && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-red-800">
                        Error Message
                      </h4>
                      <p className="text-sm text-red-700 mt-1">
                        {run.errorMessage}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-4">
                  Execution Flow
                </h4>
                <div className="relative pl-2">
                  {getExecutionSteps(run.status).map((step, index, steps) => (
                    <div
                      key={step.label}
                      className="relative flex items-start gap-4 pb-3 last:pb-0"
                    >
                      <div className="flex flex-col items-center shrink-0">
                        <div
                          className={`transition-all duration-300 ${
                            step.completed ? "scale-110" : "opacity-60"
                          }`}
                        >
                          {getStepIcon(step)}
                        </div>
                        {index < steps.length - 1 && (
                          <div
                            className={`w-0.5 mt-2 transition-all duration-300 ${
                              step.completed
                                ? "bg-gray-300 h-12"
                                : "bg-gray-200 h-12"
                            }`}
                          />
                        )}
                      </div>
                      <div className="flex-1 pt-0.5">
                        <p
                          className={`text-sm transition-colors duration-300 ${
                            step.completed
                              ? "text-gray-900 font-semibold"
                              : "text-gray-400 font-normal"
                          }`}
                        >
                          {step.label}
                        </p>
                        {step.completed && step.label !== "Queued" && (
                          <p className="text-xs text-gray-500 mt-1">
                            {getStepDescription(step.label)}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default RunDetails;
