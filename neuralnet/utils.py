import numpy as np
import torch.nn as nn
import torchvision.transforms as transforms
import torch
import torch.nn.functional as F
import torch.optim as optim
import torchvision

from typing import List, Dict

OPTIMIZER_MAPPING = {
    'SGD': optim.SGD,
    'RMSPROP': optim.RMSprop,
    'ADAM': optim.Adam
}

DATASET_MAPPING = {
    'FASHIONMNIST': torchvision.datasets.FashionMNIST,
    'MNIST': torchvision.datasets.MNIST,
    'CIFAR': torchvision.datasets.CIFAR10,
}

LOSS_MAPPING = {
    'L1LOSS': nn.L1Loss,
    'MSELOSS': nn.MSELoss,
    'NLLLOSS': nn.NLLLoss,
    'CROSSENTROPYLOSS': nn.CrossEntropyLoss,
}


def create_optimizer(name, net, lr):
    return OPTIMIZER_MAPPING[name](net.parameters(), lr=lr)


def create_criterion(name):
    return LOSS_MAPPING[name]()


def create_dataloader(name):
    transform = transforms.Compose(
        [transforms.ToTensor(),
         transforms.Normalize((0.5, ), (0.5, ))])

    dataset = DATASET_MAPPING[name]

    trainset = dataset('dataset',
                       download=True,
                       train=True,
                       transform=transform)

    # dataloaders
    dataloader = torch.utils.data.DataLoader(trainset,
                                             batch_size=4,
                                             shuffle=True,
                                             num_workers=2)

    return dataloader


def train_model(net: nn.Module, criterion: nn.Module,
                optimizer: optim.Optimizer,
                trainloader: torch.utils.data.DataLoader,
                training_config: Dict, training_info: Dict):
    """
    Training a model and update information to the training_info dictionary

    Parameters
    ----------
    net:
        Network to train
    criterion:
        The loss function
    optimizer:
        Optimizer
    trainloader:
        Training dataloader
    training_config:
        Training hyperameters
    training_info:
        Current training information
    """

    epochs = training_config['epochs']
    training_info['epoch'] = 0
    training_info['loss'] = 0
    training_info['iteration'] = 0
    training_info['status'] = "training"

    for epoch in range(epochs):  # loop over the dataset multiple times

        running_loss = 0.0

        print(epoch, running_loss)
        for i, data in enumerate(trainloader, 0):
            training_info['iteration'] = i

            # get the inputs; data is a list of [inputs, labels]
            inputs, labels = data

            # zero the parameter gradients
            optimizer.zero_grad()

            # forward + backward + optimize
            outputs = net(inputs)
            loss = criterion(outputs, labels)
            loss.backward()
            optimizer.step()

            running_loss += loss.item()

        training_info['epoch'] = epoch
        training_info['loss'] = running_loss
        running_loss = 0

    training_info['status'] = "finished"
