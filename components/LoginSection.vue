<template>
  <div class="login-section">
    <h3>Já possui Cadastro?</h3>
    <form @submit.prevent="onSubmit">
      <label for="email">Email *</label>
      <input type="text" id="email" v-model="form.email" placeholder="Digite seu Email" required />

      <label for="password">Senha *</label>
      <input type="password" id="password" v-model="form.password" placeholder="Digite sua senha" required />

      <button type="submit" class="login-button">Fazer Login</button>
    </form>
    <p class="forgot-password">
      Esqueceu sua senha? <a href="/recuperar-senha">clique aqui</a>
    </p>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import createAxiosInstance from "~/composables/useApi.js";
import { getUserData } from '../services/userService'

const form = ref({email: '', password: ''});

const onSubmit = async ()=> {
  if(!form.value.email|| !form.value.password){
    alert('Por favor, preencha todos os campos!');
    return;
  }

  let email = form.value.email;
  let password = form.value.password;

  const axiosInstance = await createAxiosInstance(); // Crie a instância do axios aqui

  await axiosInstance.post('/auth/login', {
    email,
    password
  }).then(async ({data}) => {
    let userData = {};

    userData = data.user;
    const token = userData.token;
    // Armazenar o token no AsyncStorage
    localStorage.setItem('@auth_token', token);


    // Atualizar os dados do usuário
    let res = await getUserData(userData.user.id);
    if(res.success) {
      userData.user = res.data;
      localStorage.setItem("@user_data", JSON.stringify(userData));
    }

    navigateTo('/');
  })
      .catch((error) => {
        alert(`Login ${error.message}`);
      });
}
</script>
