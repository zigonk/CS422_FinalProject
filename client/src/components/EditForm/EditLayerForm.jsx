import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import Input from "../Input";

const activateList = [
  { key: "SIGMOID", name: "Sigmoid" },
  { key: "TANH", name: "Tanh" },
  { key: "RELU", name: "ReLU" },
];

const optimizerList = [
  { key: "SGD", name: "SGD" },
  { key: "RMSprop", name: "RMSprop" },
  { key: "ADAM", name: "ADAM" },
];

export default class EditLayerForm extends Component {
  render() {
    const {
      data,
      data: {
        inputShape,
        outputShape,
        type,
        activateFunc,
        lossFunc,
        optimizer,
        lr,
      },
    } = this.props;
    const opts = data.getOptions();
    return (
      <div>
        <Formik
          initialValues={{
            name: opts.name || "",
            inputShape: inputShape || [],
            outputShape: outputShape || [],
            activationFunc: activateFunc || "",
            lossFunc: lossFunc || "",
            optimizer: optimizer || "",
            lr: lr || 0,
          }}
          onSubmit={(value, actions) => {
            data.updateValue(value);
          }}
        >
          {(props) => (
            <Form>
              <Field component={Input} name="name" />
              {props.values.inputShape &&
                props.values.inputShape.map((_, ind) => (
                  <div>
                    <Field
                      component={Input}
                      disabled={type !== "INPUT"}
                      name={`inputShape[${ind}]`}
                    />
                    <button onClick={() => this._removeInputShape(ind)}>
                      -
                    </button>
                  </div>
                ))}
              <button onClick={this._addInputShape}>+</button>

              {props.values.outputShape &&
                props.values.outputShape.map((_, ind) => (
                  <div>
                    <Field
                      componenet={Input}
                      disabled={type !== "OUTPUT"}
                      name={`outputShape[${ind}]`}
                    />
                    <button onClick={() => this._removeOutputShape(ind)}>
                      -
                    </button>
                  </div>
                ))}
              <button onClick={this._addInputShape}>+</button>
              {type === "HIDDEN" &&
                (props.values.activationFunc && (
                  <div>
                    <label>Activate Function</label>
                    <Field as="select" name="">
                      {activateList.map((value, id) => (
                        <option value={value.key}>{value.name}</option>
                      ))}
                    </Field>
                  </div>
                ))}
              {type === "OUTPUT" &&
                (props.values.optimizer && (
                  <div>
                    <label>Optimizer</label>
                    <Field as="select" name="">
                      {optimizerList.map((value, id) => (
                        <option value={value.key}>{value.name}</option>
                      ))}
                    </Field>
                  </div>
                ))}
              {type === "OUTPUT" &&
                (props.values.lr && <Field component={lr} name="name" />)}
            </Form>
          )}
        </Formik>
      </div>
    );
  }
  _addInputShape = () => {};
  _removeInputShape = (ind) => {};
  _addOutputShape = () => {};
  _removeOutputShape = (ind) => {};
}
