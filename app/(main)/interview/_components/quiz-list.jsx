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
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="gradient-title text-3xl md:text-4xl">
            Recent Quizzes
          </CardTitle>
          <CardDescription>
            Review your past quiz performance.
          </CardDescription>
        </div>
        <Button onClick={() => router.push("/interview/mock")}> 
            Start new quiz
        </Button>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
            {assessments.map((assessments, i) => {
                return (
                    <Card>
                        <CardHeader>
                            <CardTitle> Quiz : {i+1} </CardTitle>
                            <CardDescription>
                                <div>
                                    Score : {assessments.quizScore.toFixed(1)}
                                    %
                                </div>
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground">
                            {assessments.improvementTip}
                        </CardContent>
                    </Card>
                );
            })}
        </div>
      </CardContent>
    </Card>
  </>

)};

export default QuizList;
