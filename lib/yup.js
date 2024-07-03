import * as yup from "yup"

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

// @ts-ignore - file type still not found
// TODO Should be ArraySchema<ObjectSchemaOf<FileWithPreview> | Lazy<ObjectSchemaOf<FileWithPreview>, any>, AnyObject
export const stepTwoSchema = yup
  .object()
  .shape({
    identity_card: yup
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
          const { identity_card } = this.parent;
          if (!value && !identity_card) {
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
      const { identity_card, text_area } = value;
      if ((identity_card && text_area) || (!identity_card && !text_area)) {
        return this.createError({
          message: "Either file or text must be provided, not both",
        });
      }
      return true;
    }
  );
export const stepThreeSchema = yup.object().shape({
  // score_1: yup
  //   .number()
  //   .typeError("Must be a number")
  //   .positive("Must be a positive value")
  //   .lessThan(101, "Max score is 100")
  //   .required("Age is required"),
  // score_2: yup
  //   .number()
  //   .typeError("Must be a number")
  //   .positive("Must be a positive value")
  //   .lessThan(101, "Max score is 100")
  //   .required("Age is required"),
  // score_3: yup
  //   .number()
  //   .typeError("Must be a number")
  //   .positive("Must be a positive value")
  //   .lessThan(101, "Max score is 100")
  //   .required("Age is required"),
  identity_card: yup.mixed().required("File is required"),
  // score_file: yup.mixed().required("File is required"),
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
