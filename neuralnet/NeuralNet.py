import json
import os

import numpy as np
import torch
import torch.nn as nn
import torch.nn.functional as F

from typing import List, Dict

from .Graph import Graph
from .LayerFactory import LayerFactory


class NeuralNet(nn.Module):
    """
    A neural net consists of layers and links between layers.

    Parameters
    ----------
    layer_path :
        JSON layer information
    link_path:
        JSON link information
    """
    def __init__(self, layer_config: List[Dict], link_config: List[Dict]):
        super().__init__()
        self.layers = layer_config
        self.links = link_config
        self.graph = Graph(self.layers, self.links)
        self._create_layers()

        # Set the indegree for each layer
        for layer_id, layer in self.layer_instace.items():
            layer.original_in_deg = self.graph.in_deg[self.graph.l2v[layer_id]]
            layer.current_in_deg = layer.original_in_deg

    def _create_layers(self) -> None:
        """
        Create a Module Dict contains all layer instances
        """
        instances = {}

        for layer in self.layers:
            instance = LayerFactory.create_layer(layer)
            layer_id = layer['id']
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

        layer = self.layer_instace[self.graph.v2l[v]]
        if layer.current_in_deg >  0:
            layer.current_in_deg -= 1
        layer.receive_input(inp)

        # If current layer receives enough input then perform computation
        if layer.current_in_deg == 0:
            layer()

            # Send the output to next layers
            for next_v in self.graph.adj_list[v]:
                self._dfs_foward(next_v, layer.output)

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

        last_layer_vertex = self.graph.topo_order[-1]
        last_layer_id = self.graph.v2l[last_layer_vertex]

        return self.layer_instace[last_layer_id].output


if __name__ == "__main__":
    print()
