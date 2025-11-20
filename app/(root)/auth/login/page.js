"use client"

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from "@/components/ui/input";
import Image from 'next/image';
import Logo from '@/public/assets/images/logo-black.png';
import { z } from "zod";
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
import ButtonLoading from '@/components/Application/ButtonLoading';
// Eye icons.
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";
import  Link from 'next/link';
import { WEBSITE_REGISTER } from '@/routes/WebsiteRoutes';

const formSchema = z.object({
  email: z.string().email("Enter a valid email"),
}).extend({password:z.string().min(6, "Password must be at least 6 characters")});

function Login() {
  const [loading, setLoading] = useState(false);
  const [isTypePassword, setIsTypePassword] = useState(true);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLoginSubmit = async (values) => {
    console.log(values);
  };

  return (
    <Card className='w-[400px]'>
      <CardContent>
        <div className='flex justify-center'>
          <Image src={Logo} alt='Logo' width={150} height={150} />
        </div>

        <div className='text-center'>
          <h1 className='text-3xl font-bold'>Login Into Account</h1>
          <p>Login into your account by filling the form below</p>
        </div>

        <div className='mt-5'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleLoginSubmit)} className="space-y-8">
              <div className='mb-5'>
                <FormField
                 control={form.control}
                  name="email" 
                  render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                       <Input type="email" placeholder="example@gmail.com" {...field} />
                        </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
              <div className='mb-5'>
                <FormField 
                control={form.control}
                 name="password"
                  render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel>Password</FormLabel>
                    <FormControl> 
                      <Input type={isTypePassword ? "password" : "text"} placeholder="*************" {...field} />
                        </FormControl>
                  
                      <button type="button" onClick={()=>setIsTypePassword (!isTypePassword) } className='absolute top-1/2 right-2 cursor-pointer' >{isTypePassword ? <FaRegEyeSlash /> : <FaRegEye />} </button>
                        <FormMessage />
                  </FormItem>
                )} />
              </div>
              <div className='mb-3'>
                <ButtonLoading loading={loading} type="submit" text="Login" className="w-full cursor-pointer" variant=""  />
              </div>
              <div className='text-center'>
                <div className='flex justify-center text-center gap-1'>
                  <p>Don't have an account?</p>
                  <Link href={WEBSITE_REGISTER} className='text-primary underline'>Create Account</Link>
                </div>
                <div className='mt-3'>
                  <Link href="" className='text-primary underline'>Forgot Password</Link>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>

  );
}

export default Login;

// 1:  minutes 