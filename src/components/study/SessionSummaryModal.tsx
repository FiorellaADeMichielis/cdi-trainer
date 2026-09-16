import React from 'react';
import { IconAward, IconCheckCircle, IconCloseCircle, IconTrendingUp, IconArrowRight } from '../icons';
import { soundService } from '../../services/soundService';

interface SessionSummaryProps {
  isOpen: boolean;
  durationMinutes: number;
  totalExercises: number;
  correctExercises: number;
  incorrectExercises: number;
  xpEarned: number;
  masteryGain: number;
  targetTopicTitle: string;
  nextStepAdvice: string;
  onClose: () => void;
}

export const SessionSummaryModal: React.FC<SessionSummaryProps> = ({
  isOpen,
  durationMinutes,
  totalExercises,
  correctExercises,
  incorrectExercises,
  xpEarned: _xpEarned,
  masteryGain: _masteryGain,
  targetTopicTitle,
  nextStepAdvice,
  onClose
}) => {
  if (!isOpen) return null;

  const accuracy = totalExercises > 0 ? Math.round((correctExercises / totalExercises) * 100) : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#14161a] border border-zinc-800 rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl text-center space-y-6">
        
        {/* Header Icon */}
        <div className="size-16 rounded-2xl bg-[#1a1c22] border border-amber-500/40 mx-auto flex items-center justify-center text-amber-400 shadow-lg">
          <IconAward className="size-9 text-amber-400" />
        </div>

        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 font-sans">
            Sesión completada
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-zinc-100 font-sans mt-1">
            {targetTopicTitle}
          </h3>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-3 gap-3 text-left">
          <div className="p-3.5 rounded-xl bg-[#1a1c22] border border-zinc-800">
            <span className="text-xs text-zinc-400 font-medium">Tiempo</span>
            <div className="text-lg font-bold text-zinc-100 font-sans">{durationMinutes} min</div>
          </div>
          <div className="p-3.5 rounded-xl bg-[#1a1c22] border border-zinc-800">
            <span className="text-xs text-zinc-400 font-medium">Aciertos</span>
            <div className="text-lg font-bold text-emerald-400 font-sans">{correctExercises} / {totalExercises}</div>
          </div>
          <div className="p-3.5 rounded-xl bg-[#1a1c22] border border-zinc-800">
            <span className="text-xs text-zinc-400 font-medium">Precisión</span>
            <div className="text-lg font-bold text-amber-400 font-sans">{accuracy}%</div>
          </div>
        </div>

        {/* Breakdown of correct/incorrect */}
        <div className="flex items-center justify-center gap-6 text-xs">
          <div className="flex items-center gap-2 text-emerald-400 font-medium">
            <IconCheckCircle className="size-4" />
            <span>{correctExercises} correctos</span>
          </div>
          <div className="flex items-center gap-2 text-rose-400 font-medium">
            <IconCloseCircle className="size-4" />
            <span>{incorrectExercises} para revisar</span>
          </div>
        </div>

        {/* Next Step Advice */}
        {nextStepAdvice && (
          <div className="p-4 sm:p-5 rounded-xl bg-[#1a1c22] border border-zinc-800 text-left space-y-1.5">
            <div className="text-xs font-semibold text-amber-400 flex items-center gap-2">
              <IconTrendingUp className="size-4 text-amber-400" />
              <span>Próximo paso sugerido:</span>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed font-sans">
              {nextStepAdvice}
            </p>
          </div>
        )}

        {/* Action Button */}
        <button
          onClick={() => {
            soundService.playClick();
            onClose();
          }}
          className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
        >
          <span>Volver al inicio</span>
          <IconArrowRight className="size-4" />
        </button>

      </div>
    </div>
  );
};

export default SessionSummaryModal;
