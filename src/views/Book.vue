<script setup>
import { ref } from 'vue'
import Calendar from '../components/Calendar.vue'
import BookingForm from '../components/BookingForm.vue'

const selectedDate = ref('')

function handleDate(date) {
  selectedDate.value = date
}
</script>

<template>
  <div>
    <h1>Book a Slot</h1>

    <Calendar @dateSelected="handleDate" />

    <BookingForm :date="selectedDate" />
  </div>
</template>