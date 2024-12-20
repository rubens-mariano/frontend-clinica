<template>
  <main class="content">
    <h1>Minhas Consultas</h1>
    <p>Abaixo estão listadas suas consultas agendadas. Você pode editá-las ou excluí-las.</p>
    <hr class="line" />

    <!-- Lista de Consultas -->
    <div class="consultas-list">
      <fieldset v-for="agendamento in agendamentos" :key="agendamento.id">
        <legend>Consulta</legend>
        <div class="consulta-item">
          <p><strong>Médico:</strong> {{ agendamento.medico.name }}</p>
          <p><strong>Procedimento:</strong> {{ agendamento.procedimento.name }}</p>
          <p><strong>Data:</strong> {{ agendamento.data.split("-").reverse().join("/") }}</p>
          <p><strong>Horário:</strong> {{ agendamento.hora.slice(0, 5) }}</p>
          <div class="actions">
            <button class="btn-edit" @click="openEditPopup(agendamento)">Editar</button>
            <button class="btn-delete" @click="openDeletePopup(agendamento.id)">Excluir</button>
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
            <select id="edit-medico" v-model="editData.medico.id" required>
              <option value="" disabled selected>Selecione um médico</option>
              <option v-for="medico in medicos" :key="medico.id" :value="medico.id">
                {{ medico.name }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label for="edit-medico">Procedimento</label>
            <select id="edit-medico" v-model="editData.procedimento.id" required>
              <option value="" disabled selected>Selecione um médico</option>
              <option v-for="procedimento in procedimentos" :key="procedimento.id" :value="procedimento.id">
                {{ procedimento.name }}
              </option>
            </select>
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
          <button class="btn-confirm" @click="agendamentoaDelete">Confirmar</button>
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
import {useConfirmation} from "~/composables/useConfirmation.js";
import { updateAgendamento, deleteAgendamento, getAgendamentoByUserId } from '~/services/agendamentoService.js';
import {getAllMedicos} from "~/services/medicoService.js";
import {getAllProcedimentos} from "~/services/procedimentoService.js";

const procedimentos = ref([]); // Lista de procedimentos disponíveis
const medicos = ref([]); // Lista de médicos disponíveis
const editPopup = ref(false);
const deletePopup = ref(false);
const editData = ref({ id: null, medico: '', procedimento: '', data: '', hora: '' });
const deleteId = ref(null);
const {showPopup, popupMessage, triggerPopup} = useConfirmation();

const agendamentos = ref([]);

function openEditPopup(agendamento) {
  editData.value = { ...agendamento };
  editData.value.dataHorario = `${editData.value.data}T${editData.value.hora}`;
  editPopup.value = true;
}

function closeEditPopup() {
  editPopup.value = false;
}

function openDeletePopup(id) {
  deleteId.value = id;
  deletePopup.value = true;
}

function closeDeletePopup() {
  deletePopup.value = false;
}

function confirmDelete() {
  agendamentos.value = agendamentos.value.filter(c => c.id !== deleteId.value);
  closeDeletePopup();
  showPopupMessage('Consulta excluída com sucesso ✔️');
}

function showPopupMessage(message) {
  popupMessage.value = message;
  showPopup.value = true;
  setTimeout(() => (showPopup.value = false), 3000);
}

// Função para carregar agendamentos
const loadAgendamentos = async () => {
  const userData = JSON.parse(localStorage.getItem('@user_data'));
  console.log(userData.user);
  try {
    const response = await getAgendamentoByUserId(userData.user.user.id);

    if (response.success) {
      agendamentos.value = response.data.message; // Define a lista de usuários
    } else {
      triggerPopup('Erro ao carregar os agendamentos. Tente novamente.');
    }
  } catch (error) {
    triggerPopup('Erro ao carregar os agendamentos. Verifique a conexão.');
  }
};

// Função para carregar procedimentos
const loadProcedimentos = async () => {
  try {
    const response = await getAllProcedimentos();

    if (response.success) {
      procedimentos.value = response.data.message; // Define a lista de usuários
    } else {
      console.log(response.message)
      triggerPopup('Erro ao carregar usuários. Tente novamente.');
    }
  } catch (error) {
    console.log(error)
    triggerPopup('Erro ao carregar usuários. Verifique a conexão.');
  }
};

// Função para carregar medicos
const loadMedicos = async () => {
  try {
    const response = await getAllMedicos();

    if (response.success) {
      medicos.value = response.data.message; // Define a lista de usuários
    } else {
      triggerPopup('Erro ao carregar usuários. Tente novamente.');
    }
  } catch (error) {
    triggerPopup('Erro ao carregar usuários. Verifique a conexão.');
  }
};

const handleEdit = async () => {
  const index = agendamentos.value.findIndex(c => c.id === editData.value.id);
  if (index !== -1) {
    try {
      const agendamento =  { ...editData.value }
      // Chama o serviço para criar o médico na API
      const response = await updateAgendamento(agendamento);

      if (response.success) {
        agendamentos.value[index] = { ...editData.value };
        closeEditPopup();
        triggerPopup('Consulta editada com sucesso ✔️', '/consultar-agendamento');
      } else {
        triggerPopup('Erro ao editar o médico. Tente novamente.');
      }
    } catch (error) {
      triggerPopup('Erro ao editar o médico. Verifique os dados.');
    }
  } else {
    triggerPopup('Selecione um dos médicos para editar.');
  }
}

const agendamentoaDelete = async () => {
  const agendamento = agendamentos.value.find((m) => m.id === deleteId.value);
  if (agendamento) {
    try {
      // Chama o serviço para criar o médico na API
      const response = await deleteAgendamento(agendamento.id);

      if (response.success) {
        agendamentos.value = agendamentos.value.filter((m) => m.id !== deleteId.value);
        deleteId.value = null;
        closeDeletePopup();
        triggerPopup('Agendamento excluído com sucesso ✔', '/consultar-agendamento');
      } else {
        triggerPopup('Erro ao excluir o médico. Tente novamente.');
      }
    } catch (error) {
      triggerPopup('Erro ao excluir o médico. Verifique os dados.');
    }
  } else {
    triggerPopup('Selecione um dos médicos para excluir.');
  }
}

onMounted(() => {
  loadAgendamentos();
  loadMedicos();
  loadProcedimentos();
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