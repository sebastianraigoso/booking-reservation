<script setup>
import { ref, onMounted } from 'vue'

const bookings = ref([])

async function fetchBookings() {
  const res = await fetch('http://localhost:3000/bookings')
  bookings.value = await res.json() // convert HTTP response
}

onMounted(fetchBookings)  // will call everytime we are on admin page
</script>

<template>
  <div>
    <h1>Admin Page</h1>
    <router-link to="/">Home</router-link>
    <ul>
      <li v-for="(b, index) in bookings" :key="index"> <!-- loop through the booking array -->
        {{ b.name }} - {{ b.date }} - {{ b.time }}
      </li>
    </ul>
  </div>
</template>