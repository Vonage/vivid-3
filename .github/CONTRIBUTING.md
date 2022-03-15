# Contributor guidelines template

## What do I need to know to help?

If you are interested in making a code contribution and would like to learn more about the technologies that we use, check out the list below.

- [Vivid Development Cycle](../docs/development.md)

## How do I make a contribution?

Never made an open source contribution before? Wondering how contributions work in the in our project? Here's a quick rundown!

* Fork the repository and clone it to your local machine

* Create a new branch for your issue `git checkout -b branch-name-here`

* Run `npm install`

* Building and developing the documentation:
  * Development: `npx nx run docs:serve`
  * Build: `npm run build docs`

* Building and developing the components:
  * Unit Tests: `npm run nx test components`
  * Visual tests: see the [ui-tests documentation](ui-tests/readme.md)
  * Build: `npm run build components`

* Once you are done developing the change commit your changes with a meaningful commit message

* We are using `beachball` in order to document changes:
  * run: `npx beachball change`. This will generate and commit change files. It will prompt you for some answers.
  * Note that during CI a check is made to make sure this rule is followed

* Push the changes to the remote repository using `git push origin branch-name-here`.

* Submit a pull request to the upstream repository.

* Title the pull request with a short description of the changes made and the issue or bug number associated with your change. For example, you can title an issue like so "Added more log outputting to resolve #4352".

* In the description of the pull request, explain the changes that you made, any issues you think exist with the pull request you made, and any questions you have for the maintainer. It's OK if your pull request is not perfect (no pull request is), the reviewer will be able to help you fix any problems and improve it!
 
* Wait for the pull request to be reviewed by a maintainer.
 
* Make changes to the pull request if the reviewing maintainer recommends them.
 
* Celebrate your success after your pull request is merged!

## Where can I go for help?

If you need help, you can ask questions on our mailing list, IRC chat, or [list any other communication platforms that your project uses].

## What does the Code of Conduct mean for me?

Our Code of Conduct means that you are responsible for treating everyone on the project with respect and courtesy regardless of their identity. If you are the victim of any inappropriate behavior or comments as described in our Code of Conduct, we are here for you and will do the best to ensure that the abuser is reprimanded appropriately, per our code.

## Vivid criteria

### Guiding principles to consider when introducing changes

* Guarantee contribution does not produce WCAG violations (both in design & engineering)

* Ensure user interaction with changes correspond to all types of users (e.g., keyboard, mouse, touch, assistive technology, etc.)

* Refer precedent components/features of valid libraries, which are compliant with UX and a11y guidelines ([Carbon](https://www.carbondesignsystem.com/components/overview/) - IBM, [Spectrum](https://spectrum.adobe.com/) - Adobe, [Material](https://material.io/components?platform=web) - Google, [Garden](https://garden.zendesk.com/) - Zendesk, [Lightning](https://www.lightningdesignsystem.com/) - Salesforce, [BBC](https://www.bbc.co.uk/gel/guidelines/category/design-patterns), etc.)

* Share UI/UX design experts' research
