# Vivid Development Cycle

## Setup

* Fork the repository and clone it to your local machine

* Run `npm install`

* Documentation:
  * Development: `npx nx run serve docs`
  * Build: `npm run build docs`
  
* Components:
  * Unit Tests: `npm run nx test components`
  * Visual tests: see the [ui-tests documentation](ui-tests/readme.md)
  * Build: `npm run build components`
  
* Once you are done developing the change and commit your changes, you need to make sure no package changes have been made:
  * `npx beachball change` - this will generate and commit change files. It will prompt you for some answers.
  * Note that during CI a check is made to make sure this rule is followed
