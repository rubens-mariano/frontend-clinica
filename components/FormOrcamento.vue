<template>
  <main class="form-container-orcamento">
    <h1>FAÇA SEU ORÇAMENTO</h1>
    <p>
      Entre em contato conosco para receber um orçamento personalizado de acordo com suas necessidades.
      Preencha o formulário abaixo e nossa equipe retornará o mais rápido possível com uma solução sob medida para você!
    </p>
    <hr class="line" />

    <!-- Formulário -->
    <form @submit.prevent="handleSubmit">
      <div class="form-row">
        <div class="form-group">
          <label for="solicitante">Nome do solicitante/responsável</label>
          <input type="text" id="solicitante" v-model="solicitante" required />
        </div>
        <div class="form-group">
          <label for="telefone">Telefone</label>
          <input type="text" id="telefone" v-model="telefone" required />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="email">E-mail</label>
          <input type="email" id="email" v-model="email" required />
        </div>
        <div class="form-group">
          <label for="paciente">Nome do Paciente</label>
          <input type="text" id="paciente" v-model="paciente" required />
        </div>
      </div>

      <div class="form-group">
        <label for="convenio">Convênio</label>
        <input type="text" id="convenio" v-model="convenio" required />
      </div>

      <div class="form-group">
        <label for="observacoes">Observações</label>
        <textarea id="observacoes" rows="6" v-model="observacoes"></textarea>
      </div>

      <div class="button-container">
        <button type="submit">Enviar</button>
      </div>
    </form>

    <!-- Pop-up -->
    <div v-if="showPopup" class="popup-sucesso">
      <span>{{ popupMessage }}</span>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue';

const solicitante = ref('');
const telefone = ref('');
const email = ref('');
const paciente = ref('');
const convenio = ref('');
const observacoes = ref('');
const showPopup = ref(false);
const popupMessage = ref('');

function handleSubmit() {
  popupMessage.value = 'Orçamento enviado com sucesso ✔️';
  showPopup.value = true;

  setTimeout(() => {
    showPopup.value = false;
    window.location.href = '/consulta-de-orcamentos'; // Redireciona para outra página
  }, 3000);
}
</script>
