import { Beverage } from './types.d';
import {proxy} from 'valtio/vanilla';

export interface ITapStore {
    taps: Beverage[];
    filteredTaps: Beverage[];
    cart: Beverage[];
    searchText: string;
    alcoholLimit: number;
}

const store = proxy<ITapStore>({
    taps: [],
    searchText: "",
    alcoholLimit: 10,
    filteredTaps: [],
    cart: [],
});

const filtered = () => {
    const searchRegex = new RegExp(store.searchText, "i");
    return store.taps.filter(({beverageName, abv}) => {
        beverageName.match(searchRegex) && abv < store.alcoholLimit
    }).slice(0, 15);
}

export const load = (client: string): void => {
    fetch(`http://localhost:8080/${client}.json`)
    .then(response => response.json())
    .then((data: Beverage[]) => {
        store.taps = data;
        store.filteredTaps = filtered();
    })
}

export default store;