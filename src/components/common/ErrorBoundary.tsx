import { Component, ErrorInfo, ReactNode } from 'react';
import { IconWarning } from '../icons';

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
  fallbackMessage?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary atrapó un error en tiempo de render:', error, errorInfo);
  }

  public handleReload = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 max-w-lg mx-auto my-8 rounded-2xl bg-[#14161a] border border-rose-900/40 text-center space-y-4">
          <div className="size-12 rounded-xl bg-rose-950/60 border border-rose-800 flex items-center justify-center text-rose-400 mx-auto">
            <IconWarning className="size-6 text-rose-400" />
          </div>
          <h3 className="text-base font-bold text-zinc-100 font-sans">
            {this.props.fallbackTitle || 'Ocurrió un problema al cargar esta sección'}
          </h3>
          <p className="text-xs text-zinc-400 font-sans leading-relaxed">
            {this.props.fallbackMessage || 'La sección no pudo dibujarse correctamente. Podés reintentar cargarla o volver al inicio.'}
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <button
              type="button"
              onClick={this.handleReload}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs transition-colors cursor-pointer"
            >
              Reintentar
            </button>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold text-xs border border-zinc-700 transition-colors cursor-pointer"
            >
              Recargar página
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
