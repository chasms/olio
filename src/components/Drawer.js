import React from 'react'

export default class Drawer extends React.Component {
  render() {
    let draweritems = 
    return (
      <div className="drawer">
        {state.props.draweritems.map((item) => {
          <DrawerItem item={item}/>
        })}
      </div>

    )
  }
}
