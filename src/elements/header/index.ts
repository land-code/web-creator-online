import { Block } from 'blockly'
import headerJson from './header.json'

const Order = {
  ATOMIC: 0,
};

const generator = (block: Block, generator: Generator) => {
  const tag = block.getFieldValue('HEADER_LEVEL')
  const text = block.getFieldValue('TEXT')
  const code = `<${tag}>${text}</${tag}>`
  return code
}

export default {
  name: 'header',
  category: 'Elements',
  content: headerJson,
  generator
}