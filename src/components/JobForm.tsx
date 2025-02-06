"use client";
import React, { useState } from "react";

interface JobPosting {
  title: string;
  description: string[];
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
}

interface JobFormProps {
  createJob: (
    formData: FormData,
  ) => Promise<{ success: boolean; error?: string }>;
}

export default function JobForm({ createJob }: JobFormProps) {
  const [jobData, setJobData] = useState<JobPosting>({
    title: "",
    description: [""],
    responsibilities: [""],
    requirements: [""],
    benefits: [""],
  });

  const handleBulletPointChange = (
    section: keyof Omit<JobPosting, "title">,
    index: number,
    value: string,
  ) => {
    setJobData((prev) => ({
      ...prev,
      [section]: prev[section].map((item, i) => (i === index ? value : item)),
    }));
  };

  const addBulletPoint = (section: keyof Omit<JobPosting, "title">) => {
    setJobData((prev) => ({
      ...prev,
      [section]: [...prev[section], ""],
    }));
  };

  const removeBulletPoint = (
    section: keyof Omit<JobPosting, "title">,
    index: number,
  ) => {
    setJobData((prev) => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index),
    }));
  };

  const renderBulletPoints = (
    section: keyof Omit<JobPosting, "title">,
    title: string,
  ) => (
    <div className="mb-8 space-y-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="space-y-2">
        {jobData[section].map((bullet, index) => (
          <div key={`${section}-${index}`} className="flex gap-2">
            <input
              type="text"
              value={bullet}
              onChange={(e) =>
                handleBulletPointChange(section, index, e.target.value)
              }
              className="flex-1 rounded-md border p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              placeholder={`Enter ${section} bullet point`}
            />
            <button
              type="button"
              onClick={() => removeBulletPoint(section, index)}
              className="rounded-md bg-red-500 px-3 py-2 text-white transition-colors hover:bg-red-600"
              aria-label="Remove bullet point"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addBulletPoint(section)}
          className="rounded-md bg-green-500 px-4 py-2 text-white transition-colors hover:bg-green-600"
        >
          Add Bullet Point
        </button>
      </div>
    </div>
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("title", jobData.title);
    jobData.description.forEach((item) => {
      formData.append("description[]", item);
    });
    jobData.responsibilities.forEach((item) => {
      formData.append("responsibilities[]", item);
    });

    jobData.requirements.forEach((item) => {
      formData.append("requirements[]", item);
    });

    jobData.benefits.forEach((item) => {
      formData.append("benefits[]", item);
    });

    const result = await createJob(formData);
    if (result.success) {
      // Reset form or redirect
      setJobData({
        title: "",
        description: [""],
        responsibilities: [""],
        requirements: [""],
        benefits: [""],
      });
    } else {
      // Handle error
      alert(result.error ?? "Failed to create job posting");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-3xl space-y-6 p-6">
      <div className="space-y-4">
        <label htmlFor="title" className="block text-lg font-semibold">
          Job Title
        </label>
        <input
          id="title"
          type="text"
          value={jobData.title}
          onChange={(e) =>
            setJobData((prev) => ({ ...prev, title: e.target.value }))
          }
          className="w-full rounded-md border p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          placeholder="Enter job title"
        />
      </div>

      {renderBulletPoints("description", "Job Description")}
      {renderBulletPoints(
        "responsibilities",
        "A few examples of your responsibilities",
      )}
      {renderBulletPoints("requirements", "What we look for")}
      {renderBulletPoints("benefits", "What we offer")}

      <button
        type="submit"
        className="w-full rounded-md bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
      >
        Create Job Posting
      </button>
    </form>
  );
}
