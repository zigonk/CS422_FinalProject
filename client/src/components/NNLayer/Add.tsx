import NNLayer from './NNLayer'

export interface AddProperties {
}

export default class AddLayer extends NNLayer {
  protected _properties: AddProperties;
  constructor(props: any) {
    super(props);
    this._type = props.type;
    this._properties = {};
  }
  get properties() {
    return this._properties;
  }
}