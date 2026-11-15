import react from "react";
import DatePicker from "./DatePicker";

export default {
  title: "Components/DatePicker",
  component: DatePicker,
};
export const Default = {
  args: {
    onClose: () => {},
    onSelect: (date) => {
      console.log("Selected date:", date);
    },
  },
};
