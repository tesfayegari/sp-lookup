import { sp } from "sp-pnp-js";

export const colourOptions = [{ "value": "ocean", "label": "Ocean", "color": "#00B8D9", "isFixed": true }, { "value": "blue", "label": "Blue", "color": "#0052CC", "isDisabled": true }, { "value": "purple", "label": "Purple", "color": "#5243AA" }, { "value": "red", "label": "Red", "color": "#FF5630", "isFixed": true }, { "value": "orange", "label": "Orange", "color": "#FF8B00" }, { "value": "yellow", "label": "Yellow", "color": "#FFC400" }, { "value": "green", "label": "Green", "color": "#36B37E" }, { "value": "forest", "label": "Forest", "color": "#00875A" }, { "value": "slate", "label": "Slate", "color": "#253858" }, { "value": "silver", "label": "Silver", "color": "#666666" }];

export const filterColors = (inputValue: string) => {
  return colourOptions.filter(i =>
    i.label.toLowerCase().search(inputValue.toLowerCase()) != -1
  );
};
export const getListItems = (inputValue: string, listName: string) => {
  return sp.web.lists.getByTitle(listName).items
    .select('*')
    //.expand('Lookup')
    .filter(`substringof('${inputValue}',Title)`)
    .get()
    .then(items => {
      let options: { label: string, value: string }[] = [];
      items.forEach(item => options.push({ label: item.Title, value: item.Id }));
      return options;
    }, error => {console.error('Oops error ', error); return [{label: 'Search Data ..', value: 0}]});
};