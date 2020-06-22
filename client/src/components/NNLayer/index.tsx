import HiddenLayer from './HiddenLayer'
import OutputLayer from './OutputLayer'
import InputLayer from './InputLayer'

class NNLayerFactory {
  static nHiddenLayer = 0;
  static nOutputLayer = 0;
  static nInputLayer = 0;
  public createNode(props : any) : any {
    switch (props.type)
    {
      case 'HIDDEN':
        NNLayerFactory.nHiddenLayer += 1;
        props.name = "HiddenLayer_" + NNLayerFactory.nHiddenLayer
        return new HiddenLayer(props);
      case 'OUTPUT':
        NNLayerFactory.nOutputLayer += 1;
        props.name = "OutputLayer_" + NNLayerFactory.nOutputLayer
        return new OutputLayer(props);
      case 'INPUT':
        NNLayerFactory.nInputLayer += 1;
        props.name = "InputLayer_"+NNLayerFactory.nInputLayer
        return new InputLayer(props);
    }
  }
}

export default NNLayerFactory;