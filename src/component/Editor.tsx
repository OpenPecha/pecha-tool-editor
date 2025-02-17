import { EditorProvider } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import '../component/style/editor.css'
import FloatingMenuComponent from './FloatingMenu'
import BubbleMenuComponent from './BubbleMenu'
import {text} from '../data/text';

const extensions = [StarterKit]

const demo_content = text.replace(/\n/g, '<br>');

type EditorWrapperProps = {
  content?:string
}

const EditorWrapper = ({content}:EditorWrapperProps) => {

  return (
    <EditorProvider extensions={extensions}
    autofocus={true}
    content={content|| demo_content}
     >
      <FloatingMenuComponent />
      <BubbleMenuComponent/>
    </EditorProvider>
  )
}

export default EditorWrapper