import { useEffect, useState } from "react";
import { Button, Checkbox, Divider, Flex, Table } from "antd";
import { useSelector } from "react-redux";
import { Axios } from "../lib/axios";
import { ClearOutlined } from "@ant-design/icons";

const columns = [
  {
    title: "№",
    render: (value, item, index) => index + 1,
    key: "1",
  },
  {
    title: "Nomi",
    dataIndex: "category",
    key: "2",
  },
  {
    title: "Firma",
    dataIndex: "company",
    key: "3",
  },
  {
    title: "Modeli",
    dataIndex: "model",
    key: "4",
  },
  // {
  //   title: "Filial",
  //   dataIndex: "location",
  //   key: "5",
  // },
  {
    title: "Liniya",
    dataIndex: "line",
    key: "6",
  },
  {
    title: "Seria raqami",
    dataIndex: "serialNumber",
    key: "7",
  },
  {
    title: "Inv №",
    // render: (item) => `${String(item.inventory - number).padStart(8, "0")}`,
    dataIndex: "inventoryNumber",
    key: "8",
  },
];
const defaultCheckedList = columns.map((item) => item.key);

const Inventory = () => {
  // -----------  Data start ------------------

  const [sewingMachines, setSewingMachines] = useState([]);

  // -----------  Data end ------------------

  // -----------  Redux start ------------------

  const filial = useSelector((state) => state.filial);

  const search = useSelector((state) => state.search);

  // -----------  Redux end ------------------

  // -----------  Axios start ------------------

  async function getMacines() {
    let url = `/sewing-machines?location=${filial.toLowerCase()}`;
    const res = await Axios.get(url);
    setSewingMachines(res.data);
  }

  // -----------  Axios end ------------------

  useEffect(() => {
    getMacines();
  }, [filial]);

  // -----------  Select start ------------------

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };
  const onSelectChange = (newSelectedRowKeys) => {
    console.log("sewing Machine: ", sewingMachines);

    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  // -----------  Select end ------------------

  // -----------  Select 2 start ------------------

  const sortId = (array, select) => {
    const newarr = [];
    array.forEach((e, i) => {
      select.some((a) => {
        i === a ? (newarr.push(e.id), console.log("slect", e.id)) : newarr;
      });
    });
    return newarr;
  };

  const newArrId = sortId(sewingMachines, selectedRowKeys);

  console.log("newsort", newArrId);

  const sortCategory = (array, newId) => {
    const arrCategory = ["1"];
    array.forEach((e) => {
      newId.some((a) => {
        e.id == a ? arrCategory.push(e) : arrCategory;
      });
    });
  };

  const sortArrCategory = sortCategory(sewingMachines, newArrId);

  console.log("id: ", sortArrCategory);

  function getItemsCount(category) {
    return sewingMachines
      .filter((item) => item.category === category)
      .map((item) => selectedRowKeys.includes(item.id))
      .filter((item) => item).length;
  }

  // -----------  Select 2 end ------------------

  // -----------  Column start ------------------

  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const options = columns.map(({ key, title }) => ({
    label: title,
    value: key,
  }));
  const newColumns = columns.map((item) => ({
    ...item,
    hidden: !checkedList.includes(item.key),
  }));

  // -----------  Column end ------------------

  return (
    <>
      <div className="flex gap-3 text-lg">
        <span>
          Jami: {selectedRowKeys.length} / {sewingMachines.length}
        </span>
        <span>
          Overlok: {getItemsCount("overlok")} /{" "}
          {sewingMachines.filter((e) => e.category == "overlok").length}
          {console.log("rowselect: ", selectedRowKeys)}
        </span>
        <span>
          Ondosrochka: {getItemsCount("odnosrochka")} /{" "}
          {sewingMachines.filter((e) => e.category == "odnosrochka").length}
        </span>
        <span>
          Duz-Rechma: {getItemsCount("duz-rechma")} /{" "}
          {sewingMachines.filter((e) => e.category == "duz-rechma").length}
        </span>
        <span>
          Regula-Rechma: {getItemsCount("regula-rechma")} /{" "}
          {sewingMachines.filter((e) => e.category == "regula-rechma").length}
        </span>
      </div>
      <Flex gap="middle" vertical>
        <Flex align="center" gap="middle">
          <Button
            className="rounded-full"
            type="primary"
            onClick={start}
            disabled={!hasSelected}
            loading={loading}
          >
            <ClearOutlined />
          </Button>
          {hasSelected ? `${selectedRowKeys.length} ta belgilandi` : null}
        </Flex>

        <Divider>Inventarizatsiya</Divider>

        <Checkbox.Group
          value={checkedList}
          options={options}
          onChange={(value) => {
            setCheckedList(value);
          }}
        />

        <Table
          rowSelection={rowSelection}
          columns={newColumns}
          dataSource={sewingMachines
            .filter((item) => {
              return search === ""
                ? item
                : item.serialNumber.toLowerCase().includes(search) ||
                    item.inventoryNumber.toString().includes(search);
            })
            .map((item) => ({ ...item, key: item.id }))}
        />
      </Flex>
    </>
  );
};

export default Inventory;
