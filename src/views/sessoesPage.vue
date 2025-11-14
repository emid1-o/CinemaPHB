<template>
  <div class="container mt-5 text-center">
    <h2>Selecione sua Poltrona</h2>
    
    <div class="d-flex justify-content-center gap-3 my-3">
      <span class="badge bg-success">Livre</span>
      <span class="badge bg-danger">Ocupada</span>
      <span class="badge bg-primary">Selecionada</span>
    </div>

    <div class="seat-map d-flex flex-wrap justify-content-center gap-2" style="max-width: 600px; margin: 0 auto;">
      <button 
        v-for="poltrona in todasPoltronas" 
        :key="poltrona.id"
        :disabled="isOcupada(poltrona.id)"
        @click="selecionar(poltrona)"
        :class="['btn', getClassePoltrona(poltrona.id)]"
        style="width: 50px; height: 50px;"
      >
        {{ poltrona.codigo }}
      </button>
    </div>

    <div class="mt-4" v-if="poltronaSelecionada">
      <h4>Selecionado: {{ poltronaSelecionada.codigo }}</h4>
      <button @click="confirmarReserva" class="btn btn-success btn-lg">Confirmar Compra</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '../services/api';

const todasPoltronas = ref([]);
const ocupadasIds = ref([]);
const poltronaSelecionada = ref(null);
const sessaoId = 1;

onMounted(async () => {
  await carregarDados();
});

const carregarDados = async () => {
    const respSessao = await api.get(`/sessoes/`); 
    const sessaoAtual = respSessao.data.find(s => s.id === sessaoId);
    ocupadasIds.value = sessaoAtual.assentos_ocupados;

    const respPoltronas = await api.get(`/sessoes/${sessaoId}/poltronas/`);
    todasPoltronas.value = respPoltronas.data;
};

const isOcupada = (id) => ocupadasIds.value.includes(id);

const getClassePoltrona = (id) => {
    if (isOcupada(id)) return 'btn-danger';
    if (poltronaSelecionada.value?.id === id) return 'btn-primary';
    return 'btn-outline-success';
};

const selecionar = (poltrona) => {
    poltronaSelecionada.value = poltrona;
};

const confirmarReserva = async () => {
    try {
        await api.post('/reservas/', {
            sessao: sessaoId,
            poltrona: poltronaSelecionada.value.id
        });
        alert('Reserva Confirmada! Seu lugar está garantido.');
        poltronaSelecionada.value = null;
        await carregarDados();
    } catch (error) {
        alert('Erro ao reservar. Você está logado?', error);
    }
};
</script>
