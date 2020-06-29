import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import { optimizerList } from "../Utils";
import Input from "../Input";
import styled from "@emotion/styled";
import Button from "../Button";

export const Header = styled.h1`
  margin-top: 0px;
  font-size: 28px;
  color: white;
`;

export const Label = styled.label`
  display: block;
  color: white;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const RemoveButton = styled.button`
  height: 40px;
  margin-left: 10px;
  width: 40px;
  align-self: flex-end;
  margin-bottom: 10px;
  box-sizing: border-box;
  border: 0px;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0);
  color: white;
`;

export const AddButton = styled.button`
  display: block;
  width: 100%;
  height: 40px;
  padding-top: 8px;
  text-align: center;
  margin: auto;
  margin-top: 30px;
  box-sizing: border-box;
  border: 0px;
  border-radius: 5px;
  background-color: rgba(100, 100, 100, 1);
  color: white;
`;

export const Select = styled.select`
  width: 100%;
  padding-left: 20px;
  padding-right: 5px;
  box-sizing: border-box;
  border-radius: 5px;
  height: 40px;
  font-family: Jost;
  background-color: white;
  font-size: 16px;
`;
export default class EditLayerForm extends Component {
  render() {
    const {
      data: { lr, optimizer },
      updateValue,
    } = this.props;
    return (
      <div>
        <Formik
          initialValues={{
            lr: lr || 0,
            optimizer: optimizer || "",
          }}
          enableReinitialize
          onSubmit={(value, actions) => {
            actions.setSubmitting(true)
            updateValue(value);
            actions.setSubmitting(false)
          }}
        >
          {(props) => (
            <Form>
              <Field component={Input} label="Learning rate" name="lr" />
              <Label>Optimizer</Label>
              <Field component={Select} name="lr">
                {optimizerList.map((opt, ind) => (
                  <option key={ind} value={opt.value}>{opt.label}</option>
                ))}
              </Field>
              <Button title="Create Model" type="submit" style={{ width: "100%" }} />
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}
