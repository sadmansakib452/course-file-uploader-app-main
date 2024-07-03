"use client";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import useFormStore from "@/store/useFormStore";
import { stepOneSchema } from "@/lib/yup";
import Seo from "@/components/Seo";
import Button from "@/components/Button";
import Input from "@/components/Forms/Input";
import UnstyledLink from "../UnstyledLink";

export default function Step1({ nextStep, prevStep }) {
  const { formData, setData, step } = useFormStore();

  const methods = useForm({
    mode: "onTouched",
    resolver: yupResolver(stepOneSchema),
    defaultValues: formData.stepOne || {},
  });

  const { handleSubmit } = methods;

const onSubmit = (data) => {
  
  setData({ step: 1, data });
  nextStep();
};

  return (
    <>
      <Seo title="Step 1" />
      <main>
        <section className="bg-white">
          <article className="py-16 layout">
            <h1>Step 1</h1>
            <FormProvider {...methods}>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-8 space-y-4"
              >
                <Input label="Course Name" id="courseName" />
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
