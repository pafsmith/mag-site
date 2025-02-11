// /app/admin/jobs/[jobId]/edit/EditJobSpecForm.tsx

"use client";

import { useTransition } from "react";
import { useForm, useFieldArray, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { useRouter } from "next/navigation";
import { submitEditedJobSpec } from "~/server/actions/job-spec";
import {
  editJobSpecSchema,
  type EditJobSpecFormValues,
} from "~/client/types/job-spec";
// Define a schema for the edit form. Here, we expect responsibilities
// and requirements as arrays of objects (with a 'value' property) for the UI.

export default function EditJobSpecForm({
  defaultValues,
}: {
  defaultValues: EditJobSpecFormValues;
}) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<EditJobSpecFormValues>({
    resolver: zodResolver(editJobSpecSchema),
    defaultValues: {
      ...defaultValues,
      // Ensure isSeasonal is included in defaultValues
      isSeasonal: defaultValues.isSeasonal ?? false,
    },
  });

  // Setup dynamic fields for responsibilities.
  const {
    fields: responsibilityFields,
    append: appendResponsibility,
    remove: removeResponsibility,
  } = useFieldArray({ control, name: "responsibilities" });

  // Setup dynamic fields for requirements.
  const {
    fields: requirementFields,
    append: appendRequirement,
    remove: removeRequirement,
  } = useFieldArray({ control, name: "requirements" });

  // Setup dynamic fields for benefits.
  const {
    fields: benefitFields,
    append: appendBenefit,
    remove: removeBenefit,
  } = useFieldArray({ control, name: "benefits" });

  const [isPending, startTransition] = useTransition();

  const onSubmit: SubmitHandler<EditJobSpecFormValues> = async (data) => {
    const formData = new FormData();
    formData.append("jobId", data.jobId);
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("isSeasonal", String(data.isSeasonal));
    data.responsibilities.forEach((item) => {
      formData.append("responsibilities", item.value);
    });
    data.requirements.forEach((item) => {
      formData.append("requirements", item.value);
    });
    data.benefits.forEach((item) => {
      formData.append("benefits", item.value);
    });

    startTransition(async () => {
      await submitEditedJobSpec(formData);
      // The server action redirects on success, but you can explicitly push if needed.
      router.push("/admin/jobs");
    });
  };

  return (
    <main className="mx-auto max-w-3xl space-y-6 p-4">
      <h1 className="text-2xl font-bold">Edit Job Spec</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Hidden field for jobId */}
        <Input type="hidden" {...register("jobId")} />

        <div className="flex flex-col">
          <Label htmlFor="title" className="mb-1">
            Job Title
          </Label>
          <Input type="text" id="title" {...register("title")} />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>

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

        {/* Responsibilities dynamic fields */}
        <div className="flex flex-col">
          <Label className="mb-1">Responsibilities</Label>
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

        {/* Requirements dynamic fields */}
        <div className="flex flex-col">
          <Label className="mb-1">Requirements</Label>
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

        {/* Benefits dynamic fields */}
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

        <div className="flex justify-end">
          <Button type="submit" disabled={isPending}>
            Update Job Spec
          </Button>
        </div>
      </form>
    </main>
  );
}
