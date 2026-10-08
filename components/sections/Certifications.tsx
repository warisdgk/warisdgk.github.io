import { BadgeCheck } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { portfolio } from '@/data/portfolio';

export function Certifications() {
  return (
    <Section id="certifications" index="06" title="Certifications">
      <div className="grid gap-x-8 gap-y-px sm:grid-cols-2">
        {portfolio.certifications.map((c, i) => (
          <Reveal key={c.name} delay={(i % 2) * 0.05}>
            <div className="flex items-start gap-3 border-b border-border py-4">
              <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
              <div>
                <p className="text-sm font-medium leading-snug text-foreground">{c.name}</p>
                <p className="mt-1 font-mono text-xs text-muted-foreground">
                  {c.issuer} · {c.year}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
