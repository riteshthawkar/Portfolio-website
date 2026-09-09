# Profile Content

`profile.json` is the single source for the portfolio, LaTeX CV, and generated
GitHub profile README. Do not repeat experience or publication content in React
components or `cv/resume.tex`.

## Add Experience

The guided command is the simplest option:

```bash
npm run profile:add-experience
```

It asks for the role, company, dates, achievements, and where the entry should
appear. It validates the updated data and regenerates `cv/resume.tex`.

To edit JSON directly, add an object to `experiences` using this shape:

```json
{
  "id": "company-role",
  "role": "Role title",
  "company": "Company name",
  "companyUrl": "https://example.com",
  "location": "City, Country",
  "startDate": "2026-09",
  "endDate": null,
  "highlights": [
    "Describe a specific contribution and its measurable result."
  ],
  "includeInPortfolio": true,
  "includeInCv": true
}
```

Use `null` for a current role. Set either visibility flag to `false` when an
entry should only appear in one output. Dates are sorted automatically.

## Validate Changes

```bash
npm run validate:profile
npm run generate:cv
npm run build:github
```

Pushing to `main` runs these steps again, compiles `public/resume.pdf`, builds
the portfolio, and deploys GitHub Pages.
