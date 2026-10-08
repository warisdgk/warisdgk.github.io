import { Fragment } from 'react';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { portfolio } from '@/data/portfolio';

function renderFormattedText(text: string) {
  const parts = text.split(/(\*\*.*?\*\*)/g);

  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }

    return <Fragment key={index}>{part}</Fragment>;
  });
}

export function About() {
  const { paragraphs, highlights } = portfolio.about;

  return (
    <Section id="about" index="01" title="About">
      <div className="space-y-5">
        {paragraphs.map((p, i) => (
          <Reveal key={i} delay={i * 0.06}>
            <p
              className={
                i === 0
                  ? 'text-lg leading-relaxed text-foreground text-pretty md:text-xl'
                  : 'text-base leading-relaxed text-secondary text-pretty md:text-lg'
              }
            >
              {renderFormattedText(p)}
            </p>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <dl className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-3">
          {highlights.map((h) => (
            <div key={h.label} className="bg-card p-5">
              <dt className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                {h.label}
              </dt>
              <dd className="mt-2 font-display text-xl font-semibold">{h.value}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </Section>
  );
}
