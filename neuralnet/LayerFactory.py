import torch
import torch.nn as nn
from inspect import signature

from typing import Dict, List, Union


class Layer(nn.Module):
    """
    A Layer in the neural net, contains one input port and ouput port

    Parameters:
    config:
        Layer information dictionary
    """
    def __init__(self, config: Dict):
        super().__init__()
        self.input = None # Input Tensor
        self.output = None  # Output Tensor

        params = config['properties']
        # Underlying layer for computation, e.g Convolution2D
        self.layer = MODULE_MAPPING[config['name']](**params)

        self.original_in_deg = 0
        self.current_in_deg = 0

    def reset_in_deg(self) -> None:
        self.current_in_deg = self.original_in_deg

    def reset_input_cache(self) -> None:
        self.input = None

    def receive_input(self, inp) -> None:
        """
        Store the input sent by previous layer
        """
        if self.original_in_deg == 1 or self.original_in_deg == 0:
            self.input = inp
        elif self.original_in_deg > 1:
            if self.input is None:
                self.input = []
            self.input.append(inp)

    def forward(self):
        """
        Perform computation
        """
        self.output = self.layer(self.input)



class LayerFactory:
    @staticmethod
    def create_layer(layer_config: Dict) -> Layer:
        """
        Create a corresponding nn.Module from the config dictionary

        Parameters
        ----------
        layer_config : dict
            Layer config dictionary
        """
        layer_name = layer_config['name']

        if layer_name not in MODULE_MAPPING:
            raise ValueError(f'{layer_name} is not a supported layer name.')

        return Layer(layer_config)


class Add(nn.Module):
    def __init__(self):
        super().__init__()

    def forward(self, *args):
        return sum(*args)

class Reshape(nn.Module):
    """
    Reshape the input

    Parameters
    ----------
    in_shape : tuple
        Input shape
    out_shape: int or tuple
        If the output shape = -1, then flatten the output
        Otherwise reshape to corresponding output
    """
    def __init__(self, in_shape, out_shape):
        super().__init__()
        self.in_shape = in_shape
        self.out_shape = out_shape

    def forward(self, X):

        X_out = X.reshape(*self.out_shape)
        return X_out


def get_args(func):
    """
    Get required parameters and  default parameters of a function

    Returns
    -------
    required_params : list
        List of required parameters as string
    default_params : dict
        Dictionary contains name of default parameters and their default values
    """
    sig = signature(func)

    required_params = [
        param.name for param in sig.parameters.values()
        if param.default is param.empty
    ]
    default_params = {
        param.name: param.default
        for param in sig.parameters.values()
        if param.default is not param.empty
    }

    return required_params, default_params


def check_valid_config(config, func):
    """
    Check whether a config - dictionary with keyword parameter and its values is valid for a function
    """
    required_params, default_params = get_args(func)

    input_params = config.keys()

    for required_param in required_params:
        if required_param not in input_params:
            raise ValueError(f'{required_param} is missing from the config')

    for input_param in input_params:
        if input_param not in required_params and input_param not in default_params:
            raise ValueError(
                f'{input_param} is not parameter of {func.__qualname__}')


MODULE_MAPPING = {
    'CONV2D': nn.Conv2d,
    'AVGPOOL2d': nn.AvgPool2d,
    'MAXPOOL2d': nn.MaxPool2d,
    'BATCHNORM1D': nn.BatchNorm1d,
    'LINEAR': nn.Linear,
    'DROPOUT': nn.Dropout,
    'RELU': nn.ReLU,
    'SOFTMAX': nn.Softmax,
    'L1LOSS': nn.L1Loss,
    'MSELOSS': nn.MSELoss,
    'ADD': Add,
    # 'RESHAPE': Reshape,
}


if __name__ == "__main__":
    sig = signature(nn.Conv2d)
    for param in sig.parameters.values():
        print(param.name, param.default)

    required_params, default_params = get_args(MODULE_MAPPING['conv_2d'])
    print(required_params)
    print(default_params)

    config = {
        'in_channels': 3,
        'out_channels': 3,
        # 'kernel_size': 2,
        # 'a' : 1
    }
    # print(LayerFactory.create_layer('conv_2d', config))

    try:
        check_valid_config(config, MODULE_MAPPING['conv_2d'])
    except ValueError as e:
        print(e)
