<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-4">
        <h3 class="text-center mb-4">Acesso ao Cinema</h3>
        <div class="card p-4">
          <div class="mb-3">
            <label>Usuário</label>
            <input v-model="username" type="text" class="form-control">
          </div>
          <div class="mb-3">
            <label>Senha</label>
            <input v-model="password" type="password" class="form-control">
          </div>
          <button @click="login" class="btn btn-primary w-100">Entrar</button>
          <div class="text-center mt-3">
            <router-link to="/registro">Não tem conta? Cadastre-se</router-link>
          </div>
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
const password = ref('');
const router = useRouter();

const login = async () => {
  try {
    const response = await api.post('/login/', {
      username: username.value,
      password: password.value
    });

    localStorage.setItem('user_token', response.data.token);
    alert('Login realizado!');
    router.push('/');
  } catch (error) {
    console.log(error)
    alert('Erro no login. Verifique os dados.');
  }
};
</script>
