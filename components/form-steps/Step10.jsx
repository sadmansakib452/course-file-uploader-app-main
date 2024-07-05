"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FormProvider, useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useFormStore from "@/store/useFormStore";
import { stepTenSchema } from "@/lib/yup";
import Seo from "@/components/Seo";
import Button from "@/components/Button";
import DropzoneInput from "@/components/Forms/DropzoneInput";

export default function Step10({ nextStep, prevStep }) {
  const router = useRouter();
  const { formData, setData, step } = useFormStore();
  const methods = useForm({
    mode: "onTouched",
    resolver: yupResolver(stepTenSchema),
    defaultValues: formData.stepTen || {},
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data) => {
    setData({ step: 10, data });
    nextStep();
  };

  return (
    <>
      <Seo templateTitle="Step 10" />

      <main>
        <section className="bg-white">
          <article className="py-8 layout">
            <h1>Step 10</h1>

            <FormProvider {...methods}>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-8 space-y-4"
              >
                <Controller
                  name="lab"
                  control={methods.control}
                  render={({ field }) => (
                    <DropzoneInput
                      label="Lab File"
                      id="lab"
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
