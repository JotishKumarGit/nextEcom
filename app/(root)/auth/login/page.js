import { Card, CardContent } from '@/components/ui/card';
import React from 'react';
import Logo from '@/public/assets/images/logo-black.png';
import image from 'next/image';
import {zodResolver} from "@hookform/resolvers/zod";
import {
  Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form"


function Login() {

  const formSchema = zSchema.pick({
    email: true, password: true
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const handleLoginSubmit = async (value) => {

  }

  return (
    <Card className='w-[450px]'>
      <CardContent>
        <div className='flex justify-center'>
          <img src={Logo.src} alt='Logo' width={Logo.width} height={Logo.height} className='max-w-[150px]' />
        </div>
        <div className='text-center'>
          <h1 className='text-3xl font-bold'>Login Into Account</h1>
          <p>Login into your account by filling the form bellow</p>

        </div>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleLoginSubmit)} className="space-y-8">
              <div className='mb-3'>
                <FormField control={form.control} name="username" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="example@gmail.com" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  )
}

export default Login;

// 54 min pe hu