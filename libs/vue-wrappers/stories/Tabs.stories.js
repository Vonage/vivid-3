import { VTab, VTabPanel, VTabs } from '@vonage/vivid-vue';
import { ref } from 'vue';
import { argTypes } from './generated/VTabs';

export default {
  title: 'Wrappers/Tabs',
  component: VTabs,
  argTypes,
};

export const Tabs = args => ({
  components: { VTabs, VTab, VTabPanel },
  setup() {
    const { onClick, onFocus, onBlur, onKeydown, onKeyup, onInput, onChange, ...props } = args;
    return { onClick, onFocus, onBlur, onKeydown, onKeyup, onInput, onChange, props };
  },
  template: `<VTabs v-bind="props" @click="onClick" @focus="onFocus" @blur="onBlur" @keydown="onKeydown" @keyup="onKeyup" @input="onInput" @change="onChange">
    <VTab label="Appetizers" id="apps"></VTab>
    <VTab label="Entrees" id="entrees"></VTab>
    <VTab label="Desserts" id="desserts"></VTab>
    <VTabPanel>
        <ol>
            <li>Stuffed artichokes</li>
            <li>Bruschetta</li>
            <li>Oven-baked polenta</li>
            <li>Salami and Fig Crostini with Ricotta</li>
            <li>Rosemary-Potato Focaccia with Goat Cheese</li>
        </ol>
    </VTabPanel>
    <VTabPanel>
        <ol>
            <li>Mushroom-Sausage Ragù</li>
            <li>Tomato Bread Soup with Steamed Mussels</li>
            <li>Grilled Fish with Artichoke Caponata</li>
            <li>Celery Root and Mushroom Lasagna</li>
            <li>Osso Buco with Citrus Gremolata</li>
        </ol>
    </VTabPanel>
    <VTabPanel>
        <ol>
            <li>Tiramisu</li>
            <li>Spumoni</li>
            <li>Limoncello and Ice Cream with Biscotti</li>
        </ol>
    </VTabPanel>
</VTabs>`,
});

const OrientationTemplate = () => ({
  components: { VTabs, VTab, VTabPanel },
  template: `<VTabs activeid="entrees" orientation="vertical">
    <VTab label="Appetizers" id="apps"></VTab>
    <VTab label="Entrees" id="entrees"></VTab>
    <VTab label="Desserts" id="desserts"></VTab>
    <VTabPanel>
        <ol>
            <li>Stuffed artichokes</li>
            <li>Bruschetta</li>
            <li>Oven-baked polenta</li>
            <li>Salami and Fig Crostini with Ricotta</li>
            <li>Rosemary-Potato Focaccia with Goat Cheese</li>
        </ol>
    </VTabPanel>
    <VTabPanel>
        <ol>
            <li>Mushroom-Sausage Ragù</li>
            <li>Tomato Bread Soup with Steamed Mussels</li>
            <li>Grilled Fish with Artichoke Caponata</li>
            <li>Celery Root and Mushroom Lasagna</li>
            <li>Osso Buco with Citrus Gremolata</li>
        </ol>
    </VTabPanel>
    <VTabPanel>
        <ol>
            <li>Tiramisu</li>
            <li>Spumoni</li>
            <li>Limoncello and Ice Cream with Biscotti</li>
        </ol>
    </VTabPanel>
</VTabs>`,
});
export const Orientation = OrientationTemplate.bind({});

const ActiveidTemplate = () => ({
  components: { VTabs, VTab, VTabPanel },
  setup() {
    const activeTab = ref('entrees');
    return { activeTab };
  },
  template: `<div>
    <p>Active tab: {{ activeTab }}</p>  
    <button @click="activeTab = 'apps'">Set to 'apps'</button>
    <VTabs :activeid="activeTab" @change="activeTab = $event.target.activeid">
      <VTab label="Appetizers" id="apps"></VTab>
      <VTab label="Entrees" id="entrees"></VTab>
      <VTab label="Desserts" id="desserts"></VTab>
      <VTabPanel>
          <ol>
              <li>Stuffed artichokes</li>
              <li>Bruschetta</li>
              <li>Oven-baked polenta</li>
              <li>Salami and Fig Crostini with Ricotta</li>
              <li>Rosemary-Potato Focaccia with Goat Cheese</li>
          </ol>
      </VTabPanel>
      <VTabPanel>
          <ol>
              <li>Mushroom-Sausage Ragù</li>
              <li>Tomato Bread Soup with Steamed Mussels</li>
              <li>Grilled Fish with Artichoke Caponata</li>
              <li>Celery Root and Mushroom Lasagna</li>
              <li>Osso Buco with Citrus Gremolata</li>
          </ol>
      </VTabPanel>
      <VTabPanel>
          <ol>
              <li>Tiramisu</li>
              <li>Spumoni</li>
              <li>Limoncello and Ice Cream with Biscotti</li>
          </ol>
      </VTabPanel>
  </VTabs>
  </div>`,
});
export const Activeid = ActiveidTemplate.bind({});
