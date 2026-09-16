import React from 'react';
import { Exercise, ExamSimulationResult } from '../../../types/domain';
import { MathView } from '../../common/MathView';
import { 
  IconClock, 
  IconShieldCheck, 
  IconCheck, 
  IconClose, 
  IconArrowRight, 
  IconCalendar 
} from '../../icons';

interface ExamSimulatorPresenterProps {
  examQuestions: Exercise[];
  answers: Record<string, string>;
  currentIndex: number;
  currentQuestion?: Exercise;
  totalQuestions?: number;
  answeredCount?: number;
  timeLeft: number;
  examStarted: boolean;
  examSubmitted: boolean;
  examResult: ExamSimulationResult | null;
  onStartExam: () => void;
  onSelectIndex: (index: number) => void;
  onSelectAnswer: (exerciseId: string, optionId: string) => void;
  onSubmitExam: () => void;
  onFinish: () => void;
  onRestartExam?: () => void;
}

export const ExamSimulatorPresenter: React.FC<ExamSimulatorPresenterProps> = ({
  examQuestions,
  answers,
  currentIndex,
  currentQuestion: passedCurrentQuestion,
  totalQuestions: passedTotalQuestions,
  answeredCount: passedAnsweredCount,
  timeLeft,
  examStarted,
  examSubmitted,
  examResult,
  onStartExam,
  onSelectIndex,
  onSelectAnswer,
  onSubmitExam,
  onFinish,
  onRestartExam
}) => {
  const currentQuestion = passedCurrentQuestion || examQuestions[currentIndex] || examQuestions[0];
  const totalQuestions = passedTotalQuestions ?? examQuestions.length;
  const answeredCount = passedAnsweredCount ?? Object.keys(answers).length;

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // 1. Initial Briefing Screen
  if (!examStarted) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-8 animate-fadeIn">
        <div className="p-6 sm:p-8 lg:p-10 rounded-2xl bg-[#14161a] border border-zinc-800 space-y-8">
          <div className="flex items-center gap-4">
            <div className="size-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-amber-400 shrink-0">
              <IconCalendar className="size-6 text-amber-400" />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 font-sans">
                Simulacro de examen libre · UNNE
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-zinc-100 font-sans mt-1">
                Practicá en condiciones de examen real
              </h2>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-[#1a1c22] border border-zinc-800 space-y-4 text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
            <h4 className="font-bold text-zinc-100 text-sm">
              Puntos a tener en cuenta antes de empezar:
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-zinc-300">
              <li className="flex items-start gap-2.5">
                <span className="text-amber-400 font-bold">•</span>
                <span><strong>Tiempo límite:</strong> 90 minutos para resolver los 10 ejercicios.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-amber-400 font-bold">•</span>
                <span><strong>Estructura:</strong> 10 problemas distribuidos entre las unidades del programa.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-amber-400 font-bold">•</span>
                <span><strong>Sin ayudas:</strong> No hay pistas disponibles durante el simulacro.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-amber-400 font-bold">•</span>
                <span><strong>Criterio de aprobación:</strong> 6 de 10 ejercicios resueltos correctamente (60%).</span>
              </li>
            </ul>
          </div>

          <button
            type="button"
            onClick={onStartExam}
            className="w-full py-4 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-sm tracking-wide transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer min-h-[50px]"
          >
            <IconShieldCheck className="size-5" />
            <span>Comenzar simulacro (90 minutos)</span>
          </button>
        </div>
      </div>
    );
  }

  // 2. Exam Result Screen
  if (examSubmitted && examResult) {
    const finalGrade = (examResult.totalScore / 10).toFixed(1);
    const passed = examResult.totalScore >= 60;

    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-8 animate-fadeIn">
        <div className="p-6 sm:p-8 lg:p-10 rounded-2xl bg-[#14161a] border border-zinc-800 space-y-8">
          
          <div className="text-center space-y-1.5 pb-6 border-b border-zinc-800">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 font-sans">
              Simulacro completado
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-100 font-sans">
              Resultado de tu examen
            </h2>
            <p className="text-xs text-zinc-400">
              Evaluación de 10 ejercicios sobre el programa analítico
            </p>
          </div>

          {/* Grade Certificate Center */}
          <div className="p-6 sm:p-8 rounded-xl bg-[#1a1c22] border border-zinc-800 text-center space-y-4">
            <span className="text-xs text-zinc-400 font-semibold uppercase block">
              Calificación obtenida
            </span>

            <div className="flex items-baseline justify-center gap-2">
              <span className={`text-5xl sm:text-6xl font-bold tracking-tight ${passed ? 'text-emerald-400' : 'text-amber-400'}`}>
                {finalGrade}
              </span>
              <span className="text-xl font-medium text-zinc-500">/ 10.0</span>
            </div>

            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold ${
              passed ? 'bg-emerald-950/40 border-emerald-500/80 text-emerald-300' : 'bg-rose-950/40 border-rose-500/80 text-rose-300'
            }`}>
              {passed ? <IconCheck className="size-4 shrink-0" /> : <IconClose className="size-4 shrink-0" />}
              <span>{passed ? 'Aprobado' : 'No alcanzaste el 6.0 mínimo'}</span>
            </div>

            <p className="text-xs sm:text-sm text-zinc-300 max-w-md mx-auto pt-2 font-sans leading-relaxed">
              {passed 
                ? '¡Muy bien! Resolviste la mayoría de los ejercicios correctamente y demostraste buen dominio general.'
                : 'Te recomendamos reforzar los temas indicados abajo antes de presentarte a la mesa de examen.'}
            </p>
          </div>

          {/* Temas a reforzar */}
          {examResult.weaknesses && examResult.weaknesses.length > 0 && (
            <div className="p-5 rounded-xl bg-[#1a1c22] border border-zinc-800 text-xs space-y-3">
              <span className="font-bold text-amber-400 font-sans block">
                Temas para reforzar según tus errores:
              </span>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-zinc-300 text-xs">
                {examResult.weaknesses.map((w: string, idx: number) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="text-rose-400 font-bold">•</span>
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            {onRestartExam && (
              <button
                type="button"
                onClick={onRestartExam}
                className="w-full sm:w-1/2 py-3.5 px-5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs sm:text-sm tracking-wide transition-colors cursor-pointer min-h-[48px] flex items-center justify-center gap-2"
              >
                <span>Rendir otro simulacro</span>
                <IconArrowRight className="size-4" />
              </button>
            )}
            <button
              type="button"
              onClick={onFinish}
              className={`w-full ${onRestartExam ? 'sm:w-1/2' : ''} py-3.5 px-5 rounded-xl bg-[#1a1c22] hover:bg-zinc-800 border border-zinc-800 text-zinc-200 font-bold text-xs sm:text-sm tracking-wide transition-colors cursor-pointer min-h-[48px]`}
            >
              Volver al inicio
            </button>
          </div>

        </div>
      </div>
    );
  }

  // 3. Active Examination Station
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8 animate-fadeIn">
      
      {/* Top Exam Station Ribbon */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-[#14161a] border border-zinc-800 shadow-sm">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 font-sans">
            Simulacro en curso
          </span>
          <h2 className="text-base sm:text-lg font-bold text-zinc-100 font-sans mt-0.5">
            Pregunta {currentIndex + 1} de {totalQuestions} · {currentQuestion.unitId}
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-semibold text-sm ${
            timeLeft <= 300 ? 'bg-rose-950/60 border-rose-800 text-rose-300 animate-pulse' : 'bg-[#1a1c22] border-zinc-800 text-zinc-200'
          }`}>
            <IconClock className="size-4 text-amber-400" />
            <span>{formatTimer(timeLeft)}</span>
          </div>

          <button
            type="button"
            onClick={onSubmitExam}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors cursor-pointer shadow-sm"
          >
            Entregar examen ({answeredCount}/{totalQuestions})
          </button>
        </div>
      </div>

      {/* Questions Tabs Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {examQuestions.map((q, idx) => {
          const isAnswered = !!answers[q.id];
          const isCurrent = currentIndex === idx;

          return (
            <button
              key={q.id}
              type="button"
              onClick={() => onSelectIndex(idx)}
              className={`min-w-[44px] h-11 rounded-xl text-xs font-semibold flex flex-col items-center justify-center transition-all border cursor-pointer ${
                isCurrent
                  ? 'bg-zinc-800 border-amber-500/80 text-zinc-100 shadow-sm'
                  : isAnswered
                    ? 'bg-[#1a1c22] border-emerald-800/60 text-emerald-400'
                    : 'bg-[#14161a] border-zinc-800 text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <span>{idx + 1}</span>
            </button>
          );
        })}
      </div>

      {/* Question Card */}
      <div className="p-6 sm:p-8 lg:p-10 rounded-2xl bg-[#14161a] border border-zinc-800 shadow-xl space-y-8">
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
          <span className="text-xs text-zinc-400">
            {currentQuestion.subtopicTitle}
          </span>
          <span className="text-xs text-amber-400 font-semibold">
            {currentQuestion.unitId}
          </span>
        </div>

        <div className="space-y-4">
          <p className="text-base text-zinc-100 font-medium leading-relaxed font-sans">
            {currentQuestion.instructionText}
          </p>
          <div className="p-5 rounded-xl bg-[#1a1c22] border border-zinc-800 overflow-x-auto text-zinc-100">
            <MathView math={currentQuestion.promptLatex} block />
          </div>
        </div>

        {/* Options */}
        <div className="space-y-4">
          <span className="text-xs font-semibold text-zinc-400 block font-sans">
            Elegí tu respuesta:
          </span>

          <div className="grid grid-cols-1 gap-3.5">
            {currentQuestion.options.map((opt) => {
              const isSelected = answers[currentQuestion.id] === opt.id;

              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => onSelectAnswer(currentQuestion.id, opt.id)}
                  className={`w-full p-4 sm:p-5 rounded-xl border text-left transition-all flex items-center justify-between gap-4 cursor-pointer min-h-[54px] ${
                    isSelected
                      ? 'bg-zinc-800 border-amber-500/80 text-zinc-100 shadow-sm'
                      : 'bg-[#1a1c22] hover:bg-zinc-800 border-zinc-800 text-zinc-200'
                  }`}
                >
                  <div className="flex items-center gap-3.5 overflow-x-auto w-full">
                    <span className="size-7 rounded-full bg-[#14161a] border border-zinc-700 text-amber-400 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                      {opt.id.toUpperCase()}
                    </span>
                    <div className="text-xs sm:text-sm font-medium">
                      <MathView math={opt.textLatex} />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center justify-between pt-6 border-t border-zinc-800">
          <button
            type="button"
            disabled={currentIndex === 0}
            onClick={() => onSelectIndex(currentIndex - 1)}
            className="px-5 py-2.5 rounded-xl bg-[#1a1c22] hover:bg-zinc-800 disabled:opacity-40 text-zinc-300 text-xs font-semibold border border-zinc-800 transition-colors cursor-pointer"
          >
            Anterior
          </button>

          {currentIndex + 1 < totalQuestions ? (
            <button
              type="button"
              onClick={() => onSelectIndex(currentIndex + 1)}
              className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-semibold flex items-center gap-2 transition-colors shadow-sm cursor-pointer"
            >
              <span>Siguiente ejercicio</span>
              <IconArrowRight className="size-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={onSubmitExam}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors shadow-sm cursor-pointer"
            >
              Entregar examen
            </button>
          )}
        </div>

      </div>

    </div>
  );
};
