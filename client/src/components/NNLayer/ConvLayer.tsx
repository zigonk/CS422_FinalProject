import React from 'react'
import NNLayer from './NNLayer'

export interface ConvProperties {
  inChannels: number,
  outChannels: number,
  kernel: number,
  padding: number,
}

export default class ConvLayer extends NNLayer {
  protected _properties: ConvProperties;
  constructor(props: any) {
    super(props);
    this._type = props.type;
    this._properties = props.properties;
  }
  get properties() {
    return this._properties;
  }
}