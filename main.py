from neuralnet.NeuralNet import NeuralNet
import torch
import torch.nn as nn


if __name__ == "__main__":
    net = NeuralNet("./layers.json", "./links.json")
    A = torch.rand(64)
    out = net(A)
    print(out.shape)

