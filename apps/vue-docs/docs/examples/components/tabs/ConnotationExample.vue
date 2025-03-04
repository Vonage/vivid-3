<template>
	<VTabs activeid="apps" connotation="cta">
		<VTab id="apps" label="Appetizers" />
		<VTab id="entrees" label="Entrees" />
		<VTab id="desserts" label="Desserts" />
		<VTabPanel>
			<ol>
				<li>Stuffed artichokes</li>
				<li>Bruschetta</li>
				<li>Oven-baked polenta</li>
				<li>Salami and Fig Crostini with Ricotta</li>
				<li>Rosemary-Potato Focaccia with Goat Cheese</li>
			</ol>
		</VTabPanel>
		<VTabPanel>
			<ol>
				<li>Mushroom-Sausage Ragù</li>
				<li>Tomato Bread Soup with Steamed Mussels</li>
				<li>Grilled Fish with Artichoke Caponata</li>
				<li>Celery Root and Mushroom Lasagna</li>
				<li>Osso Buco with Citrus Gremolata</li>
			</ol>
		</VTabPanel>
		<VTabPanel>
			<ol>
				<li>Tiramisu</li>
				<li>Spumoni</li>
				<li>Limoncello and Ice Cream with Biscotti</li>
			</ol>
		</VTabPanel>
	</VTabs>
</template>

<script setup lang="ts">
import { VTabs, VTab, VTabPanel } from '@vonage/vivid-vue';
</script>
