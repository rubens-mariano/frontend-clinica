<template>
  <main class="content">
    <h1>Convênios Atendidos</h1>
    <p>Veja abaixo a lista completa dos convênios atendidos por nossa clínica:</p>
    <hr class="line" />

    <!-- Tabela de Convênios -->
    <table class="convenios-table">
      <thead>
      <tr>
        <th>Convênio</th>
        <th>Descrição</th>
        <th>Contato</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="convenio in convenios" :key="convenio.nome">
        <td>{{ convenio.nome }}</td>
        <td>{{ convenio.descricao }}</td>
        <td>{{ convenio.contato }}</td>
      </tr>
      </tbody>
    </table>

    <!-- Botão Voltar -->
    <div class="button-container">
      <NuxtLink to="/">
        <button class="btn-back">Voltar ao Início</button>
      </NuxtLink>
    </div>
  </main>
</template>

<script setup>
const convenios = [
  {
    nome: 'Unimed',
    descricao: 'Convênio regional com cobertura ampla.',
    contato: '0800 123 456',
  },
  {
    nome: 'Amil',
    descricao: 'Plano nacional com várias especialidades.',
    contato: '0800 654 321',
  },
  {
    nome: 'Bradesco Saúde',
    descricao: 'Plano corporativo e individual.',
    contato: '0800 987 654',
  },
];
</script>

<style scoped>
/* Estilos adicionais podem ser incluídos diretamente ou referenciados no CSS global */
</style>
