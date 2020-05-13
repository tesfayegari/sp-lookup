import * as React from 'react'
import './styles.scss'

interface ISPLookupProps {
  label: string;
  onChange: (value: string) => void;
  styles?: any;
}

class SPLookup extends React.Component<ISPLookupProps, {}> {
  constructor(props: ISPLookupProps){
    super(props);
  }

  onChange = (e: any) => {
    this.props.onChange(e.target.value);
  }

  render() {
    return (
      <div className="package">
        <label htmlFor="name">{this.props.label}</label>
        <input type="text" onChange={this.onChange} name="name"/>
      </div>
    )
  }
}

export default SPLookup
