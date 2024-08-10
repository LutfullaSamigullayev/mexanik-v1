import { Space, Switch } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

import { useDispatch } from "react-redux";
import { addCategory, delCategory } from "../redux/slices/categorySlice";

export function Categories() {
  const dispatch = useDispatch();
  return (
    <div className="w-fit ">
      <Space direction="horizontal" className="flex gap-x-6">
        <div className="w-fit flex gap-x-1 items-center">
          odnosrochka
          <Switch
            onChange={(checked) =>
              checked
                ? dispatch(addCategory("lockstitch-machine"))
                : dispatch(delCategory("lockstitch-machine"))
            }
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            defaultChecked
          />
        </div>
        <div className="w-fit flex gap-x-1 items-center">
          overlock
          <Switch
            onChange={(checked) =>
              checked
                ? dispatch(addCategory("overlock"))
                : dispatch(delCategory("overlock"))
            }
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            defaultChecked
          />
        </div>
        <div className="w-fit flex gap-x-1 items-center">
          regula-rechma
          <Switch
            onChange={(checked) =>
              checked
                ? dispatch(addCategory("regula-rechma"))
                : dispatch(delCategory("regula-rechma"))
            }
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            defaultChecked
          />
        </div>
        <div className="w-fit flex gap-x-1 items-center">
          duz-rechma
          <Switch
            onChange={(checked) =>
              checked
                ? dispatch(addCategory("duz-rechma"))
                : dispatch(delCategory("duz-rechma"))
            }
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            defaultChecked
          />
        </div>
      </Space>
    </div>
  );
}
