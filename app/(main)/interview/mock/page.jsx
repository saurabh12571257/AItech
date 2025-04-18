import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import React from 'react'
import Link from 'next/link'


const MockInterviewPage = () => {
  return (
      <div>
        <div>
         <Link href={"/interview"}>
           <Button variant="Link" className="gap-2 pl-0">
             <ArrowLeft className="h-4 w-4"/>
             Back to interview Preparation.
           </Button>
         </Link>
        </div>
      </div>
  );
};

export default MockInterviewPage;
