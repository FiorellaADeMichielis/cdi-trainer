import React, { useState } from 'react';
import { 
  IconArrowRight, 
  IconArrowLeft, 
  IconShieldCheck, 
  IconGraduationCap, 
  IconBook, 
  IconCheckCircle, 
  IconClose 
} from '../icons';
import { Exercise, UnitId, UnitMastery } from '../../types/domain';
import { EXERCISES_DATA } from '../../data/exercisesData';
import { MathView } from '../common/MathView';
import { soundService } from '../../services/soundService';
import { generateDiagnosticSession } from '../../services/randomEngine';

interface DiagnosticModalProps {
  isOpen: boolean;
  onCompleteDiagnostic: (initialMasteries: Record<UnitId, UnitMastery>) => void;
  onClose?: () => void;
}

type ModalStep = 'welcome' | 'questions' | 'finished';

export const DiagnosticModal: React.FC<DiagnosticModalProps> = ({
  isOpen,
  onCompleteDiagnostic,
  onClose
}) => {
  const [step, setStep] = useState<ModalStep>('welcome');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [selectedOptId, setSelectedOptId] = useState<string | null>(null);
  const [diagnosticExercises, setDiagnosticExercises] = useState<Exercise[]>(() => generateDiagnosticSession(EXERCISES_DATA));

  // Re-generate fresh balanced calibration session on modal opening
  React.useEffect(() => {
    if (isOpen) {
      setDiagnosticExercises(generateDiagnosticSession(EXERCISES_DATA));
      setStep('welcome');
      setCurrentIndex(0);
      setAnswers({});
      setSelectedOptId(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const currentEx = diagnosticExercises[currentIndex];

  const computeMasteries = (recordedAnswers: Record<string, boolean>): Record<UnitId, UnitMastery> => ({
    U1: {
      unitId: 'U1',
      unitName: 'Funciones y Límites',
      percentage: recordedAnswers['U1'] ? 80 : 30,
      conceptualMastery: recordedAnswers['U1'] ? 80 : 30,
      proceduralMastery: recordedAnswers['U1'] ? 75 : 25,
      formulaMastery: recordedAnswers['U1'] ? 85 : 35,
      totalAttempts: recordedAnswers['U1'] !== undefined ? 1 : 0,
      correctAttempts: recordedAnswers['U1'] ? 1 : 0,
      priorityLevel: recordedAnswers['U1'] ? 'DOMINADO' : 'CRITICA'
    },
    U2: {
      unitId: 'U2',
      unitName: 'Derivadas de una Variable',
      percentage: recordedAnswers['U2'] ? 75 : 35,
      conceptualMastery: recordedAnswers['U2'] ? 70 : 30,
      proceduralMastery: recordedAnswers['U2'] ? 80 : 40,
      formulaMastery: recordedAnswers['U2'] ? 75 : 35,
      totalAttempts: recordedAnswers['U2'] !== undefined ? 1 : 0,
      correctAttempts: recordedAnswers['U2'] ? 1 : 0,
      priorityLevel: recordedAnswers['U2'] ? 'MEDIA' : 'CRITICA'
    },
    U3: {
      unitId: 'U3',
      unitName: 'Aplicaciones de Derivada',
      percentage: recordedAnswers['U3'] ? 70 : 25,
      conceptualMastery: recordedAnswers['U3'] ? 65 : 20,
      proceduralMastery: recordedAnswers['U3'] ? 75 : 30,
      formulaMastery: recordedAnswers['U3'] ? 70 : 25,
      totalAttempts: recordedAnswers['U3'] !== undefined ? 1 : 0,
      correctAttempts: recordedAnswers['U3'] ? 1 : 0,
      priorityLevel: recordedAnswers['U3'] ? 'MEDIA' : 'CRITICA'
    },
    U4: {
      unitId: 'U4',
      unitName: 'Integrales Indefinidas',
      percentage: recordedAnswers['U4'] ? 65 : 20,
      conceptualMastery: recordedAnswers['U4'] ? 60 : 15,
      proceduralMastery: recordedAnswers['U4'] ? 70 : 25,
      formulaMastery: recordedAnswers['U4'] ? 65 : 20,
      totalAttempts: recordedAnswers['U4'] !== undefined ? 1 : 0,
      correctAttempts: recordedAnswers['U4'] ? 1 : 0,
      priorityLevel: recordedAnswers['U4'] ? 'MEDIA' : 'CRITICA'
    },
    U5: {
      unitId: 'U5',
      unitName: 'Integrales Definidas',
      percentage: recordedAnswers['U5'] ? 70 : 25,
      conceptualMastery: recordedAnswers['U5'] ? 70 : 25,
      proceduralMastery: recordedAnswers['U5'] ? 70 : 25,
      formulaMastery: recordedAnswers['U5'] ? 70 : 25,
      totalAttempts: recordedAnswers['U5'] !== undefined ? 1 : 0,
      correctAttempts: recordedAnswers['U5'] ? 1 : 0,
      priorityLevel: recordedAnswers['U5'] ? 'MEDIA' : 'CRITICA'
    },
    U6: { unitId: 'U6', unitName: 'Funciones de Varias Variables', percentage: 20, conceptualMastery: 20, proceduralMastery: 20, formulaMastery: 20, totalAttempts: 0, correctAttempts: 0, priorityLevel: 'CRITICA' },
    U7: { unitId: 'U7', unitName: 'Derivadas Parciales', percentage: 25, conceptualMastery: 25, proceduralMastery: 25, formulaMastery: 25, totalAttempts: 0, correctAttempts: 0, priorityLevel: 'CRITICA' },
    U8: { unitId: 'U8', unitName: 'Integrales Múltiples', percentage: 15, conceptualMastery: 15, proceduralMastery: 15, formulaMastery: 15, totalAttempts: 0, correctAttempts: 0, priorityLevel: 'CRITICA' },
    U9: { unitId: 'U9', unitName: 'Ecuaciones Diferenciales', percentage: 20, conceptualMastery: 20, proceduralMastery: 20, formulaMastery: 20, totalAttempts: 0, correctAttempts: 0, priorityLevel: 'CRITICA' },
    U10: { unitId: 'U10', unitName: 'Sucesiones y Series', percentage: 15, conceptualMastery: 15, proceduralMastery: 15, formulaMastery: 15, totalAttempts: 0, correctAttempts: 0, priorityLevel: 'CRITICA' }
  });

  const handleSelectOption = (optId: string) => {
    soundService.playClick();
    setSelectedOptId(optId);
  };

  const handleNextQuestion = () => {
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
      setStep('finished');
      soundService.playLevelUp();
    }
  };

  const handleFinishCalibration = () => {
    soundService.playClick();
    const computed = computeMasteries(answers);
    onCompleteDiagnostic(computed);
    if (onClose) onClose();
  };

  const handleSkipToBaseline = () => {
    soundService.playClick();
    const computed = computeMasteries({});
    onCompleteDiagnostic(computed);
    if (onClose) onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#14161a] border border-zinc-800 rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">

        {/* ========================================================================= */}
        {/* PASO 1: MODAL DE BIENVENIDA Y EXPLICACIÓN DE POR QUÉ EXISTE LA APP     */}
        {/* ========================================================================= */}
        {step === 'welcome' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Header con contexto institucional */}
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="size-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-amber-400 shrink-0">
                  <IconGraduationCap className="size-4" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-amber-400 font-sans block leading-none">
                    FaCENA - UNNE
                  </span>
                  <span className="text-[11px] text-zinc-500 font-sans mt-0.5 block">
                    Licenciatura en Sistemas de Información
                  </span>
                </div>
              </div>
              {onClose && (
                <button
                  type="button"
                  onClick={onClose}
                  className="text-zinc-500 hover:text-zinc-200 p-1 rounded-lg hover:bg-zinc-800/60 transition-colors"
                  aria-label="Cerrar ventana"
                >
                  <IconClose className="size-5" />
                </button>
              )}
            </div>

            {/* Título principal */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-zinc-100 font-sans tracking-tight">
                Bienvenido al Entrenador de Cálculo
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1 font-sans">
                Preparación adaptativa para rendir el Examen Libre de Cálculo Diferencial e Integral.
              </p>
            </div>

            {/* ¿Por qué existe esta app? */}
            <div className="p-4 rounded-xl bg-[#1a1c22] border border-zinc-800 text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans space-y-2">
              <div className="flex items-center gap-2 font-semibold text-zinc-200">
                <IconBook className="size-4 text-amber-400 shrink-0" />
                <span>¿Por qué existe esta plataforma?</span>
              </div>
              <p>
                Rendir un <strong className="text-zinc-100 font-semibold">examen libre</strong> en la universidad es exigente: tenés que dominar las 10 unidades del programa sin la guía semanal de una cursada, y el tribunal evalúa tanto el rigor conceptual como la resolución práctica.
              </p>
              <p className="text-zinc-400">
                Esta app no es un visor estático de PDFs. Funciona como un <strong className="text-zinc-200 font-semibold">entrenador de estudio</strong>: detecta en qué temas tropezás, organiza tu tiempo y te acompaña con problemas reales extraídos de las Guías de Trabajos Prácticos de cátedra (TP 1 al TP 9).
              </p>
            </div>

            {/* Pasos a seguir */}
            <div className="space-y-3">
              <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider font-mono">
                Pasos a seguir para comenzar
              </h3>
              
              <div className="space-y-2.5">
                {/* Paso 1: Calibración */}
                <div className="flex items-start gap-3 p-3 rounded-xl bg-[#14161a] border border-zinc-800">
                  <div className="size-6 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center text-xs font-bold font-mono shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-zinc-200 font-sans">
                      Calibración inicial rápida (5 preguntas)
                    </h4>
                    <p className="text-[11px] sm:text-xs text-zinc-400 mt-0.5 leading-relaxed font-sans">
                      Un cuestionario breve de 3 minutos para registrar tu punto de partida. No lleva nota ni penalizaciones: sirve para que el sistema reconozca qué temas ya sabés y cuáles conviene repasar.
                    </p>
                  </div>
                </div>

                {/* Paso 2: Recomendaciones */}
                <div className="flex items-start gap-3 p-3 rounded-xl bg-[#14161a] border border-zinc-800">
                  <div className="size-6 rounded-full bg-zinc-800 text-zinc-400 flex items-center justify-center text-xs font-bold font-mono shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-zinc-200 font-sans">
                      Detección de prioridades y debilidades
                    </h4>
                    <p className="text-[11px] sm:text-xs text-zinc-400 mt-0.5 leading-relaxed font-sans">
                      El panel de inicio te señalará los temas críticos donde estás flojo para que enfoques tu energía donde más impacto tenga.
                    </p>
                  </div>
                </div>

                {/* Paso 3: Práctica y Simulacros */}
                <div className="flex items-start gap-3 p-3 rounded-xl bg-[#14161a] border border-zinc-800">
                  <div className="size-6 rounded-full bg-zinc-800 text-zinc-400 flex items-center justify-center text-xs font-bold font-mono shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-zinc-200 font-sans">
                      Práctica guiada y simulacros de examen
                    </h4>
                    <p className="text-[11px] sm:text-xs text-zinc-400 mt-0.5 leading-relaxed font-sans">
                      Entrená con ejercicios con pistas progresivas, repasad las fórmulas clave de la materia y evaluá tu preparación con simulacros completos cronometrados.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Acciones principales */}
            <div className="pt-3 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleSkipToBaseline}
                className="text-xs text-zinc-400 hover:text-zinc-200 font-medium transition-colors order-2 sm:order-1 py-1"
              >
                Omitir calibración e ir directo al panel
              </button>
              
              <button
                type="button"
                onClick={() => {
                  soundService.playClick();
                  setStep('questions');
                }}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-colors order-1 sm:order-2 cursor-pointer"
              >
                <span>Comenzar calibración (5 preguntas)</span>
                <IconArrowRight className="size-4" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* PASO 2: CUESTIONARIO DE CALIBRACIÓN INICIAL (5 PREGUNTAS CLAVE)          */}
        {/* ========================================================================= */}
        {step === 'questions' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Header de la calibración */}
            <div className="border-b border-zinc-800 pb-4">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep('welcome')}
                  className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-200 font-mono transition-colors"
                >
                  <IconArrowLeft className="size-3.5" />
                  <span>Volver a la introducción</span>
                </button>
                <span className="text-xs text-amber-400 font-mono font-semibold">
                  Pregunta {currentIndex + 1} de {diagnosticExercises.length}
                </span>
              </div>

              {/* Barra de progreso sutil */}
              <div className="w-full bg-zinc-800 h-1.5 rounded-full mt-3 overflow-hidden">
                <div 
                  className="bg-amber-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${((currentIndex + 1) / diagnosticExercises.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Contenido del ejercicio */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-zinc-300 bg-[#1a1c22] px-2.5 py-1 rounded-md border border-zinc-800">
                  {currentEx.unitId} · {currentEx.subtopicTitle}
                </span>
                <span className="text-[11px] text-zinc-500">
                  Sin nota formal
                </span>
              </div>

              <p className="text-sm font-semibold text-zinc-200 font-sans">
                {currentEx.instructionText}
              </p>

              <div className="p-4 bg-[#1a1c22] rounded-xl border border-zinc-800 text-center overflow-x-auto text-zinc-100">
                <MathView math={currentEx.promptLatex} block className="text-base sm:text-lg font-bold" />
              </div>
            </div>

            {/* Opciones */}
            <div className="space-y-2.5">
              {currentEx.options.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleSelectOption(opt.id)}
                  className={`w-full p-4 rounded-xl border text-left text-xs font-medium transition-all cursor-pointer ${
                    selectedOptId === opt.id
                      ? 'bg-zinc-800 border-amber-500/80 text-zinc-100 shadow-sm'
                      : 'bg-[#1a1c22] border-zinc-800 hover:bg-zinc-800/80 text-zinc-300'
                  }`}
                >
                  <MathView math={opt.textLatex} />
                </button>
              ))}
            </div>

            {/* Botón avanzar */}
            <div className="pt-3 flex items-center justify-between border-t border-zinc-800">
              <button
                type="button"
                onClick={handleSkipToBaseline}
                className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                Omitir resto de la calibración
              </button>

              <button
                type="button"
                disabled={!selectedOptId}
                onClick={handleNextQuestion}
                className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-30 text-zinc-950 font-bold text-xs flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
              >
                <span>{currentIndex + 1 === diagnosticExercises.length ? 'Finalizar calibración' : 'Siguiente pregunta'}</span>
                <IconArrowRight className="size-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* PASO 3: CALIBRACIÓN COMPLETADA Y ENTRADA AL PANEL                        */}
        {/* ========================================================================= */}
        {step === 'finished' && (
          <div className="text-center py-4 space-y-5 animate-fadeIn">
            <div className="size-14 rounded-2xl bg-emerald-950/40 border border-emerald-800/60 text-emerald-400 mx-auto flex items-center justify-center">
              <IconShieldCheck className="size-8" />
            </div>

            <div>
              <span className="text-xs font-semibold text-emerald-400 font-sans uppercase tracking-wider">
                Calibración inicial completada
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-zinc-100 mt-1.5 font-sans">
                ¡Todo listo para empezar a estudiar!
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto mt-2 leading-relaxed font-sans">
                Registramos tu punto de partida. Ya podés ver en el panel de inicio tus prioridades recomendadas y los temas donde conviene poner foco.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#1a1c22] border border-zinc-800 text-left text-xs text-zinc-300 space-y-1.5 font-sans">
              <div className="flex items-center gap-2 font-semibold text-zinc-200 mb-1">
                <IconCheckCircle className="size-4 text-emerald-400 shrink-0" />
                <span>Tu plan de estudio personalizado ya está activo:</span>
              </div>
              <p className="text-zinc-400">
                • Se ponderaron las 10 unidades oficiales del programa FaCENA.
              </p>
              <p className="text-zinc-400">
                • El botón "Continuar estudiando" te sugerirá la siguiente sesión óptima según tu tiempo disponible.
              </p>
            </div>

            <button
              type="button"
              onClick={handleFinishCalibration}
              className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs sm:text-sm shadow-sm transition-colors cursor-pointer"
            >
              Ir a mi panel de estudio
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default DiagnosticModal;
