'use client';

import Link from 'next/link';

interface JobCardProps {
  job: {
    id: number;
    title: string;
    location: string;
    departmentName: string;
    isSeasonal: boolean;
  };
  admin: boolean;
}

function JobCard({ job, admin }: JobCardProps) {
  const { id, title, location, departmentName, isSeasonal } = job;

  return (
    <li key={id}>
      <Link
        className='block hover:bg-gray-50'
        href={admin ? `/jobs/admin/jobs/edit/${id}` : `/careers/jobs/${id}`}
      >
        <div className='px-4 py-4 sm:px-6'>
          <div className='flex items-center justify-between'>
            <div className='truncate text-sm font-medium text-orange-500'>
              {title}
            </div>
            <div className='ml-2 flex shrink-0'>
              <span
                className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                  isSeasonal
                    ? 'bg-orange-100 text-orange-800 ring-orange-900/10 ring-1 ring-inset'
                    : 'bg-blue-100 text-blue-800 ring-blue-900/10 ring-1 ring-inset'
                }`}
              >
                {isSeasonal ? 'Seasonal' : 'Full Time'}
              </span>
            </div>
          </div>
          <div className='mt-2 flex justify-between'>
            <div className='sm:flex'>
              <div className='flex items-center text-sm text-gray-500'>
                <svg
                  className='mr-1.5 size-5 shrink-0 text-gray-400'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                  aria-hidden='true'
                  data-slot='icon'
                >
                  <path d='M7 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM14.5 9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM1.615 16.428a1.224 1.224 0 0 1-.569-1.175 6.002 6.002 0 0 1 11.908 0c.058.467-.172.92-.57 1.174A9.953 9.953 0 0 1 7 18a9.953 9.953 0 0 1-5.385-1.572ZM14.5 16h-.106c.07-.297.088-.611.048-.933a7.47 7.47 0 0 0-1.588-3.755 4.502 4.502 0 0 1 5.874 2.636.818.818 0 0 1-.36.98A7.465 7.465 0 0 1 14.5 16Z'></path>
                </svg>
                {departmentName}
              </div>
            </div>
            <div className='ml-2 flex items-center text-sm text-gray-500'>
              <svg
                className='mr-1.5 size-5 shrink-0 text-gray-400'
                viewBox='0 0 20 20'
                fill='currentColor'
                aria-hidden='true'
                data-slot='icon'
              >
                <path
                  fillRule='evenodd'
                  d='m9.69 18.933.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 0 0 .281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 1 0 3 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 0 0 2.273 1.765 11.842 11.842 0 0 0 .976.544l.062.029.018.008.006.003ZM10 11.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z'
                  clipRule='evenodd'
                ></path>
              </svg>
              {location}
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
}

export default JobCard;
