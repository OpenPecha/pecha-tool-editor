import { EditorProvider } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import '../component/style/editor.css'
import ToolbarHeader from './ToolbarHeader'
import ToolbarFooter from './ToolbarFooter'
import FloatingMenuComponent from './FloatingMenu'
import BubbleMenuComponent from './BubbleMenu'
import {text} from '../data/text';

const extensions = [StarterKit]

const content = text.replace(/\n/g, '<br>');


const Tiptap = () => {
  return (

    <EditorProvider extensions={extensions}
    autofocus={true}
    content={content}
    slotBefore={<ToolbarHeader />}
    slotAfter={<ToolbarFooter />}>
      <FloatingMenuComponent />
      <BubbleMenuComponent/>
    </EditorProvider>
  )
}

export default Tiptap