import React, { Component } from 'react'
import EditLayerForm from '../../EditForm/EditLayerForm'
import EditLinkForm from '../../EditForm/EditLinkForm'

export class EditWidget extends Component {
  render() {
    return (
      <div>
        {this._renderByType()}
      </div>
    )
  }
  _renderByType = () => {
    const { componentType, data } = this.props;
    console.log(componentType);
    switch (componentType)
    {
      case 'LAYER':
        return <EditLayerForm data={data}/>
      case 'LINK':
        return <EditLinkForm data={data}/>
      default:
        return;
    }
  }
}