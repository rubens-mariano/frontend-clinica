<template>
  <main class="form-container-orcamento">
    <h1>FAÇA SEU ORÇAMENTO</h1>
    <p>
      Entre em contato conosco para receber um orçamento personalizado de acordo com suas necessidades.
      Preencha o formulário abaixo e nossa equipe retornará o mais rápido possível com uma solução sob medida para você!
    </p>
    <hr class="line" />

    <!-- Formulário -->
    <form @submit.prevent="onSubmit">
      <div class="form-row">
        <div class="form-group">
          <label for="solicitante">Nome do solicitante/responsável</label>
          <input type="text" id="solicitante" v-model="newOrcamento.solicitante" required />
        </div>
        <div class="form-group">
          <label for="telefone">Telefone</label>
          <input type="text" id="telefone" v-model="newOrcamento.telefone" required />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="email">E-mail</label>
          <input type="email" id="email" v-model="newOrcamento.email" required />
        </div>
        <div class="form-group">
          <label for="paciente">Nome do Paciente</label>
          <input type="text" id="paciente" v-model="newOrcamento.paciente" required />
        </div>
      </div>
      <div class="form-group">
        <label for="convenio">Convênio *</label>
        <select id="convenio" v-model="newOrcamento.convenio" required>
          <option value="" disabled selected>Selecione um convênio</option>
          <option v-for="convenio in convenios" :key="convenio.id" :value="convenio.id">
            {{ convenio.name }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="observacoes">Observações</label>
        <textarea id="observacoes" rows="6" v-model="newOrcamento.observacoes"></textarea>
      </div>

      <div class="button-container">
        <button type="submit">Enviar</button>
      </div>
    </form>

    <!-- Pop-up -->
    <div v-if="showPopup" class="popup-sucesso">
      <span>{{ popupMessage }}</span>
    </div>
  </main>
</template>

<script setup>
import {ref} from 'vue';
import {getAllConvenios} from "~/services/convenioService.js";
import {createOrcamento} from '~/services/orcamentoService.js'; // Importe o serviço correto
import {useConfirmation} from '~/composables/useConfirmation';

const {showPopup, popupMessage, triggerPopup} = useConfirmation();
const convenios = ref([]); // Lista de médicos disponíveis

const newOrcamento = ref({
  solicitante: '', telefone: '', email: '',
  paciente: '', convenio: '', observacoes: ''
});

// Função para carregar convenios
const loadConvenio = async () => {
  try {
    const response = await getAllConvenios();

    if (response.success) {
      convenios.value = response.data.message; // Define a lista de usuários
    } else {
      console.log(response.message)
      triggerPopup('Erro ao carregar usuários. Tente novamente.');
    }
  } catch (error) {
    console.log(error)
    triggerPopup('Erro ao carregar usuários. Verifique a conexão.');
  }
};

const onSubmit = async () => {
  if (newOrcamento.value.solicitante && newOrcamento.value.telefone && newOrcamento.value.email
  && newOrcamento.value.paciente && newOrcamento.value.convenio) {
    try {
      // Chama o serviço para criar o médico na API
      const response = await createOrcamento(newOrcamento.value);

      if (response.success) {
        clearForm(); // Limpa o formulário
        triggerPopup('Orçamento enviado com sucesso ✔️', '/orcamento');
      } else {
        triggerPopup('Erro ao enviar o orçamento. Tente novamente.');
      }
    } catch (error) {
      triggerPopup('Erro ao enviar o orçamento. Verifique os dados.');
    }
  } else {
    triggerPopup('Preencha todos os campos antes de enviar.');
  }
}

function clearForm() {
  newOrcamento.value = {
    solicitante: '', telefone: '', email: '',
    paciente: '', convenio: '', observacoes: ''
  };
}

onMounted(() => {
  loadConvenio();
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
