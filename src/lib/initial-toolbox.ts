import type * as Blockly from 'blockly/core'

export const initialToolbox: Blockly.BlocklyOptions['toolbox'] = {
  kind: 'categoryToolbox',
  contents: [
    {
      kind: 'category',
      name: 'Elements',
      contents: [],
    },
  ],
};
