<template>
  <div class="container mt-5">
    <h1 class="mb-4">Filmes em Cartaz</h1>
    <div class="row">
      <div v-for="filme in filmes" :key="filme.id" class="col-md-3 mb-4">
        <div class="card h-100">
          <img :src="filme.poster_url || 'https://via.placeholder.com/300x450'" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">{{ filme.titulo }}</h5>
            <p class="card-text text-muted">{{ filme.duracao_minutos }} min</p>
            <button @click="verSessoes(filme.id)" class="btn btn-dark w-100">Ver Sessões</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '../services/api';
import { useRouter } from 'vue-router';

const filmes = ref([]);
const router = useRouter();

onMounted(async () => {
  const response = await api.get('/filmes/');
  filmes.value = response.data;
});

const verSessoes = (id) => {
    console.log(id)
  router.push('/sessoes'); 
};
</script>
