<template>
    <div class="mb-4">
        <label>Select a date</label>
        <input type="date" class="form-control" @change="updateDate">
  </div>
</template>

<script setup>
    import { ref } from 'vue'

    const emit = defineEmits(['dateSelected'])
    const selectedDate = ref('')

    function updateDate(event) {
        selectedDate.value = event.target.value
        emit('dateSelected', selectedDate.value)
    }
</script>