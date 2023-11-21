import { cn } from "@/lib/utils";
import React from "react";

type TextareaProps = {
  error?: string;
  description?: string;
};

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & TextareaProps
>(({ error, description, className, ...props }, ref) => {
  return (
    <>
      {description && (
        <p className="text-xs text-light-foreground">{description}</p>
      )}
      <textarea
        className={cn(
          "my-1 flex min-h-[80px] w-full rounded-md border bg-transparent px-3 py-2 text-sm focus:outline-none disabled:cursor-not-allowed disabled:text-border",
          error
            ? "border-destructive text-destructive placeholder-destructive/60"
            : "border-border placeholder-light-foreground focus:border-border-dark",
          className
        )}
        ref={ref}
        {...props}
      />
      {error && <p className="text-xs text-destructive">{error}</p>}
    </>
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
