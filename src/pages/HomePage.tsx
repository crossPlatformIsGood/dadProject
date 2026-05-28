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
	"bg-surface border border-rule rounded-xl h-11 focus-visible:ring-2 focus-visible:ring-seal focus-visible:ring-offset-0 focus-visible:border-seal";

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
					<h1 className="text-3xl font-semibold text-ink">富財貿易打樁工程</h1>
					<p className="mt-2 text-sm font-medium text-ink-soft tracking-wide">
						Fook Choy Trading &amp; Piling Engineering
					</p>
				</header>

				<section className="bg-surface border border-rule rounded-2xl shadow-sm max-w-md w-full mx-auto p-7 space-y-6">
					<div>
						<div className="block text-sm font-medium text-ink-soft mb-2">
							号码范围
						</div>
						<div className="flex items-center gap-3">
							<FormField
								control={form.control}
								name="minNum"
								render={({ field }) => (
									<FormItem className="flex-1">
										<FormControl>
											<Input
												className={inputClass}
												type="number"
												placeholder="起始"
												{...field}
												onChange={(e) => {
													const val = e.target.value;
													field.onChange(val === "" ? undefined : Number(val));
												}}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<span className="text-ink-soft">—</span>
							<FormField
								control={form.control}
								name="maxNum"
								render={({ field }) => (
									<FormItem className="flex-1">
										<FormControl>
											<Input
												className={inputClass}
												type="number"
												placeholder="结束"
												{...field}
												onChange={(e) => {
													const val = e.target.value;
													field.onChange(val === "" ? undefined : Number(val));
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
						<div className="block text-sm font-medium text-ink-soft mb-2">
							单位
						</div>
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
											<SelectItem value="meter">Meter</SelectItem>
											<SelectItem value="foot">Foot</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<FormField
						control={form.control}
						name="showPileNo"
						render={({ field }) => (
							<FormItem>
								<label className="flex items-center justify-between gap-3 cursor-pointer">
									<span className="text-sm font-medium text-ink">
										开启 PILE NO
									</span>
									<FormControl>
										<button
											type="button"
											role="switch"
											aria-checked={!!field.value}
											onClick={() => field.onChange(!field.value)}
											className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-seal/40 ${
												field.value ? "bg-seal" : "bg-rule"
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

					<Button type="submit" size="xl" className="w-full">
						继续
					</Button>
				</section>
			</form>
		</Form>
	);
};

export default HomePage;
