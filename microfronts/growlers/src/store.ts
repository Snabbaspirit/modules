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
    return store.taps.filter(({beverageName, abv}) => {
        return beverageName.toLowerCase().includes(store.searchText.toLowerCase()) && abv < store.alcoholLimit
    });
}

export const load = (client: string): void => {
    fetch(`http://localhost:8080/${client}.json`)
    .then(response => response.json())
    .then((data: Beverage[]) => {
        store.taps = data;
        store.filteredTaps = filtered();
    })
}

export const setSearchText = (text: string) => {
    store.searchText = text;
    store.filteredTaps = filtered();
}

export const setAlcoholLimit = (limit: number) => {
    store.alcoholLimit = limit;
    store.filteredTaps = filtered();
}

export const addToCart = (beverage: Beverage) => {
    store.cart.push(beverage);
}

export default store;