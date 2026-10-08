/**
 * Static export for GitHub Pages.
 *
 * basePath logic: a user/org site (repo named "<username>.github.io") is served
 * from the domain root, so basePath stays empty. A project site (any other repo
 * name) is served from "/<repo>", so we read the repo name from the GitHub
 * Actions env and set basePath accordingly. This makes the same code deploy
 * correctly whether a forker uses a user site or a project site.
 */
const repo = process.env.GITHUB_REPOSITORY || '';
const repoName = repo.split('/')[1] || '';
const isUserSite = repoName.endsWith('.github.io');
const basePath = !isUserSite && repoName ? `/${repoName}` : '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  basePath,
  // Expose basePath to the client so asset URLs (CV, OG image) resolve under project sites.
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  trailingSlash: true,
};

module.exports = nextConfig;
