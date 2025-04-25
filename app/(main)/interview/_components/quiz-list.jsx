"use client";

import { useState } from 'react'
import { useRouter } from 'next/navigation';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Button } from '@/components/ui/button';


const QuizList = ({assessments}) => {

    const router = useRouter();
    const [selectQuiz, setSelectedQuiz] = useState(null);

  return(
  <>
    <Card className="mt-4">
      <CardHeader>
        <div>
          <CardTitle className="gradient-title text-3xl md:text-4xl">
            Recent Quizzes
          </CardTitle>
          <CardDescription className="mb-2">
            Review your past quiz performance.
          </CardDescription>
        </div>
        <Button onClick={() => router.push("/interview/mock")}> 
            Start new quiz
        </Button>
      </CardHeader>
      <CardContent>
        <p> 
            Card Content 
        </p>
      </CardContent>
    </Card>
  </>

)};

export default QuizList;
