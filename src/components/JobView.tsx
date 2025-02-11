import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { type jobs } from "~/server/db/schema";
import { type InferSelectModel } from "drizzle-orm";
import { describe } from "node:test";
import { Description } from "@headlessui/react";

type Job = InferSelectModel<typeof jobs>;

export function JobView({ job }: { job: Job }) {
  return (
    <div className="relative mx-auto max-w-[1536px] gap-10 px-6 lg:flex lg:pb-[148px]">
      <div className="relative h-full flex-1">
        <div className="flex flex-col gap-6 lg:gap-8">
          <Link
            href="/careers/jobs"
            className="mt-[50px] inline-flex cursor-pointer items-center text-xl leading-8 text-neutral-500 hover:text-orange-500"
          >
            <span>
              <ArrowLeft size={20} />
            </span>
            <span className="pl-2">back to jobs</span>
          </Link>

          <h1 className="text-5xl font-medium leading-none lg:w-1/2 lg:text-6xl">
            {job.title}
          </h1>
          <h3 className="items-center text-base font-light leading-5 text-orange-500 lg:flex lg:text-lg lg:font-normal lg:leading-6">
            <p>
              <span>Telford (England)</span>
            </p>
            <span className="mx-4 hidden h-1 w-1 shrink-0 rounded-full bg-orange-500 lg:block" />
            <p>{job.isSeasonal ? "Seasonal" : "Permanent / fixed-term"}</p>
          </h3>
          <div className="flex">
            <Image
              className="w-auto rounded-xl shadow-xl"
              src="/jobs/eng.jpg"
              alt="job-page-hero"
              width={500}
              height={500}
            />
          </div>
          <div className="flex justify-center sm:justify-start">
            <button className="w-1/3 rounded-lg bg-orange-500 px-6 py-3 text-xl font-bold text-white shadow hover:bg-orange-600">
              <Link href={`/careers/jobs/${job.id}`}>Apply Now</Link>
            </button>
          </div>
        </div>
      </div>

      <div className="mt-[50px] flex-1 text-base font-normal leading-6 tracking-tighter text-neutral-600 lg:pb-0 lg:text-xl lg:leading-7">
        {job.description.split("\n").map((line, index) => (
          <p key={index} className="pb-3">
            {line}
          </p>
        ))}
        {/* <p>{job.description}</p> */}
        {/* {sections.map((section, index) => (
          <div key={index} className="pb-4">
            {index === 0 ? (
              <div>
                {section.paragraphs.map((paragraph, pIndex) => (
                  <p key={pIndex} className="pb-6">
                    {paragraph}
                  </p>
                ))}
              </div>
            ) : (
              <>
                <h2 className="pb-6 text-lg font-normal leading-6 text-gray-900 lg:text-2xl lg:font-semibold lg:leading-10 lg:text-black">
                  {section.title}
                </h2>
                <ul className="list-disc whitespace-pre-line pl-6 lg:pl-8">
                  {section.paragraphs.map((item, pIndex) => (
                    <li key={pIndex} className="pb-6 marker:text-[1.3em]">
                      {item}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        ))} */}
        <h2 className="pb-6 text-lg font-normal leading-6 text-gray-900 lg:text-2xl lg:font-semibold lg:leading-10 lg:text-black">
          Responsibilities
        </h2>
        <ul className="list-disc whitespace-pre-line pl-6 lg:pl-8">
          {job.responsibilities.map((item, pIndex) => (
            <li key={pIndex} className="pb-6 marker:text-[1.3em]">
              {item}
            </li>
          ))}
        </ul>

        <h2 className="pb-6 text-lg font-normal leading-6 text-gray-900 lg:text-2xl lg:font-semibold lg:leading-10 lg:text-black">
          Requirements
        </h2>
        <ul className="list-disc whitespace-pre-line pl-6 lg:pl-8">
          {job.requirements.map((item, pIndex) => (
            <li key={pIndex} className="pb-6 marker:text-[1.3em]">
              {item}
            </li>
          ))}
        </ul>
        <h2 className="pb-6 text-lg font-normal leading-6 text-gray-900 lg:text-2xl lg:font-semibold lg:leading-10 lg:text-black">
          Benefits
        </h2>
        <ul className="list-disc whitespace-pre-line pl-6 lg:pl-8">
          {job.benefits.map((item, pIndex) => (
            <li key={pIndex} className="pb-6 marker:text-[1.3em]">
              {item}
            </li>
          ))}
        </ul>
        {/* Standard closing sections */}
        <div className="pb-4">
          <h2 className="pb-6 text-lg font-normal leading-6 text-gray-900 lg:text-2xl lg:font-semibold lg:leading-10 lg:text-black">
            Before you apply
          </h2>
          <p className="pb-6">
            Magna is a dynamic and fast-paced environment where ambition and
            high standards drive everything we do. We expect a lot from
            ourselves and one another, which leads to exceptional learning
            opportunities, significant achievements, and rewarding career
            growth. If this role excites you and you&apos;re ready to bring your
            best every day, we encourage you to apply and join us on our
            journey.
          </p>
        </div>

        <div className="pb-4">
          <h2 className="pb-6 text-lg font-normal leading-6 text-gray-900 lg:text-2xl lg:font-semibold lg:leading-10 lg:text-black">
            The selection process
          </h2>
          <p className="pb-6">
            If you pass our initial screening process, you&apos;ll be invited to
            complete a series of tests designed to assess how you approach and
            solve unfamiliar challenges. Successful candidates will then move on
            to a series of interviews to further explore their skills and fit
            for the role.
          </p>
        </div>

        {/* {isPreview && (
          <div className="mt-8 flex gap-4">
            <Button onClick={onEdit} variant="outline">
              Edit
            </Button>
            <Button onClick={onSubmit}>
              {isEditMode ? "Update" : "Create"} Job Spec
            </Button>
          </div>
        )} */}
      </div>
    </div>
  );
}
