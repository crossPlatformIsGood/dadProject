import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import type { z } from "zod";
import { Button } from "@/components/ui/Button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/Select";
import formSchema from "@/schemas/FormSchema";

const HomePage = () => {
	const navigate = useNavigate();

	const onSubmit = (data: z.infer<typeof formSchema>) => {
		const jsonData = JSON.stringify(data);

		try {
			localStorage.setItem("formD", jsonData);
		} catch (e) {
			console.error("Storage error", e);
		}

		navigate("/newform");
	};

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			role: "meter",
			minNum: 1,
			maxNum: 2,
		},
	});

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col items-center justify-center space-y-6 min-h-[calc(100vh-4rem)]"
			>
				<div>
					<div className="font-bold text-3xl text-gray-800">
						富財貿易打樁工程
					</div>
					<div className="font-bold text-2xl text-gray-700 mt-1">
						FOOK CHOY TRADING & PILING ENGINEERING
					</div>
				</div>

				<div className="bg-blue-50 border border-blue-200 space-y-5 p-8 rounded-lg max-w-lg mx-auto">
					<div className="text-sm font-medium text-gray-600">
						输入需要的行数
					</div>
					<div className="flex justify-center gap-x-4 items-center">
						<FormField
							control={form.control}
							name="minNum"
							render={({ field }) => {
								return (
									<FormItem className="w-[180px]">
										<FormControl>
											<Input
												className="bg-white rounded-md"
												type="number"
												placeholder="第一个号码"
												{...field}
												onChange={(e) => {
													const val = e.target.value;
													field.onChange(val === "" ? undefined : Number(val));
												}}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								);
							}}
						/>
						<div className="text-gray-400 font-bold">—</div>
						<FormField
							control={form.control}
							name="maxNum"
							render={({ field }) => {
								return (
									<FormItem className="w-[180px]">
										<FormControl>
											<Input
												className="bg-white rounded-md"
												type="number"
												placeholder="最后的号码"
												{...field}
												onChange={(e) => {
													const val = e.target.value;
													field.onChange(val === "" ? undefined : Number(val));
												}}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								);
							}}
						/>
					</div>
					<div className="w-[140px] mx-auto">
						<FormField
							control={form.control}
							name="role"
							render={({ field }) => {
								return (
									<FormItem>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger className="bg-white rounded-md">
													<SelectValue placeholder="选择单位" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="meter">Meter</SelectItem>
												<SelectItem value="foot">Foot</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								);
							}}
						/>
					</div>

					<Button type="submit" size="lg" className="w-full">
						提交
					</Button>
				</div>
			</form>
		</Form>
	);
};

export default HomePage;
