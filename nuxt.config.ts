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
    '~/assets/css/consultar-medico.css'
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
