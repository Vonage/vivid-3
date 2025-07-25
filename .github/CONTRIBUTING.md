# Contributor guidelines template

## What do I need to know to help?

If you are interested in making a code contribution you should read our [conventions guidelines](../docs/conventions/readme.md) before you start.

## How do I make a contribution?

Never made an open source contribution before? Wondering how contributions work in the in our project? Here's a quick rundown!

- Fork the repository and clone it to your local machine

- Create a new branch for your issue `git checkout -b branch-name-here`

- Run `npm install`

- Building and developing the documentation:

  - Development: `npm start`
  - Build: `npx run build`

- Building and developing the components:

  - Unit Tests
    - `npm test`
  - Visual tests: see the [ui-tests documentation](../docs/ui-test/readme.md)

- Once you are done developing the change, commit your changes with a meaningful commit message.

- Push the changes to the remote repository using `git push origin branch-name-here`.

- Submit a pull request to the upstream repository. Make sure the title of the pull request follows the [conventional commits format](https://www.conventionalcommits.org/en/v1.0.0/) (this will be checked in the CI). It should summarize the changes you propose, e.g.: "feat(button): added new feature requested in #876"

- In the description of the pull request, explain the changes that you made in detail, any issues you think exist with the pull request you made, and any questions you have for the maintainer. It's OK if your pull request is not perfect (no pull request is), the reviewer will be able to help you fix any problems and improve it!

- Wait for the pull request to be reviewed by a maintainer.

- Make changes to the pull request if the reviewing maintainer recommends them.

- Celebrate your success after your pull request is merged!

## Where can I go for help?

If you need help, you can ask questions on our mailing list, IRC chat, or [list any other communication platforms that your project uses].

## What does the Code of Conduct mean for me?

Our Code of Conduct means that you are responsible for treating everyone on the project with respect and courtesy regardless of their identity. If you are the victim of any inappropriate behavior or comments as described in our Code of Conduct, we are here for you and will do the best to ensure that the abuser is reprimanded appropriately, per our code.

## Vivid criteria

### Guiding principles to consider when introducing changes

- Align to Vivid design language

- Make sure (as much as you can) contribution does not produce WCAG violations (both in design & engineering)

- Ensure user interaction with changes correspond to all types of users (e.g., keyboard, mouse, touch, assistive technology, etc.)

- Refer to components/features of valid libraries, which are compliant with UX and a11y guidelines ([Carbon](https://www.carbondesignsystem.com/components/overview/) - IBM, [Spectrum](https://spectrum.adobe.com/) - Adobe, [Material](https://material.io/components?platform=web) - Google, [Garden](https://garden.zendesk.com/) - Zendesk, [Lightning](https://www.lightningdesignsystem.com/) - Salesforce, [BBC](https://www.bbc.co.uk/gel/guidelines/category/design-patterns), etc.)

- Share UI/UX design experts' research
