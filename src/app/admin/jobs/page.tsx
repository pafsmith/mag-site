// /app/admin/jobs/page.tsx

import Link from "next/link";
import { QUERIES } from "~/server/db/queries";

export default async function AdminJobsListPage() {
  // Fetch all jobs ordered by creation time (most recent first)
  const allJobs = await QUERIES.getJobs();

  return (
    <main className="mx-auto max-w-4xl p-6">
      <h1 className="mb-6 text-3xl font-bold">All Job Specs</h1>

      {/* Link to create a new job spec */}
      <div className="mb-6">
        <Link href="/admin/jobs/new">
          <button className="rounded bg-green-500 px-4 py-2 text-white">
            Create New Job Spec
          </button>
        </Link>
      </div>

      {allJobs.length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        <ul className="space-y-4">
          {allJobs.map((job) => (
            <li key={job.id} className="rounded border p-4 shadow-sm">
              <h2 className="text-xl font-semibold">{job.title}</h2>
              <p className="text-gray-600">
                Posted on: {new Date(job.createdAt).toLocaleDateString()}
              </p>
              <div className="mt-2">
                {/* Link to the modification (edit) page for this job spec */}
                <Link href={`/admin/jobs/${job.id}/edit`}>
                  <button className="rounded bg-blue-500 px-4 py-2 text-white">
                    Edit Job Spec
                  </button>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
