# Accessibility

The Vivid Design System is built to allow people with diverse abilities to access, navigate and use Vonage products to their fullest potential.

## What is Accessibility?

Accessibility refers to guidelines and practices to ensure our products are easy for everyone to use. While our customers share common goals while using our products, not all share the same abilities. To stay true to our values of diversity, inclusion and putting our customers first, we need to design, build, and test our products with the full spectrum of users in mind. By approaching accessibility as a foundational tenant of design, accessible principles will result in products that are easier for everyone to use.

### Type of Impairments

Impairments that require accessible content include:

- Visual Blindness, low vision, and poor eyesight, color blindness
- Motor/Mobility Difficulty or inability to use one’s hands, including tremors, muscle slowness, and loss of fine muscle control, due to Parkinson’s disease, muscular dystrophy, cerebral palsy, and stroke
- Auditory Deafness or hearing loss; Seizures: Photo epileptic seizures caused by visual strobe or flashing effects
- Cognitive/Intellectual Developmental disabilities, learning disabilities (dyslexia, dyscalculia), cognitive disabilities affecting memory, attention, developmental “maturity,” problem-solving and logic skills

Disabilities can be temporary or situational:

- Anyone suffering an injury to an arm or hand may be temporarily unable to use a mouse.
- Anyone working in a loud environment such as a bar or construction site may have difficulty hearing.
- Lack of visual contrast may impact anyone working in poor light, using an older device, or in need of new glasses.

### Web Content Accessibility Guidelines (WCAG)

The[World Wide Web Consortium’s (W3C) Web Content Accessibility Guidelines (WCAG 2.2)](https://www.w3.org/TR/WCAG22/) provide standards to ensure that product experiences are [perceivable](https://www.w3.org/TR/WCAG22/#perceivable), [operable](https://www.w3.org/TR/WCAG22/#operable), [understandable](https://www.w3.org/TR/WCAG22/#understandable), and [robust](https://www.w3.org/TR/WCAG22/#robust).

While implementations vary by product, the guidelines establish a common baseline to assess the accessibility of product experiences, and to identify opportunities for improvement.

The Vivid team aims to meet the above recommendations for:

- Vivid components
- This reference site

## Accessibility Ready Vivid Components

Vivid provides accessibility-ready components. This means that Vivid accounts for as many aspects of accessibility within our components as possible, however, there is always additional configuration that must be done by product teams during implementation.

If there is anything a product team needs to do to ensure a component is accessible, it will be documented in the Accessibility section of the component page.

## Testing Accessibility

### Tools

The Vivid team uses a variety of tools during the development process, including, but not limited to:

- [WAVE browser extension](https://wave.webaim.org/extension/)
- [Axe browser extension](https://chromewebstore.google.com/detail/axe-devtools-web-accessib/lhdoppojpmngadmnindnejefpokejbdd)
- [Figma contrast plugin](https://www.figma.com/community/plugin/733159460536249875) 

The team also uses general inspection techniques, including:

- [sensory inspection](https://web.dev/articles/a11y-tips-for-web-dev) (visual, auditory, etc.)
- HTML inspection using [browser developer tools](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Tools_and_setup/What_are_browser_developer_tools)
- [accessibility tree](https://developer.mozilla.org/en-US/docs/Glossary/Accessibility_tree) inspection

### Automated Testing

The Vivid team uses [jest-axe](https://github.com/nickcolley/jest-axe) as part of our development/deployment process. This tool tests the components internal HTML code against [axe-core](https://github.com/dequelabs/axe-core).

The team does not solely rely on automated testing processes, as a 2017 study from GDS concluded that only [~30% of issues are found by automated testing tools](https://accessibility.blog.gov.uk/2017/02/24/what-we-found-when-we-tested-tools-on-the-worlds-least-accessible-webpage/), such as axe-core.

### Manual Testing

As part of the discovery phase, the Vivid team will research the accessibility requirements for a new feature and define a set of accept criteria to be tested against in the proposal document.

We use various resources for this research including the [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/) and [Inclusive Components](https://inclusive-components.design/) websites.

We also have a [General Accessibility Checklist](https://docs.google.com/spreadsheets/d/1UKyHg9DBqP8szAEbksoyfZab6G7lf98D0QWF9451aoU/edit#gid=1175911860) that we manually test our components against. This ensures that we test our components for responsiveness, keyboard only and screen reader compatibility.
