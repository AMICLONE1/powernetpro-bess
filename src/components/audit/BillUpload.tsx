"use client";

import { useRef, useState } from "react";
import {
  MAX_FILES,
  MAX_FILE_BYTES,
  ACCEPTED_MIME,
  ACCEPTED_EXT,
} from "@/lib/audit-schema";
import { cn } from "@/lib/cn";

/**
 * Electricity bill upload (PRD 4.4, TRD 5.1). OPTIONAL by design — the form
 * must be submittable without it; upload is an enhancement, never a barrier.
 * Client-side validates count / size / MIME for fast feedback; production adds
 * server-side magic-byte checks, virus scan, EXIF strip and direct-to-storage
 * pre-signed uploads.
 */
export function BillUpload({
  files,
  onChange,
}: {
  files: File[];
  onChange: (files: File[]) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  function addFiles(incoming: FileList | File[]) {
    const list = Array.from(incoming);
    const errors: string[] = [];
    const accepted: File[] = [];

    for (const file of list) {
      if (!ACCEPTED_MIME.includes(file.type as (typeof ACCEPTED_MIME)[number])) {
        errors.push(`${file.name}: only PDF, JPG, PNG`);
        continue;
      }
      if (file.size > MAX_FILE_BYTES) {
        errors.push(`${file.name}: over 10 MB`);
        continue;
      }
      accepted.push(file);
    }

    const combined = [...files, ...accepted].slice(0, MAX_FILES);
    if (files.length + accepted.length > MAX_FILES) {
      errors.push(`Maximum ${MAX_FILES} files`);
    }
    onChange(combined);
    setNotice(errors.length ? errors.join(" · ") : null);
  }

  function removeFile(index: number) {
    onChange(files.filter((_, i) => i !== index));
  }

  return (
    <div>
      <span className="mb-1.5 block text-body font-medium text-ink">
        Recent electricity bills{" "}
        <span className="text-caption font-normal text-ink-3">(optional — speeds up your audit)</span>
      </span>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          if (e.dataTransfer.files?.length) addFiles(e.dataTransfer.files);
        }}
        className={cn(
          "rounded-card border border-dashed p-6 text-center transition-colors",
          dragOver ? "border-accent bg-accent/5" : "border-hairline-2 bg-surface-2/50",
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED_EXT}
          multiple
          className="sr-only"
          onChange={(e) => {
            if (e.target.files?.length) addFiles(e.target.files);
            e.target.value = "";
          }}
        />
        <p className="text-body text-ink-2">
          Drag bills here, or{" "}
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="font-semibold text-accent underline-offset-2 hover:underline"
          >
            browse files
          </button>
        </p>
        <p className="mt-1 text-caption text-ink-3">
          PDF, JPG or PNG · up to {MAX_FILES} files · 10 MB each
        </p>
      </div>

      {notice && <p className="mt-2 text-caption text-red-600">{notice}</p>}

      {files.length > 0 && (
        <ul className="mt-3 space-y-2">
          {files.map((file, i) => (
            <li
              key={`${file.name}-${i}`}
              className="flex items-center justify-between gap-3 rounded-card border border-hairline bg-surface px-4 py-2.5"
            >
              <span className="truncate text-body text-ink">{file.name}</span>
              <div className="flex shrink-0 items-center gap-3">
                <span className="text-caption text-ink-3">
                  {(file.size / 1024 / 1024).toFixed(1)} MB
                </span>
                <button
                  type="button"
                  onClick={() => removeFile(i)}
                  aria-label={`Remove ${file.name}`}
                  className="text-ink-3 hover:text-red-600"
                >
                  <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden>
                    <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
