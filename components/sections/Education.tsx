import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { portfolio } from '@/data/portfolio';

export function Education() {
  return (
    <Section id="education" index="05" title="Education">
      <div className="divide-y divide-border border-y border-border">
        {portfolio.education.map((e, i) => (
          <Reveal key={e.degree} delay={(i % 2) * 0.06}>
            <div className="grid gap-1 py-5 sm:grid-cols-[8.5rem_1fr] sm:gap-6">
              <p className="pt-0.5 font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground">
                {e.period}
              </p>
              <div>
                <h3 className="font-display text-lg font-semibold leading-snug">{e.degree}</h3>
                <p className="mt-0.5 text-sm text-secondary">{e.school}</p>
                <p className="mt-0.5 font-mono text-xs text-muted-foreground">{e.location}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
