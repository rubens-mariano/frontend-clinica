<template>
  <main class="content">
    <h1>Recuperar Senha</h1>
    <p>Insira seu e-mail ou CPF no campo abaixo. Enviaremos um link para redefinir sua senha e recuperar o acesso.</p>
    <hr class="line" />

    <!-- Formulário -->
    <form @submit.prevent="handleRecuperar" class="recuperar-form">
      <div class="form-group">
        <label for="email-cpf">E-mail ou CPF *</label>
        <input
            type="text"
            id="email-cpf"
            v-model="emailCpf"
            placeholder="Digite seu e-mail ou CPF"
            required
        />
      </div>
      <div class="button-container">
        <button type="submit" class="btn-submit">Recuperar Senha</button>
        <NuxtLink to="/login" class="btn-return">Retornar</NuxtLink>
      </div>
    </form>

    <!-- Pop-up de Sucesso -->
    <div v-if="showPopup" class="popup-sucesso">
      <span>{{ popupMessage }}</span>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue';
import { useConfirmation } from '~/composables/useConfirmation';

const emailCpf = ref('');
const { showPopup, popupMessage, triggerPopup } = useConfirmation();

function handleRecuperar() {
  if (emailCpf.value.trim()) {
    // Simula envio e exibe mensagem de sucesso
    triggerPopup('Instruções enviadas para redefinição de senha ✔️');
    emailCpf.value = ''; // Limpa o campo após envio
  } else {
    triggerPopup('Por favor, preencha o campo corretamente.');
  }
}
</script>

<style scoped>
/* Estilos adicionais podem ser incluídos diretamente aqui ou reutilizados */
</style>
