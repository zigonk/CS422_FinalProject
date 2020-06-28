import React from 'react'
import NNLayer from './NNLayer'

export interface SoftmaxProperties {
}

export default class SoftmaxLayer extends NNLayer {
  protected _properties: SoftmaxProperties;
  constructor(props: any) {
    super(props);
    this._type = props.type;
    this._properties = props.properties;
  }
  get properties() {
    return this._properties;
  }
}