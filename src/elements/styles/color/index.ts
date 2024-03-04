import { Block } from 'blockly';
import colorJson from './color.json'

function generator(block: Block) {
  const text = block.getFieldValue('TEXT_COLOR') as string
  const code = `color: ${text};\n`
  return code
}

const color = {
  name: 'color',
  category: 'Styles',
  content: colorJson,
  generator,
}

export default color