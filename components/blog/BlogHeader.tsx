export function BlogHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <header>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-balance md:text-5xl">
        {title}
      </h1>
      {description && (
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-secondary text-pretty">{description}</p>
      )}
    </header>
  );
}
