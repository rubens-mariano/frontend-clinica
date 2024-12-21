<template>
  <main class="content">
    <h1>Agendamento</h1>
    <p>
      Aqui você pode marcar consultas e exames de forma rápida e segura.
      Escolha a data e o horário que melhor se encaixam em sua agenda e garanta seu atendimento sem complicações.
    </p>
    <hr class="line" />

    <!-- Formulário Principal -->
    <form @submit.prevent="onSubmit" class="agendamento-form">
      <div class="form-row">
        <div class="form-group">
          <label for="procedimento"><strong>Escolha o <br /> Procedimento</strong></label>
          <select id="convenio" v-model="newAgendamento.procedimento" required>
            <option value="" disabled selected>Selecione um convênio</option>
            <option v-for="procedimento in procedimentos" :key="procedimento.id" :value="procedimento.id">
              {{ procedimento.name }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label for="data-horario"><strong>Escolha a <br /> Data e Horário</strong></label>
          <input type="datetime-local" id="data-horario" v-model="newAgendamento.dataHorario" required />
        </div>
      </div>

      <!-- Revisão de Dados -->
      <h2>Revise os Dados</h2>
      <div class="form-row review-section">
        <div class="form-group">
          <label><strong>Procedimento</strong></label>
          <input type="text" :value="procedimentoSelecionadoName || 'Não selecionado'" readonly />
        </div>
        <div class="form-group">
          <label><strong>Data e Horário</strong></label>
          <input type="text" :value="newAgendamento.dataHorario || 'Não selecionado'" readonly />
        </div>
      </div>

      <!-- Botão Confirmar -->
      <div class="button-container">
        <button type="submit" class="btn-confirm">Confirmar</button>
      </div>
    </form>

    <!-- Pop-up de sucesso -->
    <div v-if="showPopup" class="popup-sucesso">
      <span>{{ popupMessage }}</span>
    </div>
  </main>
</template>

<script setup>
  import { ref } from 'vue';
  import {createAgendamento} from "~/services/agendamentoService.js";
  import {useConfirmation} from '~/composables/useConfirmation';
  import {getAllProcedimentos} from "~/services/procedimentoService.js";

  const {showPopup, popupMessage, triggerPopup} = useConfirmation();
  const procedimentos = ref([]); // Lista de procedimentos disponíveis

  const newAgendamento = ref({
    procedimento: '', dataHorario: ''
  });

  // Propriedade computada para buscar o nome do procedimento selecionado
  const procedimentoSelecionadoName = computed(() => {
    const selecionado = procedimentos.value.find(
        (proc) => proc.id === newAgendamento.value.procedimento
    );
    return selecionado ? selecionado.name : 'Não selecionado';
  });

  // Propriedades computadas para extrair data e hora do dataHorario
  const dataSelecionada = computed(() => {
    if (!newAgendamento.value.dataHorario) return 'Não selecionada';
    return newAgendamento.value.dataHorario.split('T')[0]; // Extrai somente a data (YYYY-MM-DD)
  });

  const horaSelecionada = computed(() => {
    if (!newAgendamento.value.dataHorario) return 'Não selecionada';
    return newAgendamento.value.dataHorario.split('T')[1]; // Extrai somente a hora (HH:mm)
  });


  // Função para carregar convenios
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

  const onSubmit = async () => {
    if (newAgendamento.value.procedimento && newAgendamento.value.dataHorario) {
      try {
        newAgendamento.value.data = dataSelecionada.value;
        newAgendamento.value.hora = horaSelecionada.value;
        console.log(newAgendamento.value)
        // Chama o serviço para criar o médico na API
        const response = await createAgendamento(newAgendamento.value);

        if (response.success) {
          clearForm(); // Limpa o formulário
          triggerPopup('Agendamento realizado com sucesso ✔️', '/agendamento');
        } else {
          triggerPopup('Erro ao criar o agendamento. Tente novamente.');
        }
      } catch (error) {
        triggerPopup('Erro ao criar o agendamento. Verifique os dados.');
      }
    } else {
      triggerPopup('Preencha todos os campos antes de enviar.');
    }
  }

  function clearForm() {
    newAgendamento.value = {
      procedimento: '', dataHorario: ''
    };
  }

  onMounted(() => {
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