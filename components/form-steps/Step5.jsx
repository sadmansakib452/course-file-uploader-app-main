"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FormProvider, useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useFormStore from "@/store/useFormStore";
import { stepFiveSchema } from "@/lib/yup";
import Seo from "@/components/Seo";
import Button from "@/components/Button";
import DropzoneInput from "@/components/Forms/DropzoneInput";

import Textarea from "../Textarea";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function Step5({ nextStep, prevStep }) {
  const router = useRouter();
  // State to control toggle
  const { formData, setData, step } = useFormStore();
  const methods = useForm({
    mode: "onTouched",
    resolver: yupResolver(stepFiveSchema),
    defaultValues: formData.stepFive || {},
  });

  const { handleSubmit, setValue, getValues } = methods;

  const onSubmit = async (data) => {
    console.log(data);
    setData({ step: 5, data });
    nextStep();
  };

  return (
    <>
      <Seo templateTitle="Step 2" />

      <main>
        <section className="bg-white">
          <article className="py-8 layout">
            <h1>Step 5</h1>

            <FormProvider {...methods}>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-8 space-y-4"
              >
                <Controller
                  name="courseOutline"
                  control={methods.control}
                  render={({ field }) => (
                    <DropzoneInput
                      label="Course Outline (for core course, please collect original version from the Chairperson of the CSE department and all sections must follow the same course outline"
                      id="courseOutline"
                      accept="application/pdf"
                      helperText="You can only drop .pdf file here"
                      maxFiles={1}
                      {...field}
                    />
                  )}
                />

                <div className="flex justify-between">
                  <Button
                    type="button"
                    onClick={prevStep}
                    disabled={step === 1}
                  >
                    Previous
                  </Button>
                  <Button type="submit">Next</Button>
                </div>
              </form>
            </FormProvider>
          </article>
        </section>
      </main>
    </>
  );
}
