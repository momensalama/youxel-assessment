import {
  Pagination as ShadcnPagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import type { PaginationProps } from "@/types/agentRun";

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  total,
  pageSize,
}: PaginationProps) {
  const startPage = (currentPage - 1) * pageSize + 1;
  const endPage = Math.min(currentPage * pageSize, total);

  const getPageNumbers = () => {
    const pages: number[] = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  if (totalPages <= 1) return null;

  const handlePageClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    page: number
  ) => {
    e.preventDefault();
    onPageChange(page);
  };

  const handlePageClickPrevious = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handlePageClickNext = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex items-center justify-center md:justify-between px-4 py-3 border-t border-gray-200">
      <div className="flex sm:flex-1 sm:items-center sm:justify-between">
        <div className="hidden sm:block w-1/2">
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{startPage}</span> to{" "}
            <span className="font-medium">{endPage}</span> of{" "}
            <span className="font-medium">{total}</span> results
          </p>
        </div>

        <ShadcnPagination className="flex justify-end">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={handlePageClickPrevious}
                className={cn(
                  currentPage === 1 && "pointer-events-none opacity-50"
                )}
                aria-disabled={currentPage === 1}
              />
            </PaginationItem>

            {getPageNumbers().map((page) => (
              <PaginationItem key={`page-${page}`}>
                <PaginationLink
                  href="#"
                  onClick={(e) => handlePageClick(e, page)}
                  isActive={currentPage === page}
                  aria-label={`Page ${page}`}
                  aria-current={currentPage === page ? "page" : undefined}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={handlePageClickNext}
                className={cn(
                  currentPage === totalPages && "pointer-events-none opacity-50"
                )}
                aria-disabled={currentPage === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </ShadcnPagination>
      </div>
    </div>
  );
}

export default Pagination;
