import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { Button } from "~/components/ui/button";
import Link from "next/link";

interface JobViewProps {
  jobTitle: string;
  seasonal: boolean;
  sections: Array<{
    title: string;
    paragraphs: string[];
  }>;
  isPreview?: boolean;
  onEdit?: () => void;
  onSubmit?: (e: React.FormEvent) => Promise<void>;
  isEditMode?: boolean;
}

export function JobView({
  jobTitle,
  seasonal,
  sections,
  isPreview = false,
  onEdit,
  onSubmit,
  isEditMode,
}: JobViewProps) {
  return (
    <div className="relative mx-auto max-w-[1536px] gap-10 px-6 lg:flex lg:pb-[148px]">
      <div className="relative h-full flex-1">
        <div className="flex flex-col gap-6 lg:gap-8">
          {isPreview ? (
            <button
              onClick={onEdit}
              className="mt-[50px] inline-flex cursor-pointer items-center text-xl leading-8 text-neutral-500 hover:text-orange-500"
            >
              <span>
                <ArrowLeft size={20} />
              </span>
              <span className="pl-2">back to editing</span>
            </button>
          ) : (
            <Link
              href="/careers/jobs"
              className="mt-[50px] inline-flex cursor-pointer items-center text-xl leading-8 text-neutral-500 hover:text-orange-500"
            >
              <span>
                <ArrowLeft size={20} />
              </span>
              <span className="pl-2">back to jobs</span>
            </Link>
          )}
          <h1 className="text-5xl font-medium leading-none lg:w-1/2 lg:text-6xl">
            {jobTitle}
          </h1>
          <h3 className="items-center text-base font-light leading-5 text-orange-500 lg:flex lg:text-lg lg:font-normal lg:leading-6">
            <p>
              <span>Telford (England)</span>
            </p>
            <span className="mx-4 hidden h-1 w-1 shrink-0 rounded-full bg-orange-500 lg:block" />
            <p>{seasonal ? "Seasonal" : "Permanent / fixed-term"}</p>
          </h3>
          {!isPreview && (
            <div className="relative inline-block">
              <a className="inline-block w-44 rounded-md bg-black px-5 py-3 text-2xl font-semibold leading-8 text-white hover:bg-orange-500 md:text-center">
                Apply
              </a>
            </div>
          )}
          <div className="flex">
            <Image
              className="w-auto rounded-xl shadow-xl"
              src="/plc.jpg"
              alt="job-page-hero"
              width={500}
              height={500}
            />
          </div>
        </div>
      </div>

      <div className="mt-[50px] flex-1 text-base font-normal leading-6 tracking-tighter text-neutral-600 lg:pb-0 lg:text-xl lg:leading-7">
        {sections.map((section, index) => (
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
        ))}

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

        {isPreview && (
          <div className="mt-8 flex gap-4">
            <Button onClick={onEdit} variant="outline">
              Edit
            </Button>
            <Button onClick={onSubmit}>
              {isEditMode ? "Update" : "Create"} Job Spec
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
