import { cn } from "@/lib/utils";
import React from "react";
import { Loading } from "../icon";

type InputProps = {
  icon?: React.ReactElement;
  right?: React.ReactNode;
  loading?: boolean;
  error?: string;
  description?: string;
};

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & InputProps
>(({ icon, right, error, loading, description, className, ...props }, ref) => (
  <>
    {description && (
      <p className='text-xs text-light-foreground'>{description}</p>
    )}
    <div
      className={cn(
        "my-1 flex h-10 items-center overflow-hidden rounded-md border bg-transparent text-sm focus:outline-none",
        error
          ? "border-destructive text-destructive"
          : "border-border text-border focus-within:border-border-dark",
        className
      )}
    >
      {icon && <div className='ml-2'>{icon}</div>}
      <input
        disabled={loading || props.disabled}
        ref={ref}
        className={cn(
          "disabled:disabled block h-full w-full flex-1 appearance-none bg-transparent px-4 focus:outline-none disabled:cursor-not-allowed",
          error
            ? "text-destructive placeholder-destructive/60"
            : "text-foreground placeholder-light-foreground",
          className
        )}
        {...props}
      />
      {loading && <Loading className='mr-2' />}
      {right && !loading && <div className='mr-2 px-1'>{right}</div>}
    </div>
    {error && <p className='text-xs text-destructive'>{error}</p>}
  </>
));
Input.displayName = "Input";

export { Input };
