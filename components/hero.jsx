import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const HeroSection = () => {
  return (
    <section className="w-full pt-36 md:pt48 pb-10">
        <div className="space-y-6 text-center">
            <div className="space-y-6 mx-auto">
                <h1 className="text-5xl font-bold md:text-6xl lg:text-7xl xl:text-8xl gradient-title">
                    Your AI Job Coach For
                    <br />
                    Professional Success
                </h1>
                <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
                     Advance your career with personalized guidance, interview prep, and
                      AI-powered tools for job success.
                </p>
            </div>
            <div>
                <Link href="/dashboard">
                    <Button size="lg" className="px-8">
                        Get Started
                    </Button>
                </Link>
            </div>

            <div>
                <div>
                    <Image src="/banner.jpeg" 
                    alt="Banner Image" 
                    width={1280} 
                    height={720} 
                    className="rounded-lg shadow-2xl border-2 mx-auto" 
                    priority
                    />
                </div>
            </div>
        </div>
    </section>
  )
}

export default HeroSection;
