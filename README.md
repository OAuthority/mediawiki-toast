**Toast** does just what it says on the tin - provides modern Toast notifications for MediaWiki; it is intended to be a replacement for `mw.notify` which looks like it was designed in 2004. 

# Usage

This extension does nothing on its own except register the ResourceLoader module for the toast notification. To use it, you must load it via ResourceLoader. Then, you can create a notification. There are several config options that can be passed:

| Config    | Description                                                                                                                       | Default     |
| --------- | --------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| showClose | Whether or not to show a close button for the notification                                                                        | `True`      |
| autoClose | Whether to automatically close the notification after `duration` seconds                                                          | `True`      |
| duration  | The duration that the toast notification shows on the screen                                                                      | `3000`      |
| position  | The position where the toast appears on the screen. Valid options include: `top-left`, `top-right`, `bottom-left`, `bottom-right` | `top-right` |
| type      | The type of toast, for styling purposes. Valid options `error`, `notice`, `warning`, `success`                                    | `notice`    |

You must pass the `message` attribute which is the actual message to show in the notification. Use as follows:
```js
new Toast( 'This is a toast notification', {} );
```

Which will use the defaults. To pass your own config, edit the object:
```js
new Toast( 'This is a toast notification', {
  type: "error",
  showClose: false
} );
```

