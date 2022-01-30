# Toggle button

## Toggle button - labeled

```html preview
<vwc-button
  id="button"
  connotation='cta'
  shape='pill'
  label='not pressed'
  aria-label="microphone button">
</vwc-button>

<script>
  const toggleWithLabel = ({target}) => {
    target.ariaPressed = !target.ariaPressed;
    target.label = target.ariaPressed ? 'pressed' : 'not pressed';
  };

  const button = document.getElementById('button');
  button.addEventListener('click', toggleWithLabel);
</script>
```

## Toggle button - icon

```html preview
<vwc-button
  id="icon-button"
  connotation='cta'
  shape='pill'
  icon='microphone-line'
  aria-label="microphone button">
</vwc-button>

<script>
  const toggleWithIcon = ({target}) => {
    target.ariaPressed = !target.ariaPressed;
    target.icon = target.ariaPressed ? 'mic-mute-line' : 'microphone-line';
  };

  const iconButton = document.getElementById('icon-button');
  iconButton.addEventListener('click', toggleWithIcon);
</script>
```

## preload image

to avoid spinner indicator for loading icon after first click, we should preload the desired icon
