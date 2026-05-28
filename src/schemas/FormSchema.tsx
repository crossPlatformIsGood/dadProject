import { z } from "zod";

const formSchema = z
	.object({
		minNum: z.number().min(1, "号码要大于0"),
		maxNum: z.number().min(1, "号码要大于0"),
		role: z.enum(["meter", "foot"]).default("meter").optional(),
		showPileNo: z.boolean().default(false).optional(),
	})
	.refine((data) => data.maxNum > data.minNum, {
		message: "最后的号码要大于第一个号码",
		path: ["maxNum"],
	});

export type FormConfig = z.infer<typeof formSchema>;

const cellSchema = z.union([z.string(), z.number()]);

export const printDataSchema = z.object({
	project: z.string(),
	project2: z.string(),
	pile: z.string(),
	date: z.string(),
	table: z.array(z.array(cellSchema)),
});

export type PrintData = z.infer<typeof printDataSchema>;

export default formSchema;
