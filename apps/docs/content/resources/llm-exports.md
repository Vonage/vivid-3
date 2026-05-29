---
title: LLM Export Files
order: 5
---

# LLM Export Files

Vivid now publishes machine-readable documentation targets for LLM usage.
These files are intended to make it easy for models to consume Vivid guidance, component API notes, and site content without scraping HTML.

## Available LLM exports

- `/llms.txt` — a site-level LLM guide with general usage recommendations for Vivid.
- `/llms_full.txt` — a full-site machine-readable export containing the entire generated docs site content.
- `/components/<component>/<section>/llms.txt` — component-specific exports for individual docs sections such as:
  - `guidelines`
  - `code`
  - `use-cases`
  - `variations`
  - `accessibility`

## Purpose

These LLM export files are designed to provide:

- a simpler, text-only alternative to HTML pages
- consistent sources for embedding or search-indexing
- component-specific reference material without navigation or site chrome

## File formats

Each `.txt` export is plain UTF-8 text.
The component-level files include only the corresponding content section, while the top-level exports contain broader guidance and the full docs content.

## How to use

Use these files to build embeddings, search indices, or prompt-generation pipelines that need Vivid-specific context.
For example:

- ingest `/llms.txt` for general Vivid styling and framework guidance
- ingest component `/components/button/guidelines/llms.txt` for button-specific usage
- ingest `/llms_full.txt` when you need the full site corpus in one file
