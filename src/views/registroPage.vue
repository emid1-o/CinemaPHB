<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-5">
        <h3 class="text-center mb-4">Crie sua Conta</h3>
        <div class="card p-4">
            
            <div class="mb-3">
              <label>Nome de Usuário</label>
              <input v-model="username" type="text" class="form-control">
            </div>

            <div class="mb-3">
              <label>Email</label>
              <input v-model="email" type="email" class="form-control">
            </div>

            <div class="mb-3">
              <label>Senha</label>
              <input v-model="password" type="password" class="form-control">
            </div>

            <button @click="registrar" class="btn btn-success w-100">Criar Conta</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import api from '../services/api';
import { useRouter } from 'vue-router';

const username = ref('');
const email = ref('');
const password = ref('');
const router = useRouter();

const registrar = async () => {
  if (!username.value || !password.value || !email.value) {
      alert("Preencha todos os campos.");
      return;
  }

  try {
    await api.post('/registro/', { 
      username: username.value, 
      email: email.value,
      password: password.value 
    });
    
    alert('Conta criada com sucesso! Você será levado ao Login.');
    router.push('/login');
    
  } catch (error) {
    console.error(error);
    alert('Erro ao registrar. O usuário ou email pode já existir.');
  }
};
</script>
