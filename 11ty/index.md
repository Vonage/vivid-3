---
title: yo title
permalink: /
---


<h1>Hello world</h1>

{%  for component in collections.components %}
- [{{component.data.title}}]({{component.url}})
{% endfor %}
