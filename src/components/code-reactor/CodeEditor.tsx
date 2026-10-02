import React from 'react';
import { Terminal, Code2, AlertCircle, Sparkles } from 'lucide-react';
import type { CodeLine } from '../../types/codeReactor';

interface CodeEditorProps {
  filename?: string;
  language?: string;
  codeSnippet: CodeLine[];
  activeExecutionLine?: number;
  hasErrorState?: boolean;
}

export function CodeEditor({
  filename = 'solution.cpp',
  language = 'C++20',
  codeSnippet,
  activeExecutionLine,
  hasErrorState = false
}: CodeEditorProps) {
  // Simple token highlighter for keywords, comments, strings, numbers
  const highlightCode = (code: string) => {
    if (code.trim().startsWith('//')) {
      return <span className="text-slate-500 italic">{code}</span>;
    }

    // Split words and render with syntax styling
    const parts = code.split(/(\b(?:for|int|while|if|else|return|unordered_map|stack|queue|cout|string|char|auto|vector)\b|[0-9]+|"[^"]*"|'[^']*'|[{}();,<>+*=\-/])/g);

    return parts.map((part, i) => {
      if (!part) return null;
      if (['for', 'while', 'if', 'else', 'return', 'auto'].includes(part)) {
        return <span key={i} className="text-pink-400 font-bold">{part}</span>;
      }
      if (['int', 'char', 'string', 'unordered_map', 'stack', 'queue', 'vector'].includes(part)) {
        return <span key={i} className="text-purple-400 font-semibold">{part}</span>;
      }
      if (['cout'].includes(part)) {
        return <span key={i} className="text-sky-300 font-semibold">{part}</span>;
      }
      if (/^[0-9]+$/.test(part)) {
        return <span key={i} className="text-amber-400">{part}</span>;
      }
      if (/^"[^"]*"$/.test(part) || /^'[^']*'$/.test(part)) {
        return <span key={i} className="text-emerald-400">{part}</span>;
      }
      if (['(', ')', '{', '}', ';', '<', '>', '+', '-', '*', '=', '/'].includes(part)) {
        return <span key={i} className="text-slate-400">{part}</span>;
      }
      return <span key={i} className="text-slate-200">{part}</span>;
    });
  };

  return (
    <div className="w-full rounded-2xl bg-[#090D18] border border-slate-800 shadow-2xl overflow-hidden font-mono flex flex-col text-left">
      {/* Editor Window Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#05070B] border-b border-slate-800 text-xs">
        <div className="flex items-center gap-3">
          {/* OS Window Traffic Light Buttons */}
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>

          {/* Active File Tab */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#090D18] border border-slate-800 text-white font-semibold text-[11px]">
            <Code2 className="w-3.5 h-3.5 text-blue-400" />
            <span>{filename}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[10px] text-slate-400">
          <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
            {language}
          </span>
          <span className="hidden sm:inline">UTF-8</span>
        </div>
      </div>

      {/* Editor Code Body */}
      <div className="p-3 sm:p-4 overflow-x-auto text-xs leading-relaxed select-text space-y-1">
        {codeSnippet.map((line, idx) => {
          const isErrorLine = line.hasError;
          const isLineActive = line.isHighlighted || (activeExecutionLine !== undefined && activeExecutionLine === idx);

          return (
            <div
              key={`line-${idx}`}
              className={`flex items-start gap-3 px-2 py-0.5 rounded transition-colors ${
                isErrorLine
                  ? 'bg-red-950/40 border-l-2 border-red-500'
                  : isLineActive
                  ? 'bg-blue-950/40 border-l-2 border-blue-400'
                  : 'hover:bg-slate-900/40'
              }`}
            >
              {/* Line Number */}
              <span className="w-6 text-right text-slate-400 select-none text-[11px]">
                {line.lineNum}
              </span>

              {/* Line Code */}
              <div className="flex-1 whitespace-pre font-mono">
                {highlightCode(line.code)}
              </div>

              {/* Status Icons */}
              {isErrorLine && (
                <span className="flex items-center gap-1 text-[10px] text-red-400 font-bold flex-shrink-0">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">OFF-BY-ONE</span>
                </span>
              )}
              {isLineActive && !isErrorLine && (
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse mt-1 flex-shrink-0" />
              )}
            </div>
          );
        })}
      </div>

      {/* Editor Bottom Status Bar */}
      <div className="px-4 py-1.5 bg-[#05070B] border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400 font-mono">
        <div className="flex items-center gap-2">
          <Terminal className="w-3 h-3 text-blue-400" />
          <span>SYNTAX CHECK: OK</span>
        </div>
        <div>LINES: {codeSnippet.length} • READONLY SIMULATION</div>
      </div>
    </div>
  );
}

export default CodeEditor;
