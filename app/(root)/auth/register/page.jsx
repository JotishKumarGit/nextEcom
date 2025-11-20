"use client";

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from "@/components/ui/input";
import Image from 'next/image';
import Logo from '@/public/assets/images/logo-black.png';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField,FormItem,FormLabel,FormMessage,} from "@/components/ui/form";
import ButtonLoading from '@/components/Application/ButtonLoading';
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import Link from 'next/link';
import { WEBSITE_LOGIN } from '@/routes/WebsiteRoutes';

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Password and Confirm Password must be the same",
  path: ["confirmPassword"]
});

function Register()  {
  const [loading, setLoading] = useState(false);
  const [isTypePassword, setIsTypePassword] = useState(true);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    },
  });

  const handleRegisterSubmit = async (values) => {
    console.log(values);
  };

  return (
    <Card className='w-[400px]'>
      <CardContent>
        <div className='flex justify-center'>
          <Image src={Logo} alt='Logo' width={150} height={150} />
        </div>

        <div className='text-center'>
          <h1 className='text-3xl font-bold'>Create Account!</h1>
          <p>Create new account by filling the form below</p>
        </div>

        <div className='mt-5'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleRegisterSubmit)} className="space-y-8">
              <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl><Input placeholder="Enter your name" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl><Input type="email" placeholder="example@gmail.com" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="password" render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="*************" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="confirmPassword" render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type={isTypePassword ? "password" : "text"} placeholder="*************" {...field} />
                  </FormControl>
                  <button type="button" onClick={() => setIsTypePassword(!isTypePassword)} className='absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer'>
                    {isTypePassword ? <FaRegEyeSlash /> : <FaRegEye />}
                  </button>
                  <FormMessage />
                </FormItem>
              )} />

              <ButtonLoading loading={loading} type="submit" text="Register" className="w-full cursor-pointer" variant="" />

              <div className='text-center'>
                <div className='flex justify-center gap-1'>
                  <p>Already have an account?</p>
                  <Link href={WEBSITE_LOGIN} className='text-primary underline'>Login Account</Link>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
}

export default Register;
