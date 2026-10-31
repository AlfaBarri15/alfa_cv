import type { Dictionary } from "@/i18n";

export function Banner({ labels }: { labels: Dictionary }) {
  return (
    <div className="no-print border-b border-accent/30 bg-accent/15 px-4 py-3 text-sm text-paper sm:px-6">
      <p>{labels.sample}</p>
    </div>
  );
}
