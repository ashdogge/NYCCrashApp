import DatePicker from "./DatePicker";

export default {
  title: "Components/DatePicker",
  component: DatePicker,
};
export const Default = {
  args: {
    onClose: () => {},
    onDateChange: (date) => {
      console.log("Changed date:", date);
    },
    selectedDate: "2023-01-03",
  },
};
