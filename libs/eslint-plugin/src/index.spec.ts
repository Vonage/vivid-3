import eslintPluginVivid from '.';

describe('eslint-plugin', () => {
	it('should generate the config', async () => {
		expect(eslintPluginVivid).toMatchInlineSnapshot(`
          {
            "configs": {
              "flat/vue": [
                {
                  "plugins": {
                    "@vonage/vivid": [Circular],
                  },
                  "rules": {
                    "@vonage/vivid/accessible-names": "error",
                    "@vonage/vivid/no-anchor-attribute": "error",
                    "@vonage/vivid/no-current-value-attribute": "error",
                    "@vonage/vivid/no-deprecated-apis": "error",
                    "@vonage/vivid/no-inaccessible-events": "error",
                    "@vonage/vivid/no-slot-attribute": "error",
                    "@vonage/vivid/no-value-attribute": "error",
                  },
                },
              ],
              "vue": {
                "plugins": [
                  "@vonage/vivid",
                ],
                "rules": {
                  "@vonage/vivid/accessible-names": "error",
                  "@vonage/vivid/no-anchor-attribute": "error",
                  "@vonage/vivid/no-current-value-attribute": "error",
                  "@vonage/vivid/no-deprecated-apis": "error",
                  "@vonage/vivid/no-inaccessible-events": "error",
                  "@vonage/vivid/no-slot-attribute": "error",
                  "@vonage/vivid/no-value-attribute": "error",
                },
              },
            },
            "rules": {
              "accessible-names": {
                "create": [Function],
                "meta": {
                  "docs": {
                    "description": "Ensure that components have accessible names.",
                  },
                  "schema": [],
                  "type": "problem",
                },
              },
              "no-anchor-attribute": {
                "create": [Function],
                "meta": {
                  "docs": {
                    "description": "Use anchor slot instead of the \`anchor\` prop.",
                  },
                  "fixable": "code",
                  "schema": [],
                  "type": "problem",
                },
              },
              "no-current-value-attribute": {
                "create": [Function],
                "meta": {
                  "docs": {
                    "description": "Do not use current value attributes.",
                  },
                  "fixable": "code",
                  "schema": [],
                  "type": "problem",
                },
              },
              "no-deprecated-apis": {
                "create": [Function],
                "meta": {
                  "docs": {
                    "description": "Do not use deprecated APIs.",
                  },
                  "fixable": "code",
                  "schema": [],
                  "type": "problem",
                },
              },
              "no-inaccessible-events": {
                "create": [Function],
                "meta": {
                  "docs": {
                    "description": "Do not use interactive events on non-interactive components.",
                  },
                  "schema": [],
                  "type": "problem",
                },
              },
              "no-slot-attribute": {
                "create": [Function],
                "meta": {
                  "docs": {
                    "description": "Use Vue template slot syntax instead of the \`slot\` attribute.",
                  },
                  "fixable": "code",
                  "schema": [],
                  "type": "problem",
                },
              },
              "no-value-attribute": {
                "create": [Function],
                "meta": {
                  "docs": {
                    "description": "Do not use the value (or checked) attribute.",
                  },
                  "fixable": "code",
                  "schema": [
                    {
                      "additionalProperties": false,
                      "properties": {
                        "replaceWith": {
                          "enum": [
                            "modelValue",
                            "initialValue",
                          ],
                        },
                      },
                      "type": "object",
                    },
                  ],
                  "type": "problem",
                },
              },
            },
          }
        `);
	});
});
