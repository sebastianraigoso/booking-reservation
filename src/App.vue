<script>
</script>

<template>
  <ul class="nav justify-content-center">
    <li class="nav-item">
      <router-link class="nav-link" to="/">Home</router-link>
    </li>
    <li class="nav-item">
      <router-link class="nav-link" to="/book">Book</router-link>
    </li>
    <li class="nav-item">
      <router-link class="nav-link" to="/admin">Admin</router-link>
    </li>
  </ul>
  <div class="container mt-4">
    <router-view/>
  </div>
</template>