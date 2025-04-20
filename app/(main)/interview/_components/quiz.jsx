"use client"
import {useState, useEffect} from "react";
import { generateQuiz } from "@/actions/interview";
import useFetch from "@/hooks/use-fetch";
import { Card, CardFooter, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarLoader } from "react-spinners";


const Quiz = () => {

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [showExplanation, setShowExplanation] = useState(false);

    const {
        loading: generatingQuiz,
        fn: generateQuizFn,
        data: quizData,
    } = useFetch(generateQuiz);

    useEffect(() => {
        if (quizData) {
            setAnswers(new Array(quizData.lenght).fill(null));
        }
    }, [quizData]);

    if (generatingQuiz) {
        return <BarLoader className="mt-4" width={"100%"} color="gray" />;
    }

    if(!quizData){
        return(
            <Card>
                <CardHeader>
                    <CardTitle>
                     Ready to test your knowledge ?
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        Take your time and answer these 10 quiz questions.
                    </p>
                </CardContent>
                <CardFooter>
                    <Button className="w-full">
                        Start Quiz
                    </Button>
                </CardFooter>
            </Card>
        );
    }

    const question = quizData[currentQuestion];

    return <div>
            <Card>
                <CardHeader>
                    <CardTitle>
                     Question {currentQuestion + 1} of {quizData.length}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-lg font-medium">
                        {question.question}
                    </p>
                </CardContent>
                <CardFooter>

                </CardFooter>
            </Card>
    </div>;
}
export default Quiz;