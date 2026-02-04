## Connotation

The `connotation` attribute controls the color of the Progress Ring component.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VProgressRing } from '@vonage/vivid-vue';
</script>
<template>
	<p>accent (default)</p>
	<VProgressRing connotation="accent" />
	<p>cta</p>
	<VProgressRing connotation="cta" />
	<p>success</p>
	<VProgressRing connotation="success" />
	<p>alert</p>
	<VProgressRing connotation="alert" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview
<p>accent (default)</p>
<vwc-progress-ring connotation="accent"></vwc-progress-ring>
<p>cta</p>
<vwc-progress-ring connotation="cta"></vwc-progress-ring>
<p>success</p>
<vwc-progress-ring connotation="success"></vwc-progress-ring>
<p>alert</p>
<vwc-progress-ring connotation="alert"></vwc-progress-ring>
```

</vwc-tab-panel>
</vwc-tabs>

## Size

Use the `size` attribute to set the progress ring's size. Set a numeric value from `-6` to `5`. The default is `0`.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VProgressRing } from '@vonage/vivid-vue';
</script>
<template>
	<table>
		<thead>
			<tr>
				<th>Size</th>
				<th>Default Dimension (px)</th>
				<th>Example</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>-6</td>
				<td>16px</td>
				<td>
					<VProgressRing :min="0" :max="50" :value="50" size="-6" />
				</td>
			</tr>
			<tr>
				<td>-5</td>
				<td>20px</td>
				<td>
					<VProgressRing :min="0" :max="50" :value="50" size="-5" />
				</td>
			</tr>
			<tr>
				<td>-4</td>
				<td>24px</td>
				<td>
					<VProgressRing :min="0" :max="50" :value="50" size="-4" />
				</td>
			</tr>
			<tr>
				<td>-3</td>
				<td>28px</td>
				<td>
					<VProgressRing :min="0" :max="50" :value="50" size="-3" />
				</td>
			</tr>
			<tr>
				<td>-2</td>
				<td>32px</td>
				<td>
					<VProgressRing :min="0" :max="50" :value="50" size="-2" />
				</td>
			</tr>
			<tr>
				<td>-1</td>
				<td>36px</td>
				<td>
					<VProgressRing :min="0" :max="50" :value="50" size="-1" />
				</td>
			</tr>
			<tr>
				<td>0</td>
				<td>40px</td>
				<td>
					<VProgressRing :min="0" :max="50" :value="50" size="0" />
				</td>
			</tr>
			<tr>
				<td>1</td>
				<td>44px</td>
				<td>
					<VProgressRing :min="0" :max="50" :value="50" size="1" />
				</td>
			</tr>
			<tr>
				<td>2</td>
				<td>48px</td>
				<td>
					<VProgressRing :min="0" :max="50" :value="50" size="2" />
				</td>
			</tr>
			<tr>
				<td>3</td>
				<td>52px</td>
				<td>
					<VProgressRing :min="0" :max="50" :value="50" size="3" />
				</td>
			</tr>
			<tr>
				<td>4</td>
				<td>56px</td>
				<td>
					<VProgressRing :min="0" :max="50" :value="50" size="4" />
				</td>
			</tr>
			<tr>
				<td>5</td>
				<td>60px</td>
				<td>
					<VProgressRing :min="0" :max="50" :value="50" size="5" />
				</td>
			</tr>
		</tbody>
	</table>
</template>
<style>
table {
	border-collapse: collapse;
}
th,
td {
	text-align: right;
	padding: 8px;
	border: 1px solid var(--vvd-color-neutral-200);
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview
<table>
	<thead>
		<tr>
			<th>Size</th>
			<th>Default Dimension (px)</th>
			<th>Example</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>-6</td>
			<td>16px</td>
			<td>
				<vwc-progress-ring min="0" max="50" value="50" size="-6"></vwc-progress-ring>
			</td>
		</tr>
		<tr>
			<td>-5</td>
			<td>20px</td>
			<td>
				<vwc-progress-ring min="0" max="50" value="50" size="-5"></vwc-progress-ring>
			</td>
		</tr>
		<tr>
			<td>-4</td>
			<td>24px</td>
			<td>
				<vwc-progress-ring min="0" max="50" value="50" size="-4"></vwc-progress-ring>
			</td>
		</tr>
		<tr>
			<td>-3</td>
			<td>28px</td>
			<td>
				<vwc-progress-ring min="0" max="50" value="50" size="-3"></vwc-progress-ring>
			</td>
		</tr>
		<tr>
			<td>-2</td>
			<td>32px</td>
			<td>
				<vwc-progress-ring min="0" max="50" value="50" size="-2"></vwc-progress-ring>
			</td>
		</tr>
		<tr>
			<td>-1</td>
			<td>36px</td>
			<td>
				<vwc-progress-ring min="0" max="50" value="50" size="-1"></vwc-progress-ring>
			</td>
		</tr>
		<tr>
			<td>0</td>
			<td>40px</td>
			<td>
				<vwc-progress-ring min="0" max="50" value="50" size="0"></vwc-progress-ring>
			</td>
		</tr>
		<tr>
			<td>1</td>
			<td>44px</td>
			<td>
				<vwc-progress-ring min="0" max="50" value="50" size="1"></vwc-progress-ring>
			</td>
		</tr>
		<tr>
			<td>2</td>
			<td>48px</td>
			<td>
				<vwc-progress-ring min="0" max="50" value="50" size="2"></vwc-progress-ring>
			</td>
		</tr>
		<tr>
			<td>3</td>
			<td>52px</td>
			<td>
				<vwc-progress-ring min="0" max="50" value="50" size="3"></vwc-progress-ring>
			</td>
		</tr>
		<tr>
			<td>4</td>
			<td>56px</td>
			<td>
				<vwc-progress-ring min="0" max="50" value="50" size="4"></vwc-progress-ring>
			</td>
		</tr>
		<tr>
			<td>5</td>
			<td>60px</td>
			<td>
				<vwc-progress-ring min="0" max="50" value="50" size="5"></vwc-progress-ring>
			</td>
		</tr>
	</tbody>
</table>

<style>
	table {
		border-collapse: collapse;
	}
	th,
	td {
		text-align: right;
		padding: 8px;
		border: 1px solid var(--vvd-color-neutral-200);
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>

## Paused

The `paused` attribute shows a disabled / paused state of the progress.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VProgressRing } from '@vonage/vivid-vue';
</script>
<template>
	<VProgressRing :min="0" :max="50" :value="25" paused />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-progress-ring min="0" max="50" value="25" paused></vwc-progress-ring>
```

</vwc-tab-panel>
</vwc-tabs>

## Value

Providing a numeric value to the `value` attribute sets the amount of progress to be displayed in [determinate state](/components/progress-ring/use-cases/#determinate-state). In order to present an [indeterminate state](/components/progress-ring/use-cases/#indeterminate-state) either omit the `value` attribute or provide a non-numeric value.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VProgressRing } from '@vonage/vivid-vue';
</script>
<template>
	<p>Determinate</p>
	<VProgressRing value="50" aria-label="You are 50% through the process" />
	<p>Indeterminate</p>
	<VProgressRing aria-label="Loading search results" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview
<p>Determinate</p>
<vwc-progress-ring value="50" aria-label="You are 50% through the process"></vwc-progress-ring>
<p>Indeterminate</p>
<vwc-progress-ring aria-label="Loading search results"></vwc-progress-ring>
```

</vwc-tab-panel>
</vwc-tabs>

## Min / Max

Use `min` and `max` attributes to determine the range of the progress.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VLayout, VProgressRing } from '@vonage/vivid-vue';
</script>
<template>
	<VLayout gutters="small" column-basis="block">
		<VProgressRing :min="0" :max="50" :value="12.5" />
		<VProgressRing :min="0" :max="50" :value="50" />
		<VProgressRing :min="0" :max="100" :value="50" />
	</VLayout>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview blocks
<vwc-progress-ring min="0" max="50" value="12.5"></vwc-progress-ring>
<vwc-progress-ring min="0" max="50" value="50"></vwc-progress-ring>
<vwc-progress-ring min="0" max="100" value="50"></vwc-progress-ring>
```

</vwc-tab-panel>
</vwc-tabs>
