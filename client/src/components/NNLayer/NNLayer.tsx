import { DefaultNodeModel } from '@projectstorm/react-diagrams';

export default class NNLayer extends DefaultNodeModel {
  protected _inputShape: number[];
  protected _outputShape: number[];
  protected _type: string;
  constructor(props: any) {
    super(props.name, props.color);
    this._inputShape = props.inputShape || [];
    this._outputShape = props.outputShape || [];
    this._type = props.type || 'default'
    this.setPosition(props.point);
    this.registerListener({
      selectionChanged: (event: any) => {
        if (props.selectionHandler)
          props.selectionHandler(event);
      }
    })
    this.addInPort('In');
    this.addOutPort('Out');
  }
  get inputShape(): number[] {
    return this._inputShape;
  }
  get outputShape(): number[] {
    return this._outputShape;
  }
  get type() {
    return this._type;
  }
}