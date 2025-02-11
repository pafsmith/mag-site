"use client";

import { useState, useTransition } from "react";
import { useForm, useFieldArray, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// shadcn/ui components – adjust the import paths as needed.
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "~/components/ui/dialog";

import { submitJobSpec } from "~/server/actions/job-spec";
import { jobSpecSchema, type JobSpecFormValues } from "~/client/types/job-spec";

// Define our Zod schema for the job spec.
// Note responsibilities and requirements are arrays of objects.

export default function CreateJobSpecPage() {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    control,
    watch,
    setError,
    formState: { errors },
  } = useForm<JobSpecFormValues>({
    resolver: zodResolver(jobSpecSchema),
    defaultValues: {
      title: "",
      description: "",
      responsibilities: [{ value: "" }],
      requirements: [{ value: "" }],
      benefits: [{ value: "" }],
      isSeasonal: false,
    },
  });

  // Set up dynamic fields for responsibilities.
  const {
    fields: responsibilityFields,
    append: appendResponsibility,
    remove: removeResponsibility,
  } = useFieldArray({
    control,
    name: "responsibilities",
  });

  // Set up dynamic fields for requirements.
  const {
    fields: requirementFields,
    append: appendRequirement,
    remove: removeRequirement,
  } = useFieldArray({
    control,
    name: "requirements",
  });

  // Set up dynamic fields for benefits.
  const {
    fields: benefitFields,
    append: appendBenefit,
    remove: removeBenefit,
  } = useFieldArray({
    control,
    name: "benefits",
  });

  // Get current form values for the preview.
  const formValues = watch();

  const onSubmit: SubmitHandler<JobSpecFormValues> = async (data) => {
    // Package form values into FormData.
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("isSeasonal", String(data.isSeasonal));
    data.responsibilities.forEach((r) =>
      formData.append("responsibilities", r.value),
    );
    data.requirements.forEach((r) => formData.append("requirements", r.value));
    data.benefits.forEach((b) => formData.append("benefits", b.value));
    startTransition(async () => {
      const response = await submitJobSpec(formData);
      if (!response.success && response.fieldErrors) {
        // Map server errors to react-hook-form fields.
        Object.entries(response.fieldErrors).forEach(([field, messages]) => {
          setError(field as keyof JobSpecFormValues, {
            type: "server",
            message: messages.join(", "),
          });
        });
      }
    });
  };

  return (
    <main className="mx-auto max-w-3xl space-y-6 p-4">
      <h1 className="text-2xl font-bold">Create Job Spec</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Job Title */}
        <div className="flex flex-col">
          <Label htmlFor="title" className="mb-1">
            Job Title
          </Label>
          <Input type="text" id="title" {...register("title")} />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>

        {/* High Level Description */}
        <div className="flex flex-col">
          <Label htmlFor="description" className="mb-1">
            High Level Description
          </Label>
          <Textarea id="description" {...register("description")} rows={5} />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Seasonality */}
        <div className="flex flex-col">
          <Label htmlFor="isSeasonal" className="mb-1">
            Seasonality
          </Label>
          <select
            id="isSeasonal"
            {...register("isSeasonal", {
              setValueAs: (value: string) => value === "true",
            })}
          >
            <option value="true">Seasonal</option>
            <option value="false">Permanent</option>
          </select>
          {errors.isSeasonal && (
            <p className="mt-1 text-sm text-red-600">
              {errors.isSeasonal.message}
            </p>
          )}
        </div>

        {/* Responsibilities */}
        <div className="flex flex-col">
          <Label className="mb-1">
            A Few Examples of Your Responsibilities
          </Label>
          {responsibilityFields.map((field, index) => (
            <div key={field.id} className="mb-2 flex items-center space-x-2">
              <Input
                type="text"
                placeholder={`Responsibility #${index + 1}`}
                {...register(`responsibilities.${index}.value` as const)}
              />
              <Button
                type="button"
                variant="destructive"
                onClick={() => removeResponsibility(index)}
              >
                Remove
              </Button>
            </div>
          ))}
          {errors.responsibilities && (
            <p className="mt-1 text-sm text-red-600">
              {errors.responsibilities.message}
            </p>
          )}
          <Button
            type="button"
            onClick={() => appendResponsibility({ value: "" })}
          >
            Add Responsibility
          </Button>
        </div>

        {/* Requirements */}
        <div className="flex flex-col">
          <Label className="mb-1">What We Look For</Label>
          {requirementFields.map((field, index) => (
            <div key={field.id} className="mb-2 flex items-center space-x-2">
              <Input
                type="text"
                placeholder={`Requirement #${index + 1}`}
                {...register(`requirements.${index}.value` as const)}
              />

              <Button
                type="button"
                variant="destructive"
                onClick={() => removeRequirement(index)}
              >
                Remove
              </Button>
            </div>
          ))}
          {errors.requirements && (
            <p className="mt-1 text-sm text-red-600">
              {errors.requirements.message}
            </p>
          )}
          <Button
            type="button"
            onClick={() => appendRequirement({ value: "" })}
          >
            Add Requirement
          </Button>
        </div>

        {/* Benefits */}
        <div className="flex flex-col">
          <Label className="mb-1">Benefits</Label>
          {benefitFields.map((field, index) => (
            <div key={field.id} className="mb-2 flex items-center space-x-2">
              <Input
                type="text"
                placeholder={`Benefit #${index + 1}`}
                {...register(`benefits.${index}.value` as const)}
              />
              <Button
                type="button"
                variant="destructive"
                onClick={() => removeBenefit(index)}
              >
                Remove
              </Button>
            </div>
          ))}
          {errors.benefits && (
            <p className="mt-1 text-sm text-red-600">
              {errors.benefits.message}
            </p>
          )}
          <Button type="button" onClick={() => appendBenefit({ value: "" })}>
            Add Benefit
          </Button>
        </div>

        <div className="flex justify-end space-x-4">
          {/* Button to open preview */}
          <Button
            type="button"
            variant="outline"
            onClick={() => setPreviewOpen(true)}
          >
            Preview
          </Button>
          {/* Submit button */}
          <Button type="submit" disabled={isPending}>
            Create Job Spec
          </Button>
        </div>
      </form>

      {/* Preview Modal using shadcn/ui Dialog */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Job Spec Preview</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <h2 className="text-xl font-bold">
              {formValues.title || "No Title"}
            </h2>
            <div>
              <h3 className="font-semibold">High Level Description</h3>
              <p className="whitespace-pre-line">
                {formValues.description || "No description provided"}
              </p>
            </div>
            <div>
              <h3 className="font-semibold">Responsibilities</h3>
              {formValues.responsibilities &&
              formValues.responsibilities.length > 0 ? (
                <ul className="list-inside list-disc">
                  {formValues.responsibilities.map((item, index) => (
                    <li key={index}>{item.value || "Empty"}</li>
                  ))}
                </ul>
              ) : (
                <p>No responsibilities provided</p>
              )}
            </div>
            <div>
              <h3 className="font-semibold">What We Look For</h3>
              {formValues.requirements && formValues.requirements.length > 0 ? (
                <ul className="list-inside list-disc">
                  {formValues.requirements.map((item, index) => (
                    <li key={index}>{item.value || "Empty"}</li>
                  ))}
                </ul>
              ) : (
                <p>No requirements provided</p>
              )}
            </div>
            <div>
              <h3 className="font-semibold">Benefits</h3>
              {formValues.benefits && formValues.benefits.length > 0 ? (
                <ul className="list-inside list-disc">
                  {formValues.benefits.map((item, index) => (
                    <li key={index}>{item.value || "Empty"}</li>
                  ))}
                </ul>
              ) : (
                <p>No benefits provided</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setPreviewOpen(false)}>Close Preview</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}
