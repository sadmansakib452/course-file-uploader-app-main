"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FormProvider, useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useFormStore from "@/store/useFormStore";
import { stepSevenSchema } from "@/lib/yup";
import Seo from "@/components/Seo";
import Button from "@/components/Button";
import DropzoneInput from "@/components/Forms/DropzoneInput";

export default function Step7({ nextStep, prevStep }) {
  const router = useRouter();
  const { formData, setData, step } = useFormStore();
  const methods = useForm({
    mode: "onTouched",
    resolver: yupResolver(stepSevenSchema),
    defaultValues: formData.stepSeven || {
      finalExam: {
        question: null,
        highest: null,
        average: null,
        marginal: null,
      },
    },
  });

  const { handleSubmit, control } = methods;

  const onSubmit = async (data) => {
    setData({ step: 7, data });
    nextStep();
  };

  return (
    <>
      <Seo templateTitle="Step 7" />

      <main>
        <section className="bg-white">
          <article className="py-8 layout">
            <h1 className="text-2xl font-semibold mb-6">Step 7</h1>

            <FormProvider {...methods}>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-8 space-y-4"
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium">Final Exam</h2>
                </div>

                <Controller
                  name="finalExam.question"
                  control={control}
                  render={({ field }) => (
                    <DropzoneInput
                      label="Final Question"
                      id="finalExam.question"
                      accept="application/pdf"
                      helperText="You can only drop .pdf file here"
                      maxFiles={1}
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="finalExam.highest"
                  control={control}
                  render={({ field }) => (
                    <DropzoneInput
                      label="Highest Scoring Script"
                      id="finalExam.highest"
                      accept="application/pdf"
                      helperText="You can only drop .pdf file here"
                      maxFiles={1}
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="finalExam.average"
                  control={control}
                  render={({ field }) => (
                    <DropzoneInput
                      label="Average Scoring Script"
                      id="finalExam.average"
                      accept="application/pdf"
                      helperText="You can only drop .pdf file here"
                      maxFiles={1}
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="finalExam.marginal"
                  control={control}
                  render={({ field }) => (
                    <DropzoneInput
                      label="Marginally Passed Script"
                      id="finalExam.marginal"
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
