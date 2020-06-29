import NNLayer from './NNLayer'

export interface ReshapeProperties {
}

export default class ReshapeLayer extends NNLayer {
  protected _properties: ReshapeProperties;
  constructor(props: any) {
    super(props);
    this._type = props.type;
    this._properties = {};
  }
  get properties() {
    return this._properties;
  }
}