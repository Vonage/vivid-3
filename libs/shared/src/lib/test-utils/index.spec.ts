import { ADD_TEMPLATE_TO_FIXTURE, elementUpdated, fixture, getBaseElement, getControlElement, setAttribute } from '.';

class DummyElement extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});
  }
}

customElements.define('dummy-element', DummyElement);

describe(`test-utils`, function () {
  describe(`elementUpdated`, function () {
    it(`should resolve the element after rAF`,function (done) {
      const mockElement = document.createElement('div');
      const element = elementUpdated(mockElement);
      requestAnimationFrame(() => {
        element.then(el => {
          expect(element instanceof Promise).toEqual(true);
          expect(el).toEqual(mockElement);
          done();
        });
      });
    });
  });

  describe(`fixture`, function () {
    it(`should return a dom element under div under body`, function () {
      const element = fixture('<div id="test"></div>');
      expect(element.id).toEqual('test');
      expect(element.parentElement?.parentElement?.tagName).toEqual('BODY');
    });
    it(`should return a dom element under div under body with add`, function () {
      const element = fixture('<div id="test"></div>', ADD_TEMPLATE_TO_FIXTURE);
      expect(element.id).toEqual('test');
      expect(element.parentElement?.parentElement?.tagName).toEqual('BODY');
    });
  });

  describe(`getBaseElement`, function () {
    it(`should return undefined if no shadow dom exists`, function () {
      const lightElement = document.createElement('div');
      expect(getBaseElement(lightElement)).toEqual(undefined);
    });

    it(`should return the base element inside shadowDOM`, function () {
      const baseElement = document.createElement('div');
      baseElement.classList.add('base');
      const shadowedElement = document.createElement('dummy-element');
      document.body.appendChild(shadowedElement);
      shadowedElement.shadowRoot ? shadowedElement.shadowRoot.appendChild(baseElement) : '';
      expect(getBaseElement(shadowedElement)).toEqual(baseElement);
    });
  });

  describe(`getControlElement`, function () {
    it(`should return undefined if no shadow dom exists`, function () {
      const lightElement = document.createElement('div');
      expect(getControlElement(lightElement)).toEqual(undefined);
    });

    it(`should return the control element inside shadowDOM`, function () {
      const controlElement = document.createElement('div');
      controlElement.classList.add('control');
      const shadowedElement = document.createElement('dummy-element');
      document.body.appendChild(shadowedElement);
      shadowedElement.shadowRoot ? shadowedElement.shadowRoot.appendChild(controlElement) : '';
      expect(getControlElement(shadowedElement)).toEqual(controlElement);
    });
  });

  describe(`setAttribute`, function () {
    it(`should set attribute on the element`, function () {
      const ele = document.createElement('div');
      setAttribute(ele, 'style', 'background: black;');
      expect(ele.getAttribute('style')).toEqual('background: black;');
    });

    it(`should resolve after rAF`, function (done) {
      const mockElement = document.createElement('div');
      const element = setAttribute(mockElement, 'style', 'mock');
      requestAnimationFrame(() => {
        element.then(() => {
          expect(element instanceof Promise).toEqual(true);
          done();
        });
      });
    });
  });
});
