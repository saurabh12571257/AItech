import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import React from 'react';
import Link from 'next/link';
import Quiz from "../_components/quiz";


const MockInterviewPage = () => {
  return (
      <div>
        <div className='flex flex-col space-y-2 mx-2'>
         <Link href={"/interview"}>
           <Button variant="Link" className="gap-2 pl-0">
             <ArrowLeft className="h-4 w-4"/>
             Back to interview Preparation.
           </Button>
         </Link>

         <div>
          <h1 className="text-6xl font-bold gradient-title"> Mock </h1>
          <p className='text-muted-foreground'>
            Test your knowledge with indistry-specific questions.
          </p>
         </div>
        </div>
        <Quiz />
      </div>
  );
};

export default MockInterviewPage;
