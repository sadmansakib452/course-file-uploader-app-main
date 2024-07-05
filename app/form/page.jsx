"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import Step1 from "../../components/form-steps/Step1";
import Step2 from "../../components/form-steps/Step2";
import Step3 from "../../components/form-steps/Step3";
import Step4 from "../../components/form-steps/Step4";
import Step5 from "../../components/form-steps/Step5";
import Step6 from "../../components/form-steps/Step6";
import Step7 from "../../components/form-steps/Step7";
import Step8 from "../../components/form-steps/Step8";
import Step9 from "../../components/form-steps/Step9";
import Step10 from "../../components/form-steps/Step10";
import Step11 from "../../components/form-steps/Step11";
import useFormStore from "@/store/useFormStore";
import ThankYou from "@/components/ThankYou";

const MultiStepForm = () => {
  const { step, formData, setStep } = useFormStore();
  const [animationEnabled, setAnimationEnabled] = useState(true);

  const [contentHeight, setContentHeight] = useState("auto");
  const transition = {
    duration: 0.5,
    ease: [0.43, 0.13, 0.23, 0.96],
  };

  console.log(formData)

  const validateStep = async (currentStep) => {
    switch (currentStep) {
      case 1:
        return formData.stepOne;
      case 2:
        return formData.stepTwo;
      case 3:
        return formData.stepThree;
      case 4:
        return formData.stepFour;
      case 5:
        return formData.stepFive;
      case 6:
        return formData.stepSix;
      case 7:
        return formData.stepSeven;
      case 8:
        return formData.stepEight;
      case 9:
        return formData.stepNine;
      case 10:
        return formData.stepTen;
      case 11:
        return formData.stepEleven;
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    } else {
      toast.error("Please complete the current step before proceeding.");
    }
  };

  const prevStep = () => {
    
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1 nextStep={nextStep} prevStep={prevStep} />;
      case 2:
        return <Step2 nextStep={nextStep} prevStep={prevStep} />;
      case 3:
        return <Step3 nextStep={nextStep} prevStep={prevStep} />;
      case 4:
        return <Step4 nextStep={nextStep} prevStep={prevStep} />;
      case 5:
        return <Step5 nextStep={nextStep} prevStep={prevStep} />;
      case 6:
        return <Step6 nextStep={nextStep} prevStep={prevStep} />;
      case 7:
        return <Step7 nextStep={nextStep} prevStep={prevStep} />;
      case 8:
        return <Step8 nextStep={nextStep} prevStep={prevStep} />;
      case 9:
        return <Step9 nextStep={nextStep} prevStep={prevStep} />;
      case 10:
        return <Step10 nextStep={nextStep} prevStep={prevStep} />;
      case 11:
        return <ThankYou />;
      default:
        return <Step1 nextStep={nextStep} prevStep={prevStep} />;
    }
  };

  useEffect(() => {
    const resizeListener = () => {
      if (document.getElementById("step-container")) {
        setContentHeight(
          `${document.getElementById("step-container").scrollHeight}px`
        );
      }
    };

    window.addEventListener("resize", resizeListener);
    return () => window.removeEventListener("resize", resizeListener);
  }, [step]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <motion.div
        className="w-full max-w-2xl border border-gray-300 rounded shadow-lg bg-white p-6 sm:p-8"
        id="step-container"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={transition}
        key={step}
        style={{ minHeight: contentHeight }}
      >
        <div>{renderStep()}</div>
      </motion.div>
    </div>
  );
};

export default MultiStepForm;
