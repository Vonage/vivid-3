---
title: Why Staying Up to Date with Vivid Packages Matters
month: 2025-05
---

7th May 2025 - Konrad Sieńkowski

# Why Staying Up to Date with Vivid Packages Matters

In this article, we’re going to outline the benefits of staying current with Vivid package updates, explain why major upgrades are now straightforward, and provide useful advice for keeping your Vue and React projects up to date.

## Ongoing Bug Fixes and Reliability

Every Vivid package update addresses bugs that may impact your product’s stability. For example, [v4.22.0](https://github.com/Vonage/vivid-3/releases/tag/vivid-v4.22.0) fixed spacing issues in alerts and improved input handling in date & time pickers, while [v4.17.0](https://github.com/Vonage/vivid-3/releases/tag/vivid-v4.17.0) handled incorrect autofocus behavior of `searchable-select`. These fixes ensure your application remains reliable and visually consistent, benefiting both developers & end users experience.

## Accessibility Tweaks

Vivid updates include accessibility improvements. The [v4.22.0](https://github.com/Vonage/vivid-3/releases/tag/vivid-v4.22.0) release added `aria-checked` attributes to menu items, while [v4.18.0](https://github.com/Vonage/vivid-3/releases/tag/vivid-v4.18.0) fixed `radio` and `radio-group` structures to make them work well with screen readers. Such enhancements help your products meet WCAG standards, making your interfaces more inclusive and reducing compliance risks.

## New Features and Performance Improvements

Vivid package updates often bring new features and optimizations. The [v4.18.0](https://github.com/Vonage/vivid-3/releases/tag/vivid-v4.18.0) release introduced a `date-time-picker` component, and [v4.20.0](https://github.com/Vonage/vivid-3/releases/tag/vivid-v4.20.0) refined focus styles for a better accessibility and user experience. Performance enhancements are also regularly included: for example, [v4.5.0](https://github.com/Vonage/vivid-3/releases/tag/vivid-v4.5.0) announced tree-shaking support, allowing unused components to be excluded from your production bundle for faster load times.

## What Are the Long-Term Benefits of Staying Current?

- **Reduced technical debt:** Frequent updates prevent the accumulation of deprecated APIs and security vulnerabilities.
- **Better performance:** Regular optimizations make sure your app stays fast and efficient.
- **Improved accessibility:** Each update brings your product closer to full inclusivity, benefiting all users, improving their experience and meeting legal compliance.
- **Future-proofing:** Staying up-to-date guarantees compatibility with web standards and ecosystem tools.

## Major Upgrades Are Easier Than Ever

Upgrading to a new major version of the Vivid design system is no longer a tedious process. The Vivid team adopted [semantic versioning](https://semver.org/) and [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/), so breaking changes and new features are clearly explained in detailed migration guides and changelogs. Its modular structure and extensive documentation make updating your project simple and time-efficient. Official wrappers for [Vue](https://www.npmjs.com/package/@vonage/vivid-vue) and [React](https://github.com/Vonage/vivid-react) help maintain compatibility, so you can easily adopt the latest improvements.

## What’s the Difference Between Major and Minor Updates?

|                  | **Major updates**                                                                                                                                 | **Minor updates**                                                                                                                                                       |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Definition       | These updates introduce breaking changes that are not backward compatible. You may need to update your code or use cases after implementing them. | Minor updates introduce new features, components or bug fixes while maintaining backward compatibility. Your existing code should continue to work without any changes. |
| Examples         | Important redesigns, component API updates or other changes that require updates to your integration.                                             | New components, additional props/slots, accessibility and performance improvements, bug fixes                                                                           |
| How to identify? | Major version number increases (e.g. from 4.x.x to 5.0.0).                                                                                        | Minor version number increases (e.g. from 4.17.0 to 4.18.0).                                                                                                            |

## Perform Updates in Your Project in Three Steps

1. **Check the changelog and releases**  
   Review the [Vivid changelog](https://github.com/Vonage/vivid-3/blob/main/libs/components/CHANGELOG.md) and [GitHub releases](https://github.com/Vonage/vivid-3/releases) before upgrading to see what’s changed and whether the update is major or minor. If the update is a major one, breaking changes are always clearly explained there and in the [migration guides](https://vivid.deno.dev/guides/v4-release-migration/).
2. **Update the package**
   Use our official packages which are actively maintained and [kept up to date with every Vivid release](https://vivid.deno.dev/getting-started/vue/#complete-and-up-to-date).

   - **For Vue:** `npm install @vonage/vivid-vue@latest`
   - **For React:** `npm install @vonage/vivid-react@latest`

3. **Test your application and update the code if needed**
   - **For major updates:** Read about the breaking changes in the [changelog](https://github.com/Vonage/vivid-3/blob/main/libs/components/CHANGELOG.md) and update your code where necessary, then test your application thoroughly.
   - **For minor updates:** Run your tests after upgrading the package. _Optionally:_ adopt new features or enhancements if needed.

### Best Practices

- Use tools like [npm-check-updates](https://www.npmjs.com/package/npm-check-updates) for automated dependency management.
- Always review the [Vivid changelog](https://github.com/Vonage/vivid-3/blob/main/libs/components/CHANGELOG.md) and [GitHub releases](https://github.com/Vonage/vivid-3/releases) before upgrading.
- Using our [ESLint plugin](https://vivid.deno.dev/guides/eslint-plugin/) to catch common issues and mistakes when working with Vivid Vue.
- Run your test suite after each update to catch integration issues early.

## Take Your Part in Shaping the Future of Vivid

An active community is a key to every successful open source project. By sharing ideas, reporting bugs, and requesting new features, contributors help keep the Vivid design system useful, up-to-date, and focused on real user needs.

### How To Get Involved

- **Join the conversation:** Engage with the Vivid team and other users via our Slack channels (**#ask-vivid, #vivid-announcements**) or [GitHub Discussions](https://github.com/Vonage/vivid-3/discussions)
- **Request changes or new features:** If you want to request a new feature or report a bug in Vivid, start by submitting a ticket. Make sure to include a clear description of the issue, relevant use cases, and how it could add value for others. Check out the details in the [Vivid Change Process](https://vivid.deno.d
- **Attend Office Hours:** Join Vivid’s regular Office Hours to chat about your requests or ideas directly with the team and community. Add your ticket and name to the [agenda](https://docs.google.com/document/d/1E0yvyGUzBoQFH5l_W6ElBoZaxqZ3HWmDLDqOl0lc8a0/edit?tab=t.0#heading=h.6an7tptc81o2) to get feedback and discuss feasibility.ev/resources/change-process/).
- **Make your contribution:** Whether you’re fixing a typo, improving accessibility, or adding a new component, all contributions are welcome. Check out the [contributing guide](https://github.com/Vonage/vivid-3/blob/main/.github/CONTRIBUTING.md) to get started.

### Your Feedback Influences Vivid’s Evolution

User feedback plays an important role in Vivid’s iterative design process. Every bug report, feature request, and contribution is reviewed and considered in future releases. The Vivid team regularly updates the community on progress, roadmaps, and upcoming features. By getting involved, you help Vivid grow and stay focused on accessibility, performance, and cross-framework compatibility.

### Keep Your Projects Secure, Accessible, and Performant

Keeping your Vivid package up to date ensures your projects benefit from the latest bug fixes, accessibility upgrades, and performance improvements. With streamlined publishing and dedicated packages for both Vue and React that are up-to-date alongside every release, updates are easy to implement. By following best practices and using the available tools, you can maintain modern, inclusive, and high-performing applications - backed by an active, engaged community driving each release.

### Resources

- [Vivid documentation](https://vivid.deno.dev/)
- [Vivid GitHub](https://github.com/Vonage/vivid-3)
- [Vue wrapper](https://www.npmjs.com/package/@vonage/vivid-vue)
- [React wrapper](https://github.com/Vonage/vivid-react)
- [Contributing Guide](https://github.com/Vonage/vivid-3/blob/main/.github/CONTRIBUTING.md)
