"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Input } from "~/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { applicationSubmit } from "../_action";
import { PhoneInput } from "~/components/ui/phone-input";
import SubmitButton from "~/components/SubmitButton";
import { Application, appSchema } from "~/schemas/jobApplication";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";

export default function JobApp({
  title,
  jobid,
  userId,
}: {
  title: string | undefined;
  jobid: string;
  userId: string;
}) {
  const router = useRouter();

  const form = useForm<Application>({
    resolver: zodResolver(appSchema),
    mode: "onChange",
    defaultValues: {},
  });
  const {
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = form;

  const onSubmit = async (values: Application) => {
    values.jobid = jobid;
    values.userId = userId;

    const { successMsg } = await applicationSubmit(values);

    if (successMsg) {
      toast.success(successMsg);
      reset();
      router.push("/admin");
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold">{title}</h1>
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto max-w-3xl space-y-8 py-10"
        >
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a title" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Mr">Mr</SelectItem>
                        <SelectItem value="Ms">Ms</SelectItem>
                        <SelectItem value="Mrs">Mrs</SelectItem>
                        <SelectItem value="Miss">Miss</SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-6">
              <FormField
                control={form.control}
                name="sex"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sex</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your sex" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-6">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" type="text" {...field} />
                    </FormControl>
                    <FormDescription>This is your first name</FormDescription>
                    {errors?.firstName && (
                      <small className="text-red-400">
                        {errors.firstName.message}
                      </small>
                    )}
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-6">
              <FormField
                control={form.control}
                name="surname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Surname</FormLabel>
                    <FormControl>
                      <Input placeholder="Smith" type="text" {...field} />
                    </FormControl>
                    <FormDescription>This is your surname</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <FormField
            control={form.control}
            name="streetAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Street Address</FormLabel>
                <FormControl>
                  <Input placeholder="" type="text" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Town/City</FormLabel>
                <FormControl>
                  <Input placeholder="" type="text" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="county"
            render={({ field }) => (
              <FormItem>
                <FormLabel>County</FormLabel>
                <FormControl>
                  <Input placeholder="" type="" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="postcode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Postcode</FormLabel>
                <FormControl>
                  <Input placeholder="" type="" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start">
                <FormLabel>Phone Number</FormLabel>
                <FormControl className="w-full">
                  <PhoneInput placeholder="" {...field} defaultCountry="GB" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="niNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>National Insurance Number</FormLabel>
                <FormControl>
                  <Input placeholder="" type="text" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cv"
            render={({ field: { onChange, ...field } }) => (
              <FormItem>
                <FormLabel>Upload CV</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      onChange(file);
                    }}
                    {...field}
                    value={undefined}
                  />
                </FormControl>
                <FormDescription>Upload your cv here</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="option"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select an Option</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-row"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-one" id="option-one" />
                      <Label htmlFor="option-one">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-two" id="option-two" />
                      <Label htmlFor="option-two">No</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <SubmitButton isSubmitting={isSubmitting} />
        </form>
      </Form>
    </>
  );
}
