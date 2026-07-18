import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-radius-sm bg-white/70 dark:bg-black/60 backdrop-blur-[12px]",
          "px-4 text-type-body-md text-ink-900 dark:text-white transition-all duration-fast",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium",
          "placeholder:text-ink-300 dark:placeholder:text-ink-300",
          "border-[1.5px] border-ink-300 dark:border-ink-600",
          "focus-visible:outline-none focus-visible:border-[2px]",
          "disabled:cursor-not-allowed disabled:opacity-50",
          error 
            ? "border-signal-crisis focus-visible:border-signal-crisis" 
            : "focus-visible:border-aurora-sea focus-visible:shadow-glow-sea",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
