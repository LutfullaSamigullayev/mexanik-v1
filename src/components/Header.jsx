import { Button, Input } from "antd";
import { Icons } from "./icons";
import { LogoutOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Axios } from "../lib/axios";
import { useDispatch } from "react-redux";
import { setFilial } from "../redux/slices/machineSlice";

const { Search } = Input;
const onSearch = (value, _e, info) => console.log(info?.source, value);

export function Header() {
  // -----------  Localstorage start ------------------

  const fullName = localStorage.getItem("name");
  const location2 = localStorage.getItem("location");
  const role = localStorage.getItem("role");

  // -----------  Localstorage end ------------------
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    return navigate("/login");
  };
  // -----------  Data start ------------------

  const [tranferMachines, setTransferMachines] = useState([]);

  // -----------  Data end ------------------

  // -----------  Axios start ------------------

  async function getTransferMachines() {
    if (location2 != "admin") {
      let url = `/sewing-machines?location=transfer&to=${location2}`;
      const res = await Axios.get(url);
      setTransferMachines(res.data);
    } else {
      let url = `/sewing-machines?location=transfer`;
      const res = await Axios.get(url);
      setTransferMachines(res.data);
    }
  }

  // -----------  Axios end ------------------

  useEffect(() => {
    getTransferMachines();
  }, []);

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
        {role == "admin" ? (
          <Link to={"/transfer"}>
            <div
              className="relative"
              onClick={() => {
                dispatch(setFilial("transfer"));
              }}
            >
              <Icons.bell />
              {tranferMachines.length ? (
                <div className="absolute -right-2 -top-2 bg-red-600 rounded-full w-4 h-4 flex items-center justify-center">
                  <span className="text-center text-sm text-white">
                    {tranferMachines.length}
                  </span>
                </div>
              ) : null}
            </div>
          </Link>
        ) : null}
        <div className="flex gap-x-2">
          <img src="/userImage.png" alt="userImage" className="size-11" />
          <div>
            <p className="text-xl font-medium">{fullName}</p>
            <p className="text-slate-500">{role}</p>
          </div>
        </div>
        <Button onClick={logout} type="primary">
          <LogoutOutlined />
        </Button>
      </div>
    </div>
  );
}
