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

import { startupCategory } from "@/lib/constants";

import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { MultiSelect } from "@/components/ui/multi-select";
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
      category: "",
      sub_categories: [],
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
    category,
    sub_categories,
  }: kkvRegistryFormValues) {
    startTransition(async () => {
      await createKKVReg({
        about,
        company_name,
        acceptTerms,
        contact_email,
        tax_number,
        website,
        category,
        sub_categories,
      });

      form.reset();
      setIsSuccess(true);
    });
  }

  if (isSuccess) {
    return (
      <div className="max-w-xl w-full animate-fadeInUp">
        <div
          className="relative overflow-hidden rounded-[20px] border border-[rgba(175,226,0,0.25)] bg-gradient-to-b from-[rgba(175,226,0,0.08)] to-white/[0.02] p-8 text-white"
          style={{
            background:
              "radial-gradient(600px 280px at 100% 0%, rgba(93,61,255,.25), transparent 60%)," +
              "radial-gradient(400px 220px at 0% 100%, rgba(175,226,0,.12), transparent 60%)," +
              "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
          }}
        >
          <div className="inline-flex items-center gap-2.5 font-mono text-xs opacity-80 mb-4">
            <span className="relative inline-block w-2 h-2">
              <span className="absolute inset-0 rounded-full bg-[#afe200]" />
              <span className="absolute -inset-1 rounded-full bg-[#afe200] opacity-35 animate-ping" />
            </span>
            <span>Submission received</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            <span className="text-[#afe200]">Thanks!</span> We&apos;ll be in
            touch.
          </h2>
          <p className="mt-4 text-sm md:text-base text-white/75 leading-relaxed max-w-md">
            Your registration has been submitted. Our team reviews every entry
            and will reach out to you at the email you provided.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setIsSuccess(false)}
              className="bg-[#afe200] text-[#0b1027] px-5 py-2.5 rounded-full font-bold text-sm hover:opacity-90 transition-opacity"
            >
              Submit another →
            </button>
            <span className="font-mono text-[11px] text-white/55">
              Or close this tab.
            </span>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="max-w-xl w-full animate-fadeInUp">
      <Card className="text-white border-none bg-transparent">
        <CardContent className="p-0">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-2 ">
                <FormField
                  control={form.control}
                  name="company_name"
                  render={({ field }) => (
                    <FormItem className="space-y-1 ">
                      <FormLabel>Company Name</FormLabel>
                      <FormControl>
                        <Input
                          className=""
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
                  name="category"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel>Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {startupCategory.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="sub_categories"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel>Sub Categories</FormLabel>
                      <FormControl>
                        <MultiSelect
                          options={startupCategory}
                          value={field.value ?? []}
                          onChange={field.onChange}
                          placeholder="Select categories..."
                        />
                      </FormControl>
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
