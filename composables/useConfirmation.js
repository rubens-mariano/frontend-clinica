import { ref } from 'vue';
import { useRouter } from 'vue-router';

/**
 * Composable para gerenciar pop-ups de confirmação e redirecionamento.
 * @returns {object} Métodos e estados para exibir pop-up e redirecionar.
 */
export function useConfirmation() {
    const showPopup = ref(false); // Controla a visibilidade do pop-up
    const popupMessage = ref(''); // Mensagem exibida no pop-up
    const router = useRouter();  // Para navegação SPA no Nuxt

    /**
     * Exibe o pop-up de sucesso e redireciona após um tempo.
     * @param {string} message - Mensagem a ser exibida no pop-up.
     * @param {string|null} redirectTo - Rota para redirecionar (opcional).
     * @param {number} delay - Tempo em milissegundos antes de redirecionar.
     */
    function triggerPopup(message, redirectTo = null, delay = 3000) {
        popupMessage.value = message;
        showPopup.value = true;

        setTimeout(() => {
            showPopup.value = false;
            if (redirectTo) {
                router.push(redirectTo);
            }
        }, delay);
    }

    return {
        showPopup,
        popupMessage,
        triggerPopup,
    };
}
