import { Workspace } from "blockly";
import * as Blockly from 'blockly/core'
import { useEffect, useState } from "react";

import { htmlGenerator as initialHtmlGenerator } from "@/generators/html-generator"

interface Props {
  workspace: Workspace | null
}

export function useExtensions({ workspace }: Props) {
  const [elements, setElements] = useState<Blockly.utils.toolbox.ToolboxItemInfo[]>([])
  const [htmlGenerator, setHtmlGenerator] = useState(initialHtmlGenerator)

  const addElement = (element: typeof import('@/elements/header').default) => {
    const { name, content, generator } = element
    Blockly.Blocks[name] = {
      init: function () {
        this.jsonInit(content)
      }
    }

    setElements(elements => [
      ...elements,
      {
        kind: "block",
        type: name,
      }
    ])

    // @ts-ignore
    htmlGenerator.forBlock[name] = generator
  }

  const removeElement = (element: typeof import('@/elements/header').default) => {
    const { name } = element
    Blockly.Blocks[name] = undefined
    // @ts-ignore
    setElements(elements => elements.filter(e => e.type !== name))
  }

  useEffect(() => {
    if (workspace === null) return
    // @ts-ignore
    const category = workspace.getToolbox().getToolboxItems()[0];
    category.updateFlyoutContents(elements);
  }, [elements])

  return {
    addElement,
    removeElement,
    htmlGenerator
  }
}