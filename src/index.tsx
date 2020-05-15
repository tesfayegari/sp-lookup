import * as React from 'react'
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { SPHttpClient } from "@microsoft/sp-http";
import MultiLookupPicker from "./MultiLookupPicker";

export enum FormType {
  NewForm = 1,
  EditForm,
  DisplayForm
}

export interface ISPLookupProps {
  lookupListName: string;
  parentListName: string;
  internalLookupName?: string; //default Title
  itemId?: number;
  onChange: (value: any[]) => void;
  styles?: any;
  context: WebPartContext;
  formType?: FormType;
  multi?: boolean;
}

interface ISPLookupState {
  selected: any[];
}

class SPLookup extends React.Component<ISPLookupProps, ISPLookupState> {
  constructor(props: ISPLookupProps) {
    super(props);
    this.state = {
      selected: []
    }
    this.onChangeLookup = this.onChangeLookup.bind(this);
  }

  componentDidMount() {
    this.props.parentListName && this.getListItems(this.props.parentListName, 'Title').
      then(result => console.log('Results are', result), error => console.error(error))
  }


  onChangeLookup(selected: any[]) {
    console.log('Parent Selected is ', selected)
    this.setState({ selected })
    this.props.onChange(selected);
  }

  //private async getListItems(filterText: string, listTitle: string, internalColumnName: string, keyInternalColumnName?: string, webUrl?: string, filter?: string ): Promise<any[]> {
  private async getListItems(listTitle: string, internalColumnName: string, keyInternalColumnName?: string, webUrl?: string): Promise<any[]> {

    //const filterStr = `startswith(${internalColumnName},'${encodeURIComponent(filterText.replace("'","''"))}')${filter ? ' and ' + filter : ''}`; //string = filterList  ? `and ${filterList}` : '';
    try {
      const webAbsoluteUrl = !webUrl ? this.props.context.pageContext.web.absoluteUrl : webUrl;
      //const apiUrl = `${webAbsoluteUrl}/_api/web/lists/getbytitle('${listTitle}')/items?$select=${keyInternalColumnName || 'Id'},${internalColumnName}&$filter=${filterStr}`;
      const apiUrl = `${webAbsoluteUrl}/_api/web/lists/getbytitle('${listTitle}')/items?$select=${keyInternalColumnName || 'Id'},${internalColumnName}`;
      const data = await this.props.context.spHttpClient.get(apiUrl, SPHttpClient.configurations.v1);
      if (data.ok) {
        const results = await data.json();
        if (results && results.value && results.value.length > 0) {
          return results.value;
        }
      }

      return [];
    } catch (error) {
      return Promise.reject(error);
    }
  }

  render() {
    const formType = this.props.formType ? this.props.formType : FormType.NewForm;
    const multi = this.props.multi == undefined ? false : this.props.multi;
    return (
      <>
        <label htmlFor="multiLookup">Choose Lookup</label>
        <MultiLookupPicker 
          formType={formType} 
          onChange={this.onChangeLookup} 
          listName={this.props.lookupListName} 
          multi={multi}/>
      </>
    )
  }
}

export default SPLookup;
