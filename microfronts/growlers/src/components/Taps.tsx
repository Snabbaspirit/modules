import React from "react";
import { useAtom } from "jotai";
import { Box } from "@chakra-ui/react";
import { atomWithProxy } from "jotai/valtio";
import BeverageCard from "./BeverageCard";
import store from "../store";
import { MFE_BORDER } from "../constants";


const Taps = () => {
  const stateAtom = atomWithProxy(store);
  const [state, setState] = useAtom(stateAtom);
  console.log(state)
  return (
    <Box border={MFE_BORDER}>
      {state.filteredTaps.map((beverage) => (
        <BeverageCard
          key={[beverage.producerName, beverage.beverageName].join("")}
          beverage={beverage}
        />
      ))}
    </Box>
  );
};

export default Taps;
