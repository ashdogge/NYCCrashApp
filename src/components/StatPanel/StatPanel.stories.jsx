import react from "react";
import StatPanel from "./StatPanel";

export default {
  title: "Components/StatPanel",
  component: StatPanel,
};
export const Default = {
  args: {
    value: 233,
    label: "Collisions",
  },
};

export const injuries = {
  args: {
    value: 103,
    label: "Injuries",
  },
};

export const fatalities = {
  args: {
    value: 5,
    label: "Fatalities",
  },
};
