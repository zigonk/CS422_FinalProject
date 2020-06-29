"""
The graph representation of the neural net.
Used to determine calculation order.
"""

import json
from collections import defaultdict
from typing import Dict, List, Tuple, Union


class Graph:
    """

    Parameters
    ----------
    layers:
        List of Layers information. Example:

        ```
        [
            {
                "properties":{
                    "in_features":0,
                    "out_features":0
                },
                "id":"b0291176-0ba9-4e98-8b6b-ca6f37302c02",
                "name":"LinearLayer_1",
                "type":"LINEAR"
            },
            {
                "id":"ea98c9f8-13d9-46eb-9929-4c3b8f95a9f6",
                "name":"Reshape",
                "type":"RESHAPE"
            },
            {
                "id":"1188e5cd-5b62-44b7-8853-3569bb7016de",
                "name":"ReLU",
                "type":"RELU"
            }
        ]
        ```

    links: list
        List of Links information. Example:
        ```

        [
            {
                "sourceId":"b6a67c52-15a3-47fa-b4bd-c9b34b675c17",
                "targetId":"b0291176-0ba9-4e98-8b6b-ca6f37302c02"
            },
            {
                "sourceId":"b0291176-0ba9-4e98-8b6b-ca6f37302c02",
                "targetId":"ea98c9f8-13d9-46eb-9929-4c3b8f95a9f6"
            },
            {
                "sourceId":"ea98c9f8-13d9-46eb-9929-4c3b8f95a9f6",
                "targetId":"1188e5cd-5b62-44b7-8853-3569bb7016de"
            },
            {
                "sourceId":"1188e5cd-5b62-44b7-8853-3569bb7016de",
                "targetId":"c6872599-36db-4961-a3ad-10c10939caef"
            },
        ]
        ```
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

        self.V = 0  # Number of vertices in the graph
        self.l2v: Dict[str, int] = {}  # Mapping from layer id to vertex id

        self.adj_list: List[List] = {}

        for layer in self.layers:
            self.l2v[layer['id']] = self.V
            self.adj_list[self.V] = []
            self.V += 1

        # Inverse mapping of self.l2v
        self.v2l: Dict[int,
                       str] = {v_id: l_id
                               for l_id, v_id in self.l2v.items()}

        self.in_deg = [0] * self.V

        # Build adj list and indegree for each vertex
        for link in self.links:
            s_layer_id = link['sourceId']
            e_layer_id = link['targetId']

            s_vertex_id = self.l2v[s_layer_id]
            e_vertex_id = self.l2v[e_layer_id]

            self.adj_list[s_vertex_id].append(e_vertex_id)
            self.in_deg[e_vertex_id] += 1

    def _topo_sort(self) -> None:
        """
        Perform topology sort on the graph
        """

        # A recursive function used by topologicalSort
        def topologicalSortUtil(adj_list: List[List], v: int,
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
        visited = [False] * self.V

        self.topo_order = []

        # Call the recursive helper function to store Topological
        # Sort starting from all vertices one by one
        for i in range(self.V):
            if visited[i] == False:
                topologicalSortUtil(self.adj_list, i, visited, self.topo_order)


if __name__ == "__main__":
    pass
