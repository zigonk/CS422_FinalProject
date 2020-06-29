export function keyToLabel(key) {
  let label = "";
  for (let i = 0; i < key.length; ++i) {
    if (i === 0) {
      label += key[i].toUpperCase();
      continue;
    }
    if (key[i] === "_") label += " ";
    else label += key[i];
  }
  return label;
}

export function extractLinkInformation(link, ind) {
  const { sourcePort, targetPort } = link
  let sourceNode = sourcePort.parent
  let targetNode = targetPort.parent
  return {
    sourceId: sourceNode.getOptions().id,
    targetId: targetNode.getOptions().id
  }
}

export const layerList = [
  {
    type: "CONV2D",
    name: "Convolution Function",
  },
  {
    type: "LINEAR",
    name: "Linear Function",
  },
  {
    type: "RESHAPE",
    name: "Flatten",
  },
  {
    type: "RELU",
    name: "ReLU Activation",
  },
  {
    type: "SOFTMAX",
    name: "Softmax Activation",
  },
  {
    type: "ADD",
    name: "Add Operation",
  },
  {
    type: "MUL",
    name: "Multiplication Operation",
  },
  {
    type: "CONCAT",
    name: "Concat Operation",
  },
];

export const optimizerList = [
  {
    label: "RMSProps",
    value: "RMSProps",
  },
  {
    label: "Adam",
    value: "Adam",
  },
  {
    label: "SGD",
    value: "SGD",
  },
];
