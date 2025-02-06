import JobCard from './JobCard';
import { Job } from '@/types/Job';

function JobList({ jobs, admin }: { jobs: Job[]; admin: boolean }) {
  return (
    <ul>
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} admin={admin} />
      ))}
    </ul>
  );
}

export default JobList;
