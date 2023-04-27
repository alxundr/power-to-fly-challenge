import { useState, useRef, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query"

import { Job } from "@/interfaces/job";

import JobCard from "./JobCard";
import DebouncedInput from '../DebouncedInput'
import QuickFilter from "../QuickFilter";

import styles from './JobSearch.module.css'

import { QUICK_FILTERS } from '@/constants/quick-filters';
import useScrollToBottom from '@/hooks/useScrollToBottom';

import { searchJobs, saveJob, applyForJob } from './handlers/jobs.handler';

const JobSearch = () => {
    const [inputSearch, setInputSearch] = useState('')
    const [selectedFilters, setSelectedFilters] = useState<string[]>([])
    const { data: resp, fetchNextPage } = useInfiniteQuery({
        queryKey: ['jobs', inputSearch, selectedFilters],
        queryFn: ({ pageParam = 0 }) => searchJobs({inputSearch, selectedFilters, pageParam}),
        getNextPageParam: (lastPage) => lastPage.meta.next_page ?? undefined,
    })
    const jobListRef = useRef<HTMLDivElement>(null);
    useScrollToBottom(jobListRef.current, fetchNextPage)

    const jobs = (resp?.pages ?? [])
        .map((resp) => resp.data)
        .reduce((previousValue, currentValue) => previousValue.concat(currentValue), []) ?? [];

    const handleInputChange = (newValue: string) => {
        setInputSearch(newValue)
    }

    const handleQuickFilterToggle = (filterName: string, checked: boolean) => {
        if (checked) {
            setSelectedFilters(prevFilters => [...prevFilters, filterName])
        } else {
            setSelectedFilters(prevFilters => prevFilters.filter(filter => filter !== filterName))
        }
    }

    const handleOnApply = async (job: Job) => {
        await applyForJob(job.id, { name: 'Alex'})
    }

    const handleOnSave = async (job: Job) => {
        await saveJob(job)
    }

    return (
        <section className={styles.section}>
            <DebouncedInput initialValue={inputSearch} onChange={handleInputChange}/>
            <div className={styles.filters}>
                {QUICK_FILTERS.map(quickFilter =>
                    (<QuickFilter key={quickFilter.label} label={quickFilter.label} onToggle={(checked) =>  handleQuickFilterToggle(quickFilter.label, checked)}/>)
                )}
            </div>
            <div className={styles.jobList} ref={jobListRef}>
                {jobs.map((job: Job, index: number) => (
                    <JobCard
                        // done only to simulate a unique KEY because ids are repeated when using infinite scroll for this challenge
                        key={`${job.id}+${index}`}
                        id={job.id}
                        title={job.title}
                        description={job.description}
                        category={job.category}
                        published_on={job.published_on}
                        location={job.location}
                        skills={job.skills}
                        levels_of_experience={job.levels_of_experience}
                        location_type={job.location_type}
                        onApply={() => handleOnApply(job)}
                        onSave={() => handleOnSave(job)}
                    />
                ))}
            </div>
        </section>
    )
}

export default JobSearch