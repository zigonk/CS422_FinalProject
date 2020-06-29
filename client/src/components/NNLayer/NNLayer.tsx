import { DefaultNodeModel } from '@projectstorm/react-diagrams';

export default class NNLayer extends DefaultNodeModel {
  protected _type: string;
  constructor(props: any) {
    super(props.name, props.color);
    this._type = props.type || 'default'
    this.setPosition(props.point);
    this.registerListener({
      selectionChanged: (event: any) => {
        if (props.selectionHandler)
          props.selectionHandler(event);
      },
      entityRemoved: (event: any) => {
        if (props.removeHandler)
          props.removeHandler();
      }
    })
    this.addInPort('In');
    this.addOutPort('Out');
  }
  get type() {
    return this._type;
  }
  updateValue(data: any) {
    this.getOptions().name = data.name;
  }
  serialize():any {
    return {
      id: this.getOptions().id,
      name: this.getOptions().name,
      type: this._type
    }
  }
}