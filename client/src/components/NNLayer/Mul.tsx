import NNLayer from './NNLayer'

export interface MulProperties {
}

export default class MulLayer extends NNLayer {
  protected _properties: MulProperties;
  constructor(props: any) {
    super(props);
    this._type = props.type;
    this._properties = {};
  }
  get properties() {
    return this._properties;
  }
}