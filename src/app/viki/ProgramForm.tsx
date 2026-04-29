"use client";

import React, { useState, useTransition } from "react";
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
} from "@/components/ui/form";
import { kkvRegistry, kkvRegistryFormValues } from "@/lib/validation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import LoadingButton from "@/components/LoadingButton";

import { startupCategory, type StartupCategory } from "@/lib/constants";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { createKKVReg } from "./actions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";



function ProgramForm() {
  // const [error, setError] = useState<string>();

  const [isPending, startTransition] = useTransition();

  const form = useForm<kkvRegistryFormValues>({
    resolver: zodResolver(kkvRegistry),

    defaultValues: {
      about: "",
      company_name: "",
      tax_number: "",
      contact_email: "",
      website: "",
      test_1: "",
      test_2: "",
    },
  });

  const [isSuccess, setIsSuccess] = useState(false);

  // 2. Define a submit handler.
  async function onSubmit({
    about,
    acceptTerms,
    company_name,
    contact_email,
    tax_number,
    website,
  }: kkvRegistryFormValues) {
    startTransition(async () => {
      console.log(
        about,
        acceptTerms,
        company_name,
        contact_email,
        tax_number,
        website,
      );
      await createKKVReg({
        about,
        company_name,
        acceptTerms,
        contact_email,
        tax_number,
        website,
      });

      form.reset();
      setIsSuccess(true);
    });
  }

  if (isSuccess) {
    return (
      <div className="max-w-xl w-full animate-fadeInUp flex flex-col min-h-screen items-center justify-center p-8 text-center text-white bg-primary/20 rounded-xl border border-primary">
        <h2 className="text-2xl font-bold mb-4">Thank you!</h2>
        <p className="text-lg">
          Your registration has been submitted successfully.
        </p>
        <button
          onClick={() => setIsSuccess(false)}
          className="mt-6 text-sm underline hover:text-primary transition-colors"
        >
          Submit another response
        </button>
      </div>
    );
  }
  return (
    <div className=" max-w-xl w-full animate-fadeInUp mt-14">
      <Card className="text-white border-none bg-transparent">
        <div className="gap-0 mb-4 flex items-center justify-center flex-col">
          <CardHeader className="text-2xl font-bold">
            Sign up to te voucher program!
          </CardHeader>
          <CardDescription className="text-center text-white">
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
                  name="company_name"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel>Company Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Hungarian Innovation Agency Ltd."
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
                  name="contact_email"
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
                  name="tax_number"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel>Tax number</FormLabel>
                      <FormControl>
                        <Input placeholder="12345678-1-12" {...field} />
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="website"
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
                  name="about"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel>About Your company</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="the company deal with"
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
                  name="test_1"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel>Test Dropdown 1</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a test value" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="test_value_1">
                            Test Value 1
                          </SelectItem>
                          <SelectItem value="test_value_2">
                            Test Value 2
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="test_2"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel>Test Dropdown 2</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a test value" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="test_value_1">
                            Test Value 1
                          </SelectItem>
                          <SelectItem value="test_value_2">
                            Test Value 2
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* adatkezelési */}
                <FormField
                  control={form.control}
                  name="acceptTerms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4 ">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="mt-1"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm font-medium">
                          I acknowledge the{" "}
                          <a
                            target="_blank"
                            href="https://niu.hu/storage/GDPR/20250529_NIU_Privacy_Notice_EN_korrJOG.pdf"
                            className="underline hover:text-primary transition-colors"
                          >
                            General data protection statemt
                          </a>
                        </FormLabel>
                        <FormDescription className="text-xs text-muted-foreground"></FormDescription>
                        <FormMessage />
                      </div>
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

export default ProgramForm;
