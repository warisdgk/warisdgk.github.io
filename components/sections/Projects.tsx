import { ArrowUpRight } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { portfolio } from '@/data/portfolio';

export function Projects() {
  return (
    <Section id="projects" index="04" title="Projects">
      <ul className="space-y-2">
        {portfolio.projects.map((project, i) => (
          <Reveal key={project.name} delay={Math.min(i, 4) * 0.04}>
            <li>
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group -mx-4 block rounded-lg p-4 transition-colors hover:bg-card hover:shadow-sm cursor-pointer"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-xl font-semibold leading-snug transition-colors group-hover:text-accent">
                    {project.name}
                    <ArrowUpRight
                      className="ml-1 inline-block h-4 w-4 -translate-y-0.5 text-muted-foreground transition-all group-hover:-translate-y-1 group-hover:translate-x-0.5 group-hover:text-accent"
                      aria-hidden="true"
                    />
                  </h3>
                  {project.tag && (
                    <span className="shrink-0 rounded-full border border-border px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
                      {project.tag}
                    </span>
                  )}
                </div>

                <p className="mt-2 text-sm leading-relaxed text-secondary text-pretty">
                  {project.description}
                </p>

                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <li
                      key={t}
                      className="rounded-full bg-muted px-2.5 py-0.5 font-mono text-[11px] text-muted-foreground"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </a>
            </li>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
