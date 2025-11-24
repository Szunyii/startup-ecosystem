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
import { ecosystemFormSchema, ecosystemFormValues } from "@/lib/validation";
import { Input } from "./ui/input";
import LoadingButton from "./LoadingButton";
import { createEcosystemReg } from "@/app/startups/actions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Card, CardContent, CardDescription, CardHeader } from "./ui/card";
import { Checkbox } from "./ui/checkbox";

function EcosystemRegForm() {
  const stages = [
    { id: 1, stage: "Pre-Startup" },
    { id: 2, stage: "Startup" },
    { id: 3, stage: "Scale-up" },
  ];
  const types = [
    { id: 1, type: "Governmental support" },
    { id: 2, type: "Accelerators/Incubators" },
    { id: 3, type: "Local investors" },
    { id: 4, type: "HUBs" },
    { id: 5, type: "Support Organizations" },
    { id: 6, type: "Foreign Investors" },
    { id: 7, type: "Crowdfunding" },
    { id: 8, type: "Service Provider" },
  ];
  // const [error, setError] = useState<string>();

  const [isPending, startTransition] = useTransition();

  const form = useForm<ecosystemFormValues>({
    resolver: zodResolver(ecosystemFormSchema),
    defaultValues: {
      contactRole: "",
      companyName: "",
      contactEmail: "",
      contactName: "",
      requestType: "",
      stage: "",
      type: "",
      websiteUrl: "",
      acceptTerms: false,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit({
    contactRole,
    companyName,
    contactEmail,
    contactName,
    requestType,
    stage,
    type,
    websiteUrl,
  }: ecosystemFormValues) {
    startTransition(async () => {
      await createEcosystemReg({
        contactRole,
        companyName,
        contactEmail,
        contactName,
        requestType,
        stage,
        type,
        websiteUrl,
      });

      form.reset();
    });
  }
  return (
    <div className=" max-w-xl w-full animate-fadeInUp">
      <Card className="bg-transparent border-none text-white">
        <div className="gap-0 mb-4 flex items-center justify-center flex-col">
          <CardHeader className="text-2xl font-bold">
            Add or Update Your entity in the Startup Ecosystem page
          </CardHeader>
          <CardDescription className="text-center text-white">
            Use this form to request inclusion or make changes to a current
            listing.
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
                  name="websiteUrl"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel>Website URL</FormLabel>
                      <FormControl>
                        <Input placeholder="niu.hu" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contactName"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel>Your Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Do" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contactRole"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel>Your Role</FormLabel>
                      <FormControl>
                        <Input placeholder="Analyst" {...field} />
                      </FormControl>
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
                  name="stage"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel>Select Stage</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue
                              defaultValue="new"
                              placeholder="Stage"
                            />
                          </SelectTrigger>
                          <SelectContent>
                            {stages.map((stage) => (
                              <SelectItem key={stage.id} value={stage.stage}>
                                {stage.stage}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormDescription>
                        Which sector are you operational?
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel>Select Type</FormLabel>
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
                            {/* <SelectItem value="new">Add new entity</SelectItem>
                            <SelectItem value="update">
                              Update existing entry
                            </SelectItem> */}
                            {types.map((type) => (
                              <SelectItem key={type.id} value={type.type}>
                                {type.type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormDescription>
                        Which stage are you relevant ?
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="requestType"
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
                            <SelectItem value="new">Add new entity</SelectItem>
                            <SelectItem value="update">
                              Update existing entry
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="acceptTerms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 r p-4">
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
                Submit Request
              </LoadingButton>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default EcosystemRegForm;
