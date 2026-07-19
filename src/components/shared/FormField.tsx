import { forwardRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
  containerClassName?: string;
}

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, error, hint, id, containerClassName, className, ...props }, ref) => {
    const fieldId = id ?? props.name;
    const describedBy = error ? `${fieldId}-error` : hint ? `${fieldId}-hint` : undefined;
    return (
      <div className={cn("space-y-1.5", containerClassName)}>
        <Label htmlFor={fieldId} className="text-[0.8rem]">
          {label}
        </Label>
        <Input
          id={fieldId}
          ref={ref}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          className={cn(
            error && "border-destructive focus-visible:ring-destructive/40",
            className,
          )}
          {...props}
        />
        {hint && !error && (
          <p id={`${fieldId}-hint`} className="text-2xs text-muted-foreground">
            {hint}
          </p>
        )}
        <AnimatePresence mode="wait">
          {error && (
            <motion.p
              id={`${fieldId}-error`}
              key={error}
              initial={{ opacity: 0, y: -4, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-1 text-2xs font-medium text-destructive"
              role="alert"
            >
              <AlertCircle className="h-3 w-3 shrink-0" />
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  },
);
FormField.displayName = "FormField";
