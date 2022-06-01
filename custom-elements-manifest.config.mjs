export default {
    /** Globs to analyze */
    globs: ['libs/components/src/lib/**/*.ts'],
    /** Globs to exclude */
    exclude: [
        '**/*.md',
        '**/*.spec.ts',
        '**/index.ts',
        '**/*.template.ts',
        '**/enums.ts',
        '**/components.ts',
        '**/helpers/*.ts'
    ],
    /** Directory to output CEM to */
    outdir: 'dist',
    /** Run in dev mode, provides extra logging */
    dev: false,
    /** Enable special handling for fast */
    fast: true,
    plugins: []
}