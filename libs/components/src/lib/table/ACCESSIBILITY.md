## Implementation guidance

- Always use header cells for column labels
- Ensure header content clearly describes the associated column or row
- Avoid empty header cells unless they are semantically required
- Keep interactive content within cells keyboard-accessible and clearly labelled

## Semantic structure

Each Table component maps directly to its HTML table equivalent, ensuring that assistive technologies can correctly interpret the table’s structure and relationships.

This approach allows screen readers to announce row and column relationships, headers, and cell content automatically.

## ARIA usage

ARIA roles are applied where necessary to reinforce semantics (eg. Table: `table`, Table Row: `row` etc.)

## Keyboard interaction

Because the Table components rely on native table behaviour:

- Keyboard users can navigate using standard browser interactions
- Screen readers provide expected table navigation shortcuts
- No custom focus management or keyboard overrides are introduced
