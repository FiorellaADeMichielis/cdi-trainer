import React, { useState } from 'react';
import { IconArrowRight, IconShieldCheck } from '../icons';
import { UnitId, UnitMastery } from '../../types/domain';
import { EXERCISES_DATA } from '../../data/exercisesData';
import { MathView } from '../common/MathView';
import { soundService } from '../../services/soundService';

interface DiagnosticModalProps {
  isOpen: boolean;
  onCompleteDiagnostic: (initialMasteries: Record<UnitId, UnitMastery>) => void;
}

export const DiagnosticModal: React.FC<DiagnosticModalProps> = ({
  isOpen,
  onCompleteDiagnostic
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [selectedOptId, setSelectedOptId] = useState<string | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  if (!isOpen) return null;

  // Selected 5 representative questions from core units
  const diagnosticExercises = EXERCISES_DATA.slice(0, 5);
  const currentEx = diagnosticExercises[currentIndex];

  const handleSelectOption = (optId: string) => {
    soundService.playClick();
    setSelectedOptId(optId);
  };

  const handleNext = () => {
    if (!selectedOptId || !currentEx) return;

    const chosen = currentEx.options.find(o => o.id === selectedOptId);
    const correct = !!chosen?.isCorrect;

    if (correct) {
      soundService.playCorrect();
    } else {
      soundService.playIncorrect();
    }

    const updatedAnswers = { ...answers, [currentEx.unitId]: correct };
    setAnswers(updatedAnswers);
    setSelectedOptId(null);

    if (currentIndex + 1 < diagnosticExercises.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsFinished(true);
      soundService.playLevelUp();
    }
  };

  const handleFinish = () => {
    soundService.playClick();

    // Compute baseline masteries from diagnostic answers
    const computedMasteries: Record<UnitId, UnitMastery> = {
      U1: { unitId: 'U1', unitName: 'Funciones y Límites', percentage: answers['U1'] ? 80 : 30, conceptualMastery: answers['U1'] ? 80 : 30, proceduralMastery: answers['U1'] ? 75 : 25, formulaMastery: answers['U1'] ? 85 : 35, totalAttempts: 1, correctAttempts: answers['U1'] ? 1 : 0, priorityLevel: answers['U1'] ? 'DOMINADO' : 'CRITICA' },
      U2: { unitId: 'U2', unitName: 'Derivadas de una Variable', percentage: answers['U2'] ? 75 : 35, conceptualMastery: answers['U2'] ? 70 : 30, proceduralMastery: answers['U2'] ? 80 : 40, formulaMastery: answers['U2'] ? 75 : 35, totalAttempts: 1, correctAttempts: answers['U2'] ? 1 : 0, priorityLevel: answers['U2'] ? 'MEDIA' : 'CRITICA' },
      U3: { unitId: 'U3', unitName: 'Aplicaciones de Derivada', percentage: answers['U3'] ? 70 : 25, conceptualMastery: answers['U3'] ? 65 : 20, proceduralMastery: answers['U3'] ? 75 : 30, formulaMastery: answers['U3'] ? 70 : 25, totalAttempts: 1, correctAttempts: answers['U3'] ? 1 : 0, priorityLevel: answers['U3'] ? 'MEDIA' : 'CRITICA' },
      U4: { unitId: 'U4', unitName: 'Integrales Indefinidas', percentage: answers['U4'] ? 65 : 20, conceptualMastery: answers['U4'] ? 60 : 15, proceduralMastery: answers['U4'] ? 70 : 25, formulaMastery: answers['U4'] ? 65 : 20, totalAttempts: 1, correctAttempts: answers['U4'] ? 1 : 0, priorityLevel: answers['U4'] ? 'MEDIA' : 'CRITICA' },
      U5: { unitId: 'U5', unitName: 'Integrales Definidas', percentage: answers['U5'] ? 70 : 25, conceptualMastery: answers['U5'] ? 70 : 25, proceduralMastery: answers['U5'] ? 70 : 25, formulaMastery: answers['U5'] ? 70 : 25, totalAttempts: 1, correctAttempts: answers['U5'] ? 1 : 0, priorityLevel: answers['U5'] ? 'MEDIA' : 'CRITICA' },
      U6: { unitId: 'U6', unitName: 'Funciones de Varias Variables', percentage: 20, conceptualMastery: 20, proceduralMastery: 20, formulaMastery: 20, totalAttempts: 0, correctAttempts: 0, priorityLevel: 'CRITICA' },
      U7: { unitId: 'U7', unitName: 'Derivadas Parciales', percentage: 25, conceptualMastery: 25, proceduralMastery: 25, formulaMastery: 25, totalAttempts: 0, correctAttempts: 0, priorityLevel: 'CRITICA' },
      U8: { unitId: 'U8', unitName: 'Integrales Múltiples', percentage: 15, conceptualMastery: 15, proceduralMastery: 15, formulaMastery: 15, totalAttempts: 0, correctAttempts: 0, priorityLevel: 'CRITICA' },
      U9: { unitId: 'U9', unitName: 'Ecuaciones Diferenciales', percentage: 20, conceptualMastery: 20, proceduralMastery: 20, formulaMastery: 20, totalAttempts: 0, correctAttempts: 0, priorityLevel: 'CRITICA' },
      U10: { unitId: 'U10', unitName: 'Sucesiones y Series', percentage: 15, conceptualMastery: 15, proceduralMastery: 15, formulaMastery: 15, totalAttempts: 0, correctAttempts: 0, priorityLevel: 'CRITICA' }
    };

    onCompleteDiagnostic(computedMasteries);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#14161a] border border-zinc-800 rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl space-y-6">
        
        {!isFinished ? (
          <>
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-amber-400 font-sans">
                  Diagnóstico inicial · Cálculo (UNNE)
                </span>
              </div>
              <span className="text-xs text-zinc-400 font-medium">
                Pregunta {currentIndex + 1} de {diagnosticExercises.length}
              </span>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-medium text-zinc-400 bg-[#1a1c22] px-2.5 py-1 rounded-full border border-zinc-800">
                {currentEx.unitId} · {currentEx.subtopicTitle}
              </span>
              <p className="text-sm font-semibold text-zinc-200 mt-2 font-sans">
                {currentEx.instructionText}
              </p>
              <div className="p-4 bg-[#1a1c22] rounded-xl border border-zinc-800 text-center overflow-x-auto text-zinc-100">
                <MathView math={currentEx.promptLatex} block className="text-lg font-bold" />
              </div>
            </div>

            <div className="space-y-3">
              {currentEx.options.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => handleSelectOption(opt.id)}
                  className={`w-full p-4 rounded-xl border text-left text-xs font-medium transition-all cursor-pointer ${
                    selectedOptId === opt.id
                      ? 'bg-zinc-800 border-amber-500/80 text-zinc-100 shadow-sm'
                      : 'bg-[#1a1c22] border-zinc-800 hover:bg-zinc-800 text-zinc-300'
                  }`}
                >
                  <MathView math={opt.textLatex} />
                </button>
              ))}
            </div>

            <div className="pt-3 flex justify-end">
              <button
                disabled={!selectedOptId}
                onClick={handleNext}
                className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-30 text-zinc-950 font-bold text-xs flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
              >
                <span>Siguiente pregunta</span>
                <IconArrowRight className="size-3.5" />
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-6 space-y-5 animate-fadeIn">
            <div className="w-14 h-14 rounded-2xl bg-emerald-950/40 border border-emerald-800/60 text-emerald-400 mx-auto flex items-center justify-center">
              <IconShieldCheck className="size-8" />
            </div>

            <div>
              <span className="text-xs font-semibold text-emerald-400 font-sans">
                Diagnóstico completado
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-zinc-100 mt-1 font-sans">
                Listo para empezar a estudiar
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto mt-2 leading-relaxed font-sans">
                Guardamos tu punto de partida para recomendarte las unidades y ejercicios más convenientes para practicar.
              </p>
            </div>

            <button
              onClick={handleFinish}
              className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs sm:text-sm shadow-sm transition-colors cursor-pointer"
            >
              Ir al inicio
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default DiagnosticModal;
