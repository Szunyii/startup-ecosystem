"use client";

import LoadingButton from "@/components/LoadingButton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { startupFormSchema, startupFormValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

export default function Formtest() {
  const [error, setError] = useState<string>();

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

  async function onSubmit(values: startupFormValues) {
    setError(undefined);
    startTransition(async () => {
      console.log(values);
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        {error && <p className="text-center text-destructive">{error}</p>}
        <FormField
          control={form.control}
          name="brandName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <LoadingButton loading={isPending} type="submit" className="w-full">
          Log in
        </LoadingButton>
      </form>
    </Form>
  );
}
