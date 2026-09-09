# Ritesh Thawkar Portfolio

The portfolio, downloadable CV, and GitHub profile README are generated from
`content/profile.json`.

## Updating Profile Content

Edit `content/profile.json`, then run:

```bash
npm run validate:profile
npm run generate:cv
npm run generate:readme
npm run build:github
```

Compile `cv/resume.tex` with `pdflatex` when updating the checked-in PDF
locally. GitHub Actions compiles it automatically before every Pages deployment.

## Publication Discovery

`npm run discover:publications` checks the configured author records in:

- arXiv
- OpenAlex
- Semantic Scholar
- Crossref
- DBLP

Candidates are deduplicated by normalized title and stable publication IDs.
An exact arXiv author match or agreement between at least two sources is required
before a candidate is proposed.

The weekly `Discover Publications` workflow opens or updates a pull request for
review. It does not merge publication metadata automatically. This protects venue
labels, author order, and publication status from third-party metadata errors.

Google Scholar is linked from the site but is not scraped because it does not
offer supported bulk API access. LinkedIn is not used for discovery because
member-content read access is restricted. A reviewable LinkedIn announcement
draft is generated for each newly discovered publication.
