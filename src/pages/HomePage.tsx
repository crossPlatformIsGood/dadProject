import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
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
import { clearPrintData, saveFormConfig } from "@/lib/storage";
import formSchema, { type FormConfig } from "@/schemas/FormSchema";

const HomePage = () => {
	const navigate = useNavigate();

	const onSubmit = (data: FormConfig) => {
		clearPrintData();
		saveFormConfig(data);
		navigate("/newform");
	};

	const form = useForm<FormConfig>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			role: "meter",
			minNum: 1,
			maxNum: 2,
			showPileNo: false,
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

					<FormField
						control={form.control}
						name="showPileNo"
						render={({ field }) => (
							<FormItem>
								<label className="flex items-center justify-between gap-3 rounded-md bg-white border border-blue-200 px-4 py-2.5 cursor-pointer hover:border-blue-300 transition-colors">
									<span className="text-sm font-medium text-gray-700">
										开启 PILE NO
									</span>
									<FormControl>
										<button
											type="button"
											role="switch"
											aria-checked={!!field.value}
											onClick={() => field.onChange(!field.value)}
											className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300 ${
												field.value ? "bg-blue-500" : "bg-gray-300"
											}`}
										>
											<span
												className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
													field.value ? "translate-x-5" : "translate-x-0.5"
												}`}
											/>
										</button>
									</FormControl>
								</label>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button type="submit" size="lg" className="w-full">
						提交
					</Button>
				</div>
			</form>
		</Form>
	);
};

export default HomePage;
