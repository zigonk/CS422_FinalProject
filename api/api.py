import json
from typing import Dict, List

import flask
import numpy as np
import torch
import torch.nn as nn
import torch.nn.functional as F
import torch.optim as optim
import torchvision
import torchvision.transforms as transforms
from PIL import Image
from flask import Flask, jsonify, request
import os

from neuralnet.NeuralNet import NeuralNet
from neuralnet.utils import train_model, create_criterion, create_dataloader, create_optimizer
from neuralnet.LayerFactory import LayerFactory

app = Flask(__name__)
app.config.update(DEBUG=True,
                  task_serializer='pickle',
                  result_serializer='pickle',
                  accept_content=['pickle'],
                  UPLOAD_FOLDER="upload")

active_model = {}
training_info = {}
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)


@app.route('/api/train_info', methods=['GET'])
def info():
    return json.dumps(training_info)


@app.route('/api/create_instance', methods=['POST'])
def create_instance():
    """
    Create and store model instance from POST request.
    """
    data = request.get_json()

    model_id = data['id']
    layers = data['layers']
    links = data['links']
    active_model[model_id] = NeuralNet(layers, links)

    return json.dumps({'success': True}), 200, {
        'ContentType': 'application/json'
    }


@app.route('/api/compute', methods=['POST'])
def single_forward_pass():
    """
    Get id and input then compute
    """
    model_id = request.args.get('id')

    if model_id not in active_model:
        return json.dumps({
            'success': False,
            'info': 'Invalid model id'
        }), 400, {
            'ContentType': 'application/json'
        }

    # check if the post request has the file part
    if 'file' not in request.files:
        return json.dumps({
            'success': False,
            'info': 'File missing '
        }), 400, {
            'ContentType': 'application/json'
        }

    file = request.files['file']
    # if user does not select file, browser also
    # submit an empty part without filename
    if file.filename == '':
        return json.dumps({
            'success': False,
            'info': 'Empty filename'
        }), 400, {
            'ContentType': 'application/json'
        }

    filename = file.filename
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)

    if file:
        file.save(filepath)

    img = Image.open(filepath).convert('L')

    transform = transforms.Compose([
        transforms.Resize((28, 28)),
        transforms.ToTensor(),
        transforms.Normalize((0.5, ), (0.5, ))
    ])

    img_tensor = transform(img).unsqueeze_(0)
    net = active_model[model_id]
    result = net(img_tensor)
    result = result.detach().cpu().numpy().reshape(-1).tolist()

    return json.dumps({
        'success': True,
        'result': result
    }), 400, {
        'ContentType': 'application/json'
    }


@app.route('/api/train', methods=['POST'])
def training():

    if 'id' not in request.args:
        return json.dumps({
            'success': False,
            'info': "Missing model id query"
        }), 400, {
            'ContentType': 'application/json'
        }

    model_id = request.args.get('id')

    if model_id not in active_model:
        return json.dumps({
            'success': False,
            "info": "Invalid model id"
        }), 400, {
            'ContentType': 'application/json'
        }

    net = active_model[model_id]

    training_config = request.get_json()

    criterion = create_criterion(training_config['loss'])

    optimizer = create_optimizer(training_config['optimizer'], net,
                                 training_config['lr'])

    trainloader = create_dataloader(training_config['dataset'])

    train_model(net, criterion, optimizer, trainloader, training_config,
                training_info)

    return json.dumps({'success': True}), 200, {
        'ContentType': 'application/json'
    }


app.run()
