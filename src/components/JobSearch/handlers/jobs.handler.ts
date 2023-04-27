import { Job } from "@/interfaces/job";

export const searchJobs = async ({ inputSearch, selectedFilters, pageParam }: { inputSearch: string, selectedFilters: string[], pageParam: number}) => {
    const resp = await fetch(`/api/jobs?${new URLSearchParams({
        search: inputSearch,
        filters: selectedFilters.join(','),
        pageParam: `${pageParam}`,
    })}`)

    return resp.json();
}

export const saveJob = async (job: Job) => {
    const resp = await fetch('/api/jobs', {
        method: 'POST',
        body: JSON.stringify(job)
    })

    return resp.json();
}

export const applyForJob = async (jobId: number, user: any) => {
    const resp = await fetch(`/api/jobs/${jobId}`, {
        method: 'POST',
        body: JSON.stringify(user)
    })

    return resp.json();
}