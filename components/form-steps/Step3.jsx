"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FormProvider, useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useFormStore from "@/store/useFormStore";
import { stepThreeSchema } from "@/lib/yup";
import Button from "@/components/Button";
import DropzoneInput from "@/components/Forms/DropzoneInput";

import Textarea from "../Textarea";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";



export default function Step3({ nextStep, prevStep }) {
  const router = useRouter();
  const [isPdfUpload, setIsPdfUpload] = useState(true); // State to control toggle
  const { formData, setData, step } = useFormStore();
  const methods = useForm({
    mode: "onTouched",
    resolver: yupResolver(stepThreeSchema),
    defaultValues: formData.stepThree || {},
  });

  const { handleSubmit, setValue, getValues } = methods;

  const onSubmit = async (data) => {
    console.log(data)
    setData({ step: 3, data });
    nextStep();
  };

  return (
    <>
     

      <main>
        <section className="bg-white">
          <article className="py-8 layout">
            <h1>Step 3</h1>

            {/* Toggle Buttons outside the form */}
            <div className="flex items-center space-x-4 mb-4 mt-5">
              <Button
                type="button"
                onClick={() => {
                  setIsPdfUpload(true);
                  setValue("text_area", ""); // Clear text editor content when switching
                }}
                disabled={isPdfUpload}
              >
                PDF Upload
              </Button>
              <Button
                type="button"
                onClick={() => {
                  setIsPdfUpload(false);
                  setValue("obeSheet_summary", null); // Clear file input when switching
                }}
                disabled={!isPdfUpload}
              >
                Text Editor
              </Button>
            </div>

            <FormProvider {...methods}>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-8 space-y-4"
              >
                {isPdfUpload ? (
                  <Controller
                    name="obeSheet_summary"
                    control={methods.control}
                    render={({ field }) => (
                      <DropzoneInput
                        label="Summary of the OBE Sheet (Analysis of Grade Distribution, CO Attainment, PO Attainment, and CQI - plan for Course Improvement"
                        id="obeSheet_summary"
                        accept="application/pdf"
                        helperText="You can only drop .pdf file here"
                        maxFiles={1}
                        {...field}
                      />
                    )}
                  />
                ) : (
                  <Textarea
                    id="text_area"
                    label="CQI Form"
                    name="text_area"
                    control={methods.control}
                    Controller={Controller}
                    error={methods.formState}
                  />
                )}

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