<template>
	<div class="container">
		<b-card
			border-variant="secondary"
			:header="title"
			header-border-variant="secondary"
			align="center"
		>
			<b-card-text>{{ content }}</b-card-text>
			<p class="font-italic">{{ author }}</p>
		</b-card>
	</div>
</template>

<script>

export default {
    name: "Card",
    props: {
        title: String,
        content: String,
        author: String
    }
};
</script>
