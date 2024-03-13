# Testing for accessibility
 
 Find out more about how we test for accessibility and ensure that our products meet accessibility standards.

 ## Why do we need to test for accessibility?

At Vonage we understand that accessibility is crucial when it comes to designing and building products. We are aiming for our products and services to meet at least **level AA** of the **Web Content Accessibility Guidelines 2.2 (WCAG)**. To achieve this, it's essential that you consider accessibility at the start of a project and run accessibility tests regularly throughout the design process.

We offer guidance on the different types of accessibility testing that should be used in your projects. We recommend a **mixture of automated and  manual** methods to ensure that most accessibility issues can be detected.

## Automated testing

We use automated testing tools to audit our components for WCAG compliance, ensuring we follow best practices seamlessly.

We estimate that **automated testing can detect a large number of common WCAG issues**. Automated testing also gives your team more time to focus on the more complex accessibility tests that need to be completed manually.

We recommend using tools such as Deque’s [axe-core](https://www.deque.com/axe/) for the web for automated testing. Each Vivid component is tested using axe as part of our CI /CD process. Please reach out to us if you need help integrating this tool.

It’s important to note that whilst automated accessibility tests are a great step towards providing an accessible application, they do not guarantee that your app is accessible to real users.

Some of the issues that automated checks don’t usually cover are:

- Correct reading order of content
- Appropriate use of HTML
- Good keyboard navigation experience
- Useful image captions and alt text
- Cognitive accessibility

## Manual testing

As part of the discovery phase, the Vivid team will research the accessibility requirements for a new feature and define a set of acceptance criteria to be tested against in the proposal document.

We use various resources for this research including the [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/) and [Inclusive Components](https://inclusive-components.design/) websites.

We also use our own [Manual Accessibility Test](https://docs.google.com/spreadsheets/d/1UKyHg9DBqP8szAEbksoyfZab6G7lf98D0QWF9451aoU/edit#gid=1175911860) spreadsheet to manually test and document our components against. This ensures that we test our components for responsiveness, keyboard only and screen reader compatibility.

The Manual Accessibility Test spreadsheet is geared specifically for component testing, for manual testing in products we recommend referring to a comprehensive [accessibility checklist](https://www.a11yproject.com/checklist/) to help you test for common accessibility barriers.

[![Accessibility Project checklist](/assets/images/a11y-checklist.png)](https://www.a11yproject.com/checklist/)

The **A11y Project checklist** provides an excellent resource that includes items such as checking for proper colour contrast, keyboard accessibility, and the correct use of descriptive text and alt attributes for images. This checklist can serve as a good foundation for testing the accessibility of your product.

## Screen reader testing

The goal of screen reader testing is to ensure that our products are properly designed and coded to be compatible with screen readers, providing an inclusive user experience for individuals with those needs.

### How we carry out screen reader testing

To carry out screen reader testing we currently only use [Apple Voiceover](https://support.apple.com/en-gb/guide/voiceover/welcome/mac). This is due to the Vivid team only having access to macs. 

We recognise the need to test on Windows based screen readers such as [NVDA](https://www.nvaccess.org/about-nvda/) and are looking into solutions such as [Assistiv Labs](https://assistivlabs.com/) which allow you to test on various different OS / screen reader combinations.

Below are some important factors we test when conducting screen reader testing:

- **Compatibility**: The screen reader should be able to navigate through the content, read the text, and interact with the controls.
- **Navigation and Focus**: The screen reader should be able to properly navigate through our product using keyboard commands, landmarks, headings, and other navigation techniques.
- **Reading Order**: The screen reader should read content in a logical and meaningful order. It should follow the intended reading order, especially for complex layouts with multiple columns, tables, or responsive designs.
- **Alternative Text (Alt Text)**: Images should have appropriate alternative text descriptions (alt text) to provide meaningful information to visually impaired users. We verify that alt text is available and properly announced by the screen reader when images are encountered.
- **Form Accessibility**: We ensure that form elements, labels, and error messages are properly associated and announced.
- **ARIA Roles and Attributes**: We use Accessible Rich Internet Applications (ARIA) roles and attributes to enhance the accessibility of dynamic and interactive elements. We use screen reader testing to verify that ARIA roles and attributes are correctly implemented and announced by the screen reader, providing additional context and functionality.
- **Multimedia Accessibility**: Screen reader testing also involves assessing the accessibility of multimedia elements, such as audio and video. We use it to ensure that appropriate alternative text or captions are provided for multimedia content.
