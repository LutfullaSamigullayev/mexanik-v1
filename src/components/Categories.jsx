import { Space, Switch } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

import { useDispatch } from "react-redux";
import { addCategory, delCategory } from "../redux/slices/categorySlice";
import { useEffect, useState } from "react";
import { Axios } from "../lib/axios";

export function Categories() {
  // -----------  Data start ------------------

  const [categories, setCategories] = useState([]);

  // -----------  Data end ------------------

  // -----------  Redux start ------------------

  const dispatch = useDispatch();

  // -----------  Redux end ------------------

  // -----------  Axios start ------------------

  async function getCategories() {
    const res = await Axios.get("/categories");
    setCategories(res.data);
  }

  // -----------  Axios end ------------------

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="w-fit ">
      <Space direction="horizontal" className="flex gap-x-6">
        {categories.map((item) => (
          <div key={item.id} className="w-fit flex gap-x-1 items-center">
            {item.name}
            <Switch
              onChange={(checked) =>
                checked
                  ? dispatch(addCategory(item.category))
                  : dispatch(delCategory(item.category))
              }
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
              defaultChecked
            ></Switch>
          </div>
        ))}
      </Space>
    </div>
  );
}
