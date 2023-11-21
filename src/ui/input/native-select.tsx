import { cn } from "@/lib/utils";
import React from "react";

const NativeSelect = React.forwardRef<
  HTMLSelectElement,
  React.HTMLAttributes<HTMLSelectElement> & {
    autoComplete?: string;
    disabled?: boolean;
  }
>(({ className, autoComplete, disabled, ...props }, ref) => (
  <select
    ref={ref}
    autoComplete={autoComplete}
    disabled={disabled}
    {...props}
    className={cn(
      "select block h-10 w-full appearance-none rounded-md border bg-transparent py-2 pl-3 pr-10 text-left text-sm focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
  />
));
NativeSelect.displayName = "Select";

export { NativeSelect };
