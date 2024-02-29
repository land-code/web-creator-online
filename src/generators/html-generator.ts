import * as Blockly from 'blockly';

export const htmlGenerator = new Blockly.Generator('HTML');

// @ts-expect-error: Blockly is not typed
htmlGenerator.scrub_ = function (block, code, thisOnly) {
  const nextBlock =
    block.nextConnection?.targetBlock();
  if (nextBlock && !thisOnly) {
    return `${code}\n${htmlGenerator.blockToCode(nextBlock) as string}`;
  }
  return code;
};