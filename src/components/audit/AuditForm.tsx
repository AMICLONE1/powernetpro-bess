"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import {
  auditSchema,
  type AuditFormValues,
  PROPERTY_TYPES,
  BACKUP_TYPES,
} from "@/lib/audit-schema";
import { submitAudit } from "@/app/free-audit/actions";
import { TextField, SelectField, CheckboxField } from "@/components/ui/Field";
import { BillUpload } from "@/components/audit/BillUpload";
import { Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/ContactButtons";
import { track } from "@/lib/analytics";
import { siteConfig } from "@/lib/site-config";

export function AuditForm() {
  const [files, setFiles] = useState<File[]>([]);
  const [confirmation, setConfirmation] = useState<{ reference: string; hadFiles: boolean } | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const startedRef = useRef(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuditFormValues>({
    resolver: zodResolver(auditSchema),
    mode: "onTouched",
  });

  // audit_form_view on mount (TRD 7.2)
  useEffect(() => {
    track("audit_form_view");
  }, []);

  function markStart() {
    if (!startedRef.current) {
      startedRef.current = true;
      track("audit_form_start");
    }
  }

  async function onSubmit(values: AuditFormValues) {
    setSubmitError(null);
    if (files.length > 0) track("bills_uploaded", { count: files.length });

    const result = await submitAudit(values, files.length);
    if (result.ok) {
      track("audit_form_submit", { property_type: values.propertyType });
      setConfirmation({ reference: result.reference, hadFiles: files.length > 0 });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setSubmitError(result.error);
    }
  }

  if (confirmation) {
    return <Confirmation reference={confirmation.reference} hadFiles={confirmation.hadFiles} />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} onChange={markStart} noValidate className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <TextField
          label="Name"
          autoComplete="name"
          error={errors.name?.message}
          {...register("name")}
        />
        <TextField
          label="Phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          hint="A WhatsApp-capable number is ideal"
          error={errors.phone?.message}
          {...register("phone")}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <TextField
          label="Email"
          type="email"
          optional
          autoComplete="email"
          error={errors.email?.message}
          {...register("email")}
        />
        <SelectField
          label="Property type"
          options={PROPERTY_TYPES}
          placeholder="Select property type"
          error={errors.propertyType?.message}
          {...register("propertyType")}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <TextField
          label="Location"
          placeholder="Area within Pune / Maharashtra"
          error={errors.location?.message}
          {...register("location")}
        />
        <SelectField
          label="Current backup"
          options={BACKUP_TYPES}
          optional
          placeholder="What do you use now?"
          error={errors.currentBackup?.message}
          {...register("currentBackup")}
        />
      </div>

      <BillUpload files={files} onChange={setFiles} />

      {/* Honeypot — visually hidden, must stay empty (TRD 6). */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="company_website">Company website</label>
        <input id="company_website" tabIndex={-1} autoComplete="off" {...register("company_website")} />
      </div>

      <CheckboxField
        label={
          <>
            I consent to PowerNetPro using the details and bills I provide to
            prepare a free energy audit, in line with the{" "}
            <Link href="/privacy" className="font-medium text-accent underline-offset-2 hover:underline">
              Privacy Policy
            </Link>
            . My bills are stored securely and deleted within 12 months, and I
            can request deletion at any time.
          </>
        }
        error={errors.consent?.message}
        {...register("consent")}
      />

      {submitError && (
        <p role="alert" className="rounded-card border border-red-200 bg-red-50 px-4 py-3 text-body text-red-700">
          {submitError}
        </p>
      )}

      <div className="flex flex-col gap-3 pt-2">
        <Button size="lg" type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
          {isSubmitting ? "Sending…" : "Get my free quote"}
        </Button>
        <p className="text-caption text-ink-2">
          No cost, no obligation. {siteConfig.responseCommitment}
        </p>
      </div>
    </form>
  );
}

function Confirmation({ reference, hadFiles }: { reference: string; hadFiles: boolean }) {
  return (
    <div className="rounded-card-lg border border-hairline bg-surface-2/60 p-8 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-forest/10">
        <svg className="h-7 w-7 text-forest" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h2 className="mt-5 text-h2 text-ink">Request received</h2>
      <p className="mx-auto mt-3 max-w-md text-body-lg text-ink-2">
        Thank you. Our team will review your details{hadFiles ? " and bills" : ""} and get back to you.{" "}
        <strong className="text-ink">{siteConfig.responseCommitment}</strong>
      </p>
      <p className="mt-4 text-body text-ink-2">
        Your reference is{" "}
        <span className="font-semibold text-ink">{reference}</span>
      </p>
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <WhatsAppButton label="Message us on WhatsApp" prefilled={`Hi ${siteConfig.company}! I just submitted my details (reference: ${reference}). I'd like to know the next steps.`} />
        <Button href="/sizing-calculator" variant="secondary">
          Try the sizing calculator
        </Button>
      </div>
    </div>
  );
}
