import { getAssessments } from '@/actions/interview';
import StatsCards from './_components/stats-cards';
import QuizList from './_components/quiz-list';
import React from 'react'

const InterviewPage = async () => {

  const assessments = await getAssessments();

  return( 
  <div>
      <h1 className="text-6xl font-bold gradient-title mb-5">
        Interview Prep
      </h1>
      
      <div>
        <StatsCards assessments={assessments} />
        <QuizList assessments={assessments} />
      </div>
  </div>
  );
};

export default InterviewPage
