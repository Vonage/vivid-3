# Customization

Colors can be overridden by setting CSS variables.  
Each component has a set of tokens that are needed for full customization of the component and its states (hover, selected, active etc.).

## CSS Variables
The exposed CSS variables follow this structure:
![variables schema](/assets/images/customization-variables.png)

## Colors
Vivid is using a naming scale for all connotations that are in use in the components.

<style>
.scale {
	text-align: right;
}
.color-square {
	width: 22px;
	aspect-ratio: 1;
	border: 1px solid var(--vvd-color-neutral-300);
  background-color: var(--sample-bg);
}
</style>
<vwc-layout style="--layout-grid-template-columns: auto 22px 1fr; --layout-column-gap: 8px; --layout-row-gap: 6px;">
		<span class="scale"><code>--var-color-50</code></span>
		<span class="color-square" style="--sample-bg: var(--vvd-color-cta-50)"></span>
		<span><code>faint</code>, <code>backdrop</code></span>
		<span class="scale"><code>--var-100</code></span>
		<span class="color-square" style="--sample-bg: var(--vvd-color-cta-100)"></span>
		<span><code>soft</code></span>
		<span class="scale"><code>--var-200</code></span>
		<span class="color-square" style="--sample-bg: var(--vvd-color-cta-200)"></span>
		<span><code>dim</code></span>
		<span class="scale"><code>--var-300</code></span>
		<span class="color-square" style="--sample-bg: var(--vvd-color-cta-300)"></span>
		<span><code>pale</code></span>
		<span class="scale"><code>--var-400</code></span>
		<span class="color-square" style="--sample-bg: var(--vvd-color-cta-400)"></span>
		<span><code>light</code></span>
		<span class="scale"><code>--var-color-500</code></span>
		<span class="color-square" style="--sample-bg: var(--vvd-color-cta-500)"></span>
		<span><code>primary</code>, <code>intermediate</code></span>
		<span class="scale"><code>--var-color-600</code></span>
		<span class="color-square" style="--sample-bg: var(--vvd-color-cta-600)"></span>
		<span><code>firm</code>, <code>primary-increment</code></span>
		<span class="scale"><code>--var-color-700</code></span>
		<span class="color-square" style="--sample-bg: var(--vvd-color-cta-700)"></span>
		<span><code>fierce</code></span>
		<span class="scale"><code>--var-color-800</code></span>
		<span class="color-square" style="--sample-bg: var(--vvd-color-cta-800)"></span>
		<span><code>contrast</code></span>
		<span class="scale"><code>--var-color-canvas</code></span>
		<span class="color-square" style="--sample-bg: var(--vvd-color-canvas)"></span>
		<span><code>primary-text</code></span>
</vwc-layout>

## Components
Below you can find the list of components with their exposed CSS variables for their respective connotations.
Click on "Edit code" to be able to modify the variables. 

### Accordion Item

```html variables-preview[accordion-item]
<vwc-accordion expand-mode="multi">
	<vwc-accordion-item heading="Accordion item with heading">
		Lorem Ipsum is simply dummy text of the printing and typesetting industry.
	</vwc-accordion-item>
</vwc-accordion>
```

### Action Group

```html variables-preview[action-group]
<vwc-action-group>
  <vwc-button icon="reply-line"></vwc-button>
  <vwc-button label="copy"></vwc-button>
  <vwc-button label="paste"></vwc-button>
  <vwc-button label="submit"></vwc-button>
</vwc-action-group>
```

### Alert

```html variables-preview[alert]
<vwc-alert connotation="$CONNOTATION" subtitle="What an important info!!!" open icon="megaphone-solid"></vwc-alert>
```

### Avatar

```html variables-preview[avatar]
<vwc-avatar connotation="$CONNOTATION" appearance="filled"></vwc-avatar>
<vwc-avatar connotation="$CONNOTATION" appearance="duotone"></vwc-avatar>
<vwc-avatar connotation="$CONNOTATION" appearance="outlined"></vwc-avatar>
```

### Badge

```html variables-preview[badge]
<vwc-badge connotation="$CONNOTATION" text='filled' appearance='filled'></vwc-badge>
<vwc-badge connotation="$CONNOTATION" text='subtle' appearance='subtle'></vwc-badge>
<vwc-badge connotation="$CONNOTATION" text='duotone' appearance='duotone'></vwc-badge>
```

### Banner

```html variables-preview[banner]
<vwc-banner connotation="$CONNOTATION" text="Here's some information that you may find important!"></vwc-banner>
```

### Button

```html variables-preview[button]
<vwc-button connotation="$CONNOTATION" label='ghost' appearance='ghost'></vwc-button>
<vwc-button connotation="$CONNOTATION" label='filled' appearance='filled'></vwc-button>
<vwc-button connotation="$CONNOTATION" label='outlined' appearance='outlined'></vwc-button>
```

### Calendar Event

```html variables-preview[calendar-event]
<vwc-calendar>
  <vwc-calendar-event connotation="$CONNOTATION" appearance="filled" heading="filled" slot="day-0"></vwc-calendar-event>
  <vwc-calendar-event connotation="$CONNOTATION" appearance="subtle" heading="subtle" slot="day-1"></vwc-calendar-event>
</vwc-calendar>
```

### Checkbox

```html variables-preview[checkbox]
<vwc-checkbox label='A default checkbox'></vwc-checkbox>
```

### Combobox

```html variables-preview[combobox]
<vwc-combobox>
 <vwc-option text="First Option"></vwc-option>
 <vwc-option text="Second Option"></vwc-option>
</vwc-combobox>
```

### Fab

```html variables-preview[fab]
<vwc-fab connotation="$CONNOTATION" icon='cart-line' label='Add to cart'></vwc-fab>
```

### Menu Item

```html variables-preview[menu-item]
<style>
  html { 
    block-size: 360px; 
  }
</style>

<vwc-menu open>
  <vwc-menu-item role="menuitem" text="Menu item 1" text-secondary="secondary text"></vwc-menu-item>
  <vwc-divider></vwc-divider>
  <vwc-menu-item role="menuitemcheckbox" text="Checkbox 1"></vwc-menu-item>
  <vwc-menu-item role="menuitemcheckbox" text="Checkbox 2"></vwc-menu-item>
  <vwc-divider></vwc-divider>
  <vwc-menu-item role="menuitemradio" text="Radio 1.1"></vwc-menu-item>
  <vwc-menu-item role="menuitemradio" text="Radio 1.2"></vwc-menu-item>
  <vwc-divider></vwc-divider>
  <vwc-menu-item role="menuitemradio" text="Radio 2.1"></vwc-menu-item>
  <vwc-menu-item role="menuitemradio" text="Radio 2.2"></vwc-menu-item>
</vwc-menu>
```

### Nav

```html variables-preview[nav]
<vwc-nav>
  <vwc-nav-item href="#" text="1st level item" onclick="onClick(event)" aria-current="page"></vwc-nav-item>
  <vwc-nav-item href="#" text="1st level item" onclick="onClick(event)"></vwc-nav-item>
  <vwc-nav-item href="#" text="1st level item" onclick="onClick(event)"></vwc-nav-item>
<vwc-nav>

<script>
  function onClick(event) {
    currentNavItem = document.querySelector('vwc-nav-item[aria-current="page"]');
    currentNavItem?.removeAttribute('aria-current');
    event.currentTarget.setAttribute('aria-current', 'page');
  }
</script>
```

### Nav Disclosure

```html variables-preview[nav-disclosure]
<vwc-nav>
  <vwc-nav-disclosure label="1st level item">
    <vwc-nav-item href="#" text="2nd level item"></vwc-nav-item>
  </vwc-nav-disclosure>
<vwc-nav>
```

### Nav Item

```html variables-preview[nav-item]
<vwc-nav>
  <vwc-nav-item href="#" text="Account" onclick="onClick(event)"></vwc-nav-item>
  <vwc-nav-item href="#" text="Shop" onclick="onClick(event)" aria-current="page"></vwc-nav-item>
  <vwc-nav-item href="#" text="My Cart" onclick="onClick(event)"></vwc-nav-item>
</vwc-nav>

<script>
  function onClick(event) {
    currentNavItem = document.querySelector('vwc-nav-item[aria-current="page"]');
    currentNavItem?.removeAttribute('aria-current');
    event.currentTarget.setAttribute('aria-current', 'page');
  }
</script>
```

### Note

```html variables-preview[note]
<vwc-note connotation="$CONNOTATION" icon="check-circle" headline="Pascal's theological argument">
  Pascal argues that a rational person should live as though God exists and seek to believe in God. If God does not actually exist, such a person will have only a finite loss (some pleasures, luxury, etc.), whereas if God does exist, he stands to receive infinite gains (as represented by eternity in Heaven) and avoid infinite losses (eternity in Hell).
</vwc-note>
```

### Option

```html variables-preview[option]
<vwc-listbox>
 <vwc-option text="Option" icon="chat-line"></vwc-option>
</vwc-listbox>
```

### Progress

```html variables-preview[progress]
<vwc-progress connotation="$CONNOTATION" min="0" max="50" value="12.5"></vwc-progress>
```

### Progress Ring

```html variables-preview[progress-ring]
<vwc-progress-ring connotation="$CONNOTATION"></vwc-progress-ring>
```

### Radio

```html variables-preview[radio]
<vwc-radio label="A default radio"></vwc-radio>
```

### Select

```html variables-preview[select] no-tabs
<style>
  html { /* for demo purposes */
    block-size: 230px;
  }
  vwc-select {
    width: 150px;
  }
</style>
<vwc-select label="choose one option">
  <vwc-option value="1" text="Option 1"></vwc-option>
  <vwc-option value="2" text="Option 2"></vwc-option>
  <vwc-option value="3" text="Option 3"></vwc-option>
</vwc-select>
```

### Switch

```html variables-preview[switch]
<vwc-switch connotation="$CONNOTATION"></vwc-switch>
```

### Tabs

```html variables-preview[tabs]
<vwc-tabs activeid="apps">
    <vwc-tab label="Appetizers" id="apps"></vwc-tab>
    <vwc-tab label="Entrees" id="entrees"></vwc-tab>
    <vwc-tab label="Desserts" id="desserts"></vwc-tab>
    <vwc-tab-panel id="appsPanel">
        <ol>
            <li>Stuffed artichokes</li>
            <li>Bruschetta</li>
            <li>Oven-baked polenta</li>
            <li>Salami and Fig Crostini with Ricotta</li>
            <li>Rosemary-Potato Focaccia with Goat Cheese</li>
        </ol>
    </vwc-tab-panel>
    <vwc-tab-panel id="entreesPanel">
        <ol>
            <li>Mushroom-Sausage Ragù</li>
            <li>Tomato Bread Soup with Steamed Mussels</li>
            <li>Grilled Fish with Artichoke Caponata</li>
            <li>Celery Root and Mushroom Lasagna</li>
            <li>Osso Buco with Citrus Gremolata</li>
        </ol>
    </vwc-tab-panel>
    <vwc-tab-panel id="dessertsPanel">
        <ol>
            <li>Tiramisu</li>
            <li>Spumoni</li>
            <li>Limoncello and Ice Cream with Biscotti</li>
        </ol>
    </vwc-tab-panel>
</vwc-tabs>
```

### Tag

```html variables-preview[tag]
<vwc-tag-group>
  <vwc-tag connotation="$CONNOTATION" label='subtle' appearance='subtle'></vwc-tag>
  <vwc-tag connotation="$CONNOTATION" label='duotone' appearance='duotone'></vwc-tag>
</vwc-tag-group>
```

### Text Area

```html variables-preview[text-area] no-tabs
<vwc-text-area label="Helper text below" helper-text="Help text" placeholder="My Placeholder"></vwc-text-area>
```

### Text Field

```html variables-preview[text-field] no-tabs
<vwc-text-field label="Helper text below" helper-text="Help text" placeholder="My Placeholder"></vwc-text-field>
```

### Tree Item

```html variables-preview[tree-item]
<vwc-tree-view>
    <vwc-tree-item text="Tree Item" icon="chat-line"></vwc-tree-item>
</vwc-tree-view>
```
