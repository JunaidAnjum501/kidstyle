import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "../../lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background active:scale-95",
  {
    variants: {
      variant: {
        default: "bg-primary-500 text-white hover:bg-primary-600 shadow-sm hover:shadow",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm hover:shadow",
        outline:
          "border-2 border-primary-500 text-primary-600 hover:bg-primary-50 hover:text-primary-700",
        secondary:
          "bg-secondary-500 text-white hover:bg-secondary-600 shadow-sm hover:shadow",
        ghost: "hover:bg-gray-100 text-gray-700 hover:text-gray-900",
        link: "underline-offset-4 hover:underline text-primary-600 hover:text-primary-700 p-0 h-auto",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-3 py-1.5 text-xs rounded-lg",
        lg: "h-12 px-8 py-3 text-base rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? React.Fragment : "button"
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = "Button"

export { Button, buttonVariants }