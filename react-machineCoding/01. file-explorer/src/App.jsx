import React from 'react'
import { useState } from 'react'
import explorer from './data/folderData';
import Folder from './components/Folder';
import './App.css'
import useTraverseTree from './hooks/useTraverseTree.js';

const App = () => {
  const [explorerData, setExplorerData] = useState(explorer);
  // console.log(explorer);
  const { insertNode } = useTraverseTree();
  const handleInsertNode = (folderId, item, isFolder) => {
    const finalTree = insertNode(explorerData, folderId, item, isFolder);
    setExplorerData(finalTree);
  }

  return (
    <div>
      <Folder explorer={explorerData} handleInsertNode={ handleInsertNode } />
    </div>  
  );
}

export default App