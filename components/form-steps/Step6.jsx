"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FormProvider,
  useForm,
  Controller,
  useFieldArray,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useFormStore from "@/store/useFormStore";
import { stepSixSchema } from "@/lib/yup";
import Seo from "@/components/Seo";
import Button from "@/components/Button";
import DropzoneInput from "@/components/Forms/DropzoneInput";
import { AnimatePresence, motion } from "framer-motion";

export default function Step6({ nextStep, prevStep }) {
  const router = useRouter();
  const { formData, setData, step } = useFormStore();
  const methods = useForm({
    mode: "onTouched",
    resolver: yupResolver(stepSixSchema),
    defaultValues: formData.stepSix || {
      midExams: [
        { question: null, highest: null, average: null, marginal: null },
      ],
    },
  });

  const { handleSubmit, control, setValue, getValues } = methods;
  const { fields } = useFieldArray({ control, name: "midExams" });

  const [customError, setCustomError] = useState("");

  const onSubmit = async (data) => {
    if (data.midExams.length === 0) {
      setCustomError("At least one mid exam is required");
      return;
    }

    setData({ step: 6, data });
    nextStep();
  };

  const addMidExam = () => {
    const currentMidExams = getValues("midExams");
    setValue("midExams", [...currentMidExams, {}]);
    setCustomError(""); // Clear custom error on adding a new mid exam
  };

  const removeMidExam = (index) => {
    const currentMidExams = getValues("midExams");
    const updatedMidExams = currentMidExams.filter((_, i) => i !== index);
    setValue("midExams", updatedMidExams);
    setData((prevData) => ({
      ...prevData,
      stepSix: {
        ...prevData.stepSix,
        midExams: updatedMidExams,
      },
    }));
  };

  return (
    <>
      <Seo templateTitle="Step 6" />

      <main>
        <section className="bg-white">
          <article className="py-8 layout">
            <h1 className="text-2xl font-semibold mb-6">Step 6</h1>

            <FormProvider {...methods}>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-8 space-y-4"
              >
                {customError && (
                  <div className="text-red-500 mb-4">{customError}</div>
                )}

                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium">Mid Exams</h2>
                </div>

                <AnimatePresence>
                  {fields.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="border p-4 mb-4 rounded-lg relative"
                    >
                      <h2 className="mb-4 text-xl font-medium">
                        Mid Exam {index + 1}
                      </h2>
                      <Controller
                        name={`midExams[${index}].question`}
                        control={control}
                        render={({ field }) => (
                          <DropzoneInput
                            label="Mid Question"
                            id={`midExams[${index}].question`}
                            accept="application/pdf"
                            helperText="You can only drop .pdf file here"
                            maxFiles={1}
                            {...field}
                          />
                        )}
                      />
                      <Controller
                        name={`midExams[${index}].highest`}
                        control={control}
                        render={({ field }) => (
                          <DropzoneInput
                            label="Highest Scoring Script"
                            id={`midExams[${index}].highest`}
                            accept="application/pdf"
                            helperText="You can only drop .pdf file here"
                            maxFiles={1}
                            {...field}
                          />
                        )}
                      />
                      <Controller
                        name={`midExams[${index}].average`}
                        control={control}
                        render={({ field }) => (
                          <DropzoneInput
                            label="Average Scoring Script"
                            id={`midExams[${index}].average`}
                            accept="application/pdf"
                            helperText="You can only drop .pdf file here"
                            maxFiles={1}
                            {...field}
                          />
                        )}
                      />
                      <Controller
                        name={`midExams[${index}].marginal`}
                        control={control}
                        render={({ field }) => (
                          <DropzoneInput
                            label="Marginally Passed Script"
                            id={`midExams[${index}].marginal`}
                            accept="application/pdf"
                            helperText="You can only drop .pdf file here"
                            maxFiles={1}
                            {...field}
                          />
                        )}
                      />
                      <div className="absolute top-2 right-2 flex space-x-2">
                        <button
                          type="button"
                          onClick={() => removeMidExam(index)}
                          className="p-1 text-red-600 rounded-full hover:bg-red-100"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                        <button
                          type="button"
                          onClick={addMidExam}
                          className="p-1 text-green-600 rounded-full hover:bg-green-100"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 4v16m8-8H4"
                            />
                          </svg>
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

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
