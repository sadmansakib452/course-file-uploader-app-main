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
import { stepEightSchema } from "@/lib/yup";
import Seo from "@/components/Seo";
import Button from "@/components/Button";
import DropzoneInput from "@/components/Forms/DropzoneInput";
import { AnimatePresence, motion } from "framer-motion";

export default function Step8({ nextStep, prevStep }) {
  const router = useRouter();
  const { formData, setData, step } = useFormStore();
  const methods = useForm({
    mode: "onTouched",
    resolver: yupResolver(stepEightSchema),
    defaultValues: formData.stepEight || {
      quizExams: [
        { question: null, highest: null, average: null, marginal: null },
      ],
    },
  });

  const { handleSubmit, control, setValue, getValues } = methods;
  const { fields } = useFieldArray({ control, name: "quizExams" });

  const [customError, setCustomError] = useState("");

  const onSubmit = async (data) => {
    if (data.quizExams.length === 0) {
      setCustomError("At least one quiz exam is required");
      return;
    }

    setData({ step: 8, data });
    nextStep();
  };

  const addQuizExam = () => {
    const currentQuizExams = getValues("quizExams");
    setValue("quizExams", [...currentQuizExams, {}]);
    setCustomError(""); // Clear custom error on adding a new quiz exam
  };

  const removeQuizExam = (index) => {
    const currentQuizExams = getValues("quizExams");
    const updatedQuizExams = currentQuizExams.filter((_, i) => i !== index);
    setValue("quizExams", updatedQuizExams);
    setData((prevData) => ({
      ...prevData,
      stepEight: {
        ...prevData.stepEight,
        quizExams: updatedQuizExams,
      },
    }));
  };

  return (
    <>
      <Seo templateTitle="Step 8" />

      <main>
        <section className="bg-white">
          <article className="py-8 layout">
            <h1 className="text-2xl font-semibold mb-6">Step 8</h1>

            <FormProvider {...methods}>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-8 space-y-4"
              >
                {customError && (
                  <div className="text-red-500 mb-4">{customError}</div>
                )}

                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium">Quiz Exams</h2>
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
                        Quiz Exam {index + 1}
                      </h2>
                      <Controller
                        name={`quizExams[${index}].question`}
                        control={control}
                        render={({ field }) => (
                          <DropzoneInput
                            label="Quiz Question"
                            id={`quizExams[${index}].question`}
                            accept="application/pdf"
                            helperText="You can only drop .pdf file here"
                            maxFiles={1}
                            {...field}
                          />
                        )}
                      />
                      <Controller
                        name={`quizExams[${index}].highest`}
                        control={control}
                        render={({ field }) => (
                          <DropzoneInput
                            label="Highest Scoring Script"
                            id={`quizExams[${index}].highest`}
                            accept="application/pdf"
                            helperText="You can only drop .pdf file here"
                            maxFiles={1}
                            {...field}
                          />
                        )}
                      />
                      <Controller
                        name={`quizExams[${index}].average`}
                        control={control}
                        render={({ field }) => (
                          <DropzoneInput
                            label="Average Scoring Script"
                            id={`quizExams[${index}].average`}
                            accept="application/pdf"
                            helperText="You can only drop .pdf file here"
                            maxFiles={1}
                            {...field}
                          />
                        )}
                      />
                      <Controller
                        name={`quizExams[${index}].marginal`}
                        control={control}
                        render={({ field }) => (
                          <DropzoneInput
                            label="Marginally Passed Script"
                            id={`quizExams[${index}].marginal`}
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
                          onClick={() => removeQuizExam(index)}
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
                          onClick={addQuizExam}
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
