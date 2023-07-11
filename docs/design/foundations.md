
# Foundations

---

The core guidelines are driven by the [Vonage Brand Toolkit](https://drive.google.com/file/d/1zPE5qIJys_KyjpWNAfsW9tmHc3iXEOMl/view) and are the foundations on which we built our design system. Specifically, these elements are the subatomic elements of all our components.

---

## Core Variables
Our core variables are represented as [design tokens](#design-tokens) which are design decisions based on our [brand’s design foundations](#brand-colors). These include color palette, typography and elevation scale, schemes, platform scale, iconography, etc.
 
<vwc-note connotation="information" headline="Components" connotation="information">
Vivid Components are interactive building blocks that implement Vonages design system.  
VVC (vivid-components) are used for creating user interfaces and include a built-in system for connotations, states, and user interactions.
</vwc-note>

---

<vwc-note connotation="information" headline="Web components" connotation="information">
  Web Components is a suite of different technologies allowing you to create reusable custom elements - with their functionality encapsulated away from the rest of your code - and utilize them in your web apps. Vivid Web Components (VWC) are a collection of Web Components maintained by Vivid team.
</vwc-note>

---
## Design tokens

Design tokens are all the values needed to construct and maintain a design system — color, typography, spacing, object styles, sizing, etc. — represented as data.

These can represent anything defined by design: font size in pixel, a color as a RGB value, an opacity as a number, etc. They’re used in place of hard-coded values in order to ensure flexibility and unity across all product experiences.

Design tokens are directly integrated into our component libraries and UI kits. They cover the various options of platform scales, color themes, component states, and more.

Using design tokens allows us to manage and maintain our design system as Vonage’s design Single source of truth.

### Design token types

The following types of design tokens are the building blocks and design decisions that make up the Vivid design language:

**Global tokens** - global tokens are the primitive values in our design language, represented by context-agnostic names. Our color palette, typography, and elevation values are all recorded as global tokens. These can be directly used, and are inherited by all other token types.

![Global-tokens-explainer](https://user-images.githubusercontent.com/106529909/185866434-34566931-4f35-49cc-a535-5690414ea5a2.png)

**Alias tokens** - alias tokens relate to a specific context or abstraction. Aliases help communicate the intended purpose of a token, and are effective when a value with a single intent will appear in multiple places.

![alias-tokens-explainer](https://user-images.githubusercontent.com/106529909/185866411-98c26728-8bec-4836-a440-a76469edd25d.png)

Application of the color palette brings a unified and recognizable consistency to Vonage’s vast array of digital products and interfaces. This consistency is grounded by a set of well-defined rules on how to work with the Vivid component library in the context of dark and light themes.

---

## Brand colors

Vivid’s default theme is derived from the Vonage Brand Identity color palette. Black is our Primary color and the core Purple family serves as the main action color across all Vonage products and experiences. The Neutral Gray family is dominant in our default theme, making use of subtle shifts in value and lightness to help organize content into distinct sections.

![color palette](https://user-images.githubusercontent.com/106529909/188305811-6f80d634-cc3d-4dc4-84ab-51949fbdc5dc.png)

### Additional brand colors

Although we value an aesthetically pleasing use of color, we place a higher value on clear communication. Our use of color should be rational and should serve to support the purpose of the content. The additional brand colors should be used sparingly and purposefully throughout Vonage’s interfaces and applications, and mainly just for decoartive purposes.

![brand colors](https://user-images.githubusercontent.com/106529909/188305830-ab6f12ac-60c5-4844-890c-a7954165c701.png)

### Gradients

Our brand colors are used to build two distinctive sets of gradients. 2-tone and 3-tone gradients.  
Gradients should only be used for decorative and illustrative purposes, never to convey functionality or information.

#### 2-tone gradients

![2-tone gradients](https://user-images.githubusercontent.com/106529909/188305849-ca5c783a-a983-45f0-840f-ef89c229989f.png)

#### 3-tone gradients

![3-tone gradients](https://user-images.githubusercontent.com/106529909/188305853-ebe7477f-e43b-4423-a0fe-485851c6bf18.png)

To learn more about the usage of 2-tone and 3-tone gradients please review -
[Vonage’s Brand Identity Toolkit manual.](https://drive.google.com/file/d/1zPE5qIJys_KyjpWNAfsW9tmHc3iXEOMl/view)
