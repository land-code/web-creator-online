import type { Block } from 'blockly'
import headerJson from './header.json'

function generator (block: Block) {
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