<template>
  <main class="content">
    <h1>Painel</h1>
    <hr class="line" />

    <!-- Seção Serviços -->
    <section class="section">
      <h2>Serviços</h2>
      <NuxtLink to="/agendamento">
        <div class="service-item">
          <i class="fa fa-calendar-plus"></i>
          <span>Novo agendamento</span>
        </div>
      </NuxtLink>
    </section>
    <hr class="dashed" />

    <!-- Seção Minha Área -->
    <section class="section">
      <h2>Minha Área</h2>
      <div class="icons-area">
        <NuxtLink to="/consultar-agendamento">
          <div class="icon-item">
            <i class="fa fa-clock"></i>
            <span>Consultas agendadas</span>
          </div>
        </NuxtLink>
        <NuxtLink to="/consultar-dados">
          <div class="icon-item">
            <i class="fa fa-user"></i>
            <span>Meus dados</span>
          </div>
        </NuxtLink>
        <NuxtLink to="/consultar-orcamento">
          <div class="icon-item">
            <i class="fa fa-file-alt"></i>
            <span>Orçamentos</span>
          </div>
        </NuxtLink>
      </div>
    </section>
    <hr class="dashed" />

    <!-- Seção Administrador -->
    <section class="section">
      <h2>Administrador</h2>
      <div class="icons-area">
        <NuxtLink to="/consultar-usuario">
          <div class="icon-item">
            <i class="fa fa-users"></i>
            <span>Gerenciamento de Usuários</span>
          </div>
        </NuxtLink>
        <NuxtLink to="/consultar-convenio">
          <div class="icon-item">
            <i class="fa fa-address-book"></i>
            <span>Gerenciamento de Convênios</span>
          </div>
        </NuxtLink>
        <NuxtLink to="/consultar-medico">
          <div class="icon-item">
            <i class="fa fa-user-md"></i>
            <span>Consultar Médicos</span>
          </div>
        </NuxtLink>
      </div>
    </section>
    <hr class="dashed" />

    <!-- Seção Outros -->
    <section class="section">
      <h2>Outros</h2>
      <div class="service-item">
        <i class="fa fa-question-circle"></i>
        <span>Dúvidas frequentes</span>
      </div>
    </section>
    <hr class="dashed" />

    <!-- Botão Voltar ao Início -->
    <div class="button-container">
      <NuxtLink to="/" class="btn-back">Voltar ao Início</NuxtLink>
    </div>
  </main>
</template>

<script setup>
</script>
