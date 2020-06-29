import NNLayer from './NNLayer'

export interface LinearProperties {
  in_features: number,
  out_features: number,
}

export default class LinearLayer extends NNLayer {
  protected _properties: LinearProperties;
  constructor(props: any) {
    super(props);
    this._type = props.type;
    this._properties = {
      in_features: 0,
      out_features: 0,
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