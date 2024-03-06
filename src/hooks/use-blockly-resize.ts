import * as Blockly from 'blockly';
import { useEffect } from 'react';

interface BlocklyResizeProps {
  workspace: Blockly.Workspace | null;
  blocklyAreaDivId: string;
  blocklyDivId: string;
}

export const useBlocklyResize = ({
  blocklyAreaDivId,
  blocklyDivId,
  workspace,
}: BlocklyResizeProps) => {
  useEffect(() => {
    if (!workspace) return;

    const blocklyArea = document.getElementById(blocklyAreaDivId);
    const blocklyDiv = document.getElementById(blocklyDivId);
    if (!blocklyArea || !blocklyDiv) return;

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
    };
  }, [workspace, blocklyAreaDivId, blocklyDivId]);
};
