import React from 'react'
import NNLayer from './NNLayer'

export interface ReshapeProperties {
  inFeatures: number,
  outFeatures: number,
}

export default class ReshapeLayer extends NNLayer {
  protected _properties: ReshapeProperties;
  constructor(props: any) {
    super(props);
    this._type = props.type;
    this._properties = props.properties;
  }
  get properties() {
    return this._properties;
  }
}