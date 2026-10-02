import React, { useRef, useEffect } from 'react';
import { CornerDownLeft } from 'lucide-react';
import type { CommandItem as CommandItemType } from '../../types/command';

interface CommandItemProps {
  command: CommandItemType;
  isSelected: boolean;
  onSelect: () => void;
  onExecute: () => void;
}

export function CommandItem({
  command,
  isSelected,
  onSelect,
  onExecute
}: CommandItemProps) {
  const itemRef = useRef<HTMLDivElement>(null);
  const Icon = command.icon;

  // Auto-scroll selected item into view if navigated via keyboard
  useEffect(() => {
    if (isSelected && itemRef.current) {
      itemRef.current.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth'
      });
    }
  }, [isSelected]);

  const getBadgeStyle = (badgeType = 'default') => {
    switch (badgeType) {
      case 'amber':
        return 'bg-amber-500/15 text-amber-300 border-amber-500/40';
      case 'blue':
        return 'bg-blue-500/15 text-blue-300 border-blue-500/40';
      case 'live':
        return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40';
      case 'tech':
        return 'bg-purple-500/15 text-purple-300 border-purple-500/40';
      case 'emerald':
        return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40';
      default:
        return 'bg-slate-800/80 text-slate-300 border-slate-700/60';
    }
  };

  return (
    <div
      ref={itemRef}
      role="option"
      aria-selected={isSelected}
      onClick={onExecute}
      onMouseEnter={onSelect}
      className={`group relative flex items-center justify-between px-3.5 py-2.5 my-0.5 rounded-xl cursor-pointer select-none transition-all duration-150 ${
        isSelected
          ? 'bg-blue-500/12 text-white border-l-2 border-blue-400 pl-4 shadow-sm shadow-blue-500/10'
          : 'text-slate-300 hover:bg-slate-800/40 border-l-2 border-transparent'
      }`}
    >
      {/* Left: Icon, Title & Subtitle */}
      <div className="flex items-center gap-3 min-w-0 pr-3">
        <div
          className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border transition-colors ${
            isSelected
              ? 'bg-blue-500/20 border-blue-400/40 text-blue-300'
              : 'bg-[#0B1220] border-slate-800 text-slate-400 group-hover:text-slate-200'
          }`}
        >
          <Icon className="w-3.5 h-3.5" />
        </div>

        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-2">
            <span
              className={`text-xs font-mono font-medium truncate ${
                isSelected ? 'text-white font-semibold' : 'text-slate-200'
              }`}
            >
              {command.title}
            </span>
            {command.badge && (
              <span
                className={`text-[9px] font-mono px-1.5 py-0.2 rounded border uppercase tracking-wider shrink-0 ${getBadgeStyle(
                  command.badgeType
                )}`}
              >
                {command.badge}
              </span>
            )}
          </div>
          <span className="text-[11px] font-sans text-slate-400 truncate mt-0.5">
            {command.description}
          </span>
        </div>
      </div>

      {/* Right: Keyboard Hint & Execute Indicator */}
      <div className="flex items-center gap-2 shrink-0">
        {command.shortcut && !isSelected && (
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-500">
            {command.shortcut}
          </kbd>
        )}

        {isSelected ? (
          <div className="flex items-center gap-1 text-[10px] font-mono text-blue-300 bg-blue-500/20 px-2 py-0.5 rounded border border-blue-400/30">
            <CornerDownLeft className="w-3 h-3" />
            <span className="hidden sm:inline">ENTER</span>
          </div>
        ) : null}
      </div>
    </div>
  );
}
export default CommandItem;
