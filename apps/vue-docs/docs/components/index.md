# Components

Here is a list of components provided by the Vivid Vue library:

<ul>
 <li v-for="component in components" :key="component.text">
    <a :href="'/vivid-vue' + component.link.replace('.md', '')">{{ component.text }}</a>
 </li>
</ul>

<script setup>
import components from '../components/_index.json';
</script>
