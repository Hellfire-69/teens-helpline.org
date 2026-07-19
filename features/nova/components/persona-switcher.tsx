"use client";

import { useNovaStore } from "../store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { PersonaId } from "../schema";
import { savePreferredPersonaAction } from "@/features/auth/actions";
import { Sparkle } from "@phosphor-icons/react";

const PERSONA_OPTIONS: { id: PersonaId; label: string }[] = [
  { id: "big_brother", label: "Big Brother" },
  { id: "big_sister", label: "Big Sister" },
  { id: "mentor", label: "Mentor" },
  { id: "best_friend", label: "Best Friend" },
];

export function PersonaSwitcher() {
  const activePersona = useNovaStore((state) => state.activePersona);
  const setActivePersona = useNovaStore((state) => state.setActivePersona);

  const handleValueChange = (value: string | null) => {
    if (!value) return;
    const newPersona = value as PersonaId;
    setActivePersona(newPersona);
    // Fire and forget persistence update. The server action handles auth checks
    // and will gracefully fail if the user is anonymous.
    savePreferredPersonaAction(newPersona).catch(console.error);
  };

  return (
    <div className="flex items-center gap-2">
      <Sparkle weight="duotone" className="w-4 h-4 text-ink-600 dark:text-ink-300" />
      <Select value={activePersona} onValueChange={handleValueChange}>
        <SelectTrigger data-testid="persona-switcher-trigger" className="w-[140px] border-none shadow-none bg-transparent hover:bg-paper-100 dark:hover:bg-night-900 transition-colors">
          <SelectValue placeholder="Select persona" />
        </SelectTrigger>
        <SelectContent>
          {PERSONA_OPTIONS.map((option) => (
            <SelectItem key={option.id} value={option.id}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
