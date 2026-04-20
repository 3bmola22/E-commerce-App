import * as zod from "zod";
export const registerSchema = zod
  .object({
    name: zod
      .string("name should be text")
      .nonempty("name is required")
      .min(3, "minmum 3 char")
      .max(15, "max 15"),
    email: zod.email("should contain @").nonempty("email is required"),
    phone: zod
      .string("")
      .nonempty("phone required")
      .regex(/^(\+20|0)?1[0125][0-9]{8}$/, "Invalid Egyptian phone number"),
    password: zod
      .string()
      .nonempty("required")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain uppercase, lowercase, number and special character",
      ),
    rePassword: zod.string("").nonempty("required"),
  })
  .refine(
    ({ password, rePassword }) => {
      return password === rePassword;
    },
    { error: "password didn`t match rePassword", path: ["rePassword"] },
  );
export type RegisterData = zod.infer<typeof registerSchema>;


export const loginSchema = zod.object({
  email: zod.email("should contain @").nonempty("email is required"),

  password: zod
    .string()
    .nonempty("required")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain uppercase, lowercase, number and special character",
    ),
});

export type LoginData = zod.infer<typeof loginSchema>;

export const checkoutSchema = zod.object({
  details: zod.string().nonempty("details is required"),
  city: zod.string().nonempty("city is required"),
  phone: zod.string().nonempty("phone is required"),
});

export type CheckoutType = zod.infer<typeof checkoutSchema>;



