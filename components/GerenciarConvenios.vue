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
            <input type="text" id="add-convenio" v-model="newConvenio.name" placeholder="Digite o nome do convênio" required />
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
          <p><strong>Convênio:</strong> {{ convenio.name }}</p>
          <div class="actions">
            <button class="btn-edit" @click="openEditPopup(convenio)">Editar</button>
            <button class="btn-delete" @click="convenioDelete(convenio.id)">Excluir</button>
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
            <input type="text" id="edit-convenio" v-model="editConvenio.name" required />
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
import {createConvenio, getAllConvenios, updateConvenio, deleteConvenio} from "~/services/convenioService.js";
import {updateMedico} from "~/services/medicoService.js";
const { showPopup, popupMessage, triggerPopup } = useConfirmation();

const convenios = ref([]);

const newConvenio = ref({name: ''});
const editConvenio = ref({});
const showEditPopup = ref(false);
const deleteId = ref(null);

// Função para carregar usuários
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

const addConvenio = async () => {
  if (newConvenio.value) {
    try {
      // Chama o serviço para criar o médico na API
      const response = await createConvenio(newConvenio.value);

      if (response.success) {
        clearForm(); // Limpa o formulário
        triggerPopup('Convênio cadastrado com sucesso ✔️', '/consultar-convenio');
      } else {
        triggerPopup('Erro ao cadastrar o Convênio. Tente novamente.');
      }
    } catch (error) {
      triggerPopup('Erro ao cadastrar o Convênio. Verifique os dados.');
    }
  } else {
    triggerPopup('Preencha todos os campos antes de salvar.');
  }
}

function openEditPopup(convenio) {
  editConvenio.value = { ...convenio };
  showEditPopup.value = true;
}

const saveEdit = async () => {
  const index = convenios.value.findIndex((c) => c.id === editConvenio.value.id);
  if (index !== -1) {
    try {
      const convenio = editConvenio.value
      // Chama o serviço para criar o médico na API
      const response = await updateConvenio(convenio);

      if (response.success) {
        convenios.value[index] = { ...editConvenio.value };
        clearForm(); // Limpa o formulário
        closeEditPopup();
        await loadConvenios();
        triggerPopup('Convênio editado com sucesso ✔️', '/consultar-convenio');
      } else {
        triggerPopup('Erro ao editar o Convênio. Tente novamente.');
      }
    } catch (error) {
      triggerPopup('Erro ao editar o Convênio. Verifique os dados.');
    }
  } else {
    triggerPopup('Selecione um dos Convênio para editar.');
  }
}

const convenioDelete = async (convenioId) => {
  if (convenioId) {
    try {
      // Chama o serviço para criar o médico na API
      const response = await deleteConvenio(convenioId);

      if (response.success) {
        convenios.value = convenios.value.filter((m) => m.id !== convenioId);
        triggerPopup('Convenio excluído com sucesso ✔', '/consultar-convenio');
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
  showEditPopup.value = false;
}

function clearForm() {
  newConvenio.value = {name: ''};
}

onMounted(() => {
  loadConvenios();
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
