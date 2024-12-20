<template>
  <div class="login-section">
    <h3>Já possui Cadastro?</h3>
    <form @submit.prevent="handleLogin">
      <label for="cpf">CPF *</label>
      <input type="text" id="cpf" v-model="cpf" placeholder="Digite seu CPF" required />

      <label for="senha">Senha *</label>
      <input type="password" id="senha" v-model="senha" placeholder="Digite sua senha" required />

      <button type="submit" class="login-button">Fazer Login</button>
    </form>
    <p class="forgot-password">
      Esqueceu sua senha? <NuxtLink to="/recuperar-senha">clique aqui</NuxtLink>
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const cpf = ref('');
const senha = ref('');

function handleLogin() {
  alert('Login realizado com sucesso ✔️');
  setTimeout(() => {
    window.location.href = '/agendamento';
  }, 3000);
}
</script>
