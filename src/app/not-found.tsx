import { Button, ArrowRight } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="container-content flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="text-h2 font-extrabold text-teal">404</p>
      <h1 className="mt-2 text-h1 text-ink">Page not found</h1>
      <p className="mt-3 max-w-md text-body-lg text-grey">
        The page you&apos;re looking for isn&apos;t here. Let&apos;s get you back
        to something useful.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Button href="/">Back home</Button>
        <Button href="/free-audit" variant="secondary">
          Get a free audit <ArrowRight />
        </Button>
      </div>
    </div>
  );
}
