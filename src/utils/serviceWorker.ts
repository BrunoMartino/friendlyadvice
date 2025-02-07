import api from '../services/api';
import { getTokenDashboard, urlBase64ToUint8Array } from './fn';

export const getOrCreateSubscription = async () => {
  if (!('serviceWorker' in navigator)) return;
  const reg = await navigator.serviceWorker.ready;
  let sub = await reg.pushManager.getSubscription();
  if (!sub) {
    sub = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        `${process.env.REACT_APP_NOTIFICACAO_KEY}`,
      ),
    });
  }

  await api.post(
    '/api/v1/subscription/empresa',
    { data: sub },
    {
      headers: {
        authorization: `Bearer ${getTokenDashboard()}`,
      },
    },
  );
};

export const requestNotificationPermission = async (setPermission: any) => {
  if ('Notification' in window) {
    const response = await Notification.requestPermission();
    setPermission(response);
    if (response === 'granted') {
      getOrCreateSubscription();
    }
  }
};
