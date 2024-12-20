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
            <option v-for="user in users" :key="user.id" :value="user.id">
              {{ user.email }}
            </option>
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
              {{ medico.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="button-container">
        <button class="btn-primary" @click="editMedico">Editar</button>
        <button class="btn-secondary" @click="medicoDelete">Excluir</button>
      </div>
    </fieldset>

    <!-- Pop-up de Edição -->
    <div class="popup" v-if="editPopup">
      <div class="popup-content">
        <h2>Editar Médico</h2>
        <div class="form-row">
          <div class="form-group">
            <label for="edit-nome">Nome *</label>
            <input type="text" id="edit-nome" v-model="editMedicoData.name" />
          </div>
          <div class="form-group">
            <label for="edit-crm">CRM *</label>
            <input type="text" id="edit-crm" v-model="editMedicoData.crm" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="usuario">Usuário *</label>
            <select id="usuario" v-model="editMedicoData.user">
              <option value="" disabled selected>Selecione um usuário</option>
              <option v-for="user in users" :key="user.id" :value="user.id">
                {{ user.email }}
              </option>
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
import {createMedico, deleteMedico, getAllMedicos, updateMedico} from '~/services/medicoService'; // Importe o serviço correto
import {useConfirmation} from '~/composables/useConfirmation';
import {getUsersData} from '~/services/userService'; // Importe o serviço para buscar os usuários

const {showPopup, popupMessage, triggerPopup} = useConfirmation();
const users = ref([]); // Lista de usuários disponíveis
const medicos = ref([]); // Lista de médicos disponíveis

const newMedico = ref({nome: '', crm: '', usuario: ''});
const selectedMedico = ref('');
const editPopup = ref(false);
const editMedicoData = ref({});

// Função para carregar usuários
const loadUsers = async () => {
  try {
    const response = await getUsersData();

    if (response.success) {
      users.value = response.data.user; // Define a lista de usuários
    } else {
      triggerPopup('Erro ao carregar usuários. Tente novamente.');
    }
  } catch (error) {
    triggerPopup('Erro ao carregar usuários. Verifique a conexão.');
  }
};

// Função para carregar usuários
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

const addMedico = async () => {
  if (newMedico.value.nome && newMedico.value.crm && newMedico.value.usuario) {
    try {
      // Chama o serviço para criar o médico na API
      const response = await createMedico(newMedico.value);

      if (response.success) {
        clearForm(); // Limpa o formulário
        triggerPopup('Cadastro realizado com sucesso ✔️', '/consultar-medico');
      } else {
        triggerPopup('Erro ao cadastrar o médico. Tente novamente.');
      }
    } catch (error) {
      triggerPopup('Erro ao cadastrar o médico. Verifique os dados.');
    }
  } else {
    triggerPopup('Preencha todos os campos antes de salvar.');
  }
}

const editMedico = async () => {
  const medico = medicos.value.find((m) => m.id === selectedMedico.value);
  if (medico) {
    editMedicoData.value = {...medico};
    editPopup.value = true;
  }
}

const saveEdit = async () => {
  const index = medicos.value.findIndex((m) => m.id === editMedicoData.value.id);
  if (index !== -1) {
    try {
      const medico = editMedicoData.value
      // Chama o serviço para criar o médico na API
      const response = await updateMedico(medico);

      if (response.success) {
        medicos.value[index] = {...editMedicoData.value};
        clearForm(); // Limpa o formulário
        closeEditPopup();
        triggerPopup('Médico editado com sucesso ✔️', '/consultar-medico');
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

const medicoDelete = async () => {
  const medico = medicos.value.find((m) => m.id === selectedMedico.value);
  if (medico) {
    try {
      // Chama o serviço para criar o médico na API
      const response = await deleteMedico(medico.id);

      if (response.success) {
        medicos.value = medicos.value.filter((m) => m.id !== selectedMedico.value);
        selectedMedico.value = '';
        clearForm(); // Limpa o formulário
        closeEditPopup();
        triggerPopup('Médico excluído com sucesso ✔', '/consultar-medico');
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

function clearForm() {
  newMedico.value = {nome: '', crm: '', usuario: ''};
}

function closeEditPopup() {
  editPopup.value = false;
}

onMounted(() => {
  loadUsers(); // Carrega os usuários ao montar o componente
  loadMedicos();
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
