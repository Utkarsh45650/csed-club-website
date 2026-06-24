import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCcw } from "lucide-react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#050816] flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
          
          {/* Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/10 rounded-full blur-[150px] pointer-events-none" />

          <div className="relative z-10 max-w-lg bg-[#111827] border border-red-500/20 p-8 md:p-12 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
            <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-6 border border-red-500/20">
              <AlertTriangle className="w-8 h-8 text-red-400" />
            </div>
            
            <h1 className="text-3xl font-bold text-white mb-4">
              System Failure
            </h1>
            
            <p className="text-gray-400 mb-8 leading-relaxed">
              We encountered a critical runtime error. Our engineers have been notified (in theory). 
              Please refresh the application matrix to continue.
            </p>

            <button
              onClick={this.handleReload}
              className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            >
              <RefreshCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
              <span className="font-medium text-sm">Reboot System</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
