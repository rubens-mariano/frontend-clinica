<template>
  <main class="content">
    <h1>Agendamento</h1>
    <p>
      Aqui você pode marcar consultas e exames de forma rápida e segura.
      Escolha a data e o horário que melhor se encaixam em sua agenda e garanta seu atendimento sem complicações.
    </p>
    <hr class="line" />

    <!-- Formulário Principal -->
    <form @submit.prevent="handleSubmit" class="agendamento-form">
      <div class="form-row">
        <div class="form-group">
          <label for="procedimento"><strong>Escolha o <br /> Procedimento</strong></label>
          <select id="procedimento" v-model="procedimento" required>
            <option value="" disabled selected>Selecione...</option>
            <option value="exame">Exame de Sangue</option>
            <option value="consulta">Consulta Clínica</option>
            <option value="ultrassom">Ultrassom</option>
          </select>
        </div>
        <div class="form-group">
          <label for="data-horario"><strong>Escolha a <br /> Data e Horário</strong></label>
          <input type="datetime-local" id="data-horario" v-model="dataHorario" required />
        </div>
      </div>

      <!-- Revisão de Dados -->
      <h2>Revise os Dados</h2>
      <div class="form-row review-section">
        <div class="form-group">
          <label><strong>Procedimento</strong></label>
          <input type="text" :value="procedimento || 'Não selecionado'" readonly />
        </div>
        <div class="form-group">
          <label><strong>Data e Horário</strong></label>
          <input type="text" :value="dataHorario || 'Não selecionado'" readonly />
        </div>
      </div>

      <!-- Botão Confirmar -->
      <div class="button-container">
        <button type="submit" class="btn-confirm">Confirmar</button>
      </div>
    </form>

    <!-- Pop-up de sucesso -->
    <div v-if="showPopup" class="popup-sucesso">
      <span>{{ popupMessage }}</span>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue';

const procedimento = ref('');
const dataHorario = ref('');
const showPopup = ref(false);
const popupMessage = ref('');

function handleSubmit() {
  if (!procedimento.value || !dataHorario.value) {
    popupMessage.value = 'Por favor, preencha todos os campos!';
    showPopup.value = true;
    setTimeout(() => {
      showPopup.value = false;
    }, 3000);
    return;
  }

  popupMessage.value = 'Agendamento confirmado com sucesso ✔️';
  showPopup.value = true;

  setTimeout(() => {
    showPopup.value = false;
    window.location.href = '/consulta-de-agendamentos';
  }, 3000);
}
</script>
