import * as React from "react"
import { motion } from "motion/react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const cardVariants = cva(
  "overflow-hidden relative shadow-sm",
  {
    variants: {
      variant: {
        default: "bg-paper-100 dark:bg-night-900",
        flat: "bg-paper-100 dark:bg-night-900",
        glass: "bg-white/70 dark:bg-black/60 backdrop-blur-[12px] border border-white/10",
      },
      radius: {
        default: "rounded-radius-md",
        md: "rounded-radius-md",
        lg: "rounded-radius-lg",
      }
    },
    defaultVariants: {
      variant: "default",
      radius: "default",
    }
  }
)

export interface CardProps 
  extends React.HTMLAttributes<HTMLDivElement>, 
    VariantProps<typeof cardVariants> {
  interactive?: boolean
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, radius, interactive = false, ...props }, ref) => {
    
    if (interactive) {
      return (
        <motion.div
          ref={ref as any}
          className={cn(cardVariants({ variant, radius, className }))}
          whileHover={{ y: -2, boxShadow: "0 4px 12px rgba(28,27,41,0.08), 0 2px 4px rgba(28,27,41,0.04)" }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          {...(props as any)}
        />
      )
    }

    return (
      <div 
        ref={ref} 
        className={cn(cardVariants({ variant, radius, className }))} 
        {...props} 
      />
    )
  }
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(({ className, ...props }, ref) => (
  <h3 ref={ref} className={cn("text-type-title-lg font-inter text-ink-900 dark:text-white", className)} {...props} />
))
CardTitle.displayName = "CardTitle"

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

export { Card, CardHeader, CardTitle, CardContent, cardVariants }
