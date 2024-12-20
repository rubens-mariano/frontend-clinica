// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  css: [
    '~/assets/css/home.css',
    '~/assets/css/login.css',
    '~/assets/css/orcamento.css',
    '~/assets/css/agendamento.css',
    '~/assets/css/cadastro.css',
    '~/assets/css/consulta-agendamento.css',
    '~/assets/css/perfil.css',
    '~/assets/css/consultar-medico.css',
    '~/assets/css/consulta-convenios.css',
    '~/assets/css/consulta-dados.css',
    '~/assets/css/consulta-orcamentos.css',
    '~/assets/css/consultar-usuarios.css',
    '~/assets/css/convenios-atendidos.css',
    '~/assets/css/recuperar-senha.css',
    '~/assets/css/confirmacao.css',
  ],
  app: {
    head: {
      link: [
        { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css' }
      ]
    }
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true }
})
