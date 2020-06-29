import NNLayer from './NNLayer'

export interface ConcatProperties {
}

export default class ConcatLayer extends NNLayer {
  protected _properties: ConcatProperties;
  constructor(props: any) {
    super(props);
    this._type = props.type;
    this._properties = {};
  }
  get properties() {
    return this._properties;
  }
}