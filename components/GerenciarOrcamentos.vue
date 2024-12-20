<template>
  <main class="content">
    <h1>Meus Orçamentos</h1>
    <p>Abaixo estão listados seus orçamentos. Você pode editá-los ou excluí-los.</p>
    <hr class="line" />

    <!-- Lista de Orçamentos -->
    <div class="orcamentos-list">
      <fieldset v-for="orcamento in orcamentos" :key="orcamento.id">
        <legend>Orçamento</legend>
        <div class="orcamento-item">
          <p><strong>Solicitante:</strong> {{ orcamento.solicitante }}</p>
          <p><strong>Convênio:</strong> {{ orcamento.convenio }}</p>
          <p><strong>Data:</strong> {{ orcamento.data }}</p>
          <p><strong>Observações:</strong> {{ orcamento.observacoes }}</p>
          <div class="actions">
            <button class="btn-edit" @click="openEditPopup(orcamento)">Editar</button>
            <button class="btn-delete" @click="openDeletePopup(orcamento)">Excluir</button>
          </div>
        </div>
      </fieldset>
    </div>

    <!-- Botão Voltar -->
    <div class="button-container">
      <NuxtLink to="/perfil">
        <button class="btn-back">Voltar</button>
      </NuxtLink>
    </div>

    <!-- Pop-up de Edição -->
    <div v-if="editPopup" class="popup">
      <div class="popup-content">
        <h2>Editar Orçamento</h2>
        <form @submit.prevent="saveEdit">
          <div class="form-group">
            <label for="edit-solicitante">Solicitante</label>
            <input type="text" id="edit-solicitante" v-model="editOrcamento.solicitante" required />
          </div>
          <div class="form-group">
            <label for="edit-convenio">Convênio</label>
            <input type="text" id="edit-convenio" v-model="editOrcamento.convenio" required />
          </div>
          <div class="form-group">
            <label for="edit-data">Data</label>
            <input type="date" id="edit-data" v-model="editOrcamento.data" required />
          </div>
          <div class="form-group">
            <label for="edit-observacoes">Observações</label>
            <textarea id="edit-observacoes" v-model="editOrcamento.observacoes" rows="4" required></textarea>
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

const orcamentos = ref([
  { id: 1, solicitante: 'João Silva', convenio: 'Amil', data: '2024-12-20', observacoes: 'Precisa de um orçamento detalhado para exames.' },
]);

const editPopup = ref(false);
const editOrcamento = ref({});

function openEditPopup(orcamento) {
  editOrcamento.value = { ...orcamento };
  editPopup.value = true;
}

function saveEdit() {
  const index = orcamentos.value.findIndex((o) => o.id === editOrcamento.value.id);
  if (index !== -1) {
    orcamentos.value[index] = { ...editOrcamento.value };
    closeEditPopup();
    triggerPopup('Orçamento editado com sucesso ✔️');
  }
}

function openDeletePopup(orcamento) {
  orcamentos.value = orcamentos.value.filter((o) => o.id !== orcamento.id);
  triggerPopup('Orçamento excluído com sucesso ✔️');
}

function closeEditPopup() {
  editPopup.value = false;
}
</script>

<style scoped>
/* Adicione aqui estilos adicionais, se necessário */
</style>
