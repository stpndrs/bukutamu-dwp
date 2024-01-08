<script setup>
import { db } from '@/firebase';
import { ref, onMounted } from 'vue';
import { getDocs, collection } from 'firebase/firestore';
import { get, ref as firebaseRef, onValue } from 'firebase/database';

const data = ref([]);
const name = ref('')
const address = ref('')
const count = ref(0)

onMounted(async () => {
    console.log('Firestore instance:', db);

    // Reference to your Firebase database
    const database = db;

    // Reference to a specific node in the database
    const itemsRef = firebaseRef(database, 'items');

    // Listen for changes in the database
    onValue(itemsRef, (snapshot) => {
        const dataFromFirebase = snapshot.val();
        if (dataFromFirebase) {
            data.value = Object.values(dataFromFirebase);
        }
        name.value = data.value[data.value.length - 1].name
        address.value = data.value[data.value.length - 1].address
        count.value = data.value.length
    });
});
</script>

<template>
    <div class="container">
        <header class="d-flex align-items-center">
            <img src="../assets/kaltim.png" alt="KALTIM">
            <p>Dinas Pendidikan dan Kebudayaan <br> Provinsi Kalimantan Timur</p>
        </header>
        <main class="text-center mb-5 c-blue">
            <p class="fs-35">Selamat HUT ke-67 Kalimantan Timur</p>
            <h1 class="fs-80">Selamat Datang, <br> <span class="c-yellow name">{{ name }}</span></h1>
            <h4 class="c-yellow mb-4">{{ address }}</h4>
            <p class="fs-20">Dharma Wanita Persatuan DISDIKBUD Provinsi KALTIM berperan membangun KALTIM untuk nusantara,
                melalui pembinaan keluarga dan generasi sehat berakhlak dan berbudaya.</p>
        </main>
        <footer>
            <p class="c-yellow fw-bold">Jumlah pengunjung: {{ count }}</p>
        </footer>
    </div>
</template>