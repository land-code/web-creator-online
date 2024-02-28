'use client'
import { useEffect, useId, useState } from "react"

import { useExtensions } from '@/hooks/use-extensions'

import * as Blockly from 'blockly/core'
import * as basicBlocks from 'blockly/blocks'
import * as En from 'blockly/msg/en';
import header from "@/elements/header"
import type { Abstract } from "blockly/core/events/events_abstract"

const initialToolbox: Blockly.BlocklyOptions['toolbox'] = {
  "kind": "categoryToolbox",
  "contents": [
    {
      kind: "category",
      name: "Elements",
      contents: [
      ]
    }
  ]
}

interface Props {
  setHtml: React.Dispatch<React.SetStateAction<string>>
}

export default function BlocklyEditor({ setHtml }: Props) {
  const [workspace, setWorkspace] = useState<Blockly.Workspace | null>(null)
  const blocklyAreaDivId = useId()
  const blocklyDivId = useId()
  const { addElement, removeElement, htmlGenerator } = useExtensions({ workspace })

  useEffect(() => {
    const blocklyDiv = document.getElementById(blocklyDivId)
    if (!blocklyDiv) return

    Blockly.setLocale(En)
    Blockly.defineBlocksWithJsonArray(basicBlocks.blocks)

    const workspace = Blockly.inject(blocklyDiv, {
      toolbox: initialToolbox
    })
    setWorkspace(workspace)

    const supportedEvents = new Set([
      Blockly.Events.BLOCK_CHANGE,
      Blockly.Events.BLOCK_CREATE,
      Blockly.Events.BLOCK_DELETE,
      Blockly.Events.BLOCK_MOVE,
    ]);

    function updateCode(event: Abstract) {
      if (workspace.isDragging()) return;
      if (!supportedEvents.has(event.type)) return;

      const code = htmlGenerator.workspaceToCode(workspace);
      setHtml(code)
    }

    workspace.addChangeListener(updateCode);

    return () => {
      workspace.dispose()
    }
  }, [blocklyDivId, setHtml, htmlGenerator])

  useEffect(() => {
    addElement(header)
    return () => removeElement(header)
  }, [workspace, addElement, removeElement])

  useEffect(() => {
    if (!workspace) return

    const blocklyArea = document.getElementById(blocklyAreaDivId)
    const blocklyDiv = document.getElementById(blocklyDivId)
    if (!blocklyArea || !blocklyDiv) return

    const onresize = () => {
      // Compute the absolute coordinates and dimensions of blocklyArea.
      let element: HTMLElement | null = blocklyArea;
      let x = 0;
      let y = 0;
      do {
        x += element.offsetLeft;
        y += element.offsetTop;
        element = element.offsetParent as HTMLElement | null;
      } while (element);
      // Position blocklyDiv over blocklyArea.
      blocklyDiv.style.left = x + 'px';
      blocklyDiv.style.top = y + 'px';
      blocklyDiv.style.width = blocklyArea.offsetWidth + 'px';
      blocklyDiv.style.height = blocklyArea.offsetHeight + 'px';
      Blockly.svgResize(workspace as Blockly.WorkspaceSvg);
    };
    window.addEventListener('resize', onresize, false);
    onresize();

    return () => {
      window.removeEventListener('resize', onresize);
    }
  }, [workspace, blocklyAreaDivId, blocklyDivId])

  return (
    <div id={blocklyAreaDivId}>
      <div id={blocklyDivId} className="absolute" />
    </div>
  )
}