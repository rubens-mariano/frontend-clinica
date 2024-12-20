<template>
  <main class="content">
    <h1>Cadastro</h1>
    <p>
      Faça seu cadastro de forma simples e rápida para acessar nossos serviços, agendar consultas e exames, e acompanhar seu histórico médico.
    </p>
    <hr class="line" />

    <!-- Formulário -->
    <form @submit.prevent="handleSubmit" class="form-container">
      <!-- Informações Pessoais -->
      <fieldset>
        <legend>Informações Pessoais</legend>
        <div class="form-row">
          <div class="form-group">
            <label for="cpf">CPF *</label>
            <input type="text" id="cpf" v-model="cpf" placeholder="Digite seu CPF" required />
          </div>
          <div class="form-group">
            <label for="nome">Nome Completo *</label>
            <input type="text" id="nome" v-model="nome" placeholder="Digite seu nome completo" required />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="endereco">Endereço *</label>
            <input type="text" id="endereco" v-model="endereco" placeholder="Digite seu endereço" required />
          </div>
          <div class="form-group">
            <label for="sexo">Sexo *</label>
            <select id="sexo" v-model="sexo" required>
              <option value="" disabled selected>Selecione</option>
              <option value="masculino">Masculino</option>
              <option value="feminino">Feminino</option>
              <option value="outro">Outro</option>
            </select>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="telefone">Telefone *</label>
            <input type="text" id="telefone" v-model="telefone" placeholder="Digite seu telefone" required />
          </div>
          <div class="form-group">
            <label for="data-nascimento">Data de Nascimento *</label>
            <input type="date" id="data-nascimento" v-model="dataNascimento" required />
          </div>
        </div>
      </fieldset>

      <!-- Informações de Acesso -->
      <fieldset>
        <legend>Informações de Acesso</legend>
        <div class="form-row">
          <div class="form-group">
            <label for="email">Email *</label>
            <input type="email" id="email" v-model="email" placeholder="Digite seu email" required />
          </div>
          <div class="form-group">
            <label for="senha">Senha *</label>
            <input type="password" id="senha" v-model="senha" placeholder="Digite sua senha" required />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="confirmar-senha">Confirmar Senha *</label>
            <input type="password" id="confirmar-senha" v-model="confirmarSenha" placeholder="Confirme sua senha" required />
          </div>
        </div>
      </fieldset>

      <!-- Botões -->
      <div class="button-container">
        <button type="submit" class="btn-primary">Cadastrar</button>
        <a href="/" class="btn-secondary">Cancelar</a>
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

const cpf = ref('');
const nome = ref('');
const endereco = ref('');
const sexo = ref('');
const telefone = ref('');
const dataNascimento = ref('');
const email = ref('');
const senha = ref('');
const confirmarSenha = ref('');

const showPopup = ref(false);
const popupMessage = ref('');

function handleSubmit() {
  if (senha.value !== confirmarSenha.value) {
    popupMessage.value = 'As senhas não coincidem!';
    showPopup.value = true;
    setTimeout(() => {
      showPopup.value = false;
    }, 3000);
    return;
  }

  popupMessage.value = 'Cadastro realizado com sucesso ✔️';
  showPopup.value = true;

  setTimeout(() => {
    showPopup.value = false;
    window.location.href = '/';
  }, 3000);
}
</script>
