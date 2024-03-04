import { Block, Generator } from 'blockly';
import styleJson from './style.json'

function generator(block: Block, generator: Generator) {
  const styleName = block.getFieldValue('STYLE_NAME');
  const stylesStatements = generator.statementToCode(block, 'STYLES');

  const code = `
<style>
  .${styleName} {
    ${stylesStatements}
  }
</style>
`
  return code;
}

const style = {
  name: 'style',
  category: 'Elements',
  content: styleJson,
  generator
}

export default style