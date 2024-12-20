<template>
  <div>
    <TopBar />
    <FormCadastro />
  </div>
</template>

<script setup>
import TopBar from '~/components/TopBar.vue';
import FormCadastro from '~/components/FormCadastro.vue';
import { useConfirmation } from '~/composables/useConfirmation';

const { triggerPopup } = useConfirmation();

function handleCadastro() {
  // Cadastro realizado
  triggerPopup('Cadastro realizado com sucesso ✔️', '/perfil');
}
</script>
