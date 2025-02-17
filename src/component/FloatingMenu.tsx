import { FloatingMenu, useCurrentEditor } from '@tiptap/react'
function FloatingMenuComponent() {
    const {editor}=useCurrentEditor();
  return (
    <FloatingMenu 
  editor={editor} 
  tippyOptions={{ duration: 100 }}
>
  <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>H1</button>
  <button onClick={() => editor.chain().focus().toggleBulletList().run()}>Bullet List</button>
</FloatingMenu>
  )
}

export default FloatingMenuComponent