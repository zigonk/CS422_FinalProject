import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import { keyToLabel } from "../Utils";
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
      data,
      data: { properties },
    } = this.props;
    const opts = data.getOptions();
    return (
      <div>
        <Header>Layer information</Header>
        <Formik
          initialValues={{
            name: opts.name || "",
            properties: properties || {},
          }}
          enableReinitialize
          onSubmit={(value, actions) => {
            data.updateValue(value);
          }}
        >
          {(props) => (
            <Form>
              <Field component={Input} label="Layer name" name="name" />
              {props.values.properties &&
                Object.keys(props.values.properties).map((keys, ind) => (
                  <Field
                    key={ind}
                    component={Input}
                    label={keyToLabel(keys)}
                    name={`properties.${keys}`}
                  />
                ))}
              <Button title="Save" type="submit" style={{ width: "100%" }} />
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}
