import * as React from 'react';
import AsyncSelect from 'react-select/async';
//import { colourOptions, getListItems } from './services';
import { getListItems } from './services';
import { MultiLookupPickerProps } from './MultiLookupPicker';
import { FormType } from '.';

interface AsyncSPLookupState {
  inputValue: string,
}

export default class AsyncSPLookup extends React.Component<MultiLookupPickerProps, AsyncSPLookupState> {
  constructor(props) {
    super(props);
    this.state = { inputValue: '' };
  }
  handleInputChange = (newValue: string) => {
    const inputValue = newValue.replace(/\W/g, '');
    this.setState({ inputValue });
    console.log('Selected value', newValue);
    return inputValue;
  };

  handleChange = (newValue: any, actionMeta: any) => {
    console.group('Value Changed');
    console.log('Value',newValue);
    console.log(`action: ${actionMeta.action}`);
    this.props.onChange && this.props.onChange(newValue);
    console.groupEnd();
  };
  promoseFilterList = inputValue => getListItems(inputValue, this.props.listName);
  render() {
    const formType = this.props.formType || FormType.NewForm;
    return (
      <AsyncSelect
        value={this.props.defaultValue}
        isMulti={this.props.multi}
        cacheOptions
        defaultOptions
        onChange={this.handleChange}
        onInputChange={this.handleInputChange}
        loadOptions={this.promoseFilterList}
        isDisabled={formType == FormType.DisplayForm ? true :false}
      />
    );
  }
}