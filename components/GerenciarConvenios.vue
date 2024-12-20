<template>
  <main class="content">
    <h1>Gerenciar Convênios</h1>
    <p>Cadastre, edite ou exclua convênios atendidos pela clínica.</p>
    <hr class="line" />

    <!-- Formulário para Cadastrar Novo Convênio -->
    <div class="form-container">
      <fieldset>
        <legend>Cadastrar Novo Convênio</legend>
        <form @submit.prevent="addConvenio">
          <div class="form-group">
            <label for="add-convenio">Nome do Convênio *</label>
            <input type="text" id="add-convenio" v-model="newConvenio" placeholder="Digite o nome do convênio" required />
          </div>
          <div class="button-container">
            <button type="submit" class="btn-confirm">Cadastrar</button>
            <button type="button" class="btn-cancel" @click="clearForm">Cancelar</button>
          </div>
        </form>
      </fieldset>
    </div>

    <!-- Lista de Convênios -->
    <div class="convenios-list">
      <fieldset>
        <legend>Convênios Cadastrados</legend>
        <div v-for="convenio in convenios" :key="convenio.id" class="convenio-item">
          <p><strong>Convênio:</strong> {{ convenio.nome }}</p>
          <div class="actions">
            <button class="btn-edit" @click="openEditPopup(convenio)">Editar</button>
            <button class="btn-delete" @click="openDeletePopup(convenio)">Excluir</button>
          </div>
        </div>
      </fieldset>
    </div>

    <!-- Pop-up de Edição -->
    <div v-if="showEditPopup" class="popup">
      <div class="popup-content">
        <h2>Editar Convênio</h2>
        <form @submit.prevent="saveEdit">
          <div class="form-group">
            <label for="edit-convenio">Nome do Convênio *</label>
            <input type="text" id="edit-convenio" v-model="editConvenio.nome" required />
          </div>
          <div class="button-container">
            <button type="submit" class="btn-confirm">Salvar</button>
            <button type="button" class="btn-cancel" @click="closeEditPopup">Cancelar</button>
          </div>
        </form>
      </div>
    </div>

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

const convenios = ref([
  { id: 1, nome: 'Amil' },
  { id: 2, nome: 'Unimed' },
]);

const newConvenio = ref('');
const editConvenio = ref({});
const showEditPopup = ref(false);

function addConvenio() {
  if (newConvenio.value) {
    convenios.value.push({ id: convenios.value.length + 1, nome: newConvenio.value });
    clearForm();
    triggerPopup('Convênio cadastrado com sucesso ✔️');
  }
}

function openEditPopup(convenio) {
  editConvenio.value = { ...convenio };
  showEditPopup.value = true;
}

function saveEdit() {
  const index = convenios.value.findIndex((c) => c.id === editConvenio.value.id);
  if (index !== -1) {
    convenios.value[index] = { ...editConvenio.value };
    closeEditPopup();
    triggerPopup('Convênio editado com sucesso ✔️');
  }
}

function openDeletePopup(convenio) {
  convenios.value = convenios.value.filter((c) => c.id !== convenio.id);
  triggerPopup('Convênio excluído com sucesso ✔️');
}

function closeEditPopup() {
  showEditPopup.value = false;
}

function clearForm() {
  newConvenio.value = '';
}
</script>

<style scoped>
/* Adicione aqui quaisquer estilos adicionais se necessário */
</style>
