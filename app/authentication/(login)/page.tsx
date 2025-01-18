"use client"
import customAxios from "@/app/_lib/customAxios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation'
import  Link  from "next/link";
import { LoginSchema, loginSchema } from "../_schemas/authSchema";


export default function LoginPage(){
  const router = useRouter();

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const sendForm = async (values: LoginSchema) => {
    try {
      const response = await customAxios.post("/auth/signIn", values);
      const { data, token } = response.data;

      if (data) {
        localStorage.setItem("user", JSON.stringify(data));
      }
      if (token) {
        localStorage.setItem("token", token);
        router.push("/");
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };

  return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(sendForm)}
          className="space-y-4 w-[80%] rounded-3xl md:w-[50%] lg:w-[40%] xl:w-[20%]"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="youremail@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Submit
          </Button>
          <div className="text-center mt-4 text-sm">
            ¿Dont have an account?{" "}
            <Link
              href="/authentication/register"
              className=" text-blue-400 hover:underline font-medium"
            >
              Register
            </Link>
          </div>
        </form>
      </Form>
  );
};
