import NNLayer from './NNLayer'

export default class OutputLayer extends NNLayer {
  protected _lossFunc: string;
  protected _optimizer: string;
  protected _lr: number;
  constructor(props: any) {
    super(props);
    this._lossFunc = props.lossFunc || '';
    this._optimizer = props.optimizer || '';
    this._lr = props.lr || 0;
  }
  get lossFunc(): string {
    return this._lossFunc
  }
  get optimizer(): string {
    return this._optimizer;
  }
  get lr(): number {
    return this._lr;
  }
}