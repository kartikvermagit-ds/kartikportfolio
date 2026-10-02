import React, { useState, useEffect, useRef } from 'react';
import { Terminal, X, CornerDownLeft } from 'lucide-react';
import { executeTerminalCommand } from '../../data/terminalCommands';
import type { TerminalCommandOutput } from '../../types/developer';
import { playPathFeedback } from '../../utils/audioFeedback';

interface DeveloperTerminalProps {
  isOpen: boolean;
  onClose: () => void;
  onEggDiscovered?: (eggId: string) => void;
}

export const DeveloperTerminal: React.FC<DeveloperTerminalProps> = ({
  isOpen,
  onClose,
  onEggDiscovered
}) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<TerminalCommandOutput[]>([
    {
      command: 'init',
      timestamp: 'SYSTEM READY',
      output: [
        'KARTIK SYSTEM TERMINAL [v1.0.4]',
        'Type "help" to display available commands, or "projects" to inspect flagship builds.',
        ''
      ]
    }
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      onEggDiscovered?.('ee-terminal');

      const handleGlobalKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      window.addEventListener('keydown', handleGlobalKeyDown);
      return () => window.removeEventListener('keydown', handleGlobalKeyDown);
    }
  }, [isOpen, onClose, onEggDiscovered]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim();
    if (!cmd) return;

    playPathFeedback('tick');
    const result = executeTerminalCommand(cmd);

    if (result.action === 'CLEAR') {
      setHistory([]);
      setInputVal('');
      return;
    }

    if (result.action === 'EXIT') {
      onClose();
      return;
    }

    if (result.action === 'EXPLORE') {
      window.dispatchEvent(new CustomEvent('open-exploration-panel'));
      onClose();
      return;
    }

    setCommandHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);

    setHistory((prev) => [
      ...prev,
      {
        command: cmd,
        timestamp: new Date().toLocaleTimeString(),
        output: result.output,
        isError: result.isError
      }
    ]);

    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInputVal(commandHistory[nextIndex] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= commandHistory.length) {
        setHistoryIndex(-1);
        setInputVal('');
      } else {
        setHistoryIndex(nextIndex);
        setInputVal(commandHistory[nextIndex]);
      }
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md transition-opacity duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="Developer Terminal Simulation"
    >
      <div className="absolute inset-0 -z-10" onClick={onClose} aria-hidden="true" />

      <div className="relative w-full max-w-3xl max-h-[85vh] sm:max-h-[75vh] flex flex-col bg-[#05070B] border border-blue-500/40 rounded-2xl shadow-2xl shadow-black overflow-hidden font-mono text-xs animate-in fade-in zoom-in-95 duration-200">
        {/* Terminal Title Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-900/90 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            </div>
            <div className="h-4 w-[1px] bg-slate-700/60 mx-1" />
            <div className="flex items-center gap-1.5 text-slate-300 font-bold tracking-wide">
              <Terminal className="w-3.5 h-3.5 text-blue-400" />
              <span>KARTIK TERMINAL • WORKSTATION</span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close terminal"
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Terminal Output Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5 text-slate-300 scrollbar-thin scrollbar-thumb-slate-800">
          {history.map((entry, idx) => (
            <div key={idx} className="space-y-1">
              {entry.command !== 'init' && (
                <div className="flex items-center gap-2 text-slate-400 font-semibold">
                  <span className="text-emerald-400 font-bold">$</span>
                  <span className="text-slate-100">{entry.command}</span>
                  <span className="text-[10px] text-slate-600 font-normal ml-auto">
                    {entry.timestamp}
                  </span>
                </div>
              )}
              {Array.isArray(entry.output) ? (
                <div className="pl-4 space-y-0.5 text-slate-300 leading-relaxed">
                  {entry.output.map((line, lIdx) => (
                    <div key={lIdx} className={entry.isError ? 'text-red-400' : ''}>
                      {line}
                    </div>
                  ))}
                </div>
              ) : (
                entry.output && (
                  <div className={`pl-4 ${entry.isError ? 'text-red-400' : 'text-slate-300'}`}>
                    {entry.output}
                  </div>
                )
              )}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Terminal Input Bar */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 px-4 py-3 bg-slate-900/60 border-t border-slate-800"
        >
          <span className="text-emerald-400 font-bold">$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type 'help', 'whoami', 'projects', 'stack'..."
            aria-label="Terminal command input"
            className="flex-1 bg-transparent text-slate-100 placeholder:text-slate-600 focus:outline-none font-mono text-xs"
            autoComplete="off"
            spellCheck="false"
          />
          <button
            type="submit"
            aria-label="Send command"
            className="p-1.5 text-slate-400 hover:text-emerald-400 rounded transition-colors"
          >
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
