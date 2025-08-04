<script setup lang="ts">
import { VButton, VCheckbox, VTextArea, VTextField } from '@vonage/vivid-vue';
import { reactive } from 'vue';

const data = reactive({
	email: '',
	password: '',
	note: '',
	remember: false,
	didLogin: false,
});
</script>

<template>
	<main>
		<VTextField
			label="Email"
			type="email"
			data-testid="email"
			v-model="data.email"
			error-text="My error"
		/>
		<VTextField
			label="Password"
			type="password"
			data-testid="password"
			v-model="data.password"
		/>
		<VTextArea label="Note" data-testid="note" v-model="data.note" />
		<VCheckbox
			label="Remember"
			data-testid="remember"
			v-model="data.remember"
		/>
		<VButton label="Login" data-testid="login" @click="data.didLogin = true" />
		<pre>
      {{ JSON.stringify(data) }}
    </pre>
	</main>
</template>
