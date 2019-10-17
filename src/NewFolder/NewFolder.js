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
    const validateDisplay = () => {
      const { name } = this.state.folders
      if(name.length < 1) return 'field must not be empty'
      if(name.length > 256) return 'field too large'
      return ""
    }

    const validateFields = (noteObj) => {
      const { name } = noteObj
      if(name.length === 0 )return false
      return true
    }

    const submitHandler = (e) => {
      e.preventDefault()
      const newfolder = {
        name: e.target.foldername.value,
      }
        return validateFields(newfolder) ? handleAdd(JSON.stringify(newfolder)) : alert('Fields are not valid')
    }


   const handleAdd = (data) => {
      fetch(`${config.API_ENDPOINT}/folders/`, {
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
        this.context.handleAddFolder(data)
        this.props.history.goBack()
      }).catch(error => {
        alert(error.message)
      })
}

  const folderNameChange = (value) => {
    this.setState({
      folders: {
        name: value
      }
    })
  }
    return(
      <section className="formContainer">
        <h3 className="error">{validateDisplay()}</h3>
        <form onSubmit={(e) => {
          submitHandler(e)
            }}>
          <label htmlFor="new_note">New Folder: </label>
          <input 
            id="foldername"
            name="foldername" 
            type="text" 
            value={this.state.folders.name}
            onChange={(e) => folderNameChange(e.target.value)}
          />
          <button>Add</button>
        </form>
      </section>
    )
  }
}
