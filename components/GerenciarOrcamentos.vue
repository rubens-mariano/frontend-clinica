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
          <p><strong>Solicitante:</strong> {{ orcamento.nomeSolicitante }}</p>
          <p><strong>Paciente:</strong> {{ orcamento.nomePaciente }}</p>
          <p><strong>Telefone:</strong> {{ orcamento.telefone }}</p>
          <p><strong>Convênio:</strong> {{ orcamento.convenio.name }}</p>
          <p><strong>Observações:</strong> {{ orcamento.observacoes }}</p>
          <div class="actions">
            <button class="btn-edit" @click="openEditPopup(orcamento)">Editar</button>
            <button class="btn-delete" @click="orcamentoDelete(orcamento.id)">Excluir</button>
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
      <div class="popup-content-a">
        <h2>Editar Orçamento</h2>
        <form @submit.prevent="saveEdit">
          <div class="form-group">
            <label for="edit-solicitante">Solicitante</label>
            <input type="text" id="edit-solicitante" v-model="editOrcamento.nomeSolicitante" required />
          </div>
          <div class="form-group">
            <label for="edit-solicitante">Paciente</label>
            <input type="text" id="edit-solicitante" v-model="editOrcamento.nomePaciente" required />
          </div>
          <div>
            <label for="convenio">Convênio *</label>
            <select id="convenio" v-model="editOrcamento.convenio.id" required>
              <option value="" disabled selected>Selecione um convênio</option>
              <option v-for="convenio in convenios" :key="convenio.id" :value="convenio.id">
                {{ convenio.name }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label for="edit-solicitante">Telefone</label>
            <input type="text" id="edit-solicitante" v-model="editOrcamento.telefone" required />
          </div>
          <div class="form-group">
            <label for="edit-solicitante">Email</label>
            <input type="text" id="edit-solicitante" v-model="editOrcamento.email" required />
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
import {getAllConvenios} from "~/services/convenioService.js";
import {deleteOrcamento, getAllOrcamentos, updateOrcamento} from "~/services/orcamentoService.js";

const { showPopup, popupMessage, triggerPopup } = useConfirmation();

const orcamentos = ref([]);

const editPopup = ref(false);
const editOrcamento = ref({});
const convenios = ref([]);

// Função para carregar Convenios
const loadConvenios = async () => {
  try {
    const response = await getAllConvenios();

    if (response.success) {
      convenios.value = response.data.message; // Define a lista de convenios
    } else {
      triggerPopup('Erro ao carregar convênios. Tente novamente.');
    }
  } catch (error) {
    triggerPopup('Erro ao carregar convênios. Verifique a conexão.');
  }
};

// Função para carregar Orçamentos
const loadOrcamentos = async () => {
  try {
    const response = await getAllOrcamentos();

    if (response.success) {
      orcamentos.value = response.data.message; // Define a lista de orçamentos
      console.log(orcamentos.value);
    } else {
      triggerPopup('Erro ao carregar orçamentos. Tente novamente.');
    }
  } catch (error) {
    triggerPopup('Erro ao carregar orçamentos. Verifique a conexão.');
  }
};

function openEditPopup(orcamento) {
  editOrcamento.value = { ...orcamento };
  editPopup.value = true;
}

const saveEdit = async () => {
  const index = orcamentos.value.findIndex((c) => c.id === editOrcamento.value.id);
  if (index !== -1) {
    try {
      const orcamento = editOrcamento.value
      // Chama o serviço para criar o médico na API
      const response = await updateOrcamento(orcamento);

      if (response.success) {
        orcamentos.value[index] = { ...editOrcamento.value };
        clearForm(); // Limpa o formulário
        closeEditPopup();
        await reloadData();
        triggerPopup('Orçamento editado com sucesso ✔️', '/consultar-orcamento');
      } else {
        triggerPopup('Erro ao editar o orçamento. Tente novamente.');
      }
    } catch (error) {
      triggerPopup('Erro ao editar o orçamento. Verifique os dados.');
    }
  } else {
    triggerPopup('Selecione um dos orçamento para editar.');
  }
}

const orcamentoDelete = async (orcamentoId) => {
  if (orcamentoId) {
    try {
      // Chama o serviço para deletar orçamentos na API
      const response = await deleteOrcamento(orcamentoId);

      if (response.success) {
        orcamentos.value = orcamentos.value.filter((m) => m.id !== orcamentoId);
        await reloadData();
        triggerPopup('Orçamento excluído com sucesso ✔', '/consultar-orcamento');
      } else {
        triggerPopup('Erro ao excluir o Convenio. Tente novamente.');
      }
    } catch (error) {
      triggerPopup('Erro ao excluir o Convenio. Verifique os dados.');
    }
  } else {
    triggerPopup('Selecione um dos Convenio para excluir.');
  }
}

function closeEditPopup() {
  editPopup.value = false;
}

function clearForm() {
  editOrcamento.value = {name: ''};
}

const reloadData = async () => {
  await loadConvenios();
  await loadOrcamentos();
}

onMounted(() => {
  reloadData();
});
</script>


<style scoped>
.popup-sucesso {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #0090b8;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  z-index: 1000;
  display: block;
  animation: fadeOut 3s forwards;
}

@keyframes fadeOut {
  0%, 90% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>

