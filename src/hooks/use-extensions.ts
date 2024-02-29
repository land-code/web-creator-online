/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { Workspace } from "blockly";
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
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
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
    setHtmlGenerator(htmlGenerator => {
      htmlGenerator.forBlock[name] = generator
      return htmlGenerator
    })
  }

  const removeElement = (element: typeof import('@/elements/header').default) => {
    const { name } = element
    Blockly.Blocks[name] = undefined
    // @ts-expect-error: Error
    setElements(elements => elements.filter(e => e.type !== name))
  }

  useEffect(() => {
    if (workspace === null) return
    // @ts-expect-error: Error
    const category = workspace.getToolbox().getToolboxItems()[0]
    category.updateFlyoutContents(elements);
  }, [elements, workspace])

  return {
    addElement,
    removeElement,
    htmlGenerator
  }
}