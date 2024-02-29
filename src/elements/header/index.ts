import type { Block } from 'blockly';
import headerJson from './header.json';

function generator(block: Block) {
  const tag = block.getFieldValue('HEADER_LEVEL') as string;
  const text = block.getFieldValue('TEXT') as string;
  const code = `<${tag}>${text}</${tag}>`;
  return code;
}

const header = {
  name: 'header',
  category: 'Elements',
  content: headerJson,
  generator,
};

export default header;