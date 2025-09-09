- Applause will be conducting user testing to validate the accessibility of this component.

## Implementation

- If a `label` can not be used, always provide an `aria-label` as an alternative. This will allow screen reader users to know the purpose of the Searchable Select.
- Never use `placeholder` text in place of a `label` or `aria-label`. [The problem with placeholders](https://www.deque.com/blog/accessible-forms-the-problem-with-placeholders)
- When using Options with slotted content (e.g. icons, badges) that should be accessible to screen readers, you must set `aria-label` on the Option to provide a text alternative for the entire Option. You cannot rely on the Browser's accessible name computation because Searchable Select bypasses it.
