"use client";

import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "./ui/form";
import { startupFormSchema, startupFormValues } from "@/lib/validation";
import { Input } from "./ui/input";
import LoadingButton from "./LoadingButton";
import { createStartupReg } from "@/app/startups/actions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Card, CardContent, CardDescription, CardHeader } from "./ui/card";

function StartupRegForm() {
  // const [error, setError] = useState<string>();

  const [isPending, startTransition] = useTransition();

  const form = useForm<startupFormValues>({
    resolver: zodResolver(startupFormSchema),
    defaultValues: {
      brandName: "",
      companyName: "",
      contactEmail: "",
      contactName: "",
      dealroomUrl: "",
      startupType: "",
      websiteUrl: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit({
    brandName,
    companyName,
    contactEmail,
    contactName,
    dealroomUrl,
    startupType,
    websiteUrl,
  }: startupFormValues) {
    console.log("ok");
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    startTransition(async () => {
      await createStartupReg({
        brandName,
        companyName,
        contactEmail,
        contactName,
        dealroomUrl,
        startupType,
        websiteUrl,
      });

      form.reset();
    });
  }
  return (
    <div className=" max-w-xl w-full animate-fadeInUp">
      <Card className="">
        <div className="gap-0 mb-4 flex items-center justify-center flex-col">
          <CardHeader className="text-2xl font-bold">
            Want to be listed on the Startup database?
          </CardHeader>
          <CardDescription className="">
            If your startup isn’t listed yet, submit this form to be featured
            with verified data.
          </CardDescription>
        </div>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-2 ">
                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel>Company Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="National Innovation agency Ltd."
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Your company official name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="brandName"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel>Brand Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Innovation" {...field} />
                      </FormControl>
                      <FormDescription>Your startup’s name</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contactEmail"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel>Contact Email</FormLabel>
                      <FormControl>
                        <Input placeholder="info@niu.hu" {...field} />
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contactName"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel>Contact Person&apos;s Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Do" {...field} />
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="websiteUrl"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel>Website URL</FormLabel>
                      <FormControl>
                        <Input placeholder="niu.hu" {...field} />
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dealroomUrl"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel>Your startup’s Dealroom URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="startupbase-hungary.dealroom.co/"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="startupType"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel>Select request type</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue
                              defaultValue="new"
                              placeholder="Type"
                            />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="new">Add new startup</SelectItem>
                            <SelectItem value="update">
                              Update existing entry
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <LoadingButton
                type="submit"
                className="w-full mt-6"
                loading={isPending}
              >
                Submit for Review
              </LoadingButton>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default StartupRegForm;
