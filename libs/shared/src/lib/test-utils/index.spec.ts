import {
  ADD_TEMPLATE_TO_FIXTURE,
  createFormHTML,
  elementUpdated,
  fixture,
  getBaseElement,
  getControlElement,
  listenToFormSubmission,
  setAttribute
} from '.';

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

  describe(`listenToFormSubmission`, function () {
    it('should return a promise that resolves on form submit', async function() {
      const spy = jest.fn();
      const form = document.createElement('form');
      form.onsubmit = () => false;
      const submissionPromise = listenToFormSubmission(form);
      submissionPromise.then(spy);

      form.requestSubmit();
      await submissionPromise;

      expect(spy).toHaveBeenCalled();
    });
  });

  describe(`createFormHTML`, function () {
    it(`should return the form with given ID`, function () {
      const {form} = createFormHTML({
        formId: 'test', componentTagName: 'vwc-test', fieldName: 'tested-component'
      });
      expect(form.id).toEqual('test');
      expect(form instanceof HTMLFormElement).toEqual(true);
    });

    it(`should set the component inside the form with name and value`, function () {
      const {element} = createFormHTML<HTMLElement>({
        formId: 'test', componentTagName: 'vwc-test', fieldName: 'tested-component', fieldValue: 'someValue'
      });
      expect(element.getAttribute('name')).toEqual('tested-component');
      expect(element.getAttribute('value')).toEqual('someValue');
    });

    it(`should set the component inside the form with name and status checked`, function () {
      const {element} = createFormHTML<HTMLElement>({
        formId: 'test', componentTagName: 'vwc-test', fieldName: 'tested-component', checked: 'on'
      });
      expect(element.getAttribute('name')).toEqual('tested-component');
      expect(element.hasAttribute('checked')).toEqual(true);
    });

    it(`should render a form and set the element with form attribute`, function () {
      const {element, otherForm} = createFormHTML<HTMLElement>({
        formId: 'test', componentTagName: 'vwc-test', fieldName: 'tested-component', otherFormId: 'someId'
      });

      expect(otherForm.id).toEqual('someId');
      expect(element.getAttribute('form')).toEqual('someId');
    });

    it(`should set a button inside the form`, function () {
      const {form, button} = createFormHTML({
        formId: 'test', componentTagName: 'vwc-test', fieldName: 'tested-component'
      });

      expect(button).toEqual(form.querySelector('button'));
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
