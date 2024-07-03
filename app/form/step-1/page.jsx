'use client'
import Link from 'next/link'
import { useRouter } from "next/navigation"
import { FormProvider, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { HiChevronLeft, HiChevronRight } from "react-icons/hi"

import useFormStore from "@/store/useFormStore"
import { stepOneSchema } from "@/lib/yup"

import Seo from "@/components/Seo"
import Button from "@/components/Button"
import Input from "@/components/Forms/Input"
import PasswordInput from "@/components/Forms/PasswordInput"
export default function StepOnePage() {
  const router = useRouter()

  const { stepOne, setData, nextStep } = useFormStore()

  //#region //? forms ==================================
  const methods = useForm({
    mode: "onTouched",
    resolver: yupResolver(stepOneSchema),
    defaultValues: stepOne || {}
  })
  const { handleSubmit } = methods
  //#endregion forms

  //#region //? action ==================================
  const onSubmit = data => {
    // eslint-disable-next-line no-console
    console.log(data)
    setData({ step: 1, data })
    router.push("/form/step-2")
  }
  //#endregion action

  return (
    <>
      <main>
        <section className="bg-gray-100">
          <article className="min-h-screen py-16 layout">
            <h1>Step 1</h1>
            <div className="flex items-start mt-4">
              <Link
                className="p-2 text-lg transition-colors bg-white border border-gray-300 rounded hover:bg-gray-100"
                href="/"
              >
                <HiChevronLeft />
              </Link>
              <Link
                className="p-2 text-lg transition-colors bg-white border border-gray-300 rounded hover:bg-gray-100"
                href="/form/step-2"
              >
                <HiChevronRight />
              </Link>
            </div>

            <FormProvider {...methods}>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="max-w-sm mt-8 space-y-4 "
              >
                <Input label="Course Name" id="courseName" />
                
                <Button type="submit">Next</Button>
              </form>
            </FormProvider>
          </article>
        </section>
      </main>
    </>
  );
}
