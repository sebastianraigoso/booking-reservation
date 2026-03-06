<script setup>
    const props = defineProps({
        date: String
    })
</script>

<template>
  <form>

    <p>Selected date: {{ date }}</p>

    <div class="mb-3">
      <label>Name</label>
      <input type="text" class="form-control">
    </div>

    <div class="mb-3">
      <label>Email</label>
      <input type="email" class="form-control">
    </div>

    <div class="mb-3">
      <label>Time Slot</label>
      <select class="form-control">
        <option>10:00</option>
        <option>11:00</option>
        <option>14:00</option>
        <option>15:00</option>
      </select>
    </div>

    <button class="btn btn-primary">
      Book
    </button>

  </form>
</template>