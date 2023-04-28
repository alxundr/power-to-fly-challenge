import { render, act, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import JobSearch from "@/components/JobSearch";

import { QUICK_FILTERS } from '@/constants/quick-filters';

const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false, // default: true
      },
    },
  })

describe('Job Search', () => {
    test('renders all elements', async () => {
        await act(async () => {
            render(
                <QueryClientProvider client={queryClient}>
                    <JobSearch />
                </QueryClientProvider>
            )
        })
        expect(screen.queryByPlaceholderText('type something...')).not.toBeNull()

        QUICK_FILTERS.forEach(filter => {
            expect(screen.queryByText(filter.label)).not.toBeNull()
        })
    })
})