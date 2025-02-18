import CharacterCount from '@tiptap/extension-character-count'
import Collaboration from '@tiptap/extension-collaboration'
import CollaborationCursor from '@tiptap/extension-collaboration-cursor'
import Highlight from '@tiptap/extension-highlight'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import { TiptapCollabProvider } from '@hocuspocus/provider'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import  React, { useEffect, useState } from 'react'
import * as Y from 'yjs'
import { generateTiptapToken } from '../../token_generator'
import BubbleMenuComponent from './BubbleMenu'
import './style/editor.css'

const appId = import.meta.env.VITE_TIPTAP_APPID as string
// const token = import.meta.env.VITE_TIPTAP_APPKEY as string
const token = await generateTiptapToken()


// ydoc and provider for Editor A


class EditorWrapper extends React.Component {
  constructor(props) {
    super(props);
    
    this.ydocA = new Y.Doc();
    this.providerA = new TiptapCollabProvider({
      appId,
      name: props.title,
      token,
      document: this.ydocA
    });
  }

  render() {
    const { content, title, currentUser } = this.props;
    
    return (
      <Editor 
        provider={this.providerA} 
        ydoc={this.ydocA} 
        room={title} 
        content={content} 
        currentUser={currentUser} 
      />
    );
  }
}

const Editor = ({
  ydoc, provider, room,content,currentUser
}:{
  ydoc: Y.Doc,
  provider: TiptapCollabProvider,
  room: string,
  content:string,
  currentUser?: { name: string, color: string }
}) => {
  const [status, setStatus] = useState('connecting')
 

  const editor = useEditor({
    enableContentCheck: true,
    onContentError: ({ disableCollaboration }) => {
      disableCollaboration()
    },
    onCreate: ({ editor: currentEditor }) => {
      provider.on('synced', () => {
        if (currentEditor.isEmpty) {
          currentEditor.commands.setContent(content.replace(/\n/g, "<br/>"))
        }
      })
    },
    extensions: [
      StarterKit.configure({
        history: false,
      }),
      Highlight,
      TaskList,
      TaskItem,
      CharacterCount.extend().configure({
        limit: 10000,
      }),
      Collaboration.extend().configure({
        document: ydoc,
      }),
      CollaborationCursor.extend().configure({
        provider,
      }),
    ],
  })

  useEffect(() => {
    // Update status changes
    const statusHandler = event => {
      setStatus(event.status)
      console.log(event)
    }

    provider.on('status', statusHandler)

    return () => {
      provider.off('status', statusHandler)
    }
  }, [provider])

  // Save current user to localStorage and emit to editor
  useEffect(() => {
    if (editor && currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser))
      editor.chain().focus().updateUser(currentUser).run()
    }
  }, [editor, currentUser])



  if (!editor) {
    return null
  }

  return (
    <div style={{flex: 1, padding: "1rem"}}>
       <div>chapter {room}</div>
      <EditorContent editor={editor} className="main-group" />
      <BubbleMenuComponent editor={editor}/>
      <div
        className="collab-status-group"
        data-state={status === 'connected' ? 'online' : 'offline'}
      >
        <label>
          {status === 'connected'
            ? `${editor.storage.collaborationCursor.users.length} user${
              editor.storage.collaborationCursor.users.length === 1 ? '' : 's'
            } online in ${room}`
            : 'offline'}
        </label>
        <button style={{ '--color': currentUser.color }} >
          ✎ {currentUser.name}
        </button>
      </div>
    </div>
  )
}

export default EditorWrapper