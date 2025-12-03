"use client"

import { useEffect } from "react"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Image from "@tiptap/extension-image"
import Link from "@tiptap/extension-link"
import { Table } from "@tiptap/extension-table"
import { TableRow } from "@tiptap/extension-table-row"
import { TableCell } from "@tiptap/extension-table-cell"
import { TableHeader } from "@tiptap/extension-table-header"
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight"
import Blockquote from "@tiptap/extension-blockquote"
import Youtube from "@tiptap/extension-youtube"
import HorizontalRule from "@tiptap/extension-horizontal-rule"
import Underline from "@tiptap/extension-underline"
import Strike from "@tiptap/extension-strike"
import { createLowlight } from "lowlight"

const lowlight = createLowlight()

interface TipTapViewerProps {
  content: any
}

export default function TipTapViewer({ content }: TipTapViewerProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        codeBlock: false,
        bulletList: {
          HTMLAttributes: {
            class: 'bullet-list',
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: 'ordered-list',
          },
        },
      }),
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-600 underline",
        },
        validate: (url) => {
          // Accept any URL format (relative, absolute, external)
          return /^https?:\/\/|^\/|^#|^mailto:|^tel:/.test(url) || url.length > 0
        },
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      CodeBlockLowlight.configure({
        lowlight,
      }),
      Blockquote,
      Youtube.configure({
        controls: true,
        nocookie: true,
      }),
      HorizontalRule,
      Underline,
      Strike,
    ],
    editable: false,
    content: null,
  })

  useEffect(() => {
    if (editor && content) {
      try {
        const parsedContent = typeof content === "string" 
          ? JSON.parse(content) 
          : content
        editor.commands.setContent(parsedContent)
      } catch (e) {
        console.error("Error parsing content:", e)
      }
    }
  }, [editor, content])

  if (!editor) {
    return <div className="prose prose-lg max-w-none">Loading content...</div>
  }

  return (
    <div className="prose prose-lg max-w-none blog-content">
      <EditorContent editor={editor} />
    </div>
  )
}

