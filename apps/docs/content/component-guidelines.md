---
tags: components
pagination:
  data: componentsNew
  size: 1
  alias: component
permalink: 'components/{{ component | componentSlug }}/guidelines/'
layout: component.njk
eleventyComputed:
  githubEditLink: '{{ component.guidelines | githubEditLink }}'
---

{% renderFile component.guidelines %}
