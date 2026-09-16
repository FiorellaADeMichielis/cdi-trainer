import React from 'react';
import { Exercise } from '../../../types/domain';
import { MathView } from '../../common/MathView';
import { 
  IconCheck, 
  IconClose, 
  IconLightbulb, 
  IconClock, 
  IconBook, 
  IconArrowRight,
  IconHelp
} from '../../icons';

interface StudySessionPresenterProps {
  currentExercise: Exercise;
  currentIndex: number;
  totalExercises: number;
  timeSpentSeconds: number;
  durationMinutes: number;
  targetTopicTitle: string;
  selectedOptionId: string | null;
  isAnswered: boolean;
  revealedHintsCount: number;
  onSelectOption: (optionId: string) => void;
  onSubmitAnswer: () => void;
  onRevealNextHint: () => void;
  onDontRemember: () => void;
  onNextExercise: () => void;
  onOpenProfessorModal: () => void;
  onOpenSummaryModal: () => void;
}

export const StudySessionPresenter: React.FC<StudySessionPresenterProps> = ({
  currentExercise,
  currentIndex,
  totalExercises,
  timeSpentSeconds,
  durationMinutes,
  targetTopicTitle,
  selectedOptionId,
  isAnswered,
  revealedHintsCount,
  onSelectOption,
  onSubmitAnswer,
  onRevealNextHint,
  onDontRemember,
  onNextExercise,
  onOpenProfessorModal,
  onOpenSummaryModal
}) => {
  const selectedOption = currentExercise.options.find(o => o.id === selectedOptionId);
  const isCorrect = selectedOption?.isCorrect ?? false;

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8 sm:space-y-10 animate-fadeIn">
      
      {/* Session Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-[#14161a] border border-zinc-800 shadow-sm">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 font-sans">
            Práctica de {currentExercise.unitId} · {durationMinutes} min
          </span>
          <h2 className="text-base sm:text-lg font-bold text-zinc-100 font-sans mt-0.5">
            {targetTopicTitle} — {currentExercise.subtopicTitle}
          </h2>
        </div>

        <div className="flex items-center gap-2.5 sm:gap-3 text-xs">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1a1c22] border border-zinc-800 text-zinc-300">
            <IconClock className="size-3.5 text-amber-400" />
            <span>{formatTimer(timeSpentSeconds)}</span>
          </div>

          <div className="px-3 py-1.5 rounded-lg bg-[#1a1c22] border border-zinc-800 text-zinc-200 font-semibold">
            Ejercicio {currentIndex + 1} de {totalExercises}
          </div>

          <button
            type="button"
            onClick={onOpenSummaryModal}
            className="px-3.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white text-xs font-semibold transition-colors border border-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 cursor-pointer"
          >
            Pausar / Salir
          </button>
        </div>
      </div>

      {/* Main Mathematical Exercise Card */}
      <div className="p-6 sm:p-8 lg:p-10 rounded-2xl bg-[#14161a] border border-zinc-800 shadow-xl space-y-8">
        
        {/* Header con contexto de cátedra */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-amber-400 bg-amber-950/40 border border-amber-800/40 px-2.5 py-0.5 rounded-md">
              {currentExercise.difficulty <= 2 ? 'Nivel inicial' : currentExercise.difficulty <= 3 ? 'Nivel intermedio' : 'Nivel de examen'}
            </span>
            <span className="text-xs text-zinc-400">
              {currentExercise.source ? `${currentExercise.source.document} (TP ${currentExercise.source.practicalWorkNumber || 1})` : 'Guía de Trabajos Prácticos FaCENA'}
            </span>
          </div>
          <span className="text-xs text-zinc-500 font-medium">
            Problema {currentIndex + 1} de {totalExercises}
          </span>
        </div>

        {/* Problem Statement with KaTeX */}
        <div className="space-y-4">
          <p className="text-base text-zinc-100 font-medium leading-relaxed font-sans">
            {currentExercise.instructionText}
          </p>
          <div className="p-5 rounded-xl bg-[#1a1c22] border border-zinc-800 overflow-x-auto text-zinc-100">
            <MathView math={currentExercise.promptLatex} block />
          </div>
        </div>

        {/* Multiple Choice Options */}
        <div className="space-y-4">
          <span className="text-xs font-semibold text-zinc-400 block font-sans">
            Elegí la opción que consideres correcta:
          </span>

          <div className="grid grid-cols-1 gap-3.5">
            {currentExercise.options.map((opt) => {
              const isSelected = selectedOptionId === opt.id;
              let btnStyle = 'bg-[#1a1c22] hover:bg-zinc-800/80 border-zinc-800 text-zinc-200';

              if (isAnswered) {
                if (opt.isCorrect) {
                  btnStyle = 'bg-emerald-950/40 border-emerald-500/80 text-emerald-200';
                } else if (isSelected && !opt.isCorrect) {
                  btnStyle = 'bg-rose-950/40 border-rose-500/80 text-rose-200';
                } else {
                  btnStyle = 'bg-[#14161a] border-zinc-800/40 opacity-40 text-zinc-500';
                }
              } else if (isSelected) {
                btnStyle = 'bg-zinc-800 border-amber-500/80 text-zinc-100 shadow-sm';
              }

              return (
                <button
                  key={opt.id}
                  type="button"
                  disabled={isAnswered}
                  onClick={() => onSelectOption(opt.id)}
                  className={`w-full p-4 sm:p-5 rounded-xl border text-left transition-all flex items-center justify-between gap-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 min-h-[56px] ${btnStyle}`}
                >
                  <div className="flex items-center gap-3.5 overflow-x-auto w-full">
                    <span className="size-7 rounded-full bg-[#14161a] border border-zinc-700 text-amber-400 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                      {opt.id.toUpperCase()}
                    </span>
                    <div className="text-xs sm:text-sm font-medium">
                      <MathView math={opt.textLatex} />
                    </div>
                  </div>

                  {isAnswered && opt.isCorrect && (
                    <IconCheck className="size-5 text-emerald-400 shrink-0" />
                  )}
                  {isAnswered && isSelected && !opt.isCorrect && (
                    <IconClose className="size-5 text-rose-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Hints Step-by-Step Accordion */}
        {currentExercise.hints && currentExercise.hints.length > 0 && (
          <div className="p-5 rounded-xl bg-[#1a1c22] border border-zinc-800 space-y-3.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-amber-400 flex items-center gap-2">
                <IconLightbulb className="size-4 text-amber-400" />
                <span>Pistas de ayuda ({revealedHintsCount} de {currentExercise.hints.length})</span>
              </span>

              {!isAnswered && revealedHintsCount < currentExercise.hints.length && (
                <button
                  type="button"
                  onClick={onRevealNextHint}
                  className="text-xs font-medium text-amber-300 hover:text-amber-200 bg-amber-950/40 border border-amber-800/60 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                >
                  Ver pista {revealedHintsCount + 1}
                </button>
              )}
            </div>

            {/* Render revealed hints */}
            {currentExercise.hints.slice(0, revealedHintsCount).map((hint) => (
              <div 
                key={hint.step} 
                className="p-4 rounded-xl bg-[#14161a] border border-zinc-800 text-xs text-zinc-300 animate-fadeIn space-y-1.5"
              >
                <div className="font-semibold text-amber-400">
                  Pista {hint.step}: {hint.title}
                </div>
                <div className="overflow-x-auto text-zinc-200">
                  <MathView math={hint.contentLatex} block />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Immediate Result Feedback Banner */}
        {isAnswered && (
          <div className={`p-5 rounded-xl border text-xs sm:text-sm animate-fadeIn ${
            isCorrect ? 'bg-emerald-950/30 border-emerald-500/70 text-emerald-200' : 'bg-rose-950/30 border-rose-500/70 text-rose-200'
          }`}>
            <div className="flex items-center gap-2.5 font-bold">
              {isCorrect ? <IconCheck className="size-5 text-emerald-400" /> : <IconClose className="size-5 text-rose-400" />}
              <span>{isCorrect ? '¡Respuesta correcta!' : 'Respuesta incorrecta'}</span>
            </div>
            <p className="mt-2 text-xs text-zinc-300 leading-relaxed font-sans">
              {selectedOption?.specificFeedback}
            </p>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-zinc-800">
          {!isAnswered ? (
            <>
              <button
                type="button"
                onClick={onDontRemember}
                className="px-4 py-3 rounded-xl bg-[#1a1c22] hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 text-xs font-semibold border border-zinc-800 flex items-center gap-2 transition-colors min-h-[46px] cursor-pointer"
              >
                <IconHelp className="size-4 text-amber-400" />
                <span>No sé cómo resolverlo</span>
              </button>

              <button
                type="button"
                disabled={!selectedOptionId}
                onClick={onSubmitAnswer}
                className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:hover:bg-amber-500 text-zinc-950 font-bold text-xs sm:text-sm tracking-wide transition-all shadow-sm flex items-center gap-2 min-h-[46px] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
              >
                <span>Comprobar respuesta</span>
                <IconCheck className="size-4" />
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={onOpenProfessorModal}
                className="px-4 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold border border-zinc-700 flex items-center gap-2 transition-colors min-h-[46px] cursor-pointer"
              >
                <IconBook className="size-4 text-amber-400" />
                <span>Ver explicación paso a paso</span>
              </button>

              <button
                type="button"
                onClick={onNextExercise}
                className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs sm:text-sm flex items-center gap-2 transition-colors min-h-[46px] shadow-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
              >
                <span>{currentIndex + 1 < totalExercises ? 'Siguiente ejercicio' : 'Terminar sesión'}</span>
                <IconArrowRight className="size-4" />
              </button>
            </>
          )}
        </div>

      </div>

    </div>
  );
};
