// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { FormProvider, useForm, Controller } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import useFormStore from "@/store/useFormStore";
// import { stepFourSchema } from "@/lib/yup";
// import Seo from "@/components/Seo";
// import Button from "@/components/Button";
// import DropzoneInput from "@/components/Forms/DropzoneInput";

// import Textarea from "../Textarea";

// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";

// export default function Step2({ nextStep, prevStep }) {
//   const router = useRouter();
//  // State to control toggle
//   const { formData, setData, step } = useFormStore();
//   const methods = useForm({
//     mode: "onTouched",
//     resolver: yupResolver(stepFourSchema),
//     defaultValues: formData.stepFour || {},
//   });


//   const { handleSubmit, setValue, getValues } = methods;

//   const onSubmit = async (data) => {
//     console.log(data);
//     setData({ step: 4, data });
//     nextStep();
//   };

//   return (
//     <>
//       <Seo templateTitle="Step 2" />

//       <main>
//         <section className="bg-white">
//           <article className="py-8 layout">
//             <h1>Step 4</h1>

//             <FormProvider {...methods}>
//               <form
//                 onSubmit={handleSubmit(onSubmit)}
//                 className="mt-8 space-y-4"
//               >
//                 <Controller
//                   name="courseOutline"
//                   control={methods.control}
//                   render={({ field }) => (
//                     <DropzoneInput
//                       label="Course Outline (for core course, please collect original version from the Chairperson of the CSE department and all sections must follow the same course outline"
//                       id="courseOutline"
//                       accept="application/pdf"
//                       helperText="You can only drop .pdf file here"
//                       maxFiles={1}
//                       {...field}
//                     />
//                   )}
//                 />

//                 <div className="flex justify-between">
//                   <Button
//                     type="button"
//                     onClick={prevStep}
//                     disabled={step === 1}
//                   >
//                     Previous
//                   </Button>
//                   <Button type="submit">Next</Button>
//                 </div>
//               </form>
//             </FormProvider>
//           </article>
//         </section>
//       </main>
//     </>
//   );
// }


"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FormProvider, useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useFormStore from "@/store/useFormStore";
import { stepFourSchema, stepThreeSchema } from "@/lib/yup";
import Seo from "@/components/Seo";
import Button from "@/components/Button";
import DropzoneInput from "@/components/Forms/DropzoneInput";

import Textarea from "../Textarea";
import InstructorFeedback from "../InstructorFeedback";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { HiExclamationCircle } from "react-icons/hi";
import { fields } from "../InstructorFeedback";


export default function Step3({ nextStep, prevStep }) {
  const router = useRouter();
  const [isPdfUpload, setIsPdfUpload] = useState(true); // State to control toggle
  const { formData, setData, step } = useFormStore();
  const methods = useForm({
    mode: "onTouched",
    resolver: yupResolver(stepFourSchema),
    defaultValues: formData.stepFour || {},
  });

   
  const { handleSubmit, setValue, getValues } = methods;

  const onSubmit = async (data) => {
    console.log(data);
    setData({ step: 4, data });
    nextStep();
  };

  const clearInstructorFeedbackFields = () => {
    fields.forEach((field) => setValue(field.name, ""));
  };

  return (
    <>
      <Seo templateTitle="Step 3" />

      <main>
        <section className="bg-white">
          <article className="py-8 layout">
            <h1>Step 4</h1>

            {/* Toggle Buttons outside the form */}
            <div className="flex items-center space-x-4 mb-4 mt-5">
              <Button
                type="button"
                onClick={() => {
                  setIsPdfUpload(true);
                  clearInstructorFeedbackFields(); // Clear text editor content when switching
                }}
                disabled={isPdfUpload}
              >
                PDF Upload
              </Button>
              <Button
                type="button"
                onClick={() => {
                  setIsPdfUpload(false);
                  setValue("feedbackFormPdf", null); // Clear file input when switching
                }}
                disabled={!isPdfUpload}
              >
                Form
              </Button>
            </div>

            <FormProvider {...methods}>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-8 space-y-4"
              >
                {isPdfUpload ? (
                  <Controller
                    name="f"
                    control={methods.control}
                    render={({ field }) => (
                      <DropzoneInput
                        label="Instructor Feedback Form"
                        id="feedbackFormPdf"
                        accept="application/pdf"
                        helperText="You can only drop .pdf file here"
                        maxFiles={1}
                        {...field}
                      />
                    )}
                  />
                ) : (
                  <InstructorFeedback />
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
