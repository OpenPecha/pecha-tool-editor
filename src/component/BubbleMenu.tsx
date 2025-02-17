import { BubbleMenu, useCurrentEditor } from '@tiptap/react'
function BubbleMenuComponent() {
    const {editor}=useCurrentEditor();
  return (
    <BubbleMenu 
  editor={editor} 
  tippyOptions={{ duration: 100 }}
>
  <button onClick={() => editor.chain().focus().toggleBold().run()}>Bold</button>
  <button onClick={() => editor.chain().focus().toggleItalic().run()}>Italic</button>
</BubbleMenu>
  )
}

export default BubbleMenuComponent