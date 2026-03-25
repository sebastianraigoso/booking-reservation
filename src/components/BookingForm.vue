<script setup>
import { ref } from 'vue'

const props = defineProps({
  date: String
})

const name = ref('')
const email = ref('')
const time = ref('')

async function submitBooking() {
  const booking = {
    name: name.value,
    email: email.value,
    date: props.date,
    time: time.value
  }

  const res = await fetch('http://localhost:3000/bookings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(booking)
  })

  const data = await res.json()
  console.log(data)
}
</script>

<template>
  <form @submit.prevent="submitBooking">

    <p>Selected date: {{ date }}</p>

    <div class="mb-3">
      <label>Name</label>
      <input v-model="name" type="text" class="form-control">
    </div>

    <div class="mb-3">
      <label>Email</label>
      <input v-model="email" type="email" class="form-control">
    </div>

    <div class="mb-3">
      <label>Time Slot</label>
      <select v-model="time" class="form-control">
        <option value="10:00">10:00</option>
        <option value="11:00">11:00</option>
        <option value="14:00">14:00</option>
        <option value="15:00">15:00</option>
      </select>
    </div>

    <button class="btn btn-primary">
      Book
    </button>

  </form>
</template>