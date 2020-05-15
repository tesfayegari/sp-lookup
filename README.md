# SharePoint Lookup Selector

A control that can be used with any form or without a form to Select List Items. Best used with SharePoint Custom Forms (New or Edit)

## Dependencies
sp-pnp-js, react-select, react, react-dom, @microsoft/sp-webpart-base, @microsoft/sp-http

## How to use

This is a react Component that needs to be installed first and used with any SPFx react projects as follows

To Install the component
- `npm i sp-lookup`

Usage
```react
import SPLookup, { FormType } from 'sp-lookup';

..............

<SPLookup 
    itemId={2} //item ID is necessary when Form Type is not New Form
    lookupListName="AccordionList" //Lookup List Name, For this feature column is Title internal name
    parentListName="Sandwiches" //Parent List Name
    internalLookupName="MultiLookup" //Internal name of lookup column in Parent List
    onChange={value => console.log(value)} 
    context={this.props.context} 
    multi={true}
    formType={FormType.EditForm}/>
```
The Complete Props are 
```
interface ISPLookupProps {
  lookupListName: string;
  parentListName: string;
  internalLookupName?: string; 
  itemId?: number;
  onChange: (value: any[]) => void;
  styles?: any;
  context: WebPartContext;
  formType?: FormType;
  multi?: boolean;
}

//Form Types are as follows 
enum FormType {
  NewForm = 1,
  EditForm,
  DisplayForm
}
```

Screen Shots 
- Display Form
![Display Form Snipet](/assets/1.png)
![Display Form Screen](/assets/2.png)
- Edit Form 
![Edit Form Snipet](/assets/3.png)
![Edit Form Screen](/assets/4.png)

You can freely download the code and extend on your own

- [`Github Repo for the package is `](https://github.com/tesfayegari/sp-lookup)
- [`Email: Tesfaye Gari `](mailto:tesfaye.gari@gmail.com)

### Happy Coding ♡
### By Tesfaye Gari, Sharing is Caring ♡
