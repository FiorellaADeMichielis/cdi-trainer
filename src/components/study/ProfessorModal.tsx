import { IconBook, IconArrowRight, IconClose } from '../icons';
import { TeacherExplanation } from '../../types/domain';
import { MathView } from '../common/MathView';
import { soundService } from '../../services/soundService';

interface ProfessorModalProps {
  isOpen: boolean;
  explanation: TeacherExplanation;
  onClose: () => void;
}

export const ProfessorModal: React.FC<ProfessorModalProps> = ({
  isOpen,
  explanation,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#14161a] border border-zinc-800 rounded-2xl max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-amber-400">
              <IconBook className="size-5 text-amber-400" />
            </div>
            <div>
              <span className="text-xs font-semibold text-amber-400">
                Ayuda pedagógica
              </span>
              <h3 className="text-lg font-bold text-zinc-100 font-sans">
                Explicación del ejercicio
              </h3>
            </div>
          </div>
          <button
            onClick={() => {
              soundService.playClick();
              onClose();
            }}
            aria-label="Cerrar explicación"
            className="text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 cursor-pointer"
          >
            <IconClose className="size-5" />
          </button>
        </div>

        {/* 6 Structured Pedagogical Steps */}
        <div className="space-y-4 text-sm font-sans">
          
          {/* 1. Qué hiciste */}
          <div className="p-4 rounded-xl bg-[#1a1c22] border border-zinc-800">
            <div className="font-bold text-zinc-300 text-xs tracking-wider mb-1 flex items-center gap-2">
              <span className="size-5 rounded-full bg-zinc-800 text-zinc-300 flex items-center justify-center text-[10px]">1</span>
              <span>Tu planteo</span>
            </div>
            <p className="text-zinc-300 leading-relaxed pl-7 text-xs sm:text-sm">
              {explanation.whatYouDid}
            </p>
          </div>

          {/* 2. Dónde estuvo el error */}
          <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/40">
            <div className="font-bold text-rose-300 text-xs tracking-wider mb-1 flex items-center gap-2">
              <span className="size-5 rounded-full bg-rose-900/60 text-rose-300 flex items-center justify-center text-[10px]">2</span>
              <span>Dónde estuvo el error</span>
            </div>
            <p className="text-rose-200 leading-relaxed pl-7 text-xs sm:text-sm">
              {explanation.whereIsMistake}
            </p>
          </div>

          {/* 3. Por qué es incorrecto */}
          <div className="p-4 rounded-xl bg-[#1a1c22] border border-zinc-800">
            <div className="font-bold text-zinc-300 text-xs tracking-wider mb-1 flex items-center gap-2">
              <span className="size-5 rounded-full bg-zinc-800 text-zinc-300 flex items-center justify-center text-[10px]">3</span>
              <span>Por qué no es correcto</span>
            </div>
            <p className="text-zinc-300 leading-relaxed pl-7 text-xs sm:text-sm">
              {explanation.whyIsIncorrect}
            </p>
          </div>

          {/* 4. Qué tener en cuenta */}
          <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-900/40">
            <div className="font-bold text-amber-300 text-xs tracking-wider mb-1 flex items-center gap-2">
              <span className="size-5 rounded-full bg-amber-900/60 text-amber-300 flex items-center justify-center text-[10px]">4</span>
              <span>Qué tener en cuenta la próxima vez</span>
            </div>
            <p className="text-amber-200 leading-relaxed pl-7 text-xs sm:text-sm">
              {explanation.whatToDetectNextTime}
            </p>
          </div>

          {/* 5. Cómo resolverlo correctamente */}
          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/40">
            <div className="font-bold text-emerald-300 text-xs tracking-wider mb-2 flex items-center gap-2">
              <span className="size-5 rounded-full bg-emerald-900/60 text-emerald-300 flex items-center justify-center text-[10px]">5</span>
              <span>Resolución paso a paso</span>
            </div>
            <div className="pl-7 bg-[#14161a] p-3 rounded-lg border border-emerald-900/30 overflow-x-auto">
              <MathView math={explanation.correctResolutionLatex} block />
            </div>
          </div>

          {/* 6. Consejo para el examen */}
          <div className="p-4 rounded-xl bg-zinc-850 border border-zinc-750">
            <div className="font-bold text-amber-400 text-xs tracking-wider mb-1 flex items-center gap-2">
              <span className="size-5 rounded-full bg-zinc-800 text-amber-400 flex items-center justify-center text-[10px]">6</span>
              <span>Consejo para el examen</span>
            </div>
            <p className="text-zinc-300 text-xs leading-relaxed pl-7">
              {explanation.examFreeTip}
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="pt-3 flex justify-end">
          <button
            onClick={() => {
              soundService.playClick();
              onClose();
            }}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
          >
            <span>Entendido, continuar</span>
            <IconArrowRight className="size-4" />
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProfessorModal;
