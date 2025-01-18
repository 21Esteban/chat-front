"use client";
import customAxios from "@/app/_lib/customAxios";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { registerSchema, RegisterSchema } from "../_schemas/authSchema";

export default function RegisterPage() {
  const [backMessage, setBackMessage] = useState("");
  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      userName: "",
      email: "",
      number: "",
      password: "",
      confirmPassword: "",
    },
  });

  const router = useRouter();

  const sendForm = async (values: RegisterSchema) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { confirmPassword, ...rest } = values;

      const response = await customAxios.post("/auth/register", rest);
      //token set on axios interceptors
      setBackMessage(response.data.message);
      if (localStorage.getItem("token")) {
        router.push("/");
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      setBackMessage(error.response.data.message);
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
          name="userName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>username</FormLabel>
              <FormControl>
                <Input placeholder="Jhon doe" {...field} type="text" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
          name="number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone number</FormLabel>
              <FormControl>
                <Input type="text" placeholder="3020323400" {...field} />
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
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
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
        <p className="text-sm font-medium text-destructive text-center">
          {backMessage}
        </p>
        <div className="text-center mt-4 text-sm">
          ¿Dont have an account?{" "}
          <Link
            href="/authentication/login"
            className=" text-blue-400 hover:underline font-medium"
          >
            Login
          </Link>
        </div>
      </form>
    </Form>
  );
}
