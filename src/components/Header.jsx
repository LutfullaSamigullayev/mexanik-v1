import { Input } from "antd";
import { Icons } from "./icons";
const { Search } = Input;
const onSearch = (value, _e, info) => console.log(info?.source, value);

export function Header() {
  const fullName = localStorage.getItem("name");
  const role = localStorage.getItem("role");

  return (
    <div className="flex items-center justify-between max-h-[77px] px-8 py-3 border-b">
      <Search
        placeholder="input search text"
        allowClear
        onSearch={onSearch}
        style={{
          width: 400,
        }}
      />
      <div className="flex items-center gap-x-4">
        <Icons.bell />
        {/* <Icons.massage />   */} {/* keyinroq duzaman firebase bilan */}
        <div className="flex gap-x-2">
          <img src="/userImage.png" alt="userImage" className="size-11" />
          <div>
            <p className="text-xl font-medium">{fullName}</p>
            <p className="text-slate-500">{role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
