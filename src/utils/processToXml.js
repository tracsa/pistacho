import convert from 'xml-js';

const DEFAULT_AUTHOR = 'Pistacho';

function buildNode(rawNode) {
  const built = {
    type: 'element',
    name: rawNode.type,
    attributes: {
      id: rawNode.id,
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
                text: rawNode.title,
              },
            ],
          },
          {
            type: 'element',
            name: 'description',
            elements: [
              {
                type: 'text',
                text: rawNode.description,
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

  if (rawNode.forms) {
    built.elements.push(
      {
        type: 'element',
        name: 'form-array',
        elements: rawNode.forms.map((form, fI) => {
          form.id = `${rawNode.id}f${fI}`;  // TODO: define in form
          return buildForm(form);
        }),
      },
    );
  }

  return built;
}

function buildForm(rawForm) {
  return {
    type: 'element',
    name: 'form',
    attributes: {
      id: rawForm.id,
    },
    elements: rawForm.inputs.map((input, iI) => {
      input.name = `${rawForm.id}i${iI}`;  // TODO: define in input
      return buildInput(input);
    }),
  };
}

function buildInput(rawInput) {
  const built = {
    type: 'element',
    name: 'input',
    attributes: {
      type: rawInput.type,
      label: rawInput.label,
      name: rawInput.name,
      required: 'required',  // TODO: define in input
    },
  };

  if (rawInput.options) {
    built.elements = [
      {
        type: 'element',
        name: 'options',
        elements: rawInput.options.map(option => buildOption(option)),
      },
    ];
  }

  return built;
}

function buildOption(rawOption) {
  return {
    type: 'element',
    name: 'option',
    attributes: {
      value: rawOption.value,
    },
    elements: [
      {
        type: 'text',
        text: rawOption.label,
      },
    ],
  };
}

export function processToXml(process) {
  const converted = convert.json2xml(
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
                      text: DEFAULT_AUTHOR,  // TODO: define in process
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
              elements: process.nodes.map((node, nI) => {
                node.id = `n${nI}`;  // TODO: define in node
                return buildNode(node);
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
  return converted;
}
