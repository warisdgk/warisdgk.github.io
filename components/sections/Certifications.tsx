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
                <p className="text-sm font-medium leading-snug text-foreground">
                  {c.href ? (
                    <a
                      href={c.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-pointer underline decoration-border underline-offset-4 transition-colors hover:text-accent hover:decoration-accent focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                    >
                      {c.name}
                    </a>
                  ) : (
                    c.name
                  )}
                </p>
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
