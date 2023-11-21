import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:opacity-80",
        "default-inverted":
          "border-2 border-primary-foreground bg-primary-foreground text-primary hover:bg-primary hover:text-primary-foreground hover:border-primary-foreground",
        destructive: "bg-destructive text-destructive-light hover:opacity-60",
        outline:
          "border border-2 bg-background text-foreground hover:bg-light hover:text-light-foreground",
        "outline-primary":
          "border border-2 border-primary text-primary hover:bg-light",
        "outline-inverted":
          "border border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary",
        ghost: "hover:bg-light hover:text-light-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        "link-inverted":
          "text-primary-foreground underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, children, variant, size, loading, asChild = false, ...props },
    ref
  ) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {loading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
