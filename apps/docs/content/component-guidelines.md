---
tags: components
pagination:
  data: componentGuidelines
  size: 1
  alias: component
permalink: 'components/{{ component | componentSlug }}/guidelines/'
layout: component.njk
eleventyComputed:
  pageTitle: '{{ component.title }} - Guidelines'
  githubEditLink: '{{ component.guidelines | githubEditLink }}'
---

{% renderFile component.guidelines %}
