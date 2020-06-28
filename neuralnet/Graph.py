"""
The graph representation of the neural net.
Used to determine calculation order.
TODO:
- Construct the graph from the layer (Done)
- Toposort (Done)
- DFS computation
"""

import json
from typing import List, Tuple, Union, Dict
from collections import defaultdict


class Graph:
    """

    Parameters
    ----------
    layers: list
        List of Layers information
        TODO: Add example

    links: list
        List of Links information
        TODO: Add example
    """
    def __init__(self, layers: List[Dict], links: List[Dict]):
        self.layers: List[Dict] = layers
        self.links: List[Dict] = links
        self._construct_graph()
        self._topo_sort()

    def _construct_graph(self) -> None:
        """
        Construct the graph from the layers and link
        """

        self.adj_list: Dict[List] = {}

        for layer in self.layers:
            self.adj_list[layer['id']] = []

        self.V = len(self.adj_list)

        self.in_deg = defaultdict(int)


        for link in self.links:
            s = link['s_id']
            e = link['e_id']
            self.adj_list[s].append(e)
            self.in_deg[e] += 1

    def _topo_sort(self) -> None:
        """
        Perform topology sort on the graph
        """

        # A recursive function used by topologicalSort
        def topologicalSortUtil(adj_list: Dict[int, List], v: int,
                                visited: List[bool], stack: List):

            # Mark the current node as visited.
            visited[v] = True

            # Recur for all the vertices adjacent to this vertex
            for i in adj_list[v]:
                if visited[i] == False:
                    topologicalSortUtil(adj_list, i, visited, stack)

            # Push current vertex to stack which stores result
            stack.insert(0, v)

        # The function to do Topological Sort. It uses recursive
        # topologicalSortUtil()

        # Mark all the vertices as not visited
        visited = defaultdict(bool)

        self.topo_order = []

        # Call the recursive helper function to store Topological
        # Sort starting from all vertices one by one
        for i in self.adj_list.keys():
            if visited[i] == False:
                topologicalSortUtil(self.adj_list, i, visited, self.topo_order)


if __name__ == "__main__":
    pass
