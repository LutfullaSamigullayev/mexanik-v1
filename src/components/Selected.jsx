import { Select } from "antd";
import { useDispatch } from "react-redux";
import { setLine } from "../redux/slices/lineSlice";
const options = [
  {
    value: 0,
    label: "Xonada",
  },
  {
    value: 17,
    label: "Chetda",
  },
];
for (let i = 1; i <= 16; i++) {
  options.push({
    value: i,
    label: `${i} - liniya`,
  });
}

export function Selected() {
  const dispatch = useDispatch();

  const handleChange = (value) => {
    dispatch(setLine(value.sort((a, b) => a - b)));
  };

  return (
    <div className="w-[400px]">
      <Select
        mode="tags"
        style={{
          width: "100%",
        }}
        placeholder="Liniyani belgilang"
        onChange={handleChange}
        options={options}
      />
    </div>
  );
}
