import React from 'react'
import NNLayer from './NNLayer'

export interface LinearProperties {
  inFeatures: number,
  outFeatures: number,
}

export default class LinearLayer extends NNLayer {
  protected _properties: LinearProperties;
  constructor(props: any) {
    super(props);
    this._type = props.type;
    this._properties = props.properties;
  }
  get properties() {
    return this._properties;
  }
}