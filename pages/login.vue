<template>
  <div>
    <TopBar />
    <main class="content">
      <h1>Consultas e Exames</h1>
      <p>Agende exames e consultas de forma rápida, escolhendo especialidade, profissional e horário disponíveis.</p>
      <hr class="line" />
      <div class="form-container-login">
        <RegisterSection />
        <LoginSection />
      </div>
    </main>
  </div>
</template>

<script setup>
  import TopBar from '~/components/TopBar.vue';
  import RegisterSection from '~/components/RegisterSection.vue';
  import LoginSection from '~/components/LoginSection.vue';
</script>
