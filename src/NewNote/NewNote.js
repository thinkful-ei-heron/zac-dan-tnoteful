import React from 'react';
import ApiContext from '../ApiContext'
import config from '../config';
import './NewNote.css'



export default class NewNote extends React.Component {

  state = {
    name: {
      value: ''
    },
    content: {
      value: ''
    },
    folderId: {
      value: ''
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
      .then(res => {
         if(!res.ok){
           alert(`${res.status} - ${res.statusText} - Please try agian`)
         }
         return res.json()
       })

      .then(data => {
          this.context.handleAddNote(data)
          this.props.history.goBack()
      }).catch(error => {
        alert(error)
      })

    }

    const validateDisplay = () => {
      const { name, content } = this.state
      if(name.value.length < 1 || content.value.length < 1) return 'field must not be empty'
      if(name.value.length > 256 || content.value.length > 500) return 'field too large'
      return ""
    }

    const validateFields = (noteObj) => {
      const { name, content, folderId } = noteObj
      if(name.length === 0 )return false
      if(content.length === 0)return false
      if(folderId.length === 0)return false
      return true
      
    }


    const submitHandler = (e) => {
      e.preventDefault()
      const newNote = {
        name: e.target.name.value,
        content: e.target.content.value,
        folderId: e.target.folderId.value,
        modified: new Date()
      }
        return validateFields(newNote) ? postNewNote(JSON.stringify(newNote)) : alert('Fields are not valid')
    }

    return (
      <section className="formContainer">
        <h3 className="error">{validateDisplay()}</h3>
        <form 
          onSubmit={(e) => submitHandler(e)}>
          <label htmlFor="new_note">Name: </label>
          <input 
            id="name" 
            type="text" 
            value={this.state.name.value}
            onChange={(e) => {
              this.setState({name: {
                value: e.target.value}})
              validateDisplay()
            }}
          />
          <label htmlFor="new_note">Content: </label>
          <textarea 
            id="content" 
            cols="30" 
            rows="10" 
            value={this.state.content.value}
            onChange={(e) => {
              this.setState({content: {
              value: e.target.value}})
              validateDisplay()
              }}
          ></textarea>
          <select 
            id="folderId" 
            onChange={(e) => {
              this.setState({folderId: {value: e.target.value}})
            }}
          >
            <option value=''>Choose a folder</option>
            {this.context.folders.map(folder => {
              return <option value={`${folder.id}`} key={folder.id} >{`${folder.name}`}</option>
            })}
          </select>
          <button>Add</button>
        </form>
      </section>
    )
  }
}
