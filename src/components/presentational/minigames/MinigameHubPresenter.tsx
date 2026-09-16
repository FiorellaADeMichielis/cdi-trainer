import React from 'react';
import { 
  IconFlame, 
  IconEye, 
  IconSearch, 
  IconRotate, 
  IconClock, 
  IconHelp, 
  IconAward, 
  IconArrowRight 
} from '../../icons';
import { MinigameId } from '../../../hooks/useMinigames';

interface MinigameHubPresenterProps {
  onSelectGame: (gameId: MinigameId) => void;
}

interface GameCardMeta {
  id: MinigameId;
  title: string;
  badge: string;
  description: string;
  accentIcon: React.ReactNode;
}

export const MinigameHubPresenter: React.FC<MinigameHubPresenterProps> = ({
  onSelectGame
}) => {
  const games: GameCardMeta[] = [
    {
      id: 'procedure_selector',
      title: 'Elegir método',
      badge: 'Estrategia',
      description: 'Identificá qué método de integración o derivación conviene aplicar antes de empezar a resolver.',
      accentIcon: <IconEye className="size-5 text-amber-400" />
    },
    {
      id: 'math_detective',
      title: 'Encontrar el error',
      badge: 'Atención',
      description: 'Revisá una resolución paso a paso y encontrá el paso donde ocurrió el error algebraico o conceptual.',
      accentIcon: <IconSearch className="size-5 text-amber-400" />
    },
    {
      id: 'order_procedure',
      title: 'Ordenar pasos',
      badge: 'Procedimiento',
      description: 'Reconstruí la secuencia lógica y rigurosa para resolver un ejercicio típico de final.',
      accentIcon: <IconRotate className="size-5 text-amber-400" />
    },
    {
      id: 'formula_rush',
      title: 'Asociar fórmulas',
      badge: 'Fórmulas',
      description: 'Relacioná la situación planteada con la fórmula o teorema que corresponde aplicar.',
      accentIcon: <IconFlame className="size-5 text-amber-400" />
    },
    {
      id: 'formula_memory',
      title: 'Memoria de definiciones',
      badge: 'Conceptos',
      description: 'Encontrá los pares entre conceptos matemáticos y sus definiciones analíticas.',
      accentIcon: <IconHelp className="size-5 text-amber-400" />
    },
    {
      id: 'mystery_graph',
      title: 'Interpretación gráfica',
      badge: 'Gráficos',
      description: 'Reconocé tipos de discontinuidad, asíntotas verticales y oblicuas a partir del gráfico.',
      accentIcon: <IconEye className="size-5 text-amber-400" />
    },
    {
      id: 'jeopardy',
      title: 'Preguntas de examen',
      badge: 'Integrador',
      description: 'Preguntas teóricas y prácticas organizadas por unidad y dificultad.',
      accentIcon: <IconAward className="size-5 text-amber-400" />
    },
    {
      id: 'clock_battle',
      title: 'Desafío con tiempo',
      badge: 'Agilidad',
      description: 'Resolución de ejercicios cortos con tiempo limitado para ganar velocidad en el examen.',
      accentIcon: <IconClock className="size-5 text-amber-400" />
    }
  ];

  return (
    <div className="space-y-8 sm:space-y-10 animate-fadeIn">
      {/* Header */}
      <div className="border-b border-zinc-800 pb-6">
        <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 font-sans">
          Práctica guiada
        </span>
        <h2 className="text-xl sm:text-2xl font-bold text-zinc-100 font-sans mt-1">
          Actividades para reforzar métodos y conceptos
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-2xl leading-relaxed">
          Ejercicios dinámicos diseñados para entrenar la toma de decisiones, la detección de errores y la agilidad de resolución.
        </p>
      </div>

      {/* Grid of 8 Activities */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {games.map((g) => (
          <div
            key={g.id}
            className="p-5 sm:p-6 rounded-2xl bg-[#14161a] border border-zinc-800 flex flex-col justify-between hover:border-zinc-700 transition-colors space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="size-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                  {g.accentIcon}
                </div>
                <span className="text-[11px] font-medium text-zinc-400 bg-[#1a1c22] px-2.5 py-0.5 rounded-full border border-zinc-800">
                  {g.badge}
                </span>
              </div>

              <div>
                <h3 className="text-sm sm:text-base font-bold text-zinc-100 font-sans">
                  {g.title}
                </h3>
                <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
                  {g.description}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-end">
              <button
                type="button"
                onClick={() => onSelectGame(g.id)}
                className="w-full py-2 px-3.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white font-semibold text-xs flex items-center justify-center gap-1.5 border border-zinc-700 transition-colors cursor-pointer"
              >
                <span>Empezar</span>
                <IconArrowRight className="size-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
