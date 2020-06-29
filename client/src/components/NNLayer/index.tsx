import ConvLayer from './ConvLayer'
import LinearLayer from './LinearLayer'
import ReLU from './ReLU'
import Reshape from './Reshape'
import Softmax from './Softmax'
import Add from './Add'
import Mul from './Mul'
import Concat from './Concat'
class NNLayerFactory {
  static nConvLayer = 0;
  static nLinearLayer = 0;
  public createNode(props: any): any {
    switch (props.type) {
      case 'CONV2D':
        NNLayerFactory.nConvLayer += 1;
        props.name = "ConvLayer_" + NNLayerFactory.nConvLayer
        return new ConvLayer(props);
      case 'LINEAR':
        NNLayerFactory.nLinearLayer += 1;
        props.name = "LinearLayer_" + NNLayerFactory.nLinearLayer
        return new LinearLayer(props);
      case 'RELU':
        props.name = "ReLU";
        return new ReLU(props);
      case 'RESHAPE':
        props.name = "Reshape";
        return new Reshape(props);
      case 'SOFTMAX':
        props.name = "Softmax";
        return new Softmax(props);
      case 'ADD':
        props.name = "Add";
        return new Add(props);
      case 'MUL':
        props.name = "Mul";
        return new Mul(props);
        case 'CONCAT':
          props.name = "Concat";
          return new Concat(props);
    }
  }
}

export default NNLayerFactory;