# Fafty Pop-Up Notifications library

Notifications is a notification provider for React/Next that can easily show, stack up, queue and customize notifications inside application.

## Basic usage

1) Wrap App inside NotificationProvider
```javascript
import { NotificationProvider } from '@fafty/notifications';

<NotificationProvider>
  <App/>
</NotificationProvider>
```

2) Import useNotifications, this hook has two methods "enqueueNotification" and "closeNotification". the method "enqueueNotification" returns the notification id that can be provided to "closeNotification" if needed.
```javascript
import { useNotifications } from '@fafty/notifications';

const MyComponent = () => {
  const { enqueueNotification, closeNotification } = useNotifications()


  const id = enqueueNotification({
    message: 'This is an awesome Notification!,
    options: { dismissible: true }
  });
  ...
  closeNotification(id);
 
  const handleClick = () => {
    enqueueNotification({
      message: 'This is an awesome Notification!'
    });
  };

  return (
    <Button onClick={handleClick}>Show notification</Button>
  );
}
```


## Running unit tests

Run `nx test notifications` to execute the unit tests via [Jest](https://jestjs.io).


## Props

### NotificationProvider
| Property  |  Type | Default | Description |
| ------------------- | ------------------- | ------------------- | ------------------- |
| maxNotifications | number | 1 | Maximum amount of notifications that will be displayed at same time (recommended to keep the maximum to 1 notifications) |
| placement | placement object | undefined | Object that determines the vertical and horizontal placement |
| customIcon | any | undefined | Property that replace the default notification icon |
| customStyle | custom style object | undefined | Object that replace the default style for all notifications |

### placement props (object prop from NotificationProvider)
| Property  |  Type | Default | Description |
| ------------------- | ------------------- | ------------------- | ------------------- |
| vertical | 'top' or 'bottom' | | Prop that determines the vertical placement |
| horizontal | 'left' or 'center' or 'right' |  | Props that determines the horizontal placement |

### custom style props (object prop from NotificationProvider and enqueueNotification options)
| Property  |  Type | Default | Description |
| ------------------- | ------------------- | ------------------- | ------------------- |
| default | React.CSSProperties | undefined | Prop that overides notification default style |
| success | React.CSSProperties | undefined | Prop that overides notification success variant default style |
| error | React.CSSProperties | undefined | Prop that overides notification error variant default style |
| warning | React.CSSProperties | undefined | Prop that overides notification warning variant default style |
| info | React.CSSProperties | undefined | Prop that overides notification info variant default style |

### enqueueNotification props (returns id type: number)
| Property  |  Type | Default | Description |
| ------------------- | ------------------- | ------------------- | ------------------- |
|  message |  string |  |  Message that will be displayed in the notification |
|  actions |  object (Actions) |  |  Object that contains the actions (max: 2), for each action will be generated a button |
|  options |  object (Options) |  |  Object that contains the options to customize your notifications |

### actions props (object prop from enqueueNotification)
| Property  |  Type | Default | Description |
| ------------------- | ------------------- | ------------------- | ------------------- |
|  first |  object (Action)|  | This is required only if actions is set on enqueueNotification and receive an action object (see below) |
|  second |  object(Action) |  | The second action is not required and receive an action object |

### options props (object prop from enqueueNotification)
| Property  |  Type | Default | Description |
| ------------------- | ------------------- | ------------------- | ------------------- |
| countdown |  number | 5000 | The amount of milliseconds the notification will remain open |
| persist | boolean | false | If set to true, the notification will never be closed, unless if you pass the id to closeSnackbar or set dismissible to true (see more below) |
| dismissible | boolean | false | Set to true to show a close icon (x) in the notification that closes the notification when pressed|
| variant |  'sucess' or 'error' or 'warning' or 'info' | | Apply the variant style to the notification |
| customIcon | any | undefined | Property that replace the default notification icon (will override Provider customIcon) |
| customDismiss | any | undefined | Property to replace the default dismiss icon (will override Provider customDismiss) |
| customStyle | custom style object | undefined | Object that replace the default style for all notifications (will override Provider customStyle) |

### action props (object prop from actions)
| Property  |  Type | Default | Description |
| ------------------- | ------------------- | ------------------- | ------------------- |
|  name |  string|  | The action name that will be displayed in the button |
|  action |  Function |  | The action that will be triggered when the button is pressed |
