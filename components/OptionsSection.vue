<template>
  <section class="options">
    <div class="option" v-for="option in options" :key="option.title">
      <div class="circle">
        <i :class="option.icon"></i>
      </div>
      <h3>{{ option.title }}</h3>
      <a :href="option.link">
        <button>Acesse</button>
      </a>
    </div>
  </section>
</template>

<script setup>
const options = [
  { title: 'Convênios atendidos', icon: 'fa fa-check-square', link: '/convenios-atendidos' },
  { title: 'Faça seu orçamento', icon: 'fa fa-calculator', link: '/orcamento' },
  { title: 'Consultas e exames', icon: 'fa fa-chart-line', link: '/agendamento' }
];
</script>
