"use client"
import {useState, useEffect} from "react";
import { generateQuiz, saveQuizResult } from "@/actions/interview";
import useFetch from "@/hooks/use-fetch";
import { Card, CardFooter, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import { BarLoader } from "react-spinners";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { toast } from "sonner"
import QuizResult from "./quiz-result";

const Quiz = () => {

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [showExplanation, setShowExplanation] = useState(false);

    const {
        loading: generatingQuiz,
        fn: generateQuizFn,
        data: quizData,
    } = useFetch(generateQuiz);

    const {
        loading: savingResult,
        fn: saveQuizResultFn,
        data: resultData,
        setData: setResultData,
    } = useFetch(saveQuizResult);

    const startNewQuiz = () => {
        setCurrentQuestion(0);
        setAnswers([]);
        setShowExplanation(false);
        setResultData(null);
        generateQuizFn();
    };

    useEffect(() => {
        if (quizData) {
            setAnswers(new Array(quizData.length).fill(null));
        }
    }, [quizData]);

    const  handleAnswer = (answer) => {
        const newAnswers = [...answers];
        newAnswers[currentQuestion] = answer;
        setAnswers(newAnswers);
    };

    const handleNext = () => {
        if(currentQuestion < quizData.length - 1){
            setCurrentQuestion(currentQuestion + 1);
            setShowExplanation(false);
        } else {
            finishQuiz();
        }
    };

    const calculateScore = () => {
        let correct = 0;
        answers.forEach((answer, index) => {
          if (answer === quizData[index].correctAnswer) {
            correct++;
          }
        });
        return (correct / quizData.length) * 100;
      }; 

    const finishQuiz = async () => {
        const score = calculateScore();
        console.log('Finishing quiz with score:', score);
        try {
          const result = await saveQuizResultFn(quizData, answers, score);
          console.log('Quiz result saved:', result);
          toast.success("Quiz completed!");
        } catch (error) {
          console.error('Error saving quiz result:', error);
          toast.error(error.message || "Failed to save quiz results");
        }
    };

    if (generatingQuiz) {
        return <BarLoader className="mt-4" width={"100%"} color="gray" />;
    }

    if (resultData) {
        console.log('Rendering quiz result with data:', resultData);
        return (
          <div className="mx-2">
            <QuizResult result={resultData} onStartNew={startNewQuiz} />
          </div>
        );
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
                    <Button onClick={generateQuizFn} className="w-full">
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
                <CardContent className="space-y-4">
                    <p className="text-lg font-medium">
                        {question.question}
                    </p>
                    <RadioGroup 
                        className="space-y-2"
                        onValueChange={handleAnswer}
                        value={answers[currentQuestion]}
                    >
                        {question.options.map((option, index) => {
                             return (
                        <div className="flex items-center space-x-2" key = {index}>
                        <RadioGroupItem value={option} id={`option-${index}`} />
                        <Label htmlFor={`option-${index}`}>{option}</Label>
                    </div>
                        );
                        })}
                    </RadioGroup>

                    {showExplanation && (
                        <div>
                        <p className="font-medium">Explanation</p>
                        <p className="text-muted-foreground">{question.explanation}</p>
                        </div>
                    )}
                </CardContent>
                <CardFooter>
                    {!showExplanation && (
                        <Button
                            onClick={() => setShowExplanation(true)}
                            variant="outline"
                            disabled={!answers[currentQuestion]}
                        >
                            Show Explanation
                        </Button>
                    )}
                    <Button
                        onClick={handleNext}
                        className="ml-auto"
                        disabled={!answers[currentQuestion] || savingResult}
                    >
                        {savingResult && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                        )}
                        { 
                            currentQuestion < quizData.length - 1 
                            ? "Next Question"
                            : "Finish Quiz"
                        }
                    </Button>
                </CardFooter>
            </Card>
    </div>;
}
export default Quiz;