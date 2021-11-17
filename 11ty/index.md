---
layout: base.njk
title: yo title
permalink: /
---


<h1>Hello world</h1>

{%  for item in collections.components %}
- [{{item.data.title}}]({{item.url}})
{% endfor %}
