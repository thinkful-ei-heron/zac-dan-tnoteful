import React from 'react';
import ApiContext from '../ApiContext'
import config from '../config';


export default class NewFolder extends React.Component {
  state = {
    folders: {
      name: ''
    }
  }

  static contextType = ApiContext


  render(){
   console.log(this.props.history)
   const handleAdd = (data) => {
      fetch(`${config.API_ENDPOINT}/folders/`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(data)
      })
      .then(res => res.json())
      .then(data => {
        this.context.handleAddFolder(data)
        this.props.history.goBack()
      })
}

    console.log(this.props.history)
  const folderNameChange = (value) => {
    this.setState({
      folders: {
        name: value
      }
    })
  }
    return(
      <div>
        <form onSubmit={(e) => {
          e.preventDefault()
          handleAdd(this.state.folders)
            }}>
          <label htmlFor="new_note">New Folder: </label>
          <input 
            name="new_note" 
            type="text" 
            value={this.state.folders.name}
            onChange={(e) => folderNameChange(e.target.value)}
          />
          <button>Add</button>
        </form>
      </div>
    )
  }
}
