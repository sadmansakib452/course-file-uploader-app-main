import { create } from "zustand";
import { devtools } from "zustand/middleware";

const stepVariant = {
  1: "stepOne",
  2: "stepTwo",
  3: "stepThree",
  4: "stepFour",
  5: "stepFive",
  6: "stepSix",
  7: "stepSeven",
  8: "stepEight",
  9: "stepNine",
  10: "stepTen",
  11: "stepEleven",
};

const useFormStore = create(
  devtools((set) => ({
    step: 1,
    formData: {
      stepOne: null,
      stepTwo: null,
      stepThree: null,
      stepFour: null,
      stepFive: null,
      stepSix: null,
      stepSeven: null,
      stepEight: null,
      stepNine: null,
      stepTen: null,
      stepEleven: null,
    },
    setData: ({ step, data }) =>
      set((state) => ({
        formData: {
          ...state.formData,
          [stepVariant[step]]: data,
        },
      })),
    setStep: (step) => set({ step }),
  }))
);

export default useFormStore;
