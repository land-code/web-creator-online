'use client';
import { useEffect, useId, useState } from 'react';

import { useExtensions } from '@/hooks/use-extensions';

import * as Blockly from 'blockly/core';
import * as basicBlocks from 'blockly/blocks';
import * as En from 'blockly/msg/en';
import type { Abstract } from 'blockly/core/events/events_abstract';
import { initialToolbox } from '@/lib/initial-toolbox';
import header from '@/elements/header';
import paragraph from '@/elements/paragraph';
import style from '@/elements/style';
import color from '@/elements/styles/color';
import { useBlocklyResize } from '@/hooks/use-blockly-resize';

interface Props {
  setHtml: React.Dispatch<React.SetStateAction<string>>;
}

const elements = [header, paragraph, style, color];

export default function BlocklyEditor({ setHtml }: Props) {
  const [workspace, setWorkspace] = useState<Blockly.Workspace | null>(null);
  const blocklyAreaDivId = useId();
  const blocklyDivId = useId();
  const { addElement, removeElement, htmlGenerator } = useExtensions({
    workspace,
  });
  useBlocklyResize({ workspace, blocklyAreaDivId, blocklyDivId });

  useEffect(() => {
    const blocklyDiv = document.getElementById(blocklyDivId);
    if (!blocklyDiv) return;

    Blockly.setLocale(En);
    Blockly.defineBlocksWithJsonArray(basicBlocks.blocks as []);

    const workspace = Blockly.inject(blocklyDiv, {
      toolbox: initialToolbox,
    });
    setWorkspace(workspace);

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
      setHtml(code);
    }

    workspace.addChangeListener(updateCode);

    return () => {
      workspace.dispose();
    };
  }, [blocklyDivId, setHtml, htmlGenerator]);

  useEffect(() => {
    elements.forEach((element) => {
      // @ts-expect-error: Element is not typed well
      addElement(element);
    });
    return () => {
      elements.forEach((element) => {
        // @ts-expect-error: Element is not typed well
        removeElement(element);
      });
    };
  }, [addElement, removeElement]);

  return (
    <div id={blocklyAreaDivId}>
      <div id={blocklyDivId} className="absolute" />
    </div>
  );
}
