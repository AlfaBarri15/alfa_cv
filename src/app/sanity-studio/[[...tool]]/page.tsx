import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";
import { isSanityConfigured } from "../../../../sanity/lib/client";

export const dynamic = "force-static";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <main className="mx-auto flex min-h-screen w-full max-w-xl flex-col justify-center px-4 sm:px-6">
        <p className="text-xs tracking-[0.22em] text-accent uppercase">Studio</p>
        <h1 className="name-gradient mt-4 font-serif text-[clamp(2rem,8vw,3rem)] font-bold">
          Connect a Sanity project
        </h1>
        <p className="mt-6 leading-relaxed text-muted">
          Set <code className="text-accent">NEXT_PUBLIC_SANITY_PROJECT_ID</code> in{" "}
          <code className="text-accent">.env</code>, then restart the dev server. This address
          loads the editor after that.
        </p>
      </main>
    );
  }

  return <NextStudio config={config} />;
}
