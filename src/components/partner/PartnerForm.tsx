"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { partnerSchema, type PartnerFormValues, PARTNER_VOLUMES } from "@/lib/partner-schema";
import { submitPartner } from "@/app/solar/partner/actions";
import { TextField, SelectField, CheckboxField } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site-config";

export function PartnerForm() {
  const [confirmation, setConfirmation] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<PartnerFormValues>({
    resolver: zodResolver(partnerSchema),
    mode: "onTouched",
  });

  async function onSubmit(values: PartnerFormValues) {
    setSubmitError(null);
    const res = await submitPartner(values);
    if (res.ok) {
      setConfirmation(res.reference);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else setSubmitError(res.error);
  }

  if (confirmation) {
    return (
      <div className="rounded-card-lg border border-hairline bg-surface p-8 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-forest-soft text-forest">
          <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" aria-hidden><path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
        <h2 className="mt-5 font-display text-h3 text-ink">Thanks — we&apos;ll be in touch</h2>
        <p className="mx-auto mt-3 max-w-md text-body text-ink-2">
          Our partnerships team will reach out shortly. Reference <span className="font-semibold text-ink">{confirmation}</span>.
        </p>
        <p className="mt-2 text-caption text-ink-3">Or email us directly at {siteConfig.email.partner}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <TextField label="Company" autoComplete="organization" error={errors.company?.message} {...register("company")} />
        <TextField label="Your name" autoComplete="name" error={errors.name?.message} {...register("name")} />
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <TextField label="Phone" type="tel" inputMode="tel" autoComplete="tel" error={errors.phone?.message} {...register("phone")} />
        <TextField label="Email" type="email" autoComplete="email" error={errors.email?.message} {...register("email")} />
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <TextField label="City / area" error={errors.city?.message} {...register("city")} />
        <SelectField label="BESS projects / year" options={PARTNER_VOLUMES} placeholder="Approximate volume" error={errors.volume?.message} {...register("volume")} />
      </div>
      <div>
        <label htmlFor="p-msg" className="mb-1.5 block text-body font-medium text-ink">Anything else? <span className="text-caption font-normal text-ink-3">(optional)</span></label>
        <textarea id="p-msg" rows={4} className="w-full rounded-card border border-hairline bg-white px-4 py-3 text-body text-ink shadow-card transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20" {...register("message")} />
      </div>

      <div className="absolute -left-[9999px]" aria-hidden>
        <label htmlFor="company_website">Company website</label>
        <input id="company_website" tabIndex={-1} autoComplete="off" {...register("company_website")} />
      </div>

      <CheckboxField label="I agree to be contacted about a solar-EPC / BESS partnership." error={errors.consent?.message} {...register("consent")} />

      {submitError && <p role="alert" className="rounded-card border border-red-200 bg-red-50 px-4 py-3 text-body text-red-700">{submitError}</p>}

      <Button size="lg" type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting ? "Sending…" : "Become a partner"}
      </Button>
    </form>
  );
}
