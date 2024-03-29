import type { ModalFuncProps } from 'antd';
import { message, Modal, notification } from 'antd';

import { getIntlText } from '@/locales';

function createElMessageBox(msg: string, title: string, options: ModalFuncProps) {
  Modal.error({ title, content: msg, ...options });
}

export function createErrorModal(msg: string) {
  createElMessageBox(msg, getIntlText('api.errorTip'), { centered: true });
}

export function createErrorMsg(msg: string) {
  message.error(msg);
}

export function createErrorNotification(msg: string, desc?: string) {
  notification.error({
    placement: 'bottomRight',
    message: msg,
    description: desc,
  });
}

export function useMessage() {
  return {
    createErrorModal,
    createErrorMsg,
    createErrorNotification,
  };
}
