---
tags: components
pagination:
  data: componentsNew
  size: 1
  alias: component
permalink: 'components/{{ component | pageSlug }}/guidelines/'
layout: component.njk
---

{% renderFile component.guidelines %}

{% editOnGitHub component.guidelines %}
