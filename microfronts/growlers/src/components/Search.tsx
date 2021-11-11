import React from "react";
import {
  FormControl,
  FormLabel,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Box,
} from "@chakra-ui/react";

import { useAtom } from "jotai";
import store, { setAlcoholLimit, setSearchText } from "../store";
import { atomWithProxy } from "jotai/valtio";

import { MFE_BORDER } from "../constants";
import {load} from "../store";

load("hv-taplist");
const Search: React.FC = () => {

  const valtioState = atomWithProxy(store);
  const [{searchText, alcoholLimit}, setSearchState] = useAtom(valtioState);
  return (
    <Box border={MFE_BORDER}>
      <FormControl id="search">
        <FormLabel>Search</FormLabel>
        <input
          type="text"
          onChange={(e) => {
            setSearchText(e.target.value);
        }}/>
      </FormControl>

      <FormControl id="alcohol">
        <FormLabel>Alcohol</FormLabel>
        <Slider colorScheme="pink" defaultValue={3} min={0} max={17}>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </FormControl>
    </Box>
  );
};

export default Search;
