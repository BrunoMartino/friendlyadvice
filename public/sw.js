self.addEventListener('push', function (event) {
  let data = null;

  if (event.data) {
    data = JSON.parse(event.data.text());
  }

  const options = {
    body: data.content,
    icon: '/images/logo96.png',
    badge: '/images/logo96.png',
    data: {
      url: data.url,
    },
  };

  event.waitUntil(self.registration.showNotification(data.title, options));
});

self.addEventListener('notificationclick', function (event) {
  const notification = event.notification;

  event.waitUntil(
    clients.matchAll().then((cli) => {
      const client = cli.find((c) => c.visibilityState === 'visible');

      if (client !== undefined) {
        client.navigate(notification.data.url);
        client.focus();
      } else {
        clients.openWindow(notification.data.url);
      }
      notification.close();
    }),
  );
});
