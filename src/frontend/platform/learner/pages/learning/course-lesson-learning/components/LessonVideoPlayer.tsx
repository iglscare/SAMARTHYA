import React from 'react';
import { Link } from 'react-router-dom';
import { Minimize, Star } from 'lucide-react';
import { SubLesson } from '@/platform/learner/courses';

interface LessonVideoPlayerProps {
  videoContainerRef: React.RefObject<HTMLDivElement>;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  currentVideoId: string;
  currentLesson: SubLesson;
  courseDetail: any;
}

export const LessonVideoPlayer: React.FC<LessonVideoPlayerProps> = ({
  videoContainerRef,
  isFullscreen,
  onToggleFullscreen,
  currentVideoId,
  currentLesson,
  courseDetail,
}) => {
  return (
    <div className="space-y-2">
      {/* VIDEO PLAYER SCREEN */}
      <div
        ref={videoContainerRef}
        className={`w-full bg-black relative overflow-hidden select-none border border-slate-800 transition-all ${
          isFullscreen
            ? 'fixed inset-0 z-[99999] w-screen h-screen rounded-none bg-black flex flex-col items-center justify-center p-0'
            : 'rounded-2xl shadow-xl aspect-video max-h-[500px] bg-black'
        }`}
      >
        {/* Fullscreen Exit Button */}
        {isFullscreen && (
          <button
            type="button"
            onClick={onToggleFullscreen}
            className="absolute top-6 right-6 z-50 p-2.5 rounded-full bg-black/80 hover:bg-black text-white transition-colors cursor-pointer backdrop-blur-md border border-white/20 shadow-2xl flex items-center gap-2 px-4"
            title="Exit Fullscreen (Esc)"
          >
            <Minimize className="h-4 w-4 text-white" />
            <span className="text-xs font-bold text-white">Exit Fullscreen (Esc)</span>
          </button>
        )}

        {/* LIVE YOUTUBE EMBED PLAYER */}
        <iframe
          key={`${currentLesson.id}-${currentVideoId}`}
          src={`https://www.youtube-nocookie.com/embed/${currentVideoId}?autoplay=0&enablejsapi=1&rel=0&modestbranding=1`}
          title={`${currentLesson.title} - Educational Video Lesson`}
          className="w-full h-full border-0 absolute inset-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>

      {/* Quick Video Meta & Rate Pill */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-1 py-0.5 select-none">
        <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-500">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Official NSSTA Video Curriculum &bull; MoSPI Training Framework</span>
        </div>
        <Link
          to={`/learner/feedback?type=course_video&courseId=${courseDetail.id}&lessonId=${currentLesson.id}&title=${encodeURIComponent(
            `${courseDetail.title}: Lesson ${currentLesson.number} - ${currentLesson.title}`
          )}&returnUrl=${encodeURIComponent(`/learner/courses/${courseDetail.id}/learn/${currentLesson.id}`)}`}
          className="text-xs font-bold text-amber-600 hover:text-amber-700 hover:underline flex items-center gap-1.5 transition-colors"
        >
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          <span>Rate this video lecture</span>
        </Link>
      </div>
    </div>
  );
};
