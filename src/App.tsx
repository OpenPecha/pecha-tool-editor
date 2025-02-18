import  { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import EditorWrapper from './component/Editor/Editor'
import { text } from './data/text'
import { getInitialUser } from './data/user'

const BATCH_SIZE = 4

const App = () => {
  // Keep track of visible items
  const [visibleData, setVisibleData] = useState(text.slice(0, BATCH_SIZE))
  const [hasMore, setHasMore] = useState(true)
  const [currentUser,setCurrentUser]=useState(getInitialUser)

  const loadMore = () => {
    if (visibleData.length >= text.length) {
      setHasMore(false)
      return
    }
    const nextBatch = text.slice(visibleData.length, visibleData.length + 1)
    setVisibleData((prevData) => [...prevData, ...nextBatch])
  }
  
  return (
    <InfiniteScroll
      dataLength={visibleData.length}
      next={loadMore}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      endMessage={<p>No more data to load</p>}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem',fontFamily:"monlam" }}>
        {visibleData.map((t) => (
          <EditorWrapper content={t.content} key={t.title} title={t.title} currentUser={currentUser}/>
        ))}
      </div>
    </InfiniteScroll>
  )
}

export default App
