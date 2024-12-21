<template>
  <main class="content">
    <h1>Atualizar Cadastro</h1>
    <p>Visualize e atualize suas informações de cadastro abaixo.</p>
    <hr class="line" />

    <!-- Formulário de Atualização -->
    <form @submit.prevent="handleUpdate" class="form-container">
      <div class="form-group">
        <label for="nome">Nome Completo *</label>
        <input type="text" id="nome" v-model="form.nome" required />
      </div>
      <div class="form-group">
        <label for="email">Email *</label>
        <input type="email" id="email" v-model="form.email" required />
      </div>
      <div class="form-group">
        <label for="telefone">Telefone *</label>
        <input type="text" id="telefone" v-model="form.telefone" required />
      </div>
      <div class="form-group">
        <label for="endereco">Endereço *</label>
        <input type="text" id="endereco" v-model="form.endereco" required />
      </div>
      <div class="button-container">
        <button type="submit" class="btn-confirm">Atualizar</button>
        <NuxtLink to="/perfil" class="btn-cancel">Cancelar</NuxtLink>
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

const { showPopup, popupMessage, triggerPopup } = useConfirmation();

const form = ref({
  nome: 'João Silva',
  email: 'joao.silva@email.com',
  telefone: '(11) 91234-5678',
  endereco: 'Rua das Flores, 123',
});

function handleUpdate() {
  // Simula envio de dados e exibe o pop-up
  triggerPopup('Cadastro atualizado com sucesso ✔️');
}
</script>

<style scoped>
/* Adicione aqui estilos adicionais, se necessário */
</style>
