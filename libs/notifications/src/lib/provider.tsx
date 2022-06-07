import React, { useEffect, useState } from 'react';
import NotificationItem from './components/item';
import Context from './context';
import useSound from 'use-sound';
import { NotificationProviderProps, NotificationProps, QueueableNotificationProps, ProviderContextProps } from './types'

const NotificationProvider: React.FC<NotificationProviderProps> = ({children, maxNotifications = 1, customStyle }) => {
  const [queue, setQueue] = useState<NotificationProps[]>([]);
  const [notifications, setNotifications] = useState<NotificationProps[]>([]);
  const [playSound] = useSound('/assets/notifications/sounds/pop-up.mp3');
  useEffect(() => {
    if (notifications.length < maxNotifications) {
      addNext()
    }
  }, [queue, notifications, maxNotifications])

  const enqueue = (notification: QueueableNotificationProps) => {
    const id = new Date().getTime() + Math.floor(Math.random() * 1000);
    setQueue((state) => state.concat({ ...notification, id, open: true }));
    return id
  }

  const addNext = (): void => {
    if (queue.length) {
      const notification: NotificationProps = queue[0];
      setQueue((state) => {
        state.shift()
        return state
      });
      playSound();
      setNotifications((state) => [{ ...notification }].concat(state))
      if (!notification.options?.persist) {
        enqueueForDismiss(notification.id, notification.options?.countdown)
      }
    }
  };

  const remove = (id: number): void => {
    setNotifications((state) => state.filter((notification) => notification.id !== id))
  }

  const dismiss = (id: number): void => {
    setNotifications((state) =>
      state.map((notification) => ({
        ...notification,
        open: notification.id === id ? false : notification.open,
      }))
    );
    enqueueForRemove(id);
  };

  const enqueueForDismiss = (id: number, countdown = 5000): void => {
    setTimeout(() => {
      dismiss(id);
    }, countdown);
  };

  const enqueueForRemove = (id: number, countdown = 400): void => {
    setTimeout(() => {
      remove(id);
    }, countdown);
  };

  const contextValue: ProviderContextProps = {
    enqueueNotification: enqueue,
    closeNotification: dismiss,
  };

  return (
    <Context.Provider value={contextValue}>
      {children}
      {!!notifications.length && (
        <div className="fixed bottom-2 left-2 z-40">
          {notifications.map((notification) => {
            const { options, ...rest } = notification;
            return (
              <NotificationItem
                {...rest}
                key={notification.id}
                onDismiss={() => {
                  dismiss(notification.id);
                }}
                options={{
                  customStyle,
                  ...options,
                }}
              />
            );
          })}
        </div>
      )}
    </Context.Provider>
  );
};

export default NotificationProvider;
