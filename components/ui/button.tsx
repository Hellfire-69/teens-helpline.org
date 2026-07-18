import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { motion, HTMLMotionProps } from "motion/react"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-radius-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-sea focus-visible:ring-offset-2 disabled:opacity-40 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary: "bg-gradient-to-r from-aurora-dusk to-aurora-sea text-white shadow-sm hover:brightness-110",
        secondary: "bg-white/10 backdrop-blur-md border border-white/10 text-ink-900 dark:text-white shadow-sm hover:bg-white/20",
        ghost: "text-ink-900 dark:text-white hover:underline",
        destructive: "bg-signal-crisis text-white shadow-sm hover:brightness-110",
      },
      size: {
        default: "h-11 px-6 text-type-body-md",
        sm: "h-9 px-4 text-type-body-sm",
        md: "h-11 px-6 text-type-body-md",
        lg: "h-13 px-8 text-type-body-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isLoading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, isLoading = false, children, ...props }, ref) => {
    // We omit motion on `asChild` because it breaks `Slot` without careful configuration,
    // but for our Study Hub usage, `asChild` isn't heavily used right now with motion.
    if (asChild) {
      return (
        <Slot
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        >
          {children}
        </Slot>
      )
    }

    return (
      <motion.button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        whileHover={{ scale: variant !== "ghost" ? 1.01 : 1, y: variant !== "ghost" ? -1 : 0 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 420, damping: 32 }}
        disabled={props.disabled || isLoading}
        {...(props as any)}
      >
        {isLoading ? (
          <span className="flex space-x-1">
            <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
            <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
            <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
          </span>
        ) : (
          children
        )}
      </motion.button>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
