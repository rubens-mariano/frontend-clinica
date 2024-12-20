<template>
  <main class="content">
    <h1>Controle de Médicos</h1>
    <p>Página para o administrador cadastrar, editar e excluir médicos, inserindo informações como nome e CRM.</p>
    <hr class="line" />

    <!-- Seção de Cadastro -->
    <fieldset class="form-section">
      <legend>Cadastrar</legend>
      <div class="form-row">
        <div class="form-group">
          <label for="nome">Nome *</label>
          <input type="text" id="nome" v-model="newMedico.nome" placeholder="Digite o nome" />
        </div>
        <div class="form-group">
          <label for="crm">CRM *</label>
          <input type="text" id="crm" v-model="newMedico.crm" placeholder="Digite o CRM" />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="usuario">Usuário *</label>
          <select id="usuario" v-model="newMedico.usuario">
            <option value="" disabled selected>Selecione um usuário</option>
            <option value="usuario1">Usuário 1</option>
            <option value="usuario2">Usuário 2</option>
          </select>
        </div>
      </div>
      <div class="button-container">
        <button class="btn-primary" @click="addMedico">Cadastrar</button>
        <button class="btn-secondary" @click="clearForm">Cancelar</button>
      </div>
    </fieldset>

    <!-- Seção de Consulta -->
    <fieldset class="form-section">
      <legend>Consultar</legend>
      <div class="form-row">
        <div class="form-group">
          <label for="medicos">Médicos</label>
          <select id="medicos" v-model="selectedMedico">
            <option value="" disabled selected>Selecione um médico</option>
            <option v-for="medico in medicos" :key="medico.id" :value="medico.id">
              {{ medico.nome }}
            </option>
          </select>
        </div>
      </div>
      <div class="button-container">
        <button class="btn-primary" @click="editMedico">Editar</button>
        <button class="btn-secondary" @click="deleteMedico">Excluir</button>
      </div>
    </fieldset>

    <!-- Pop-up de Edição -->
    <div class="popup" v-if="editPopup">
      <div class="popup-content">
        <h2>Editar Médico</h2>
        <div class="form-row">
          <div class="form-group">
            <label for="edit-nome">Nome *</label>
            <input type="text" id="edit-nome" v-model="editMedicoData.nome" />
          </div>
          <div class="form-group">
            <label for="edit-crm">CRM *</label>
            <input type="text" id="edit-crm" v-model="editMedicoData.crm" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="edit-usuario">Usuário *</label>
            <select id="edit-usuario" v-model="editMedicoData.usuario">
              <option value="usuario1">Usuário 1</option>
              <option value="usuario2">Usuário 2</option>
            </select>
          </div>
        </div>
        <div class="button-container">
          <button class="btn-primary" @click="saveEdit">Salvar</button>
          <button class="btn-secondary" @click="closeEditPopup">Cancelar</button>
        </div>
      </div>
    </div>

    <!-- Pop-up de Sucesso -->
    <div v-if="showPopup" class="popup-sucesso">
      <span>{{ popupMessage }}</span>
    </div>
  </main>
</template>

<script setup>
import {ref} from 'vue';
import {useConfirmation} from '~/composables/useConfirmation';

const {showPopup, popupMessage, triggerPopup} = useConfirmation();

const medicos = ref([
  {id: 1, nome: 'Médico 1', crm: '12345', usuario: 'usuario1'},
  {id: 2, nome: 'Médico 2', crm: '67890', usuario: 'usuario2'},
]);

const newMedico = ref({nome: '', crm: '', usuario: ''});
const selectedMedico = ref('');
const editPopup = ref(false);
const editMedicoData = ref({});

function addMedico() {
  if (newMedico.value.nome && newMedico.value.crm && newMedico.value.usuario) {
    medicos.value.push({id: medicos.value.length + 1, ...newMedico.value});
    clearForm();
    triggerPopup('Cadastro realizado com sucesso ✔️', '/agendamento');
  }
}

function editMedico() {
  const medico = medicos.value.find((m) => m.id === selectedMedico.value);
  if (medico) {
    editMedicoData.value = {...medico};
    editPopup.value = true;
  }
}

function saveEdit() {
  const index = medicos.value.findIndex((m) => m.id === editMedicoData.value.id);
  if (index !== -1) {
    medicos.value[index] = {...editMedicoData.value};
    closeEditPopup();
    triggerPopup('Médico editado com sucesso ✔️');
  }
}

function deleteMedico() {
  medicos.value = medicos.value.filter((m) => m.id !== selectedMedico.value);
  selectedMedico.value = '';
  triggerPopup('Médico excluído com sucesso ✔️');
}

function clearForm() {
  newMedico.value = {nome: '', crm: '', usuario: ''};
}

function closeEditPopup() {
  editPopup.value = false;
}
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
