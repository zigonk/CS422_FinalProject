import NNLayer from './NNLayer'

export default class HiddenLayer extends NNLayer {
  protected _activateFunc: string;
  constructor(props: any) {
    super(props);
    this._activateFunc = props.activateFunc || '';
  }
  get activateFunc(): string {
    return this._activateFunc;
  }
}