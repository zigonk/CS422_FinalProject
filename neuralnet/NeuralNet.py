import json
import os

import numpy as np
import torch
import torch.nn as nn
import torch.nn.functional as F

from .Graph import Graph
from .LayerFactory import LayerFactory


class NeuralNet(nn.Module):
    """
    A neural net consists of layers and links between layers.

    Parameters
    ----------
    layer_path : str
        The path to the layer json file
    link_path: str
        The path to the link json file
    """
    def __init__(self, layer_path: str, link_path: str):
        super().__init__()
        with open(layer_path) as f:
            self.layers = json.load(f)

        with open(link_path) as f:
            self.links = json.load(f)

        self.graph = Graph(self.layers, self.links)
        self._create_layers()

        # Set the indegree for each layer
        for layer_id, layer in self.layer_instace.items():
            layer.original_in_deg = self.graph.in_deg[int(layer_id)]
            layer.current_in_deg = layer.original_in_deg

    def _create_layers(self) -> None:
        """
        Create a Module Dict contains all layer instances
        """
        instances = {}

        for layer in self.layers:
            instance = LayerFactory.create_layer(layer)
            # TODO: Make layer id a string instead of int
            layer_id = str(layer['id'])
            instances[layer_id] = instance

        self.layer_instace = nn.ModuleDict(instances)

    def _preproces(self, inp):
        return inp

    def load_weight(self, weight_path):
        other, ext = os.path.splitext(weight_path)
        if ext == '.pkl' or '.pth':
            self.load_state_dict(
                torch.load(weight_path,
                           map_location=lambda storage, loc: storage))
        else:
            raise ValueError('Invalid weight extension. Must be .pkl or .pth')

    def _dfs_foward(self, v: int, inp: torch.Tensor) -> None:
        """
        Recurisve DFS algorithm to perform foward pass through the neural net.
        If current layer (v) has received enough input, then the computation is performed
        Otherwise the input is cached in layers, let the final necessary input call the computation

        Parameters
        ----------
        v : int
            Vertex index for current layer

        inp : torch.Tensor
            Input tensor
        """

        layer = self.layer_instace[str(v)]
        if layer.current_in_deg >  0:
            layer.current_in_deg -= 1
        layer.receive_input(inp)

        # Check receive enough input
        if layer.current_in_deg == 0:
            layer()
            for n_v in self.graph.adj_list[v]:
                self._dfs_foward(n_v, layer.output)

    def _reset_layers_indeg(self) -> None:
        for layer in self.layer_instace.values():
            layer.reset_in_deg()

    def _reset_layers_input_cache(self) -> None:
        for layer in self.layer_instace.values():
            layer.reset_input_cache()

    def forward(self, inp):
        """
        Perform 1 forward pass through the network using the underlying graph topology order
        """
        self._reset_layers_indeg()
        self._reset_layers_input_cache()
        self._dfs_foward(self.graph.topo_order[0], inp)

        return self.layer_instace[str(self.graph.topo_order[-1])].output


if __name__ == "__main__":
    print()
