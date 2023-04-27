export type Job = {
  id: number,
  title: string,
  description: string,
  category: string | null,
  published_on: string | null,
  location_type: string,
  location: string,
  skills: string[],
  levels_of_experience: string[] | null,
}
