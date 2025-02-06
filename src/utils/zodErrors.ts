import { ZodError } from "zod";
import { StringMap } from "~/schemas/formState";

export const convertZodErrors = (error: ZodError): StringMap => {
  return error.issues.reduce((acc: Record<string, string>, issue) => {
    acc[issue.path[0] as string] = issue.message;
    return acc;
  }, {});
};
