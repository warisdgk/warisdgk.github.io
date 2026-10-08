import { siteConfig } from '@/config/site.config';

export function Footer() {
  return (
    <footer className="mt-8 border-t border-border py-10">
      <p className="font-mono text-xs text-muted-foreground">
        {siteConfig.name} · {siteConfig.location}
      </p>
    </footer>
  );
}
