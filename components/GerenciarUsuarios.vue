<template>
  <main class="content">
    <h1>Gerenciamento de Usuários</h1>
    <p>Visualize, atualize e exclua usuários registrados no sistema.</p>
    <hr class="line" />

    <!-- Tabela de Usuários -->
    <div class="table-container">
      <table>
        <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Email</th>
          <th>Ações</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="usuario in usuarios" :key="usuario.id">
          <td>{{ usuario.id }}</td>
          <td>{{ usuario.nome }}</td>
          <td>{{ usuario.email }}</td>
          <td>
            <button class="btn-update" @click="openUpdatePopup(usuario)">Atualizar</button>
            <button class="btn-delete" @click="deleteUsuario(usuario)">Excluir</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <!-- Botão Voltar -->
    <div class="button-container">
      <NuxtLink to="/perfil">
        <button class="btn-back">Voltar</button>
      </NuxtLink>
    </div>

    <!-- Pop-up de Atualização -->
    <div v-if="showPopupUpdate" class="popup">
      <div class="popup-content">
        <h2>Atualizar Usuário</h2>
        <form @submit.prevent="saveUpdate">
          <div class="form-group">
            <label for="update-nome">Nome</label>
            <input type="text" id="update-nome" v-model="editUsuario.nome" required />
          </div>
          <div class="form-group">
            <label for="update-email">Email</label>
            <input type="email" id="update-email" v-model="editUsuario.email" required />
          </div>
          <div class="button-container">
            <button type="submit" class="btn-confirm">Salvar</button>
            <button type="button" class="btn-cancel" @click="closeUpdatePopup">Cancelar</button>
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

const usuarios = ref([
  { id: 1, nome: 'João Silva', email: 'joao.silva@email.com' },
  { id: 2, nome: 'Maria Oliveira', email: 'maria.oliveira@email.com' },
]);

const showPopupUpdate = ref(false);
const editUsuario = ref({});

function openUpdatePopup(usuario) {
  editUsuario.value = { ...usuario };
  showPopupUpdate.value = true;
}

function saveUpdate() {
  const index = usuarios.value.findIndex((u) => u.id === editUsuario.value.id);
  if (index !== -1) {
    usuarios.value[index] = { ...editUsuario.value };
    closeUpdatePopup();
    triggerPopup('Usuário atualizado com sucesso ✔️');
  }
}

function deleteUsuario(usuario) {
  const confirmDelete = confirm(`Tem certeza que deseja excluir o usuário ${usuario.nome}?`);
  if (confirmDelete) {
    usuarios.value = usuarios.value.filter((u) => u.id !== usuario.id);
    triggerPopup('Usuário excluído com sucesso ✔️');
  }
}

function closeUpdatePopup() {
  showPopupUpdate.value = false;
}
</script>

<style scoped>
/* Estilos adicionais podem ser incluídos aqui, se necessário */
</style>
