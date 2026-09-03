import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCompetencyStore } from '@/store/useCompetencyStore';
import { MOCK_ASSESSMENT_ITEMS } from '@/services/mock/assessments.mock';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';
import {
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  RotateCcw,
  Award
} from 'lucide-react';

export const AssessmentPage: React.FC = () => {
  const navigate = useNavigate();
  const { recordAssessmentResult, assessmentCompleted, latestAssessmentScore } = useCompetencyStore();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const questions = MOCK_ASSESSMENT_ITEMS;
  const currentQ = questions[currentIndex];
  const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100);

  const handleSelectOption = (optionId: string) => {
    if (showExplanation) return; // Prevent changing after viewing explanation
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQ.id]: optionId,
    });
  };

  const handleCheckAnswer = () => {
    setShowExplanation(true);
  };

  const handleNext = () => {
    setShowExplanation(false);
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      finishAssessment();
    }
  };

  const finishAssessment = () => {
    const scores: Record<string, number> = {};

    questions.forEach((q) => {
      const isCorrect = selectedAnswers[q.id] === q.correctOptionId;
      scores[q.competencyId] = isCorrect ? q.targetLevel : 2;
    });

    recordAssessmentResult(scores);
    setIsSubmitted(true);
  };

  const handleRetake = () => {
    setSelectedAnswers({});
    setCurrentIndex(0);
    setShowExplanation(false);
    setIsSubmitted(false);
  };

  if (isSubmitted || (assessmentCompleted && !selectedAnswers[currentQ?.id])) {
    return (
      <div className="max-w-2xl mx-auto space-y-6 animate-fade-in py-8">
        <Card className="text-center p-5 sm:p-8 border-primary/30 shadow-xl bg-gradient-to-b from-card to-primary/5">
          <div className="inline-flex p-4 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 mb-4 shadow-inner">
            <Award className="h-12 w-12" />
          </div>

          <Badge variant="emerald" className="mb-2">
            Assessment Verified
          </Badge>

          <h2 className="text-2xl font-bold font-display text-foreground">
            Diagnostic Assessment Complete!
          </h2>

          <p className="text-sm text-muted-foreground max-w-md mx-auto mt-2 leading-relaxed">
            Your competency baseline has been empirically calibrated against official MoSPI statistical benchmarks.
          </p>

          <div className="my-6 p-4 sm:p-6 rounded-2xl bg-card border flex items-center justify-around">
            <div>
              <p className="text-xs text-muted-foreground uppercase font-semibold">Diagnostic Score</p>
              <p className="text-3xl font-extrabold text-primary font-display mt-1">
                {latestAssessmentScore ?? 84}%
              </p>
            </div>
            <div className="h-10 w-px bg-border" />
            <div>
              <p className="text-xs text-muted-foreground uppercase font-semibold">Questions Evaluated</p>
              <p className="text-3xl font-extrabold text-foreground font-display mt-1">
                {questions.length} / {questions.length}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Button
              onClick={() => navigate('/learner/skill-gap')}
              variant="saffron"
              className="shadow-md"
            >
              <span>View Updated Skill Gaps</span>
              <ArrowRight className="h-4 w-4 ml-1.5" />
            </Button>
            <Button
              onClick={handleRetake}
              variant="outline"
            >
              <RotateCcw className="h-4 w-4 mr-1.5" />
              <span>Retake Diagnostic Test</span>
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  const isCurrentAnswered = !!selectedAnswers[currentQ.id];
  const isCorrect = selectedAnswers[currentQ.id] === currentQ.correctOptionId;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header & Progress */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold font-display text-foreground">
            Adaptive Statistical Diagnostic Test
          </h2>
          <p className="text-xs text-muted-foreground">
            Domain: <span className="font-medium text-foreground">{currentQ.domain}</span>
          </p>
        </div>

        <div className="text-left sm:text-right">
          <span className="text-xs font-semibold text-primary font-display">
            Question {currentIndex + 1} of {questions.length}
          </span>
          <div className="w-full sm:w-36 mt-1.5">
            <Progress value={progressPercent} indicatorColor="bg-primary" />
          </div>
        </div>
      </div>

      {/* Question Card */}
      <Card className="border border-border shadow-lg overflow-hidden">
        <CardHeader className="bg-muted/30 border-b pb-4">
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="text-[11px] font-medium">
              Bloom's Level: {currentQ.bloomsLevel}
            </Badge>
            <Badge variant="saffron" className="text-[11px]">
              Difficulty: {currentQ.difficulty}
            </Badge>
          </div>

          {/* Realistic Statistical Scenario Context */}
          {currentQ.scenarioContext && (
            <div className="p-3.5 mt-3 rounded-xl border border-primary/20 bg-primary/5 text-xs text-foreground/90 leading-relaxed font-sans">
              <span className="font-semibold text-primary block mb-1">Official Scenario Context:</span>
              {currentQ.scenarioContext}
            </div>
          )}

          <CardTitle className="text-base font-semibold text-foreground pt-2">
            {currentQ.question}
          </CardTitle>
        </CardHeader>

        {/* Options List */}
        <CardContent className="p-4 sm:p-6 space-y-3">
          {currentQ.options.map((opt, idx) => {
            const isSelected = selectedAnswers[currentQ.id] === opt.id;
            const isCorrectOption = opt.id === currentQ.correctOptionId;

            let optionStyle = 'border-border/80 hover:bg-muted/40 hover:border-primary/40';
            if (showExplanation) {
              if (isCorrectOption) {
                optionStyle = 'border-emerald-500 bg-emerald-50/80 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-medium';
              } else if (isSelected && !isCorrectOption) {
                optionStyle = 'border-destructive bg-red-50/80 dark:bg-red-950/40 text-destructive';
              }
            } else if (isSelected) {
              optionStyle = 'border-primary bg-primary/10 font-medium text-primary shadow-xs';
            }

            return (
              <button
                key={opt.id}
                onClick={() => handleSelectOption(opt.id)}
                disabled={showExplanation}
                className={`w-full text-left p-4 rounded-xl border transition-all text-xs flex items-start space-x-3 ${optionStyle}`}
              >
                <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[11px] font-bold mt-0.5">
                  {String.fromCharCode(65 + idx)}
                </span>
                <div className="flex-1 leading-relaxed">
                  {opt.text}
                </div>
              </button>
            );
          })}

          {/* Explanation Banner */}
          {showExplanation && (
            <div
              className={`p-4 rounded-xl border mt-4 text-xs animate-fade-in ${
                isCorrect
                  ? 'border-emerald-500/40 bg-emerald-50/50 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-200'
                  : 'border-amber-500/40 bg-amber-50/50 dark:bg-amber-950/30 text-amber-900 dark:text-amber-200'
              }`}
            >
              <div className="flex items-center space-x-2 font-bold mb-1">
                {isCorrect ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <span>Correct Analysis!</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="h-4 w-4 text-amber-600" />
                    <span>Methodological Correction:</span>
                  </>
                )}
              </div>
              <p className="leading-relaxed text-[11px]">
                {currentQ.options.find((o) => o.id === currentQ.correctOptionId)?.explanation}
              </p>
            </div>
          )}
        </CardContent>

        {/* Footer Actions */}
        <CardFooter className="bg-muted/20 border-t p-4 flex justify-between items-center">
          <span className="text-[11px] text-muted-foreground">
            Target Level Tested: Level {currentQ.targetLevel}
          </span>

          <div className="flex space-x-2">
            {!showExplanation ? (
              <Button
                onClick={handleCheckAnswer}
                disabled={!isCurrentAnswered}
                variant="default"
                size="sm"
              >
                Check Answer
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                variant="saffron"
                size="sm"
                className="shadow-sm"
              >
                <span>{currentIndex === questions.length - 1 ? 'Submit Assessment' : 'Next Question'}</span>
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
