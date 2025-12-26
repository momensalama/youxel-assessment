# Agent Runs Dashboard

## How to Run the Project

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

The app will be available at `http://localhost:5173`.

## Libraries Used and Why

- **React 19 + TypeScript**: Core framework with type safety
- **TanStack Query**: Handles async data fetching, caching, and error states automatically
- **shadcn (Radix UI)**: Accessible component primitives (Dialog, Select) with built-in keyboard navigation and ARIA support
- **Tailwind CSS**: Utility-first styling
- **date-fns**: Lightweight date formatting utilities
- **Vite**: Fast build tool and dev server

## Key Decisions or Tradeoffs

1. **React Query over manual state**: Reduces boilerplate for loading/error states, but adds a dependency
2. **Single-select filter**: Simpler UX, multi-select can be added later if needed
3. **Pagination over infinite scroll**: Better for precise navigation and accessibility
4. **Modal over side drawer**: Works well on all screen sizes
5. **Mock API with delays**: Simulates real network conditions without backend dependency
6. **Component separation**: Clear boundaries improve maintainability, but creates more files

## What You Would Improve With More Time

1. **URL state management**: Add query parameters for search/filter/sort to enable bookmarklet states
2. **Multi-select status filter**: Allow filtering by multiple statuses simultaneously
3. **Testing**: Unit tests, component tests, and E2E tests
4. **Performance**: Debounced search, virtual scrolling for large datasets, code splitting
5. **Real API integration**: API client abstraction, retry logic, request cancellation
6. **Enhanced accessibility**: Skip links, screen reader announcements, high contrast mode
7. **Data visualization**: Charts for statistics, timeline view
8. **Advanced features**: Column sorting, saved filter presets
