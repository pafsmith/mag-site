import { QUERIES } from "~/server/db/queries";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { type applications } from "~/server/db/schema";

// Define valid status types
type ApplicationStatus =
  | "Complete"
  | "In progress"
  | "pending"
  | "approved"
  | "rejected";

const statuses: Record<ApplicationStatus, string> = {
  Complete: "text-green-700 bg-green-50 ring-green-600/20",
  "In progress": "text-gray-600 bg-gray-50 ring-gray-500/10",
  pending: "text-yellow-800 bg-yellow-50 ring-yellow-600/20",
  approved: "text-green-700 bg-green-50 ring-green-600/20",
  rejected: "text-red-700 bg-red-50 ring-red-600/20",
};

// Update the Application type to match the new query structure
type Application = {
  application: typeof applications.$inferSelect;
  jobTitle: string;
  userName: string;
};

function classNames(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

export default async function ApplicationsList() {
  const applications: Application[] = await QUERIES.getAllApplications();

  return (
    <ul role="list" className="divide-y divide-gray-100">
      {applications.map(({ application, jobTitle, userName }) => (
        <li
          key={application.id}
          className="flex items-center justify-between gap-x-6 py-5"
        >
          <div className="min-w-0">
            <div className="flex items-start gap-x-3">
              <p className="text-sm/6 font-semibold text-gray-900">
                {jobTitle} - {application.fullName}
              </p>
              <p
                className={classNames(
                  statuses[application.status as ApplicationStatus],
                  "mt-0.5 whitespace-nowrap rounded-md px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset",
                )}
              >
                {application.status}
              </p>
            </div>
            <div className="mt-1 flex items-center gap-x-2 text-xs/5 text-gray-500">
              <p className="whitespace-nowrap">
                Submitted on{" "}
                <time dateTime={application.createdAt.toISOString()}>
                  {application.createdAt.toLocaleDateString()}
                </time>
              </p>
              <svg viewBox="0 0 2 2" className="size-0.5 fill-current">
                <circle r={1} cx={1} cy={1} />
              </svg>
              <p className="truncate">Applicant: {application.fullName}</p>
              <svg viewBox="0 0 2 2" className="size-0.5 fill-current">
                <circle r={1} cx={1} cy={1} />
              </svg>
              <p className="truncate">
                Updated on{" "}
                <time dateTime={application.updatedAt.toISOString()}>
                  {application.updatedAt.toLocaleDateString()}
                </time>
              </p>
              <svg viewBox="0 0 2 2" className="size-0.5 fill-current">
                <circle r={1} cx={1} cy={1} />
              </svg>
              <p className="truncate">Updated by {userName}</p>
            </div>
          </div>
          <div className="flex flex-none items-center gap-x-4">
            <a
              href={`/admin/applications/${application.id}`}
              className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block"
            >
              View application
              <span className="sr-only">, {application.fullName}</span>
            </a>
            <Menu as="div" className="relative flex-none">
              <MenuButton className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                <span className="sr-only">Open options</span>
                <EllipsisVerticalIcon aria-hidden="true" className="size-5" />
              </MenuButton>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <MenuItem>
                  <a
                    href="#"
                    className="block px-3 py-1 text-sm/6 text-gray-900 data-[focus]:bg-gray-50 data-[focus]:outline-none"
                  >
                    Edit
                    <span className="sr-only">, {application.fullName}</span>
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="#"
                    className="block px-3 py-1 text-sm/6 text-gray-900 data-[focus]:bg-gray-50 data-[focus]:outline-none"
                  >
                    Move
                    <span className="sr-only">, {application.fullName}</span>
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="#"
                    className="block px-3 py-1 text-sm/6 text-gray-900 data-[focus]:bg-gray-50 data-[focus]:outline-none"
                  >
                    Delete
                    <span className="sr-only">, {application.fullName}</span>
                  </a>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </li>
      ))}
    </ul>
  );
}
