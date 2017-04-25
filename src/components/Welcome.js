import React from 'react'

export default class Welcome extends React.Component{

  render() {

    return (
      <div className="welcome">
        <h3>Welcome To Olio!</h3>
        <p>~ click to add content from the drawers ~</p>
        <p>~ once it's on the page, drag and resize ~</p>
        <p>~ check out the keyboard in the nav for shortcuts ~</p>
        <p>~ click again on an object to get rid of the border ~</p>
        <p>~ login to save and manage your creations ~</p>

        <h4>~ Have fun! ~</h4>
      </div>
    )
  }
}
