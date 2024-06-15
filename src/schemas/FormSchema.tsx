import { z } from "zod";

const formSchema = z
  .object({
    minNum: z.preprocess(
      (val) => Number(val),
      z.number().min(1, "号码要大于0")
    ),
    maxNum: z.preprocess(
      (val) => Number(val),
      z.number().min(1, "号码要大于0")
    ),
    role: z.enum(["meter", "foot"]).default("meter").optional(),
  })
  .refine((data) => data.maxNum > data.minNum, {
    message: "最后的号码要大于第一个号码",
    path: ["maxNum"], // specify which path the error applies to
  });

export default formSchema;
