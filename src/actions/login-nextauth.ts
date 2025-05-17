// "use server";

// import { AuthError } from "next-auth";
// import * as z from "zod";

// import { signIn } from "@/auth";
// import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
// import { SignInSchema } from "@/schemas/zod.schema";

// export const login = async (values: z.infer<typeof SignInSchema>) => {
//   console.log("LOGGING IN ACTIONS -----");
//   // console.log(values);
//   const validatedFields = SignInSchema.safeParse(values);
//   // console.log(validatedFields);

//   if (!validatedFields.success) {
//     console.log(validatedFields.error.errors);

//     const errorList = validatedFields.error.errors;
//     console.log(errorList);
//     const errorEmailList = errorList.filter(
//       (error) => error.path[0] === "email"
//     );
//     const errorPasswordList = errorList.filter(
//       (error) => error.path[0] === "password"
//     );
//     console.log("ERROREMAILLIST", errorEmailList);
//     return {
//       errorEmail: errorEmailList.length > 0 ? errorEmailList[0].message : "",
//       errorPassword:
//         errorPasswordList.length > 0 ? errorPasswordList[0].message : "",
//     }; // Returning the first validation error message
//   }
//   const { email, password } = validatedFields.data;
//   console.log(email, password);
//   // return { success: "Email sent!" }
//   try {
//     await signIn("credentials", {
//       email,
//       password,
//       redirectTo: DEFAULT_LOGIN_REDIRECT,
//     });
//     return { success: "Login successful" };
//   } catch (error) {
//     if (error instanceof AuthError) {
//       switch (error.type) {
//         case "CredentialsSignin":
//           console.log(error);
//           return {
//             errorEmail: "Invalid credentials",
//             errorPassword: "Invalid credentials",
//           };
//         default:
//           return {
//             errorEmail: "Something went wrong!",
//             errorPassword: "Something went wrong!",
//           };
//       }
//     }
//     throw error;
//   }
// };
