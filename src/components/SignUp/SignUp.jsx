import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Link } from "react-router-dom";
import { handleRegister } from "../../api/auth";
import { useToast } from "../../hooks/use-toast";
import toast from "react-hot-toast";


const FormSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  email: z.string().email("Please enter a valid email."),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

function SignUp() {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });
  const onSubmit = async (data) => {
    const response = await handleRegister(data)
    console.log(response)
    if (response.success) {
      toast.success(response.message)
      form.reset()
    } else {
      toast.error(response.message)
    }


  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3 text-center">
          Sign Up
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="text-start space-y-2">

            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="User Name" {...field} />
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
                    <Input type="email" placeholder="example@example.com" {...field} />
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-center pt-2">
              <Button className="self-end min-w-36" type="submit">
                Sign Up
              </Button>
            </div>
            <p className="text-neutral-600 text-sm pt-2">
              Already have an account?{" "}
              <Link to={"/login"} className="text-blue-700">
                Login
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default SignUp;
