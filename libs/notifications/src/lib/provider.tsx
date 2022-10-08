import { useEffect, useState } from 'react';
import NotificationItem from './components/item';
import Context from './context';
import useSound from 'use-sound';

import {
  NotificationProviderProps,
  NotificationProps,
  QueueableNotificationProps,
  ProviderContextProps,
} from './types';

const NotificationProvider = ({
  children,
  maxNotifications = 1,
  customStyle,
}: NotificationProviderProps) => {
  const [queue, setQueue] = useState<NotificationProps[]>([]);
  const [notifications, setNotifications] = useState<NotificationProps[]>([]);
  const [playSound] = useSound('/assets/notifications/sounds/pop-up.mp3');
  useEffect(() => {
    if (notifications.length < maxNotifications) {
      addNext();
    }
  }, [queue, notifications, maxNotifications]);

  const enqueue = (notification: QueueableNotificationProps) => {
    const id = new Date().getTime() + Math.floor(Math.random() * 1000);
    setQueue((state) => state.concat({ ...notification, id, open: true }));
    return id;
  };

  // Todo: Needs review it in safari, does not play the sound every time. These are solutions instead of 'useSound' - cause execution and script evaluation slow down by library 'Howler'.
  // const playSound = (() => {
  //   let context: AudioContext | null = null;
  //   return async (url: string) => {
  //     console.log('playSound');
  //     if (context) context.close();
  //     context = new AudioContext();
  //     const source = context.createBufferSource();
  //     source.buffer = await fetch(url, {cache: "force-cache"})
  //     .then(res => res.arrayBuffer())
  //     .then(arrayBuffer => context && context.decodeAudioData(arrayBuffer));
  //     console.log('source.buffer', source.buffer);
  //     source.connect(context.destination);
  //     console.log('source', source);
  //     source.start(0);
  //   };
  // })();

  const addNext = (): void => {
    if (queue.length) {
      const notification: NotificationProps = queue[0];
      setQueue((state) => {
        state.shift();
        return state;
      });
      // playSound('/assets/notifications/sounds/pop-up.mp3');
      if (notification?.options?.playSound) {
        playSound();
      }
      // playSound();
      setNotifications((state) => [{ ...notification }].concat(state));
      if (!notification.options?.persist) {
        enqueueForDismiss(notification.id, notification.options?.countdown);
      }
    }
  };

  const remove = (id: number): void => {
    setNotifications((state) =>
      state.filter((notification) => notification.id !== id)
    );
  };

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
      {!!notifications.filter((notification) => notification.position === 'bottom-left' as NotificationPositionType).length && (
        <div className="fixed bottom-2 left-2 z-40 ">
          {notifications
            .filter((notification) => notification.position === 'bottom-left' as NotificationPositionType)
            .map((notification) => {
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
      {!!notifications.filter((notification) => notification.position === 'bottom-center' as NotificationPositionType).length && (
        <div className="fixed bottom-2 inset-x-0 flex items-center justify-center z-40 ">
          {notifications
            .filter((notification) => notification.position === 'bottom-center' as NotificationPositionType)
            .map((notification) => {
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
