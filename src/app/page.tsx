'use client'

import BlocklyEditor from "@/components/blockly-editor";
import HTMLPreview from "@/components/html-preview";
import { useState } from "react";

export default function HomePage() {
  const [html, setHtml] = useState('')
  return (
    <div className="flex items-stretch flex-1 *:flex-1">
      <BlocklyEditor setHtml={setHtml} />
      <HTMLPreview html={html} />
    </div>
  )
}