import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCompetencyStore } from '@/store/useCompetencyStore';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Award,
  Check
} from 'lucide-react';

export const CourseViewerPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { courses, completeLesson, verifyCompetencyUplift, ratings } = useCompetencyStore();

  const course = courses.find((c) => c.id === courseId) || courses[0];
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [showUpliftModal, setShowUpliftModal] = useState(false);

  const lesson = course.lessons[activeLessonIndex];
  const isLessonCompleted = course.completedLessonIds.includes(lesson.id);
  const currentRating = ratings[course.competencyId];

  const handleSelectQuizOption = (index: number) => {
    if (quizSubmitted) return;
    setSelectedQuizAnswer(index);
  };

  const handleVerifyLesson = () => {
    if (selectedQuizAnswer === null || !lesson.quizQuestion) return;
    setQuizSubmitted(true);

    const isCorrect = selectedQuizAnswer === lesson.quizQuestion.correctIndex;
    if (isCorrect) {
      completeLesson(course.id, lesson.id);

      if (activeLessonIndex === course.lessons.length - 1) {
        verifyCompetencyUplift(course.competencyId, course.targetLevel);
        setShowUpliftModal(true);
      }
    }
  };

  const handleNextLesson = () => {
    setSelectedQuizAnswer(null);
    setQuizSubmitted(false);
    if (activeLessonIndex < course.lessons.length - 1) {
      setActiveLessonIndex(activeLessonIndex + 1);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Back Navigation Bar */}
      <div className="flex items-center justify-between">
        <Button asChild variant="ghost" size="sm" className="text-xs">
          <Link to="/learner/courses" className="flex items-center space-x-1">
            <ArrowLeft className="h-4 w-4 mr-1" />
            <span>Back to Learning Path</span>
          </Link>
        </Button>

        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-[11px] font-mono">
            {course.code}
          </Badge>
          <Badge variant="navy" className="text-[11px]">
            {course.provider}
          </Badge>
        </div>
      </div>

      {/* Verified Uplift Success Notification */}
      {showUpliftModal && (
        <Card className="border-emerald-500 bg-gradient-to-r from-emerald-50 via-card to-emerald-50 dark:from-emerald-950/40 dark:via-card dark:to-emerald-950/40 shadow-xl animate-fade-in p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-full bg-emerald-600 text-white shadow-md">
                <Award className="h-8 w-8" />
              </div>
              <div>
                <Badge variant="emerald" className="mb-1 text-[10px]">
                  Verified Competency Uplift
                </Badge>
                <h3 className="text-lg font-bold text-foreground">
                  Competency Elevated to Level {course.targetLevel}!
                </h3>
                <p className="text-xs text-muted-foreground">
                  Your verified proficiency in <span className="font-semibold text-foreground">{course.domain}</span> has been logged and reflected across your Dashboard and Department reports.
                </p>
              </div>
            </div>

            <Button
              onClick={() => navigate('/learner')}
              variant="emerald"
              size="sm"
              className="shrink-0 shadow-md"
            >
              <span>View Dashboard Uplift</span>
              <ArrowRight className="h-4 w-4 ml-1.5" />
            </Button>
          </div>
        </Card>
      )}

      {/* Main Course Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Syllabus Sidebar */}
        <div className="lg:col-span-4 space-y-4">
          <Card>
            <CardHeader className="pb-3 border-b">
              <CardTitle className="text-sm font-bold">Module Syllabus</CardTitle>
              <CardDescription className="text-xs">
                {course.completedLessonIds.length} of {course.lessons.length} Completed
              </CardDescription>
            </CardHeader>
            <CardContent className="p-3 space-y-1.5">
              {course.lessons.map((les, idx) => {
                const isCurrent = idx === activeLessonIndex;
                const isDone = course.completedLessonIds.includes(les.id);

                return (
                  <button
                    key={les.id}
                    onClick={() => {
                      setActiveLessonIndex(idx);
                      setSelectedQuizAnswer(null);
                      setQuizSubmitted(false);
                    }}
                    className={`w-full text-left p-3 rounded-xl text-xs transition-all flex items-start space-x-2.5 ${
                      isCurrent
                        ? 'bg-primary text-primary-foreground font-semibold shadow-xs'
                        : isDone
                        ? 'bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-900 dark:text-emerald-300 hover:bg-emerald-50'
                        : 'hover:bg-muted text-muted-foreground'
                    }`}
                  >
                    <span className="mt-0.5">
                      {isDone ? (
                        <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                      ) : (
                        <span className="inline-block h-3.5 w-3.5 rounded-full border border-current text-[9px] text-center font-bold">
                          {idx + 1}
                        </span>
                      )}
                    </span>
                    <span className="flex-1 line-clamp-2 leading-relaxed">
                      {les.title}
                    </span>
                  </button>
                );
              })}
            </CardContent>
          </Card>

          {/* Current Proficiency Card */}
          <Card className="bg-muted/20 border-dashed">
            <CardContent className="p-4 space-y-2 text-xs">
              <span className="font-semibold text-foreground block">Competency Target:</span>
              <div className="flex justify-between items-center text-muted-foreground">
                <span>Current Rating:</span>
                <span className="font-bold text-primary">Level {currentRating?.currentLevel ?? 2}</span>
              </div>
              <div className="flex justify-between items-center text-muted-foreground">
                <span>Course Target:</span>
                <span className="font-bold text-saffron-600">Level {course.targetLevel}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right: Lesson Content & Interactive Quiz */}
        <div className="lg:col-span-8 space-y-6">
          <Card className="border border-border shadow-lg">
            <CardHeader className="border-b bg-card/60 pb-4">
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="text-[10px]">
                  Lesson {activeLessonIndex + 1} of {course.lessons.length}
                </Badge>
                <span className="text-xs text-muted-foreground font-medium">
                  {lesson.durationMinutes} Minutes
                </span>
              </div>
              <CardTitle className="text-lg mt-1 font-display">
                {lesson.title}
              </CardTitle>
            </CardHeader>

            <CardContent className="p-6 space-y-5 leading-relaxed text-sm text-foreground/90">
              <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
                {lesson.contentMarkdown.split('\n\n').map((paragraph, pIdx) => {
                  if (paragraph.startsWith('###')) {
                    return (
                      <h4 key={pIdx} className="text-base font-bold text-foreground mt-4 mb-2">
                        {paragraph.replace('###', '').trim()}
                      </h4>
                    );
                  }
                  if (paragraph.startsWith('```')) {
                    return (
                      <pre key={pIdx} className="p-4 rounded-xl bg-muted/60 text-xs font-mono border overflow-x-auto my-3">
                        <code>{paragraph.replace(/```[a-z]*/g, '').trim()}</code>
                      </pre>
                    );
                  }
                  return (
                    <p key={pIdx} className="text-xs text-muted-foreground leading-relaxed">
                      {paragraph}
                    </p>
                  );
                })}
              </div>

              {/* End of Lesson Verification Quiz */}
              {lesson.quizQuestion && (
                <div className="mt-8 pt-6 border-t space-y-4">
                  <p className="text-xs font-semibold text-foreground">
                    {lesson.quizQuestion.question}
                  </p>

                  <div className="space-y-2">
                    {lesson.quizQuestion.options.map((optText, oIdx) => {
                      const isSelected = selectedQuizAnswer === oIdx;
                      const isCorrect = oIdx === lesson.quizQuestion?.correctIndex;

                      let optClass = 'border-border/80 hover:bg-muted/40';
                      if (quizSubmitted) {
                        if (isCorrect) {
                          optClass = 'border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-200 font-medium';
                        } else if (isSelected && !isCorrect) {
                          optClass = 'border-destructive bg-red-50/60 dark:bg-red-950/30 text-destructive';
                        }
                      } else if (isSelected) {
                        optClass = 'border-primary bg-primary/10 text-primary font-medium';
                      }

                      return (
                        <button
                          key={oIdx}
                          onClick={() => handleSelectQuizOption(oIdx)}
                          disabled={quizSubmitted}
                          className={`w-full text-left p-3.5 rounded-xl border text-xs flex items-center space-x-3 transition-all ${optClass}`}
                        >
                          <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px] font-bold">
                            {String.fromCharCode(65 + oIdx)}
                          </span>
                          <span className="leading-relaxed">{optText}</span>
                        </button>
                      );
                    })}
                  </div>

                  {quizSubmitted && (
                    <div
                      className={`p-3.5 rounded-xl border text-xs ${
                        selectedQuizAnswer === lesson.quizQuestion.correctIndex
                          ? 'border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-300'
                          : 'border-destructive bg-red-50/40 dark:bg-red-950/20 text-destructive'
                      }`}
                    >
                      {selectedQuizAnswer === lesson.quizQuestion.correctIndex ? (
                        <div className="flex items-center space-x-2 font-semibold">
                          <CheckCircle2 className="h-4 w-4" />
                          <span>Correct! Lesson validated and competencies updated.</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2 font-semibold">
                          <AlertCircle className="h-4 w-4" />
                          <span>Incorrect. Review the lesson section above and try again.</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </CardContent>

            <CardFooter className="bg-muted/20 border-t p-4 flex justify-between items-center">
              <span className="text-xs text-muted-foreground">
                {isLessonCompleted ? 'Status: Completed' : 'Status: In Progress'}
              </span>

              <div className="flex space-x-2">
                {!quizSubmitted ? (
                  <Button
                    onClick={handleVerifyLesson}
                    disabled={selectedQuizAnswer === null}
                    variant="saffron"
                    size="sm"
                  >
                    Verify & Complete Lesson
                  </Button>
                ) : (
                  <Button
                    onClick={handleNextLesson}
                    variant="default"
                    size="sm"
                  >
                    <span>{activeLessonIndex === course.lessons.length - 1 ? 'Finish Module' : 'Next Lesson'}</span>
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                )}
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};
