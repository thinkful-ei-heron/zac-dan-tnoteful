import React from 'react';

export default class NewNote extends React.Component {
  render(){
    return (
      <div>
        <form>
          <label htmlFor="new_note">New Note: </label>
          <input name="new_note" type="text" />
          <button>Add</button>
        </form>
      </div>
    )
  }

}
