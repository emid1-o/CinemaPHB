<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar navbar-dark bg-dark" style="font-style: ;">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Cinema PHB</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
          aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="/">Inicio</a>
            </li>
            <li class="nav-item" style="margin-left: 1600px; font-size: 20px;">
              <a class="nav-link" href="/login">Sair</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <RouterView />
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
</script>

<style lang="scss" scoped>
  
</style>
