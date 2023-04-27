// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import { QUICK_FILTERS } from '@/constants/quick-filters'
import jobsData from './jobs.json'

const searhJobs = (query: { search?: string, filters?: string, pageParam?: string}, res: NextApiResponse) => {
  const searchTerm = query.search;
  const filters = `${query.filters}`.split(',');
  const pageParam = Number(query.pageParam);

  let nextPage = null;

  if (pageParam === 0) {
    nextPage = 1;
  }

  // Ideally you would do the filtering at the BE api level
  // doing this client side for the purpose of the challenge only
  let appliedFilters = filters
    .map(filter => QUICK_FILTERS.find(({ label }) => label === filter))
    .filter(filter => filter !== undefined)
  const hasRemoteFilter = appliedFilters.some(filter => filter?.label === 'Remote Jobs')

  //  no need to include remote as it's only calculated for location
  appliedFilters = appliedFilters.filter(filter => filter?.label !== 'Remote Jobs')

  const filteredJobs = jobsData.data.filter(job => {
    const hasSearchTerm = job.title.toLowerCase().indexOf(`${searchTerm}`.toLowerCase()) > -1 || job.description.toLowerCase().indexOf(`${searchTerm}`.toLowerCase()) > -1
    const hasFiltersSearchTerms = appliedFilters.every(filter => filter!.searchTerms.some(searchTerm => job.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 || job.description.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ))

    if (hasRemoteFilter) {
      const isRemote = job.location_type === 'Remote' && hasSearchTerm
      return !appliedFilters.length ? isRemote : isRemote && hasFiltersSearchTerms
    }

    return !appliedFilters.length ? hasSearchTerm : hasSearchTerm && hasFiltersSearchTerms;
  })

  res.status(200).json({
    meta: {
      ...jobsData.meta,
      next_page: nextPage,
    },
    data: filteredJobs,
  })
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {

  if (req.method === 'GET') {
    return searhJobs(req.query, res);
  }

  return res.status(201).json({success: true})
}
