export function processToSheets(process) {
  const sheets = [];

  const nodesIndex = sheets.push({
    name: 'nodes',
    columns: [
      {
        field: 'ref',
        label: 'Ref',
      },
      {
        field: 'type',
        label: 'Type',
      },
      {
        field: 'title',
        label: 'Title',
      },
      {
        field: 'description',
        label: 'Description',
      },
      {
        field: 'forms',
        label: 'Forms',
      },
      {
        field: 'milestone',
        label: 'Milestone',
      },
    ],
    data: [],
  }) - 1;

  const formsIndex = sheets.push({
    name: 'forms',
    columns: [
      {
        field: 'ref',
        label: 'Ref',
      },
      {
        field: 'multiple',
        label: 'Multiple',
      },
      {
        field: 'title',
        label: 'Title',
      },
      {
        field: 'description',
        label: 'Description',
      },
      {
        field: 'inputs',
        label: 'Inputs',
      },
    ],
    data: [],
  }) - 1;

  const inputsIndex = sheets.push({
    name: 'inputs',
    columns: [
      {
        field: 'ref',
        label: 'Ref',
      },
      {
        field: 'type',
        label: 'Type',
      },
      {
        field: 'label',
        label: 'Label',
      },
      {
        field: 'optional',
        label: 'Optional',
      },
      {
        field: 'helpText',
        label: 'Help text',
      },
      {
        field: 'options',
        label: 'Options',
      },
    ],
    data: [],
  }) - 1;

  const optionsIndex = sheets.push({
    name: 'options',
    columns: [
      {
        field: 'ref',
        label: 'Ref',
      },
      {
        field: 'value',
        label: 'Value',
      },
      {
        field: 'label',
        label: 'Label',
      },
    ],
    data: [],
  }) - 1;

  process.nodes.forEach((n, nI) => {
    const nRef = `n${nI}`;

    const cNodeI = sheets[nodesIndex].data.push({
      ref: nRef,
      type: n.type,
      title: n.title,
      description: n.description,
      forms: null,
      milestone: n.milestone ? 'yes' : 'no',
    }) - 1;

    if (n.forms) {
      n.forms.forEach((f, fI) => {
        const fRef = `${nRef}f${fI}`;

        if (sheets[nodesIndex].data[cNodeI].forms) {
          sheets[nodesIndex].data[cNodeI].forms += ',' + fRef;
        } else {
          sheets[nodesIndex].data[cNodeI].forms = fRef;
        }

        const cFormI = sheets[formsIndex].data.push({
          ref: fRef,
          multiple:  f.multiple ? 'yes' : 'no',
          title: f.title,
          description: f.description,
          inputs: null,
        }) - 1;

        f.inputs.forEach((i, iI) => {
          const iRef = `${fRef}i${iI}`;

          if (sheets[formsIndex].data[cFormI].inputs) {
            sheets[formsIndex].data[cFormI].inputs += ',' + iRef;
          } else {
            sheets[formsIndex].data[cFormI].inputs = iRef;
          }

          const cInputI = sheets[inputsIndex].data.push({
            ref: iRef,
            type: i.type,
            optional:  i.optional ? 'yes' : 'no',
            helpText:  i.helpText,
            label: i.label,
            options: null,
          }) - 1;

          if (i.options) {
            i.options.forEach((o, oI) => {
              const oRef = `${iRef}o${oI}`;

              if (sheets[inputsIndex].data[cInputI].options) {
                sheets[inputsIndex].data[cInputI].options += ',' + oRef;
              } else {
                sheets[inputsIndex].data[cInputI].options = oRef;
              }

              sheets[optionsIndex].data.push({
                ref: oRef,
                value: o.value,
                label: o.label,
              });
            });
          }
        });
      });
    }
  });

  return sheets;
}
