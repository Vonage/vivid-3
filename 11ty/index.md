---
layout: base.njk
title: yo title
permalink: /
---


<h1>Hello world</h1>

{%  for item in components %}
- [{{item.name}}](components/{{item.name}})
{% endfor %}
