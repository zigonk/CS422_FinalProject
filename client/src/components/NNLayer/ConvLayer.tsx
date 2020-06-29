import NNLayer from './NNLayer'

export interface ConvProperties {
  in_channels: number,
  out_channels: number,
  kernel: number,
  padding: number,
}

export default class ConvLayer extends NNLayer {
  protected _properties: ConvProperties;
  constructor(props: any) {
    super(props);
    this._properties = {
      in_channels: 0,
      out_channels: 0,
      kernel: 0,
      padding: 0,
    };
  }
  get properties() {
    return this._properties;
  }
  updateValue(values: any) {
    super.updateValue(values);
    this._properties = values.properties;
  }
  serialize() {
    const layer = super.serialize();
    return {
      properties: this._properties,
      ...layer
    }
  }
}