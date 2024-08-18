import { useEffect, useRef, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Divider, Input, Select, Space } from "antd";
import { Axios } from "../lib/axios";
let index = 0;
const MachineSelect = () => {
  // -----------  Data start ------------------

  const [name, setName] = useState("");

  const [model, setModel] = useState([]);

  const [categories, setCategories] = useState([]);

  // -----------  Data end ------------------

  // -----------  Redux start ------------------

  // -----------  Redux end ------------------

  // -----------  Axios start ------------------

  async function getModel() {
    const res = await Axios.get("/model");
    setModel(res.data);
  }
  async function getCategories() {
    const res = await Axios.get("/categories");
    setCategories(res.data);
  }

  // -----------  Axios end ------------------

  const inputRef = useRef(null);

  // -----------  Function start ------------------

  const onNameChange = (event) => {
    setName(event.target.value);
  };

  const addItem = (e) => {
    e.preventDefault();
    setItems([...items, name || `New item ${index++}`]);
    setName("");
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  // -----------  Function end ------------------

  useEffect(() => {
    getModel();
    getCategories();
  }, []);

  return (
    <div className="flex flex-col">
      <Select
        style={{
          width: 300,
        }}
        placeholder="Categoriyani belgilang"
        dropdownRender={(category) => (
          <>
            {category}
            <Divider
              style={{
                margin: "8px 0",
              }}
            />
            <Space
              style={{
                padding: "0 8px 4px",
              }}
            >
              <Input
                placeholder="Please enter item"
                ref={inputRef}
                value={name}
                onChange={onNameChange}
                onKeyDown={(e) => e.stopPropagation()}
              />
              <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                Add item
              </Button>
            </Space>
          </>
        )}
        options={categories.map((item) => ({
          label: item.name,
          value: item.category,
        }))}
        optionRender={(option) => (
          <div className="flex items-center justify-between">
            <span>{option.label}</span>
            <button>del</button>
          </div>
        )}
      />
      <Select
        style={{
          width: 300,
        }}
        placeholder="custom dropdown render"
        dropdownRender={(menu) => (
          <>
            {menu}
            <Divider
              style={{
                margin: "8px 0",
              }}
            />
            <Space
              style={{
                padding: "0 8px 4px",
              }}
            >
              <Input
                placeholder="Please enter item"
                ref={inputRef}
                value={name}
                onChange={onNameChange}
                onKeyDown={(e) => e.stopPropagation()}
              />
              <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                Add item
              </Button>
            </Space>
          </>
        )}
        options={categories.map((item) => ({
          label: item,
          value: item,
        }))}
        optionRender={(option) => (
          <div className="flex items-center justify-between">
            <span>{option.label}</span>
            <button>del</button>
          </div>
        )}
      />
    </div>
  );
};
export default MachineSelect;
