import { forwardRef, useId } from "react";
import { cn } from "@/lib/cn";

/**
 * Form field primitives (Design Doc component library): 48px height, 1px
 * border, clear focus ring, LABEL ABOVE the input (not placeholder-only) —
 * an accessibility requirement (TRD 8).
 */

const fieldBase =
  "h-12 w-full rounded-card border border-hairline bg-white px-4 text-body text-text-hi placeholder:text-text-dim shadow-card transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 aria-[invalid=true]:border-red-500";

function Label({
  htmlFor,
  children,
  optional,
}: {
  htmlFor: string;
  children: React.ReactNode;
  optional?: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-body font-medium text-ink">
      {children}
      {optional && <span className="ml-1.5 text-caption font-normal text-grey">(optional)</span>}
    </label>
  );
}

function ErrorText({ id, children }: { id: string; children?: React.ReactNode }) {
  if (!children) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 text-caption text-red-600">
      {children}
    </p>
  );
}

type BaseProps = {
  label: string;
  error?: string;
  optional?: boolean;
  hint?: string;
};

export const TextField = forwardRef<
  HTMLInputElement,
  BaseProps & React.InputHTMLAttributes<HTMLInputElement>
>(function TextField({ label, error, optional, hint, className, id, ...props }, ref) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  const errId = `${fieldId}-err`;
  return (
    <div>
      <Label htmlFor={fieldId} optional={optional}>
        {label}
      </Label>
      <input
        ref={ref}
        id={fieldId}
        className={cn(fieldBase, className)}
        aria-invalid={!!error}
        aria-describedby={error ? errId : undefined}
        {...props}
      />
      {hint && !error && <p className="mt-1.5 text-caption text-grey">{hint}</p>}
      <ErrorText id={errId}>{error}</ErrorText>
    </div>
  );
});

export const SelectField = forwardRef<
  HTMLSelectElement,
  BaseProps & { options: readonly string[]; placeholder?: string } & React.SelectHTMLAttributes<HTMLSelectElement>
>(function SelectField(
  { label, error, optional, options, placeholder, className, id, ...props },
  ref,
) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  const errId = `${fieldId}-err`;
  return (
    <div>
      <Label htmlFor={fieldId} optional={optional}>
        {label}
      </Label>
      <select
        ref={ref}
        id={fieldId}
        className={cn(fieldBase, "appearance-none bg-[right_1rem_center] bg-no-repeat pr-10", className)}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'%3E%3Cpath d='M4 6l4 4 4-4' stroke='%23A7B0BB' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")",
        }}
        aria-invalid={!!error}
        aria-describedby={error ? errId : undefined}
        defaultValue=""
        {...props}
      >
        <option value="" disabled>
          {placeholder ?? "Select…"}
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <ErrorText id={errId}>{error}</ErrorText>
    </div>
  );
});

export const CheckboxField = forwardRef<
  HTMLInputElement,
  { label: React.ReactNode; error?: string } & React.InputHTMLAttributes<HTMLInputElement>
>(function CheckboxField({ label, error, id, className, ...props }, ref) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  const errId = `${fieldId}-err`;
  return (
    <div>
      <div className="flex items-start gap-3">
        <input
          ref={ref}
          id={fieldId}
          type="checkbox"
          className={cn(
            "mt-0.5 h-5 w-5 shrink-0 rounded border-line text-green focus:ring-2 focus:ring-blue/20",
            className,
          )}
          aria-invalid={!!error}
          aria-describedby={error ? errId : undefined}
          {...props}
        />
        <label htmlFor={fieldId} className="text-body text-grey">
          {label}
        </label>
      </div>
      <ErrorText id={errId}>{error}</ErrorText>
    </div>
  );
});
