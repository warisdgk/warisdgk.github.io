import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { portfolio } from '@/data/portfolio';

export function Skills() {
  return (
    <Section id="skills" index="02" title="Skills">
      <div className="divide-y divide-border">
        {portfolio.skills.map((group, i) => (
          <Reveal key={group.title} delay={Math.min(i, 4) * 0.04}>
            <div className="grid gap-3 py-5 sm:grid-cols-[11rem_1fr] sm:gap-6">
              <h3 className="pt-1 font-mono text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                {group.title}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-md border border-border bg-card px-2.5 py-1 text-sm text-secondary transition-colors hover:border-accent/50 hover:text-foreground"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
