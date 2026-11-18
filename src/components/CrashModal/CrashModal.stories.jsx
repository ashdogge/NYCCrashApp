import react from "react";
import CrashModal from "./CrashModal";

export default {
  title: "Components/CrashModal",
  component: CrashModal,
};
export const Default = {
  args: {
    onClose: () => {},
    onSelect: (date) => {
      console.log("Selected date:", date);
    },
  },
};
