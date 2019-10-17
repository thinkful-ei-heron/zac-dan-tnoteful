import React from 'react';
import ApiContext from '../ApiContext'
import config from '../config';



export default class NewNote extends React.Component {

  state = {
    notes: {
      name: '',
      content: ''
    }
  }

  static contextType = ApiContext

  render(){
    const postNewNote = (data) => {
      fetch(`${config.API_ENDPOINT}/notes/`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: data
      })
      .then(res => res.json())
      .then(data => {
          this.context.handleAddNote(data)
          this.props.history.goBack()
      })

    }

    const submitHandler = (e) => {
      e.preventDefault()
      const newNote = {
        name: e.target.name.value,
        content: e.target.content.value,
        folderId: e.target.folderId.value,
        modified: new Date()
      }
      postNewNote(JSON.stringify(newNote))
    }

    console.log(this.props)
    return (
      <div>
        <form 
          onSubmit={(e) => submitHandler(e)}>
          <label htmlFor="new_note">Name: </label>
          <input 
            id="name" 
            type="text" 
            value={this.state.notes.name} 
            onChange={(e) => this.setState({notes: {name: e.target.value}})}
          />
          <label htmlFor="new_note">Content: </label>
          <textarea 
            id="content" 
            cols="30" 
            rows="10" 
            value={this.state.notes.content}
            onChange={(e) => this.setState({notes: {content: e.target.value}})}
          ></textarea>
          <select id="folderId" name="">
            <option value="null">Choose a folder</option>
            {this.context.folders.map(folder => {
              return <option value={`${folder.id}`} >{`${folder.name}`}</option>
            })}
          </select>
          <button>Add</button>
        </form>
      </div>
    )
  }

}
       // "name": "Dogs",
       // "modified": "2019-01-03T00:00:00.000Z",
       // "folderId": "b0715efe-ffaf-11e8-8eb2-f2801f1b9fd1",

