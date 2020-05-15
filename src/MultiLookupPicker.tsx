import * as React from 'react';
import { sp } from "sp-pnp-js";
import Select from "react-select";
import { FormType } from '.';

export interface Option {
  value: string;
  label: string;
}
export interface MultiLookupPickerProps {
  onChange?: (selected: string[]) => void;
  listName: string;
  formType?: FormType;
  defaultValue?: Option[] | any;
  multi: boolean;
}
export interface MultiLookupPickerState {
  selected: string[];
  options: Option[];
}

export default class MultiLookupPicker extends React.Component<MultiLookupPickerProps, MultiLookupPickerState> {
  constructor(props: MultiLookupPickerProps) {
    super(props);
    this.state = {
      selected: [],
      options: []
    };
  }

  
  componentDidMount() {
    this.readItems(this.props.listName);
  }

  handleChange = (newValue: any, actionMeta: any) => {
    console.group('Value Changed');
    console.log(newValue);
    console.log(`action: ${actionMeta.action}`);
    this.props.onChange && this.props.onChange(newValue);
    console.groupEnd();
  };
  handleInputChange = (inputValue: any, actionMeta: any) => {
    console.group('Input Changed');
    console.log(inputValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
  };

  private readItems(listName: string): void {
    sp.web.lists.getByTitle(listName)
      .items.select('*')
      .getAll()
      .then((resultItems: any[]): void => {
        console.log('Lookup is is ', resultItems);
        var ops: Option[] = [];
        resultItems.forEach(item => ops.push({ value: item.ID, label: item.Title }));
        console.log('Options to be selected ', ops);

        this.setState({ options: ops })
      }, (error: any): void => {
        console.error('Oops error occured', error);
      });
  }

  render() {
    const formType = this.props.formType || FormType.NewForm;
    return (
    
      <Select
        options={this.state.options}
        value={this.props.defaultValue}
        isMulti={this.props.multi}
        isClearable={true}
        isSearchable={true}
        onChange={this.handleChange}
        onInputChange={this.handleInputChange}
        name="colors"
        className="basic-multi-select w-100"
        classNamePrefix="select"
        isDisabled={formType == FormType.DisplayForm ? true :false}
        />

    );
  }
}
