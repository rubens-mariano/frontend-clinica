<template>
  <main class="content">
    <h1>Minhas Consultas</h1>
    <p>Abaixo estão listadas suas consultas agendadas. Você pode editá-las ou excluí-las.</p>
    <hr class="line" />

    <!-- Lista de Consultas -->
    <div class="consultas-list">
      <fieldset v-for="consulta in consultas" :key="consulta.id">
        <legend>Consulta</legend>
        <div class="consulta-item">
          <p><strong>Médico:</strong> {{ consulta.medico }}</p>
          <p><strong>Exame:</strong> {{ consulta.exame }}</p>
          <p><strong>Data e Horário:</strong> {{ consulta.dataHorario }}</p>
          <div class="actions">
            <button class="btn-edit" @click="openEditPopup(consulta)">Editar</button>
            <button class="btn-delete" @click="openDeletePopup(consulta.id)">Excluir</button>
          </div>
        </div>
      </fieldset>
    </div>

    <!-- Botão Voltar -->
    <div class="button-container">
      <NuxtLink to="/" class="btn-back">Voltar</NuxtLink>
    </div>

    <!-- Pop-ups -->
    <div v-if="editPopup" class="popup">
      <div class="popup-content">
        <h2>Editar Consulta</h2>
        <form @submit.prevent="handleEdit">
          <div class="form-group">
            <label for="edit-medico">Médico</label>
            <input type="text" id="edit-medico" v-model="editData.medico" required />
          </div>
          <div class="form-group">
            <label for="edit-exame">Exame</label>
            <input type="text" id="edit-exame" v-model="editData.exame" required />
          </div>
          <div class="form-group">
            <label for="edit-data-horario">Data e Horário</label>
            <input type="datetime-local" id="edit-data-horario" v-model="editData.dataHorario" required />
          </div>
          <div class="button-container">
            <button type="submit" class="btn-confirm">Salvar</button>
            <button type="button" class="btn-cancel" @click="closeEditPopup">Cancelar</button>
          </div>
        </form>
      </div>
    </div>

    <div v-if="deletePopup" class="popup">
      <div class="popup-content">
        <h2>Confirmar Exclusão</h2>
        <p>Tem certeza que deseja excluir esta consulta?</p>
        <div class="button-container">
          <button class="btn-confirm" @click="confirmDelete">Confirmar</button>
          <button class="btn-cancel" @click="closeDeletePopup">Cancelar</button>
        </div>
      </div>
    </div>

    <div v-if="showPopup" class="popup-sucesso">
      <span>{{ popupMessage }}</span>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue';

const consultas = ref([
  { id: 1, medico: 'João Silva', exame: 'Raio-X', dataHorario: '20/12/2024 às 14:00' }
]);

const editPopup = ref(false);
const deletePopup = ref(false);
const showPopup = ref(false);
const popupMessage = ref('');
const editData = ref({ id: null, medico: '', exame: '', dataHorario: '' });
const deleteId = ref(null);

function openEditPopup(consulta) {
  editData.value = { ...consulta };
  editPopup.value = true;
}

function closeEditPopup() {
  editPopup.value = false;
}

function handleEdit() {
  const index = consultas.value.findIndex(c => c.id === editData.value.id);
  if (index !== -1) {
    consultas.value[index] = { ...editData.value };
  }
  closeEditPopup();
  showPopupMessage('Consulta editada com sucesso ✔️');
}

function openDeletePopup(id) {
  deleteId.value = id;
  deletePopup.value = true;
}

function closeDeletePopup() {
  deletePopup.value = false;
}

function confirmDelete() {
  consultas.value = consultas.value.filter(c => c.id !== deleteId.value);
  closeDeletePopup();
  showPopupMessage('Consulta excluída com sucesso ✔️');
}

function showPopupMessage(message) {
  popupMessage.value = message;
  showPopup.value = true;
  setTimeout(() => (showPopup.value = false), 3000);
}
</script>
