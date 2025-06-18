import { z } from "zod";

const formSchema = z
  .object({
    minNum: z.number().min(1, "号码要大于0"),
    maxNum: z.number().min(1, "号码要大于0"),
    role: z.enum(["meter", "foot"]).default("meter").optional(),
  })
  .refine((data) => data.maxNum > data.minNum, {
    message: "最后的号码要大于第一个号码",
    path: ["maxNum"],
  });

export default formSchema;
