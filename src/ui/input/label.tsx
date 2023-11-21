import { cn } from "@/lib/utils";
import React from "react";

type InputLabelProps = {
  required?: boolean;
  error?: string;
};

const Label = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement> & InputLabelProps
>(({ required, error, className, children, ...props }, ref) => (
  <label
    ref={ref}
    className={cn(
      "text-sm font-semibold leading-none",
      required && "flex items-center gap-1",
      className
    )}
    {...props}
  >
    {children}
    {required && <span className="text-sm text-destructive">*</span>}
  </label>
));

export { Label };
