## Validation

### In a Form

When a Select is placed inside a `form` element and validation logic is set on the Select component, the Select is validated when the `form` is submitted (as per a native `select` element).

Below, the "Title" field Select is marked as required and is validated when the `form` is submitted.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 360px
<script setup lang="ts">
import { VButton, VLayout, VOption, VSelect, VTextField } from '@vonage/vivid-vue';
</script>

<template>
	<form method="post" action="">
		<VLayout column-spacing="small" column-basis="block">
			<VSelect required label="Title" placeholder="Select an option">
				<VOption value="mr" text="Mr" />
				<VOption value="mrs" text="Mrs" />
				<VOption value="miss" text="Miss" />
				<VOption value="ms" text="Ms" />
			</VSelect>
			<VTextField required label="First name" />
			<VTextField required label="Last name" />
			<div class="buttons">
				<VButton label="Reset" appearance="outlined" type="reset" />
				<VButton label="Submit" appearance="filled" type="submit" />
			</div>
		</VLayout>
	</form>
</template>

<style scoped>
.buttons {
	display: flex;
	gap: 12px;
}
form {
	max-inline-size: 300px;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview 360px
<form method="post" action="">
	<vwc-layout column-spacing="small" column-basis="block">
		<vwc-select required label="Title" placeholder="Select an option">
			<vwc-option value="mr" text="Mr"></vwc-option>
			<vwc-option value="mrs" text="Mrs"></vwc-option>
			<vwc-option value="miss" text="Miss"></vwc-option>
			<vwc-option value="ms" text="Ms"></vwc-option>
		</vwc-select>
		<vwc-text-field required label="First name"></vwc-text-field>
		<vwc-text-field required label="Last name"></vwc-text-field>
		<div class="buttons">
			<vwc-button label="Reset" appearance="outlined" type="reset"></vwc-button>
			<vwc-button label="Submit" appearance="filled" type="submit"></vwc-button>
		</div>
	</vwc-layout>
</form>

<style>
	.buttons {
		display: flex;
		gap: 12px;
	}
	form {
		max-inline-size: 300px;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>

### Single Field

The Select component can be validated like the native `select` element.

Below, the Select is `required` but it has no selected option. The `checkedValidity()` method is called on the Select to validate it.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { VOption, VSelect } from '@vonage/vivid-vue';

const selectRef = ref<InstanceType<typeof VSelect> | null>(null);

onMounted(() => {
	selectRef.value?.$el.checkValidity?.();
});
</script>

<template>
	<VSelect ref="selectRef" required label="Title" placeholder="Select an option">
		<VOption value="mr" text="Mr" />
		<VOption value="mrs" text="Mrs" />
		<VOption value="miss" text="Miss" />
		<VOption value="ms" text="Ms" />
	</VSelect>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-select required label="Title" id="title" placeholder="Select an option">
	<vwc-option value="mr" text="Mr"></vwc-option>
	<vwc-option value="mrs" text="Mrs"></vwc-option>
	<vwc-option value="miss" text="Miss"></vwc-option>
	<vwc-option value="ms" text="Ms"></vwc-option>
</vwc-select>

<script>
	window.onload = () => {
		document.getElementById('title').checkValidity();
	};
</script>
```

</vwc-tab-panel>
</vwc-tabs>

## International Phone Number

The Select component is used in the example below as the dialing code part of an international phone number input field.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 240px
<script setup lang="ts">
import { VIcon, VOption, VSelect, VTextField } from '@vonage/vivid-vue';
import { computed, ref } from 'vue';

const options = [
	{ value: '1', text: 'United States', icon: 'flag-united-states', label: '+1' },
	{ value: '44', text: 'United Kingdom', icon: 'flag-united-kingdom', label: '+44' },
	{ value: '49', text: 'Germany', icon: 'flag-germany', label: '+49' },
	{ value: '355', text: 'Albania', icon: 'flag-albania', label: '+355' },
];

const selectedValue = ref('1');

const selectedIcon = computed(() => options.find((o) => o.value === selectedValue.value)?.icon ?? 'flag-united-states');
</script>

<template>
	<VTextField aria-label="Telephone number" type="tel" inputmode="tel" size="12">
		<template #leading-action-items>
			<VSelect fixed-dropdown aria-label="Country code" appearance="ghost" class="country-code" v-model="selectedValue">
				<template #icon>
					<VIcon :name="selectedIcon" />
				</template>
				<VOption v-for="opt in options" :key="opt.value" :value="opt.value" :text="opt.text" :label="opt.label">
					<template #icon>
						<VIcon :name="opt.icon" />
					</template>
				</VOption>
			</VSelect>
		</template>
	</VTextField>
</template>

<style scoped>
.country-code {
	inline-size: 120px;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview 240px
<vwc-text-field aria-label="Telephone number" type="tel" inputmode="tel" size="12">
	<vwc-select fixed-dropdown aria-label="Country code" appearance="ghost" class="country-code" id="country-code" slot="leading-action-items">
		<vwc-icon slot="icon" name="flag-united-states"></vwc-icon>
		<vwc-option value="1" text="United States" label="+1">
			<vwc-icon slot="icon" name="flag-united-states"></vwc-icon>
		</vwc-option>
		<vwc-option value="44" text="United Kingdom" label="+44">
			<vwc-icon slot="icon" name="flag-united-kingdom"></vwc-icon>
		</vwc-option>
		<vwc-option value="49" text="Germany" label="+49">
			<vwc-icon slot="icon" name="flag-germany"></vwc-icon>
		</vwc-option>
		<vwc-option value="355" text="Albania" label="+355">
			<vwc-icon slot="icon" name="flag-albania"></vwc-icon>
		</vwc-option>
	</vwc-select>
</vwc-text-field>

<script>
	const select = document.getElementById('country-code');
	select?.addEventListener('change', (e) => {
		select.icon = select.selectedOptions[0].icon;
	});
</script>

<style>
	.country-code {
		inline-size: 120px;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>

## Call Status

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 250px
<script setup lang="ts">
import { VIcon, VOption, VSelect } from '@vonage/vivid-vue';
import { ref } from 'vue';

const status = ref('ready');
</script>

<template>
	<VSelect class="call-status" aria-label="Status" v-model="status">
		<template #icon>
			<VIcon class="icon" name="bullet-solid" />
		</template>
		<template #meta>
			<span class="duration">00:00:00</span>
		</template>
		<VOption value="ready" text="Ready">
			<template #icon>
				<VIcon class="icon" name="bullet-solid" />
			</template>
		</VOption>
		<VOption value="away" text="Away">
			<template #icon>
				<VIcon class="icon" name="bullet-solid" />
			</template>
		</VOption>
		<VOption value="extended-away" text="Extended away">
			<template #icon>
				<VIcon class="icon" name="bullet-solid" />
			</template>
		</VOption>
		<VOption value="logged-out" text="Logged out">
			<template #icon>
				<VIcon class="icon" name="bullet-solid" />
			</template>
		</VOption>
	</VSelect>
</template>

<style scoped>
.call-status {
	width: 280px;
}
.icon {
	font-size: 12px;
}
.call-status[current-value='ready'] > .icon,
vwc-option[value='ready'] > vwc-icon {
	color: var(--vvd-color-success-300);
}
.call-status[current-value='away'] > .icon,
[value='away'] > .icon {
	color: var(--vvd-color-warning-300);
}
.call-status[current-value='extended-away'] > .icon,
[value='extended-away'] > .icon {
	color: var(--vvd-color-announcement-500);
}
.call-status[current-value='logged-out'] > .icon,
[value='logged-out'] > .icon {
	color: var(--vvd-color-neutral-300);
}
.duration {
	color: var(--vvd-color-neutral-600);
	text-align: end;
	flex-grow: 1;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview 250px
<vwc-select class="call-status" aria-label="Status">
	<vwc-icon class="icon" slot="icon" name="bullet-solid"></vwc-icon>
	<span slot="meta" class="duration">00:00:00</span>
	<vwc-option value="ready" text="Ready">
		<vwc-icon class="icon" slot="icon" name="bullet-solid"></vwc-icon>
	</vwc-option>
	<vwc-option value="away" text="Away">
		<vwc-icon class="icon" slot="icon" name="bullet-solid"></vwc-icon>
	</vwc-option>
	<vwc-option value="extended-away" text="Extended away">
		<vwc-icon class="icon" slot="icon" name="bullet-solid"></vwc-icon>
	</vwc-option>
	<vwc-option value="logged-out" text="Logged out">
		<vwc-icon class="icon" slot="icon" name="bullet-solid"></vwc-icon>
	</vwc-option>
</vwc-select>

<style>
	.call-status {
		width: 280px;
	}
	.icon {
		font-size: 12px;
	}
	.call-status[current-value='ready'] > .icon,
	vwc-option[value='ready'] > vwc-icon {
		color: var(--vvd-color-success-300);
	}
	.call-status[current-value='away'] > .icon,
	[value='away'] > .icon {
		color: var(--vvd-color-warning-300);
	}
	.call-status[current-value='extended-away'] > .icon,
	[value='extended-away'] > .icon {
		color: var(--vvd-color-announcement-500);
	}
	.call-status[current-value='logged-out'] > .icon,
	[value='logged-out'] > .icon {
		color: var(--vvd-color-neutral-300);
	}
	.duration {
		color: var(--vvd-color-neutral-600);
		text-align: end;
		flex-grow: 1;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>

## User Selection

The Select component can be used Avatar to implement a user selector.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 250px
<script setup lang="ts">
import { VAvatar, VOption, VSelect } from '@vonage/vivid-vue';
import { computed, ref } from 'vue';

const users = [
	{ value: '1', text: 'Ada Lovelace', initials: 'AL' },
	{ value: '2', text: 'Alan Turing', initials: 'AT' },
	{ value: '3', text: 'Grace Hopper', initials: 'GH' },
];

const selectedUser = ref('1');

const currentUser = computed(() => users.find((u) => u.value === selectedUser.value) ?? users[0]);
</script>

<template>
	<VSelect label="User" v-model="selectedUser">
		<template #icon>
			<VAvatar shape="pill" size="condensed" appearance="duotone" :initials="currentUser.initials" />
		</template>
		<VOption v-for="user in users" :key="user.value" :value="user.value" :text="user.text">
			<template #icon>
				<VAvatar shape="pill" size="condensed" appearance="duotone" :initials="user.initials" />
			</template>
		</VOption>
	</VSelect>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview 250px
<vwc-select label="User">
	<vwc-avatar slot="icon" shape="pill" size="condensed" appearance="duotone" initials="AL"></vwc-avatar>
	<vwc-option value="1" text="Ada Lovelace">
		<vwc-avatar slot="icon" shape="pill" size="condensed" appearance="duotone" initials="AL"></vwc-avatar>
	</vwc-option>
	<vwc-option value="2" text="Alan Turing">
		<vwc-avatar slot="icon" shape="pill" size="condensed" appearance="duotone" initials="AT"></vwc-avatar>
	</vwc-option>
	<vwc-option value="3" text="Grace Hopper">
		<vwc-avatar slot="icon" shape="pill" size="condensed" appearance="duotone" initials="GH"></vwc-avatar>
	</vwc-option>
</vwc-select>
<script>
	document.querySelector('vwc-select').addEventListener('change', (e) => {
		document.querySelector('vwc-select > vwc-avatar').initials = e.currentTarget.selectedOptions[0].querySelector('vwc-avatar').initials;
	});
</script>
```

</vwc-tab-panel>
</vwc-tabs>
