import convert from 'xml-js';

const DEFAULT_AUTHOR = 'Pistacho';

export function processToXml(process) {
  const tree = convert.json2xml(
    {
      declaration: {
        attributes: {
          version: '1.0',
          encoding: 'utf-8',
        }
      },

      elements: [
        {
          type: 'element',
          name: 'process-spec',
          elements: [
            {
              type: 'element',
              name: 'process-info',
              elements: [
                {
                  type: 'element',
                  name: 'author',
                  elements: [
                    {
                      type: 'text',
                      text: DEFAULT_AUTHOR,
                    },
                  ],
                },
                {
                  type: 'element',
                  name: 'name',
                  elements: [
                    {
                      type: 'text',
                      text: process.title,
                    },
                  ],
                },
                {
                  type: 'element',
                  name: 'description',
                  elements: [
                    {
                      type: 'text',
                      text: process.description,
                    },
                  ],
                },
                {
                  type: 'element',
                  name: 'public',
                  elements: [
                    {
                      type: 'text',
                      text: 'true',
                    },
                  ],
                },
              ],
            },
            {
              type: 'element',
              name: 'process',
              elements: process.nodes.map((n, nI) => {
                const nRef = `n${nI}`;

                const nodeTree = {
                  type: 'element',
                  name: n.type,
                  attributes: {
                    id: nRef,
                  },
                  elements: [
                    {
                      type: 'element',
                      name: 'node-info',
                      elements: [
                        {
                          type: 'element',
                          name: 'name',
                          elements: [
                            {
                              type: 'text',
                              text: n.title,
                            },
                          ],
                        },
                        {
                          type: 'element',
                          name: 'description',
                          elements: [
                            {
                              type: 'text',
                              text: n.description,
                            },
                          ],
                        },
                      ],
                    },
                    {
                      type: 'element',
                      name: 'auth-filter',
                      attributes: {
                        backend: 'anyone',
                      },
                    },
                  ],
                };

                if (n.forms) {
                  nodeTree.elements.push(
                    {
                      type: 'element',
                      name: 'form-array',
                      elements: n.forms.map((f, fI) => {
                        const fRef = `${nRef}f${fI}`;

                        return {
                          type: 'element',
                          name: 'form',
                          attributes: {
                            id: fRef,
                          },
                          elements: f.inputs.map((i, iI) => {
                            const iRef = `${fRef}i${iI}`;

                            const inputTree = {
                              type: 'element',
                              name: 'input',
                              attributes: {
                                type: i.type,
                                label: i.label,
                                name: iRef,
                                required: 'required',
                              },
                            };

                            if (i.options) {
                              inputTree.elements = [
                                {
                                  type: 'element',
                                  name: 'options',
                                  elements: i.options.map((o) => ({
                                    type: 'element',
                                    name: 'option',
                                    attributes: {
                                      value: o.value,
                                    },
                                    elements: [
                                      {
                                        type: 'text',
                                        text: o.label,
                                      },
                                    ],
                                  })),
                                },
                              ];
                            }

                            return inputTree;
                          }),
                        };
                      }),
                    },
                  )
                }

                return nodeTree;
              }),
            },
          ],
        }
      ],
    },
    {
      compact: false,
      ignoreComment: true,
      spaces: 2,
    },
  );
  return tree;
}
