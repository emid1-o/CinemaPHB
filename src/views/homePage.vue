<template>
  <div class="container mt-5">
    <h1 class="mb-4">Filmes em Cartaz</h1>
    <div class="row">
      <div v-for="filme in filmes" :key="filme.id" class="col-md-3 mb-4">
        
        <div class="card h-100">
          <img :src="filme.poster_url || 'https://via.placeholder.com/300x450'" class="card-img-top">
          
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">{{ filme.titulo }}</h5>
            <p class="card-text text-muted">{{ filme.duracao_minutos }} min</p>
            
            <div class="mt-auto">
              <h6>Sessões:</h6>
              <div v-if="getSessoesDoFilme(filme.id).length > 0">
                  <button 
                      v-for="sessao in getSessoesDoFilme(filme.id)" 
                      :key="sessao.id"
                      @click="irParaSessao(sessao.id)" class="btn btn-outline-primary btn-sm m-1"
                  >
                      {{ formatarHora(sessao.horario) }}
                  </button>
              </div>
              <div v-else>
                  <span class="badge bg-secondary">Sem sessões</span>
              </div>
            </div>

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
const sessoes = ref([]);
const router = useRouter();

onMounted(async () => {
  const [respFilmes, respSessoes] = await Promise.all([
      api.get('/filmes/'),
      api.get('/sessoes/')
  ]);
  filmes.value = respFilmes.data;
  sessoes.value = respSessoes.data;
});

const getSessoesDoFilme = (filmeId) => {
    const filmeAtual = filmes.value.find(f => f.id === filmeId);
    if (!filmeAtual) return [];
    return sessoes.value.filter(s => s.filme_titulo === filmeAtual.titulo);
};

const formatarHora = (dataString) => {
    const date = new Date(dataString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const irParaSessao = (idDaSessao) => {
    router.push(`/sessao/${idDaSessao}`); 
};
</script>
