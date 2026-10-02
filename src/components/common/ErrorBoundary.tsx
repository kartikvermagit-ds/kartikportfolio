import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Terminal, RefreshCcw, Home, AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // In production, keep log clean; do not expose stack trace to UI
    if (import.meta.env.DEV) {
      console.warn('[KARTIK.OS RECOVERY] Component error captured:', error, errorInfo);
    }
  }

  private handleReset = () => {
    this.setState({ hasError: false });
    window.location.href = '/';
  };

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#05070B] text-[#F8FAFC] flex items-center justify-center p-6 font-mono select-none">
          <div className="relative max-w-lg w-full p-8 rounded-2xl bg-[#080D16] border border-blue-500/40 shadow-2xl shadow-black text-center overflow-hidden">
            {/* Ambient Background Aura */}
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center">
              <div className="p-3.5 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-5">
                <AlertTriangle className="w-8 h-8 text-amber-400 animate-pulse" />
              </div>

              <div className="text-[11px] font-bold text-blue-400 uppercase tracking-widest mb-1.5 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
                <span>KARTIK.OS // RECOVERY PROTOCOL</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-heading font-black text-white tracking-wide mb-3">
                SYSTEM NOT FOUND
              </h1>

              <p className="text-xs sm:text-sm font-sans text-slate-400 leading-relaxed max-w-sm mb-6">
                The requested experience encountered an unexpected state. The system core remains intact and ready to initialize.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3 w-full pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={this.handleReset}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-mono text-xs font-semibold tracking-wider transition-all shadow-lg shadow-blue-500/20 active:scale-95"
                >
                  <Home className="w-4 h-4" />
                  <span>RETURN TO KARTIK.OS</span>
                </button>

                <button
                  type="button"
                  onClick={this.handleReload}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-300 font-mono text-xs font-medium transition-all active:scale-95"
                >
                  <RefreshCcw className="w-3.5 h-3.5 text-slate-400" />
                  <span>RELOAD SYSTEM</span>
                </button>
              </div>

              <div className="mt-6 text-[10px] text-slate-600 tracking-wider">
                TELEMETRY: CORE_STABLE // FAILSAFE_ENGAGED
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
