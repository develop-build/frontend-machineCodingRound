import React, {useState} from 'react'

const Folder = ({ explorer, handleInsertNode }) => {
  // console.log(explorer);
  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null
  })

  // Stop propagation
  const handleNewFolder = (e, isFolder) => {
    e.stopPropagation();
    setExpand(true)
    setShowInput({
      visible: true,
      isFolder
    })
  }

  const onAddFolder = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      handleInsertNode(explorer.id, e.target.value, showInput.isFolder)
      setShowInput({
        ...setShowInput, visible: false
      })
    }
  }


  if (explorer.isFolder) {
    return (
      <div style={{ marginTop: 5 }}>
        <div className="folder" onClick={() => setExpand(!expand)}>
          <span>
          🗂 {explorer.name}
          </span>
          <div className="">
            <button style={{ marginRight: 5 }} onClick={(e) => handleNewFolder(e, true)}>Folder +</button>
            <button style={{marginRight: 5}} onClick={(e) => handleNewFolder(e, false)}>File +</button>
          </div>
        </div>

        <div style={{display: expand ? "block": "none", paddingLeft:25}}>
          {
            showInput.visible && (
              <div className="inputContainer">
                <span>{showInput.isFolder ? "🗂" : "📄"}</span>
                <input
                  type="text"
                  className="inputContainer__input"
                  onKeyDown={onAddFolder}
                  onBlur={() => setShowInput(prevState => ({ ...prevState, visible: false }))}
                  autoFocus
                />
              </div>
            )
          }
          {explorer.items.map((exp) => {
            return (
              < Folder handleInsertNode={handleInsertNode} explorer={exp} key={ exp.id } />
            )
          })}
        </div>

      </div>
    );
  }
  else
    return (
      <span className="file">📄 {explorer.name} </span>
    );
}

export default Folder;