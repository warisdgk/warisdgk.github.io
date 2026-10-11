import { Fragment } from 'react';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { siteConfig } from '@/config/site.config';
import { portfolio } from '@/data/portfolio';
import { asset } from '@/lib/asset';

function renderFormattedText(text: string) {
  const parts = text.split(/(\*\*.*?\*\*)/g);

  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }

    return <Fragment key={index}>{part}</Fragment>;
  });
}

function paragraphClass(index: number) {
  return index === 0
    ? 'text-lg leading-relaxed text-foreground text-pretty md:text-xl'
    : 'text-base leading-relaxed text-secondary text-pretty md:text-lg';
}

/** Local public paths pick up basePath. Full http(s) URLs are left as written. */
function portraitSrc(src: string) {
  if (/^https?:\/\//.test(src)) return src;
  return asset(src);
}

export function About() {
  const { paragraphs, highlights } = portfolio.about;
  const portrait = siteConfig.aboutImage;
  const showPortrait = portrait.enabled && portrait.src.trim().length > 0;
  const portraitAlt = portrait.alt.trim() || siteConfig.name;

  const copy = paragraphs.map((p, i) => (
    <p key={i} className={paragraphClass(i)}>
      {i === 0 && showPortrait && (
        <img
          src={portraitSrc(portrait.src)}
          alt={portraitAlt}
          className="float-right -mt-5 mb-3 ml-5 w-28 md:mb-4 md:ml-6 md:w-44"
        />
      )}
      {renderFormattedText(p)}
    </p>
  ));

  return (
    <Section id="about" index="01" title="About">
      {showPortrait ? (
        <Reveal>
          <div className="flow-root space-y-5">{copy}</div>
        </Reveal>
      ) : (
        <div className="space-y-5">
          {copy.map((paragraph, i) => (
            <Reveal key={i} delay={i * 0.06}>
              {paragraph}
            </Reveal>
          ))}
        </div>
      )}

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
