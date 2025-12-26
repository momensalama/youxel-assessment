import { useState } from "react";
import { useRunsQuery } from "@/hooks/useRunsQuery";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectValue,
  SelectItem,
  SelectContent,
  SelectTrigger,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Search,
  RefreshCw,
  Loader2,
  AlertCircle,
  ArrowUpDown,
  FileQuestion,
} from "lucide-react";
import type { RunStatus } from "@/types/agentRun";
import { getStatusVariant } from "@/lib/statusHelpers";
import { formatDate, formatDuration, formatNumber } from "@/lib/dateFormatters";
import { PAGE_SIZE } from "@/constants/query";
import Pagination from "./Pagination";
import { STATUS_OPTIONS } from "@/constants/agent";

function RunsTable() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<RunStatus | "all">("all");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);

  const { data, isLoading, error, refetch, isFetching } = useRunsQuery({
    search,
    statusFilter,
    sortOrder,
    page,
    pageSize: PAGE_SIZE,
  });

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleStatusFilter = (value: RunStatus | "all") => {
    setStatusFilter(value);
    setPage(1);
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "desc" ? "asc" : "desc");
    setPage(1);
  };

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("all");
    setSortOrder("desc");
    setPage(1);
  };

  const renderTableContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center py-16">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500">Loading runs...</p>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center py-16 text-center px-4">
          <AlertCircle className="h-12 w-12 text-red-500 mb-3" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Failed to load runs
          </h3>
          <p className="text-gray-600 mb-4">
            {error instanceof Error ? error.message : "An error occurred"}
          </p>
          <Button onClick={() => refetch()} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        </div>
      );
    }

    if (data?.runs.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-16 text-center px-4">
          <FileQuestion className="h-12 w-12 text-gray-400 mb-3" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No runs found
          </h3>
          <p className="text-gray-600 mb-4">
            {search || statusFilter !== "all"
              ? "Try adjusting your filters"
              : "No agent runs have been executed yet"}
          </p>
          {(search || statusFilter !== "all") && (
            <Button onClick={resetFilters} variant="outline">
              Clear filters
            </Button>
          )}
        </div>
      );
    }

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Run ID</TableHead>
            <TableHead>Agent Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Started At</TableHead>
            <TableHead className="text-right">Duration</TableHead>
            <TableHead className="text-right">Tokens Used</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.runs.map((run) => (
            <TableRow
              key={run.runId}
              className="cursor-pointer hover:bg-gray-50"
              role="button"
              tabIndex={0}
              aria-label={`View details for run ${run.runId}`}
            >
              <TableCell className="font-mono text-sm text-gray-900">
                {run.runId}
              </TableCell>
              <TableCell className="font-medium text-gray-900">
                {run.agentName}
              </TableCell>
              <TableCell>
                <Badge variant={getStatusVariant(run.status)}>
                  {run.status}
                </Badge>
              </TableCell>
              <TableCell className="text-sm text-gray-600">
                {formatDate(run.startedAt)}
              </TableCell>
              <TableCell className="text-right text-sm text-gray-600">
                {formatDuration(run.duration)}
              </TableCell>
              <TableCell className="text-right text-sm text-gray-600">
                {formatNumber(run.tokensUsed)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Search by Run ID or Agent Name..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-9 h-10"
            aria-label="Search runs"
            autoFocus
          />
        </div>

        <Select value={statusFilter} onValueChange={handleStatusFilter}>
          <SelectTrigger className="w-full sm:w-40 bg-white">
            <SelectValue
              className="bg-white"
              placeholder={
                statusFilter === "all" ? "All Statuses" : statusFilter
              }
            />
          </SelectTrigger>
          <SelectContent>
            {STATUS_OPTIONS.map(({ value, label }) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          onClick={toggleSortOrder}
          className="h-10 px-4"
          aria-label={`Sort by date ${
            sortOrder === "desc" ? "ascending" : "descending"
          }`}
        >
          <ArrowUpDown className="h-4 w-4 mr-2" />
          Date {sortOrder === "desc" ? "↓" : "↑"}
        </Button>

        <Button
          variant="outline"
          onClick={() => refetch()}
          disabled={isFetching}
          className="h-10 px-4"
          aria-label="Refresh data"
        >
          <RefreshCw
            className={`h-4 w-4 mr-2 ${isFetching ? "animate-spin" : ""}`}
          />
          Refresh
        </Button>
      </div>

      {search || statusFilter !== "all" ? (
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>
            {data?.total || 0} result{data?.total === 1 ? "" : "s"} found
          </span>
          <Button variant="link" onClick={resetFilters} className="h-auto p-0">
            Clear filters
          </Button>
        </div>
      ) : null}

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        {renderTableContent()}

        {data && (
          <Pagination
            currentPage={page}
            totalPages={data.totalPages}
            total={data.total}
            pageSize={PAGE_SIZE}
            onPageChange={setPage}
          />
        )}
      </div>
    </div>
  );
}

export default RunsTable;
