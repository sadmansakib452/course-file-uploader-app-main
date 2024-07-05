"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FormProvider, useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useFormStore from "@/store/useFormStore";
import { stepNineSchema } from "@/lib/yup";
import Seo from "@/components/Seo";
import Button from "@/components/Button";
import DropzoneInput from "@/components/Forms/DropzoneInput";

export default function Step9({ nextStep, prevStep }) {
  const router = useRouter();
  const { formData, setData, step } = useFormStore();
  const methods = useForm({
    mode: "onTouched",
    resolver: yupResolver(stepNineSchema),
    defaultValues: formData.stepNine || {},
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data) => {
    setData({ step: 9, data });
    nextStep();
  };

  return (
    <>
      <Seo templateTitle="Step 9" />

      <main>
        <section className="bg-white">
          <article className="py-8 layout">
            <h1>Step 9</h1>

            <FormProvider {...methods}>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-8 space-y-4"
              >
                <Controller
                  name="assignment"
                  control={methods.control}
                  render={({ field }) => (
                    <DropzoneInput
                      label="List of projects/assignment with description"
                      id="assignment"
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
