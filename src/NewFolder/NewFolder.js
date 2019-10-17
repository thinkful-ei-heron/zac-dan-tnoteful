import React from 'react';

export default class NewFolder extends React.Component {
  render(){
    return(
      <div>
        <form>
          <label htmlFor="new_note">New Folder: </label>
          <input name="new_note" type="text" />
          <button>Add</button>
        </form>
      </div>
    )
  }
}
