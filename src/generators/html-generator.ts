import * as Blockly from 'blockly';

export const htmlGenerator = new Blockly.Generator('HTML');

// @ts-ignore
htmlGenerator.scrub_ = function (block, code, thisOnly) {
  const nextBlock =
    block.nextConnection && block.nextConnection.targetBlock();
  if (nextBlock && !thisOnly) {
    return code + '\n' + htmlGenerator.blockToCode(nextBlock);
  }
  return code;
};