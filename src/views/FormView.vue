<script setup>
import { db } from '@/firebase';
import { ref, onMounted } from 'vue';
import { get, ref as firebaseRef, onValue, push, set, update, remove } from 'firebase/database';

const itemsRef = firebaseRef(db, 'items');
const items = ref([]);
const newItem = ref({ name: '', address: '' });
const editedItem = ref({ id: '', name: '', address: '' });
const editMode = ref(false);

onMounted(() => {
	onValue(itemsRef, (snapshot) => {
		const dataFromFirebase = snapshot.val();
		if (dataFromFirebase) {
			items.value = Object.keys(dataFromFirebase).map((key) => ({ id: key, ...dataFromFirebase[key] }));
		}
	});
});

const addItem = async () => {
	await push(itemsRef, newItem.value);
	newItem.value = { name: '', address: '' };
};

const deleteItem = async (id) => {
	await remove(firebaseRef(itemsRef, id));
};
</script>

<template>
	<div class="container form">
		<header class="text-start c-blue mb-5">
			<h1>Buku Tamu</h1>
			<p>Dharma Wanita Persatuan <br> Dinas Pendidikan dan Kebudayaan Kalimantan Timur</p>
		</header>

		<!-- Create: Add new item -->
		<div>
			<form @submit.prevent="addItem">
				<div class="mb-3">
					<input placeholder="Nama Lengkap" class="form-control" v-model="newItem.name" required />
				</div>
				<div class="mb-3">
					<input placeholder="Alamat" class="form-control" v-model="newItem.address" required />
				</div>
				<button class="btn btn-primary bg-blue" type="submit">Simpan</button>
			</form>
		</div>
	</div>
</template>

