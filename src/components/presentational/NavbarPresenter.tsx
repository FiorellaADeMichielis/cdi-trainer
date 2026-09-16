import React from 'react';
import { 
  IconFlame, 
  IconVolume, 
  IconVolumeMute, 
  IconRotate,
  IconBook,
  IconGamepad,
  IconAward,
  IconGraduationCap,
  IconCalendar,
  IconUnneEmblem,
  IconHelp
} from '../icons';
import { UserProfile } from '../../types/domain';
import { NavigationTab } from '../../hooks/useTrainerState';

interface NavbarPresenterProps {
  userProfile: UserProfile;
  activeTab: NavigationTab;
  daysRemaining: number;
  onSelectTab: (tab: NavigationTab) => void;
  onToggleSound: () => void;
  onResetData: () => void;
  onOpenWelcome?: () => void;
}

export const NavbarPresenter: React.FC<NavbarPresenterProps> = ({
  userProfile,
  activeTab,
  daysRemaining,
  onSelectTab,
  onToggleSound,
  onResetData,
  onOpenWelcome
}) => {
  const navItems: { id: NavigationTab; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Inicio', icon: <IconGraduationCap className="size-3.5 shrink-0" /> },
    { id: 'study', label: 'Estudio', icon: <IconAward className="size-3.5 shrink-0" /> },
    { id: 'formulas', label: 'Fórmulas', icon: <IconBook className="size-3.5 shrink-0" /> },
    { id: 'minigames', label: 'Práctica', icon: <IconGamepad className="size-3.5 shrink-0" /> },
    { id: 'exam', label: 'Exámenes', icon: <IconCalendar className="size-3.5 shrink-0" /> },
  ];

  return (
    <>
      {/* 1. Desktop & Mobile Top Header */}
      <header className="sticky top-0 z-40 bg-[#0c0d10]/95 backdrop-blur-md border-b border-zinc-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 gap-4">
            
            {/* Brand / Logo */}
            <button 
              onClick={() => onSelectTab('dashboard')}
              className="flex items-center gap-3 cursor-pointer group text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-lg py-1 pr-2 shrink-0"
              aria-label="Ir al inicio"
            >
              <div className="size-9 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-amber-400 shadow-sm group-hover:border-amber-500/50 transition-all shrink-0">
                <IconUnneEmblem className="size-5 text-amber-400" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 leading-none mb-0.5">
                  <span className="text-[11px] font-semibold text-zinc-400 font-sans whitespace-nowrap">
                    UNNE · FaCENA
                  </span>
                  <span className="text-zinc-600 font-bold hidden sm:inline">•</span>
                  <span className="text-[11px] text-zinc-500 font-sans hidden sm:inline whitespace-nowrap">
                    Licenciatura en Sistemas
                  </span>
                </div>
                <h1 className="font-bold text-zinc-100 tracking-tight text-xs sm:text-sm group-hover:text-amber-300 transition-colors whitespace-nowrap leading-tight font-sans">
                  Cálculo Diferencial e Integral
                </h1>
              </div>
            </button>

            {/* Desktop Navigation Tabs (Sleek, Prolijo & Never Wrapping) */}
            <nav 
              aria-label="Navegación principal" 
              className="hidden md:flex items-center gap-1 bg-zinc-900/90 border border-zinc-800 rounded-full p-1 shadow-inner shrink-0"
            >
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onSelectTab(item.id)}
                    className={`flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs whitespace-nowrap transition-all ${
                      isActive
                        ? 'bg-zinc-800 text-amber-400 font-semibold shadow-sm border border-zinc-700/70'
                        : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40 font-medium'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Quick Metrics & Utility Controls */}
            <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
              {/* Days Countdown Badge */}
              <div 
                title="Días restantes hasta el examen"
                className={`hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs whitespace-nowrap ${
                  daysRemaining <= 7 
                    ? 'bg-rose-950/40 border-rose-800/60 text-rose-300 font-medium'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-300'
                }`}
              >
                <IconCalendar className="size-3.5 text-zinc-400 shrink-0" />
                <span className="whitespace-nowrap">{daysRemaining} días para el examen</span>
              </div>

              {/* Study Streak */}
              {userProfile.studyStreakDays > 0 && (
                <div 
                  title="Días seguidos de estudio"
                  className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-amber-400 text-xs font-medium whitespace-nowrap"
                >
                  <IconFlame className="size-3.5 fill-current text-amber-400 shrink-0" />
                  <span>{userProfile.studyStreakDays} {userProfile.studyStreakDays === 1 ? 'día' : 'días'}</span>
                </div>
              )}

              {/* Help & Welcome Guide */}
              {onOpenWelcome && (
                <button
                  type="button"
                  onClick={onOpenWelcome}
                  aria-label="Ver guía de bienvenida y calibración"
                  title="¿De qué se trata esta app? / Guía"
                  className="size-8 flex items-center justify-center rounded-lg text-zinc-400 hover:text-amber-400 hover:bg-zinc-800 transition-colors focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none cursor-pointer"
                >
                  <IconHelp className="size-4" />
                </button>
              )}

              {/* Sound Toggle */}
              <button
                type="button"
                onClick={onToggleSound}
                aria-label={userProfile.soundEnabled ? 'Silenciar sonidos' : 'Activar sonidos'}
                title={userProfile.soundEnabled ? 'Silenciar sonidos' : 'Activar sonidos'}
                className="size-8 flex items-center justify-center rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none cursor-pointer"
              >
                {userProfile.soundEnabled ? <IconVolume className="size-4" /> : <IconVolumeMute className="size-4 text-zinc-600" />}
              </button>

              {/* Reset Data */}
              <button
                type="button"
                onClick={onResetData}
                aria-label="Reiniciar progreso de estudio"
                title="Reiniciar progreso de estudio"
                className="size-8 flex items-center justify-center rounded-lg text-zinc-400 hover:text-rose-400 hover:bg-zinc-800 transition-colors focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:outline-none cursor-pointer"
              >
                <IconRotate className="size-4" />
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* 2. Mobile Ergonomic Bottom Navigation Bar */}
      <nav 
        aria-label="Navegación móvil inferior"
        className="flex md:hidden fixed bottom-0 inset-x-0 z-50 bg-[#0c0d10]/95 backdrop-blur-md border-t border-zinc-800/90 py-1.5 px-3 justify-around shadow-2xl"
      >
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`flex flex-col items-center justify-center flex-1 py-1 min-h-[46px] rounded-xl transition-all ${
                isActive 
                  ? 'text-amber-400 font-bold bg-zinc-800/60' 
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <div className="mb-0.5">
                {item.icon}
              </div>
              <span className="text-[10px] tracking-tight whitespace-nowrap">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
};
