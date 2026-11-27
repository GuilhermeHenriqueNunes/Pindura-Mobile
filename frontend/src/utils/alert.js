import { Alert as RNAlert, Platform } from 'react-native';

/**
 * Utilitário universal de Alertas e Diálogos de Confirmação.
 *
 * - No Celular (Android/iOS): utiliza o Alert.alert nativo do React Native.
 * - Na Web: o react-native-web possui Alert.alert vazio. Este utilitário
 *   utiliza window.confirm para ações com botão Cancelar (ex: exclusão)
 *   e window.alert para mensagens informativas/erros, executando os callbacks corretos.
 */
export const Alert = {
  alert(title, message, buttons, options) {
    if (Platform.OS === 'web') {
      const fullMessage = [title, message].filter(Boolean).join('\n\n');

      // Se há botões e um deles é do tipo 'cancel', trata-se de um diálogo de confirmação
      const hasCancel = Array.isArray(buttons) && buttons.some((b) => b.style === 'cancel');

      if (hasCancel) {
        const confirmed = typeof window !== 'undefined' ? window.confirm(fullMessage) : true;
        if (confirmed) {
          const actionBtn = buttons.find((b) => b.style !== 'cancel');
          if (actionBtn && typeof actionBtn.onPress === 'function') {
            actionBtn.onPress();
          }
        } else {
          const cancelBtn = buttons.find((b) => b.style === 'cancel');
          if (cancelBtn && typeof cancelBtn.onPress === 'function') {
            cancelBtn.onPress();
          }
        }
      } else {
        // Alerta informativo ou de erro
        if (typeof window !== 'undefined') {
          window.alert(fullMessage);
        }
        // Executa o primeiro callback se existir (ex: fechar modal ou voltar de tela após salvar)
        if (Array.isArray(buttons) && buttons.length > 0) {
          const firstBtn = buttons[0];
          if (firstBtn && typeof firstBtn.onPress === 'function') {
            firstBtn.onPress();
          }
        }
      }
    } else {
      RNAlert.alert(title, message, buttons, options);
    }
  },
};

export default Alert;
