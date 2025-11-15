<template>
  <div class="container mt-5 text-center">
    <h2>Selecione sua Poltrona</h2>
    
    <div class="d-flex justify-content-center gap-3 my-3">
      <span class="badge bg-success">Livre</span>
      <span class="badge bg-danger">Ocupada</span>
      <span class="badge bg-primary">Selecionada</span>
    </div>

    <div class="seat-map" style="max-width: 800px; margin: 0 auto;">
      <div 
        v-for="fileira in fileiras" 
        :key="fileira"
        class="d-flex justify-content-center align-items-center gap-2 mb-2"
      >

        <div class="d-flex gap-2">
          <button 
            v-for="poltrona in poltronasPorFileira(fileira).slice(0, 2)" 
            :key="poltrona.id"
            :disabled="isOcupada(poltrona.id)"
            @click="selecionar(poltrona)"
            :class="['btn', getClassePoltrona(poltrona.id)]"
            style="width: 50px; height: 50px;"
          >
            {{ poltrona.codigo }}
          </button>
        </div>

  
        <div style="width: 40px;"></div>

    
        <div class="d-flex gap-2">
          <button 
            v-for="poltrona in poltronasPorFileira(fileira).slice(2, 8)" 
            :key="poltrona.id"
            :disabled="isOcupada(poltrona.id)"
            @click="selecionar(poltrona)"
            :class="['btn', getClassePoltrona(poltrona.id)]"
            style="width: 50px; height: 50px;"
          >
            {{ poltrona.codigo }}
          </button>
        </div>

    
        <div style="width: 40px;"></div>

      
        <div class="d-flex gap-2">
          <button 
            v-for="poltrona in poltronasPorFileira(fileira).slice(8, 10)" 
            :key="poltrona.id"
            :disabled="isOcupada(poltrona.id)"
            @click="selecionar(poltrona)"
            :class="['btn', getClassePoltrona(poltrona.id)]"
            style="width: 50px; height: 50px;"
          >
            {{ poltrona.codigo }}
          </button>
        </div>
      </div>
    </div>

    <div class="mt-4" v-if="poltronaSelecionada">
      <h4>Selecionado: {{ poltronaSelecionada.codigo }}</h4>
      <button @click="confirmarReserva" class="btn btn-success btn-lg">Confirmar Compra</button>
    </div>
  </div>
</template>
```


<script setup>
import { ref, computed, onMounted } from 'vue';
import api from '../services/api';
import { useRoute } from 'vue-router';


const route = useRoute();

const todasPoltronas = ref([]);
const ocupadasIds = ref([]);
const poltronaSelecionada = ref(null);
const sessaoId = computed(() => Number(route.params.id));

onMounted(async () => {
  await carregarDados();
});

const carregarDados = async () => {
    const respSessao = await api.get(`/sessoes/`); 
    const sessaoAtual = respSessao.data.find(s => s.id == sessaoId.value);
    ocupadasIds.value = sessaoAtual.assentos_ocupados;

    const respPoltronas = await api.get(`/sessoes/${sessaoId.value}/poltronas/`);
    todasPoltronas.value = respPoltronas.data;
};


const fileiras = computed(() => {
  const letras = [...new Set(todasPoltronas.value.map(p => p.codigo.charAt(0)))];
  return letras.sort();
});


const poltronasPorFileira = (fileira) => {
  return todasPoltronas.value
    .filter(p => p.codigo.startsWith(fileira))
    .sort((a, b) => {
      const numA = parseInt(a.codigo.slice(1));
      const numB = parseInt(b.codigo.slice(1));
      return numA - numB;
    });
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
            sessao: sessaoId.value,
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
```

