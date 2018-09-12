import * as React from 'react';
import { Field } from 'redux-form';

export const Radio = props => {
  if (props && props.input && props.options) {
    const renderRadioButtons = (key, index) => {
      return (
        <label className="radioButtons" key={`${index}`} htmlFor={`${props.input.name}-${index}`}>
          <Field
            id={`${props.input.name}`}
            component="input"
            name={props.input.name}
            type="radio"
            value={key}
            className="radio"
          />
          {props.options[key]}
        </label>
      )
    };
    return (
      <ul className="radioDuration">
        <div className="radioLabel">
          {props.label}
        </div>
        <li>
          {props.options &&
            Object.keys(props.options).map(renderRadioButtons)}
        </li>
      </ul>
    );
  }
  return <div></div>
}

export default Radio;