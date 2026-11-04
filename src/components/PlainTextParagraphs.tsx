type PlainTextParagraphsProps = {
  text: string;
  className?: string;
  paragraphClassName?: string;
};

export function PlainTextParagraphs({
  text,
  className,
  paragraphClassName,
}: PlainTextParagraphsProps) {
  const paragraphs = text
    .split(/\r?\n+/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  if (paragraphs.length === 0) return null;

  return (
    <div className={`plain-text-paragraphs ${className ?? ""}`}>
      {paragraphs.map((paragraph, index) => (
        <p className={`whitespace-pre-line ${paragraphClassName ?? ""}`} key={`${index}-${paragraph}`}>
          {paragraph}
        </p>
      ))}
    </div>
  );
}
