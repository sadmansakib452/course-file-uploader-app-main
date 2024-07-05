import * as yup from "yup"
import { fields } from "@/components/InstructorFeedback";
export const stepOneSchema = yup.object().shape({
  courseName: yup.string().required("Name is required"),
  // email: yup
  //   .string()
  //   .email("Need to be a valid email")
  //   .required("Email is required"),
  // password: yup
  //   .string()
  //   .required("Password is required")
  //   .min(8, "Password must be at least 8 characters long"),
  // age: yup
  //   .number()
  //   .typeError("Must be a number")
  //   .positive("Must be a positive value")
  //   .integer("Must be a number")
  //   .required("Age is required"),
  // phone: yup
  //   .string()
  //   .matches(/^\+628[1-9][0-9]{8,11}$/, "Must use +62 format")
  //   .required("Phone is required"),
});

export const stepTwoSchema = yup.object().shape({
  finalGrades: yup.mixed().required("File is required"),
  
});

// @ts-ignore - file type still not found
// TODO Should be ArraySchema<ObjectSchemaOf<FileWithPreview> | Lazy<ObjectSchemaOf<FileWithPreview>, any>, AnyObject
export const stepThreeSchema = yup
  .object()
  .shape({
    obeSheet_summary: yup
      .mixed()
      .nullable()
      .test(
        "required",
        "File is required when text is not provided",
        function (value) {
          const { text_area } = this.parent;
          if (!value && !text_area) {
            return false;
          }
          return true;
        }
      ),
    text_area: yup
      .string()
      .nullable()
      .test(
        "required",
        "Text is required when file is not provided",
        function (value) {
          const { obeSheet_summary } = this.parent;
          if (!value && !obeSheet_summary) {
            return false;
          }
          return true;
        }
      )
      .test("minWords", "Text must have at least 10 words", function (value) {
        if (value && value.split(" ").length < 10) {
          return false;
        }
        return true;
      }),
  })
  .test(
    "one-of-file-or-text",
    "Either file or text must be provided, not both",
    function (value) {
      const { obeSheet_summary, text_area } = value;
      if ((obeSheet_summary && text_area) || (!obeSheet_summary && !text_area)) {
        return this.createError({
          message: "Either file or text must be provided, not both",
        });
      }
      return true;
    }
  );

//Step4
const createTextFieldSchema = (fieldName) => {
  return yup
    .string()
    .nullable()
    .test("required", "Text is required", function (value) {
      const { feedbackFormPdf } = this.parent;
      if (!value && !feedbackFormPdf) {
        return false;
      }
      return true;
    })
    .test("minWords", "Text must have at least 1 word", function (value) {
      if (value && value.split(" ").length < 1) {
        return false;
      }
      return true;
    });
};

const textFieldSchemas = fields.reduce((schemas, field) => {
  schemas[field.name] = createTextFieldSchema(field.name);
  return schemas;
}, {});

export const stepFourSchema = yup
  .object()
  .shape({
    feedbackFormPdf: yup
      .mixed()
      .nullable()
      .test("required", "File is required", function (value) {
        const { course_instructor } = this.parent;
        if (!value && !course_instructor) {
          return false;
        }
        return true;
      }),
    ...textFieldSchemas,
  })
  .test(
    "one-of-file-or-text",
    "Either file or text must be provided, not both",
    function (value) {
      const hasPdf = !!value.feedbackFormPdf;
      const hasTextFields = fields.some((field) => !!value[field.name]);
      if ((hasPdf && hasTextFields) || (!hasPdf && !hasTextFields)) {
        return this.createError({
          message: "Either file or text must be provided, not both",
        });
      }
      return true;
    }
  );


  
export const stepFiveSchema = yup.object().shape({
  courseOutline: yup.mixed().required("File is required"),
  // email: yup
  //   .string()
  //   .email("Need to be a valid email")
  //   .required("Email is required"),
  // password: yup
  //   .string()
  //   .required("Password is required")
  //   .min(8, "Password must be at least 8 characters long"),
  // age: yup
  //   .number()
  //   .typeError("Must be a number")
  //   .positive("Must be a positive value")
  //   .integer("Must be a number")
  //   .required("Age is required"),
  // phone: yup
  //   .string()
  //   .matches(/^\+628[1-9][0-9]{8,11}$/, "Must use +62 format")
  //   .required("Phone is required"),
});

export const stepSixSchema = yup.object().shape({
  midExams: yup
    .array()
    .of(
      yup.object().shape({
        question: yup
          .mixed()
          .required("Mid Question file is required")
          .test("fileType", "Only PDF files are allowed", (value) => {
            if (!value || !value.length) return false;
            return value[0].type === "application/pdf";
          }),
        highest: yup
          .mixed()
          .required("Highest Scoring Script file is required")
          .test("fileType", "Only PDF files are allowed", (value) => {
            if (!value || !value.length) return false;
            return value[0].type === "application/pdf";
          }),
        average: yup
          .mixed()
          .required("Average Scoring Script file is required")
          .test("fileType", "Only PDF files are allowed", (value) => {
            if (!value || !value.length) return false;
            return value[0].type === "application/pdf";
          }),
        marginal: yup
          .mixed()
          .required("Marginally Passed Script file is required")
          .test("fileType", "Only PDF files are allowed", (value) => {
            if (!value || !value.length) return false;
            return value[0].type === "application/pdf";
          }),
      })
    )
    .min(1, "At least one mid exam is required"),
});



export const stepSevenSchema = yup.object().shape({
  finalExam: yup.object().shape({
    question: yup
      .mixed()
      .required("Final Question file is required")
      .test("fileType", "Only PDF files are allowed", (value) => {
        if (!value || !value.length) return false;
        return value[0].type === "application/pdf";
      }),
    highest: yup
      .mixed()
      .required("Highest Scoring Script file is required")
      .test("fileType", "Only PDF files are allowed", (value) => {
        if (!value || !value.length) return false;
        return value[0].type === "application/pdf";
      }),
    average: yup
      .mixed()
      .required("Average Scoring Script file is required")
      .test("fileType", "Only PDF files are allowed", (value) => {
        if (!value || !value.length) return false;
        return value[0].type === "application/pdf";
      }),
    marginal: yup
      .mixed()
      .required("Marginally Passed Script file is required")
      .test("fileType", "Only PDF files are allowed", (value) => {
        if (!value || !value.length) return false;
        return value[0].type === "application/pdf";
      }),
  }),
});

export const stepEightSchema = yup.object().shape({
  quizExams: yup
    .array()
    .of(
      yup.object().shape({
        question: yup
          .mixed()
          .required("Quiz Question file is required")
          .test("fileType", "Only PDF files are allowed", (value) => {
            if (!value || !value.length) return false;
            return value[0].type === "application/pdf";
          }),
        highest: yup
          .mixed()
          .required("Highest Scoring Script file is required")
          .test("fileType", "Only PDF files are allowed", (value) => {
            if (!value || !value.length) return false;
            return value[0].type === "application/pdf";
          }),
        average: yup
          .mixed()
          .required("Average Scoring Script file is required")
          .test("fileType", "Only PDF files are allowed", (value) => {
            if (!value || !value.length) return false;
            return value[0].type === "application/pdf";
          }),
        marginal: yup
          .mixed()
          .required("Marginally Passed Script file is required")
          .test("fileType", "Only PDF files are allowed", (value) => {
            if (!value || !value.length) return false;
            return value[0].type === "application/pdf";
          }),
      })
    )
    .min(1, "At least one quiz exam is required"),
});

export const stepNineSchema = yup.object().shape({
  assignment: yup
    .mixed()
    .required("Assignment file is required")
    .test("fileType", "Only PDF files are allowed", (value) => {
      if (!value || !value.length) return false;
      return value[0].type === "application/pdf";
    }),
});

export const stepTenSchema = yup.object().shape({
  lab: yup
    .mixed()
    .required("Lab file is required")
    .test("fileType", "Only PDF files are allowed", (value) => {
      if (!value || !value.length) return false;
      return value[0].type === "application/pdf";
    }),
});
// @ts-ignore - override correct yup type
// https://github.com/jquense/yup/issues/1183
// export const requiredDateSchema = yup.date().required("Birth date is required")

// export const stepThreeSchema = yup.object().shape({
//   // yup date
//   birth_date: requiredDateSchema,
//   gender: yup.string().required("Gender is required"),
//   lat: yup
//     .number()
//     .typeError("Must be a number")
//     .required("Lat is required"),
//   lng: yup
//     .number()
//     .typeError("Must be a number")
//     .required("Long is required")
// })

// export const mapSchema = yup.object().shape({
//   lat: yup
//     .number()
//     .typeError("Must be a number")
//     .required("Lat is required"),
//   lng: yup
//     .number()
//     .typeError("Must be a number")
//     .required("Long is required")
// })
