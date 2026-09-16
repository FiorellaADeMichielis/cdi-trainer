import React from 'react';
import { IconBook, IconGamepad, IconCalendar, IconArrowRight } from '../../icons';
import { NavigationTab } from '../../../hooks/useTrainerState';

interface QuickPracticePresenterProps {
  onSelectTab: (tab: NavigationTab) => void;
}

export const QuickPracticePresenter: React.FC<QuickPracticePresenterProps> = ({
  onSelectTab
}) => {
  const options = [
    {
      tab: 'formulas' as NavigationTab,
      title: 'Fórmulas y teoremas',
      description: 'Tarjetas de memoria para repasar derivadas, integrales y propiedades clave.',
      icon: <IconBook className="size-5 text-amber-400" />,
      actionText: 'Ver fórmulas'
    },
    {
      tab: 'minigames' as NavigationTab,
      title: 'Práctica guiada',
      description: 'Ejercicios interactivos para elegir métodos, ordenar pasos y encontrar errores.',
      icon: <IconGamepad className="size-5 text-amber-400" />,
      actionText: 'Empezar práctica'
    },
    {
      tab: 'exam' as NavigationTab,
      title: 'Simulacro de examen',
      description: 'Practicá con 10 ejercicios y tiempo límite de 90 minutos para medir tu nivel.',
      icon: <IconCalendar className="size-5 text-amber-400" />,
      actionText: 'Hacer simulacro'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 font-sans">
          Herramientas de estudio
        </span>
        <h3 className="text-xl sm:text-2xl font-bold text-zinc-100 mt-1 font-sans tracking-tight">
          Otras formas de practicar
        </h3>
        <p className="text-sm text-zinc-400 mt-1">
          Elegí la modalidad que mejor se adapte al tiempo que tengas disponible.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {options.map((opt) => (
          <div
            key={opt.tab}
            className="p-6 rounded-2xl bg-[#14161a] border border-zinc-800 flex flex-col justify-between space-y-4 hover:border-zinc-700 transition-colors"
          >
            <div className="space-y-3">
              <div className="size-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                {opt.icon}
              </div>
              <h4 className="text-base font-bold text-zinc-100 font-sans">
                {opt.title}
              </h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {opt.description}
              </p>
            </div>

            <button
              type="button"
              onClick={() => onSelectTab(opt.tab)}
              className="w-full py-2.5 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white text-xs font-semibold border border-zinc-700 flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <span>{opt.actionText}</span>
              <IconArrowRight className="size-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

