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

const inputClass =
	"bg-paper border border-rule rounded-sm focus-visible:ring-seal focus-visible:border-seal";

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
				className="flex flex-col items-center justify-center space-y-8 min-h-[calc(100vh-4rem)] px-4 py-10"
			>
				<header className="text-center">
					<div className="font-[var(--font-serif-cn)] text-4xl tracking-[0.4em] text-seal">
						富財貿易打樁工程
					</div>
					<div className="mt-3 font-serif text-lg tracking-[0.2em] text-ink uppercase">
						Fook Choy Trading &amp; Piling Engineering
					</div>
					<div className="mt-3 mx-auto h-px w-32 bg-seal" />
				</header>

				<section className="bg-paper-strong/40 border-2 border-double border-seal rounded-sm shadow-sm max-w-lg w-full mx-auto">
					<div className="border-b border-rule-soft px-6 py-3 text-center font-serif text-sm tracking-[0.3em] text-seal uppercase">
						【 输入数据 / Input 】
					</div>

					<div className="space-y-6 px-8 py-7">
						<div>
							<div className="font-serif text-sm tracking-wider text-ink/80 mb-2 text-center">
								号码范围 &nbsp;·&nbsp; Number range
							</div>
							<div className="flex justify-center gap-x-4 items-start">
								<FormField
									control={form.control}
									name="minNum"
									render={({ field }) => (
										<FormItem className="w-[180px]">
											<FormControl>
												<Input
													className={inputClass}
													type="number"
													placeholder="第一个号码"
													{...field}
													onChange={(e) => {
														const val = e.target.value;
														field.onChange(
															val === "" ? undefined : Number(val),
														);
													}}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<div className="pt-2 text-rule font-serif text-xl">—</div>
								<FormField
									control={form.control}
									name="maxNum"
									render={({ field }) => (
										<FormItem className="w-[180px]">
											<FormControl>
												<Input
													className={inputClass}
													type="number"
													placeholder="最后的号码"
													{...field}
													onChange={(e) => {
														const val = e.target.value;
														field.onChange(
															val === "" ? undefined : Number(val),
														);
													}}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</div>

						<div>
							<div className="font-serif text-sm tracking-wider text-ink/80 mb-2 text-center">
								单位 &nbsp;·&nbsp; Unit
							</div>
							<div className="w-[180px] mx-auto">
								<FormField
									control={form.control}
									name="role"
									render={({ field }) => (
										<FormItem>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<FormControl>
													<SelectTrigger className={inputClass}>
														<SelectValue placeholder="选择单位" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													<SelectItem value="meter">Meter / 米</SelectItem>
													<SelectItem value="foot">Foot / 英尺</SelectItem>
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</div>

						<FormField
							control={form.control}
							name="showPileNo"
							render={({ field }) => (
								<FormItem>
									<label className="flex items-center justify-between gap-3 rounded-sm bg-paper border border-rule px-4 py-2.5 cursor-pointer hover:border-seal/60 transition-colors">
										<span className="font-serif text-sm tracking-wider text-ink/80">
											开启 PILE NO
										</span>
										<FormControl>
											<button
												type="button"
												role="switch"
												aria-checked={!!field.value}
												onClick={() => field.onChange(!field.value)}
												className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-seal ${
													field.value ? "bg-seal" : "bg-rule"
												}`}
											>
												<span
													className={`inline-block h-5 w-5 transform rounded-full bg-paper shadow transition-transform ${
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

						<Button type="submit" size="xl" className="w-full">
							【 确认提交 】
						</Button>
					</div>
				</section>
			</form>
		</Form>
	);
};

export default HomePage;
