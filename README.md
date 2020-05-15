# SharePoont Lookup Selector

A control that can be used with any form or without a form to Select List Items. Best used with SharePoint Custom Forms (New or Edit)

## Dependencies
I am using bootstrap 4.*.* CSS only for this version but will be including a custom built css to override the default style in the next release

## How to use

This is a react Component that needs to be installed first and used with any SPFx react projects as follows

To Install the component
- `npm i sp-lookup`

Usage
```react
import SPLookup from "sp-lookup";

..............

<SPLookup 
    lookupListName="AccordionList" 
    parentListName="Sandwiches" 
    onChange={value => console.log(value)} 
    context={this.props.context} />
```
The Complete Props are 
```
interface ISPLookupProps {
  lookupListName: string; //Name of the list which is used as a lookup
  parentListName: string; //List where the lookup is used 
  internalLookupName?: string; //default Title
  itemId?: number; //with Display Form and Edit Form
  onChange: (value: any[]) => void;
  styles?: any;
  context: WebPartContext;
  formType?: FormType;
}

//Form Types are as follows 
enum FormType {
  NewForm = 1,
  EditForm,
  DisplayForm
}
```

You can freely download the code and extend on your own

- [`Github Repo for the package is `](https://github.com/tesfayegari/sp-lookup)
- [`Email: Tesfaye Gari `](mailto:tesfaye.gari@gmail.com)

### Happy Coding ♡
### By Tesfaye Gari, Sharing is Caring ♡
