"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  jobApplicationSchema,
  type JobApplicationFormValues,
} from "~/client/types/application";
import {
  submitApplication,
  type SubmitApplicationResponse,
} from "~/server/actions/application";

// Import shadcn/ui components.
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";

function Form({ jobId }: { jobId: string }) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<JobApplicationFormValues>({
    resolver: zodResolver(jobApplicationSchema),
  });

  const [isPending, startTransition] = useTransition();

  const onSubmit = async (data: JobApplicationFormValues) => {
    // Convert validated data into FormData.
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("coverLetter", data.coverLetter);
    formData.append("cv", data.cv);
    formData.append("jobId", jobId);

    startTransition(async () => {
      const response: SubmitApplicationResponse =
        await submitApplication(formData);
      if (!response.success && response.fieldErrors) {
        // Map server errors into react-hook-form errors.
        Object.entries(response.fieldErrors).forEach(([field, messages]) => {
          setError(field as keyof JobApplicationFormValues, {
            type: "server",
            message: messages.join(", "),
          });
        });
      }
      // On success the server action triggers a redirect.
    });
  };

  return (
    <main className="mx-auto max-w-2xl p-4">
      <h1 className="mb-4 text-2xl font-bold">
        Apply for Job <span className="text-blue-600">{jobId}</span>
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
        className="space-y-4"
      >
        <input type="hidden" value={jobId} {...register("jobId")} />

        <div className="flex flex-col">
          <Label htmlFor="name" className="mb-1">
            Full Name
          </Label>
          <Input type="text" id="name" {...register("name")} />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div className="flex flex-col">
          <Label htmlFor="email" className="mb-1">
            Email Address
          </Label>
          <Input type="email" id="email" {...register("email")} />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div className="flex flex-col">
          <Label htmlFor="phone" className="mb-1">
            Phone Number
          </Label>
          <Input type="tel" id="phone" {...register("phone")} />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
          )}
        </div>

        <div className="flex flex-col">
          <Label htmlFor="coverLetter" className="mb-1">
            Cover Letter
          </Label>
          <Textarea id="coverLetter" rows={6} {...register("coverLetter")} />
          {errors.coverLetter && (
            <p className="mt-1 text-sm text-red-600">
              {errors.coverLetter.message}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <Label htmlFor="cv" className="mb-1">
            Upload Your CV
          </Label>
          <Input
            type="file"
            id="cv"
            accept=".pdf,.doc,.docx"
            {...register("cv")}
          />
          {errors.cv && (
            <p className="mt-1 text-sm text-red-600">{errors.cv.message}</p>
          )}
        </div>

        <Button type="submit" disabled={isPending}>
          Submit Application
        </Button>
      </form>
    </main>
  );
}

export default Form;
