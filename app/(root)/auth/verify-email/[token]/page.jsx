"use client"

import { Card, CardContent } from '@/components/ui/card';
import { use, useState, useEffect } from 'react';
import verifiedImg from '@/public/assets/images/verified.gif'
import verificationFailedImg from '@/public/assets/images/verification-failed.gif';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image'


const EmailVerification = ({ params }) => {
  const { token } = use(params);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const verify = async () => {
      const { data: verificationResponse } = await axios.post('/api/auth/verify-email', { token });
      if (verificationResponse.success) {
        setIsVerified(true);
      }
    }

    verify();
  }, [token])

  return (
    <Card className="w-[400px]">
      <CardContent>
        {
          isVerified ?
            <div>
              <div className='flex justify-center items-center'>
                <Image src={verifiedImg.src} height={verifiedImg.height} width={verifiedImg.width} className='h-[100px]  w-auto' alt={verifiedImg.alt} />
              </div>
              <div className='text-center'>
                <h1 className='text-2xl font-bold text-green-500 my-5'>Email verification success!</h1>
                <Button asChild>
                  <Link href=''>Continue Shopping</Link>
                </Button>
              </div>
            </div>
            : 
            <div>
              <div className='flex justify-center items-center'>
                <Image src={verificationFailedImg.src} height={verifiedImg.height} width={verifiedImg.width} className='h-[100px]  w-auto' />
              </div>
              <div className='text-center'>
                <h1 className='text-2xl font-bold text-red-500 my-5'>Email verification failed!</h1>
                <Button asChild>
                 <Link href=''>Continue Shopping</Link> 
                </Button>
              </div>
            </div>
        }
      </CardContent>
    </Card>
  )
}

export default EmailVerification;
