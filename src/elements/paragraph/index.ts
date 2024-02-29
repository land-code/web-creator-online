import type { Block } from 'blockly';
import paragraphJson from './paragraph.json';

function generator(block: Block) {
  const text = block.getFieldValue('TEXT') as string;
  const code = `<p>${text}</p>`;
  return code;
}

const paragraph = {
  name: 'paragraph',
  category: 'Elements',
  content: paragraphJson,
  generator,
};

export default paragraph;
