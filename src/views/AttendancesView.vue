<script setup>
import { db } from '@/firebase';
import { ref, onMounted } from 'vue';
import { getDocs, collection } from 'firebase/firestore';
import { get, ref as firebaseRef, onValue } from 'firebase/database';

const data = ref([]);

onMounted(async () => {
	console.log('Firestore instance:', db);

	// Reference to your Firebase database
	const database = db;

	// Reference to a specific node in the database
	const itemsRef = firebaseRef(database, 'items');

	// Listen for changes in the database
	onValue(itemsRef, (snapshot) => {
		const dataFromFirebase = snapshot.val();
		console.log(dataFromFirebase);
		if (dataFromFirebase) {
			data.value = Object.values(dataFromFirebase);
		}
	});
});
</script>

<template>
	<main class="container">
		<h1 class="text-center">List Pengunjung</h1>
		<table class="table table-stripped table-hover">
			<thead>
				<tr>
					<th>#</th>
					<th>Nama</th>
					<th>Alamat</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(d, i) in data" :key="d.id">
					<td>{{ i + 1 }}</td>
					<td>{{ d.name }}</td>
					<td>{{ d.address }}</td>
				</tr>
			</tbody>
		</table>
	</main>
</template>
