import React, { Component } from 'react'
import EditLayerForm from '../../EditForm/EditLayerForm'

export class EditWidget extends Component {
  render() {
    const { data, componentType } = this.props
    return (
      <div>
        {componentType === 'LAYER' && <EditLayerForm data={data}/>}
      </div>
    )
  }
}