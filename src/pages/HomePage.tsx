import { Button } from "@/components/ui/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/Select";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { SelectValue } from "@/components/ui/Select";
import { cn } from "@/lib/utils";
import formSchema from "@/schemas/FormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const HomePage = () => {
  const navigate = useNavigate();

  const onSubmit = (data: any) => {
    const jsonData = JSON.stringify(data);
    localStorage.setItem("formD", jsonData);
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
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn("space-y-5")}>
        <div className="font-bold text-4xl">富財貿易打樁工程</div>
        <div className="font-bold text-4xl">
          FOOK CHOY TRADING & PILING ENGINEERING
        </div>
        <div className="bg-blue-300 space-y-5 p-8 rounded-[20px]">
          <div>输入需要的行数</div>
          <div
            className={cn("flex", "justify-center", "gap-x-5", "items-center")}
          >
            <FormField
              control={form.control}
              name="minNum"
              render={({ field }) => {
                return (
                  <FormItem className={cn("w-[200px] border-none")}>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="第一个号码"
                        {...field}
                        onChange={(e) => field.onChange(e.target.value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <div>-</div>
            <FormField
              control={form.control}
              name="maxNum"
              render={({ field }) => {
                return (
                  <FormItem className={cn("w-[200px] border-none")}>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="最后的号码"
                        {...field}
                        onChange={(e) => field.onChange(e.target.value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>
          <div className="w-[140px] m-auto">
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
                        <SelectTrigger>
                          <SelectValue placeholder="Select a verified email to display" />
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

          <Button type="submit" size="lg">
            提交
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default HomePage;
