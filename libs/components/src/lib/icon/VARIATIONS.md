## Icon

Vivid comes with a [library of over 1000 icons](/icons/icons-gallery/). You can use these icons in your components by setting the `name` attribute to the icon's name.

```html preview
<vwc-icon name="heart-solid" aria-hidden="true"></vwc-icon>
```

### Custom Icon

Instead of an icon from the Vivid Icon Library, you can also use a custom SVG image. Place it inside the default slot as an `img` or `svg` element.

```html preview
<vwc-icon size="3" aria-label="Hand waving">
	<svg viewBox="0 0 24 24">
		<path
			fill="currentColor"
			d="M6.11922 10.1706C5.8213 10.0548 5.49473 10.064 5.21134 10.1962 4.92796 10.3283 4.71098 10.5726 4.60814 10.8752 4.50529 11.1778 4.52501 11.514 4.66295 11.8098L7.61024 18.1303C8.43788 19.9052 9.90708 21.2924 11.6946 21.9868 13.4821 22.6812 15.4416 22.6259 17.1419 21.833L18.5366 21.1827C19.4417 20.7603 20.2431 20.1426 20.8882 19.3702 21.5333 18.5979 22.0073 17.6885 22.2792 16.7017L23.6271 11.8184C23.7189 11.5145 23.7087 11.1844 23.5983 10.8802 23.4878 10.5759 23.2832 10.3147 23.0168 10.1377 22.7339 9.96294 22.4024 9.89734 22.0836 9.95301 21.7647 10.0087 21.48 10.1818 21.2822 10.4405L19.4217 12.8724C19.3395 12.9796 19.2313 13.0626 19.1074 13.1135 18.9835 13.1643 18.848 13.1813 18.7137 13.1629 18.5793 13.1444 18.4507 13.0911 18.34 13.0081 18.2292 12.925 18.1401 12.8149 18.0809 12.6882L14.6545 5.34015C14.5165 5.04433 14.2717 4.81313 13.9737 4.69739 13.6758 4.58166 13.3492 4.59088 13.0658 4.72302 12.7825 4.85517 12.5655 5.09941 12.4626 5.40202 12.3598 5.70464 12.3795 6.04083 12.5175 6.33665L15.118 11.9135 14.4057 12.2457 11.4584 5.92523C11.3204 5.62941 11.0756 5.39821 10.7777 5.28247 10.4797 5.16674 10.1532 5.17596 9.86978 5.3081 9.5864 5.44024 9.36942 5.68449 9.26658 5.9871 9.16373 6.28972 9.18345 6.62591 9.32139 6.92173L12.2687 13.2422 11.5563 13.5744 8.9558 7.99748C8.81786 7.70166 8.57299 7.47045 8.27507 7.35472 7.97715 7.23899 7.65058 7.2482 7.36719 7.38035 7.08381 7.51249 6.86683 7.75674 6.76399 8.05935 6.66114 8.36196 6.68086 8.69816 6.8188 8.99397L9.41935 14.5709 8.70701 14.903 6.79995 10.8133C6.66201 10.5175 6.41714 10.2863 6.11922 10.1706zM17.3109 2.18607C17.4526 1.79684 17.883 1.59615 18.2722 1.73782 20.6132 2.58987 21.8202 5.17835 20.9682 7.51935 20.8265 7.90858 20.3961 8.10927 20.0069 7.9676 19.6177 7.82593 19.417 7.39555 19.5586 7.00632 20.1273 5.44379 19.3217 3.71607 17.7592 3.14736 17.3699 3.00569 17.1692 2.57531 17.3109 2.18607zM4.51646 19.5137C4.37479 19.9029 3.9444 20.1036 3.55517 19.9619 1.21417 19.1099.00714505 16.5214.859199 14.1804 1.00087 13.7912 1.43125 13.5905 1.82048 13.7322 2.20972 13.8738 2.41041 14.3042 2.26874 14.6934 1.70002 16.256 2.50567 17.9837 4.0682 18.5524 4.45743 18.6941 4.65812 19.1245 4.51646 19.5137zM17.0317 3.59159C16.6425 3.44992 16.2121 3.65061 16.0704 4.03984 15.9287 4.42908 16.1294 4.85946 16.5187 5.00113 17.2333 5.26124 17.6018 6.05143 17.3417 6.76607 17.2 7.15531 17.4007 7.58569 17.7899 7.72736 18.1792 7.86903 18.6095 7.66834 18.7512 7.2791 19.2947 5.78599 18.5248 4.13504 17.0317 3.59159zM5.75684 17.6599C5.61517 18.0492 5.18479 18.2499 4.79556 18.1082 3.30245 17.5647 2.5326 15.9138 3.07604 14.4207 3.21771 14.0315 3.6481 13.8308 4.03733 13.9724 4.42656 14.1141 4.62725 14.5445 4.48558 14.9337 4.22547 15.6484 4.59395 16.4386 5.30859 16.6987 5.69782 16.8403 5.89851 17.2707 5.75684 17.6599z"
		></path>
	</svg>
</vwc-icon>

<vwc-icon size="3" aria-label="Hand waving">
	<img
		src="data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='currentColor' d='M6.11922 10.1706C5.8213 10.0548 5.49473 10.064 5.21134 10.1962 4.92796 10.3283 4.71098 10.5726 4.60814 10.8752 4.50529 11.1778 4.52501 11.514 4.66295 11.8098L7.61024 18.1303C8.43788 19.9052 9.90708 21.2924 11.6946 21.9868 13.4821 22.6812 15.4416 22.6259 17.1419 21.833L18.5366 21.1827C19.4417 20.7603 20.2431 20.1426 20.8882 19.3702 21.5333 18.5979 22.0073 17.6885 22.2792 16.7017L23.6271 11.8184C23.7189 11.5145 23.7087 11.1844 23.5983 10.8802 23.4878 10.5759 23.2832 10.3147 23.0168 10.1377 22.7339 9.96294 22.4024 9.89734 22.0836 9.95301 21.7647 10.0087 21.48 10.1818 21.2822 10.4405L19.4217 12.8724C19.3395 12.9796 19.2313 13.0626 19.1074 13.1135 18.9835 13.1643 18.848 13.1813 18.7137 13.1629 18.5793 13.1444 18.4507 13.0911 18.34 13.0081 18.2292 12.925 18.1401 12.8149 18.0809 12.6882L14.6545 5.34015C14.5165 5.04433 14.2717 4.81313 13.9737 4.69739 13.6758 4.58166 13.3492 4.59088 13.0658 4.72302 12.7825 4.85517 12.5655 5.09941 12.4626 5.40202 12.3598 5.70464 12.3795 6.04083 12.5175 6.33665L15.118 11.9135 14.4057 12.2457 11.4584 5.92523C11.3204 5.62941 11.0756 5.39821 10.7777 5.28247 10.4797 5.16674 10.1532 5.17596 9.86978 5.3081 9.5864 5.44024 9.36942 5.68449 9.26658 5.9871 9.16373 6.28972 9.18345 6.62591 9.32139 6.92173L12.2687 13.2422 11.5563 13.5744 8.9558 7.99748C8.81786 7.70166 8.57299 7.47045 8.27507 7.35472 7.97715 7.23899 7.65058 7.2482 7.36719 7.38035 7.08381 7.51249 6.86683 7.75674 6.76399 8.05935 6.66114 8.36196 6.68086 8.69816 6.8188 8.99397L9.41935 14.5709 8.70701 14.903 6.79995 10.8133C6.66201 10.5175 6.41714 10.2863 6.11922 10.1706zM17.3109 2.18607C17.4526 1.79684 17.883 1.59615 18.2722 1.73782 20.6132 2.58987 21.8202 5.17835 20.9682 7.51935 20.8265 7.90858 20.3961 8.10927 20.0069 7.9676 19.6177 7.82593 19.417 7.39555 19.5586 7.00632 20.1273 5.44379 19.3217 3.71607 17.7592 3.14736 17.3699 3.00569 17.1692 2.57531 17.3109 2.18607zM4.51646 19.5137C4.37479 19.9029 3.9444 20.1036 3.55517 19.9619 1.21417 19.1099.00714505 16.5214.859199 14.1804 1.00087 13.7912 1.43125 13.5905 1.82048 13.7322 2.20972 13.8738 2.41041 14.3042 2.26874 14.6934 1.70002 16.256 2.50567 17.9837 4.0682 18.5524 4.45743 18.6941 4.65812 19.1245 4.51646 19.5137zM17.0317 3.59159C16.6425 3.44992 16.2121 3.65061 16.0704 4.03984 15.9287 4.42908 16.1294 4.85946 16.5187 5.00113 17.2333 5.26124 17.6018 6.05143 17.3417 6.76607 17.2 7.15531 17.4007 7.58569 17.7899 7.72736 18.1792 7.86903 18.6095 7.66834 18.7512 7.2791 19.2947 5.78599 18.5248 4.13504 17.0317 3.59159zM5.75684 17.6599C5.61517 18.0492 5.18479 18.2499 4.79556 18.1082 3.30245 17.5647 2.5326 15.9138 3.07604 14.4207 3.21771 14.0315 3.6481 13.8308 4.03733 13.9724 4.42656 14.1141 4.62725 14.5445 4.48558 14.9337 4.22547 15.6484 4.59395 16.4386 5.30859 16.6987 5.69782 16.8403 5.89851 17.2707 5.75684 17.6599z'%3E%3C/path%3E%3C/svg%3E"
	/>
</vwc-icon>
```

## Size

Use the `size` attribute to select the icon's size from a set of predefined values.

```html preview
<table>
	<thead>
		<tr>
			<th>Size</th>
			<th>Default Dimension (px)</th>
			<th>Example</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>-6</td>
			<td>16px</td>
			<td>
				<vwc-icon name="close-line" size="-6" aria-hidden="true"></vwc-icon>
			</td>
		</tr>
		<tr>
			<td>-5</td>
			<td>20px</td>
			<td>
				<vwc-icon name="close-line" size="-5" aria-hidden="true"></vwc-icon>
			</td>
		</tr>
		<tr>
			<td>-4</td>
			<td>24px</td>
			<td>
				<vwc-icon name="close-line" size="-4" aria-hidden="true"></vwc-icon>
			</td>
		</tr>
		<tr>
			<td>-3</td>
			<td>28px</td>
			<td>
				<vwc-icon name="close-line" size="-3" aria-hidden="true"></vwc-icon>
			</td>
		</tr>
		<tr>
			<td>-2</td>
			<td>32px</td>
			<td>
				<vwc-icon name="close-line" size="-2" aria-hidden="true"></vwc-icon>
			</td>
		</tr>
		<tr>
			<td>-1</td>
			<td>36px</td>
			<td>
				<vwc-icon name="close-line" size="-1" aria-hidden="true"></vwc-icon>
			</td>
		</tr>
		<tr>
			<td>0</td>
			<td>40px</td>
			<td>
				<vwc-icon name="close-line" size="0" aria-hidden="true"></vwc-icon>
			</td>
		</tr>
		<tr>
			<td>1</td>
			<td>44px</td>
			<td>
				<vwc-icon name="close-line" size="1" aria-hidden="true"></vwc-icon>
			</td>
		</tr>
		<tr>
			<td>2</td>
			<td>48px</td>
			<td>
				<vwc-icon name="close-line" size="2" aria-hidden="true"></vwc-icon>
			</td>
		</tr>
		<tr>
			<td>3</td>
			<td>52px</td>
			<td>
				<vwc-icon name="close-line" size="3" aria-hidden="true"></vwc-icon>
			</td>
		</tr>
		<tr>
			<td>4</td>
			<td>56px</td>
			<td>
				<vwc-icon name="close-line" size="4" aria-hidden="true"></vwc-icon>
			</td>
		</tr>
		<tr>
			<td>5</td>
			<td>60px</td>
			<td>
				<vwc-icon name="close-line" size="5" aria-hidden="true"></vwc-icon>
			</td>
		</tr>
	</tbody>
</table>
<style>
	table {
		border-collapse: collapse;
	}
	th,
	td {
		text-align: right;
		padding: 8px;
		border: 1px solid var(--vvd-color-neutral-200);
	}
</style>
```

<vwc-note connotation="information" icon="info-line">
	<p>Icon size will be affected by the <code>--vvd-size-density</code> variable.</p>
</vwc-note>

## Connotation

Use the `connotation` attribute to select the icon's color from a set of predefined values.

```html preview
<ul>
	<li>
		<vwc-icon
			name="heart-solid"
			connotation="accent"
			aria-hidden="true"
		></vwc-icon>
		accent
	</li>
	<li>
		<vwc-icon
			name="heart-solid"
			connotation="announcement"
			aria-hidden="true"
		></vwc-icon>
		announcement
	</li>
	<li>
		<vwc-icon
			name="heart-solid"
			connotation="cta"
			aria-hidden="true"
		></vwc-icon>
		cta
	</li>
	<li>
		<vwc-icon
			name="heart-solid"
			connotation="success"
			aria-hidden="true"
		></vwc-icon>
		success
	</li>
	<li>
		<vwc-icon
			name="heart-solid"
			connotation="warning"
			aria-hidden="true"
		></vwc-icon>
		warning
	</li>
	<li>
		<vwc-icon
			name="heart-solid"
			connotation="alert"
			aria-hidden="true"
		></vwc-icon>
		alert
	</li>
	<li>
		<vwc-icon
			name="heart-solid"
			connotation="information"
			aria-hidden="true"
		></vwc-icon>
		information
	</li>
</ul>
<style>
	li {
		list-style: none;
	}
</style>
```