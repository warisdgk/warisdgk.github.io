import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { portfolio } from '@/data/portfolio';

export function Experience() {
  return (
    <Section id="experience" index="03" title="Experience">
      <ol className="space-y-2">
        {portfolio.experience.map((job, i) => (
          <Reveal key={`${job.company}-${job.start}`} delay={Math.min(i, 4) * 0.04}>
            <li>
              <article className="group -mx-4 grid gap-2 rounded-lg p-4 transition-colors hover:bg-card hover:shadow-sm sm:grid-cols-[8.5rem_1fr] sm:gap-6">
                <header className="pt-1 font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground">
                  {job.start} - {job.end}
                </header>

                <div>
                  <h3 className="font-display text-lg font-semibold leading-snug transition-colors group-hover:text-accent">
                    {job.role}
                    <span className="text-secondary"> · {job.company}</span>
                  </h3>
                  <p className="mt-0.5 font-mono text-xs text-muted-foreground">
                    {job.location}
                    {job.via ? ` · ${job.via}` : ''}
                  </p>

                  <ul className="mt-3 space-y-2">
                    {job.points.map((point, j) => (
                      <li key={j} className="flex gap-3 text-sm leading-relaxed text-secondary">
                        <span
                          className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent"
                          aria-hidden="true"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>

                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {job.tech.map((t) => (
                      <li
                        key={t}
                        className="rounded-full border border-border px-2.5 py-0.5 font-mono text-[11px] text-muted-foreground"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </li>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
