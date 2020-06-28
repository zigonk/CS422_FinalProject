import React from 'react'
import NNLayer from './NNLayer'

export interface ReLUProperties {
}

export default class ReLULayer extends NNLayer {
  protected _properties: ReLUProperties;
  constructor(props: any) {
    super(props);
    this._type = props.type;
    this._properties = props.properties;
  }
  get properties() {
    return this._properties;
  }
}