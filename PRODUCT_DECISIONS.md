# Product Decisions

This file documents product and business decisions made for the portfolio site.

## 2026

### March

## [2026-03-02] - Tools & Tech Section Curation Strategy

**Decision**: Cap the Tools & Tech section at 6 categories × 5 items (30 tags total). The full skills list lives on resume and LinkedIn only. No overflow section, expandable UI, or per-role tech tags on the portfolio site.

**Why**: The portfolio site follows a minimal design aesthetic (per CLAUDE.md). A wall of 50+ tags creates cognitive overload and fights the clean visual language. The curated 30 tags signal differentiation (Identity & Auth, AI tooling, modern DevOps) while table-stakes items (Figma, Git, Jira) are cut since they're implied or don't move the needle. The resume handles exhaustive enumeration; the portfolio curates.

**Trade-offs**:
- Visitors won't see the full breadth of tools on the site itself
- Some legitimate experience (Angular, Vercel, AWS) is hidden
- But: People who care about whether you know Figma vs. Miro are reading your resume, not browsing your portfolio. Three surfaces (site, resume, LinkedIn) now have distinct jobs with no redundancy.

---
