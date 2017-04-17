import React from 'react'
import Drawer from './drawer'

export default class Drawers extends React.Component {
  render() {
    return (
      <div className="drawers">
        {state.props.drawers.map((drawer) => {
          <Drawer drawer={drawer}/>
        })}
      </div>

    )
  }
}
