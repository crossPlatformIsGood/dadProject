import { Button } from "@/components/Button";
import { Input, InputProps } from "@/components/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger
} from "@/components/Select";
import { Field, FieldRenderProps, Form } from "react-final-form";
import { useNavigate } from "react-router-dom";

interface RenderInputProps
  extends FieldRenderProps<string, HTMLElement>,
    InputProps {}

const RenderInput: React.FC<RenderInputProps> = ({ input, meta, ...rest }) => (
  <div>
    <Input {...input} {...rest} />
    {meta.error && meta.touched && (
      <span style={{ color: "red" }}>{meta.error}</span>
    )}
  </div>
);

const RenderSelect: React.FC<RenderInputProps> = ({ input, children }) => (
  <Select {...input}>
    <SelectTrigger>{input.value || "Select an option"}</SelectTrigger>
    <SelectContent>{children}</SelectContent>
  </Select>
);

interface FormValues {
  minNum?: string;
  maxNum?: string;
  role?: string;
}

const validate = (values: FormValues) => {
  const errors: FormValues = {};
  if (!values.minNum) {
    if (values.minNum && parseInt(values.minNum) <= 0) {
      errors.minNum = "号码要大于0";
    }
    errors.minNum = "请输入一个号码";
  }
  if (!values.maxNum) {
    errors.maxNum = "请输入一个号码";
  }
  return errors;
};

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="font-bold text-4xl">富財貿易打樁工程</div>
      <div className="font-bold text-4xl">
        FOOK CHOY TRADING & PILING ENGINEERING
      </div>
      <Form
        // initialValues={{ role: "meter" }} // Set the default value here
        onSubmit={async (values: FormValues) => {
          console.log(values.role);
          if (!values.minNum || !values.maxNum) {
            return alert("第一个号码和第二个号码不能放空");
          }
          if (values.minNum && parseInt(values.minNum) <= 0) {
            return alert("第一个号码要大过0");
          }
          // Simulate async validation
          await new Promise((resolve) => setTimeout(resolve, 1000));
          navigate("/newform");
        }}
        // validate={validate}
        render={({ handleSubmit, submitting, submitError }) => (
          <form
            onSubmit={handleSubmit}
            className="w-2/3 bg-blue-300 space-y-5 p-8 rounded-[20px]"
          >
            <div>输入需要的行数</div>
            <div className="flex justify-center items-center space-x-4 ">
              <Field
                className="bg-white w-[200px] border-none"
                name="minNum"
                component={RenderInput}
                type="text"
                placeholder="第一号码"
              />

              <div>-</div>
              <Field
                className="bg-white w-[200px] border-none"
                name="maxNum"
                component={RenderInput}
                type="text"
                placeholder="最长号码"
              />
            </div>
            <Field name="role" component={RenderSelect}>
              <SelectItem value="meter">Meter</SelectItem>
              <SelectItem value="foot">Foot</SelectItem>
            </Field>
            {submitError && <div>{submitError}</div>}
            <Button
              className="bg-amber-300 !px-10 rounded"
              type="submit"
              disabled={submitting}
            >
              提交
            </Button>
          </form>
        )}
      ></Form>
    </>
  );
};

export default HomePage;
