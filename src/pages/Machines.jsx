import { useEffect, useState } from "react";
import { Button, Form, Input, Modal, Table } from "antd";
import { Axios } from "../lib/axios";
import { Controller, useForm } from "react-hook-form";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Space, Switch } from "antd";
import { useSelector } from "react-redux";

const Machines = () => {
  const filial = useSelector((state) => state.filial);
  // -----------  Data start ------------------

  const [sewingMachines, setSewingMachines] = useState([]);

  const [deleteMacine, setDeleteMacine] = useState(null);
  const [editMacine, setEditMacine] = useState(null);

  const [category, setCategory] = useState([
    "lockstitch-machine",
    "overlock",
    "regula-rechma",
    "duz-rechma",
  ]);

  // -----------  Data end ------------------

  // -----------  Modal start ------------------

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
    reset();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // -----------  Modal end ------------------

  // -----------  Form start ------------------

  const { handleSubmit, control, reset, setValue } = useForm();

  // -----------  Form end ------------------

  // -----------  Axios start ------------------

  async function getMacines() {
    let url = `/sewing-machines?location=${filial.toLowerCase()}`;

    if (filial) {
      if (!category.length) {
        url += `&category[]=`;
      } else {
        for (let item of category) {
          url += `&category[]=${item}`;
        }
      }
      const res = await Axios.get(url);
      setSewingMachines(res.data);
    } else {
      let url = "/sewing-machines";

      if (!category.length) {
        url += `&category[]=`;
      } else {
        for (let i = 0; i < category.length; i++) {
          if (i === 0) {
            url += `?category[]=${category[i]}`;
          } else {
            url += `&category[]=${category[i]}`;
          }
        }
      }
      const res = await Axios.get();
      setSewingMachines(res.data);
    }
  }

  useEffect(() => {
    getMacines();
  }, [filial, category]);

  function onsubmit(data) {
    if (editMacine) {
      Axios.patch(`/sewing-machines/${editMacine}`, { ...data })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    } else {
      Axios.post("/sewing-machines", { ...data })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
    reset();
    handleCancel(false);
    setEditMacine(null);
    getMacines();
  }

  function onDeleteMachine() {
    Axios.delete(`sewing-machines/${deleteMacine}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    setDeleteMacine(null);
    getMacines();
  }

  // -----------  Axios end ------------------

  // -----------  Table start ------------------

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
    },
    {
      title: "Nomi",
      render: (item) =>
        item.category == "lockstitch-machine" ? "Odnosrochka" : item.category,
      // dataIndex: "category",
    },
    {
      title: "Firma",
      dataIndex: "company",
    },
    {
      title: "Modeli",
      dataIndex: "model",
    },
    // {
    //   title: "Maksimal tezlik",
    //   dataIndex: "speed",
    // },
    {
      title: "Filial",
      dataIndex: "location",
    },
    {
      title: "Liniya",
      dataIndex: "line",
    },
    {
      title: "Seria raqami",
      dataIndex: "serialNumber",
    },
    {
      title: "Inventar №",
      // render: (item) => `${String(item.inventory - number).padStart(8, "0")}`,
      dataIndex: "inventoryNumber",
    },
    {
      title: "Action",
      render: (item) => (
        <>
          <Button
            onClick={() => {
              setEditMacine(item.id);
              setIsModalOpen(true);
              // setValue("id", item.id);
              setValue("category", item.category);
              setValue("company", item.company);
              setValue("model", item.model);
              setValue("needles", item.needles);
              setValue("line", item.line);
              // setValue("speed", item.speed);
              setValue("location", item.location);
              setValue("serialNumber", item.serialNumber);
              setValue("inventoryNumber", item.inventoryNumber);
            }}
          >
            edit
          </Button>
          <Button onClick={() => setDeleteMacine(item.id)}>delete</Button>
        </>
      ),
    },
  ];

  useEffect(() => {
    console.log(category);
  }, [category]);

  // -----------  Table end ------------------

  return (
    <>
      <div className=" flex items-center justify-between p-3">
        <div className="w-fit ">
          <Space direction="horizontal" className="flex gap-x-6">
            <div className="w-fit flex gap-x-1 items-center">
              odnosrochka
              <Switch
                onChange={(checked) =>
                  checked
                    ? setCategory([...category, "lockstitch-machine"])
                    : setCategory(
                        category.filter((item) => item !== "lockstitch-machine")
                      )
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
                    ? setCategory([...category, "overlock"])
                    : setCategory(
                        category.filter((item) => item !== "overlock")
                      )
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
                    ? setCategory([...category, "regula-rechma"])
                    : setCategory(
                        category.filter((item) => item !== "regula-rechma")
                      )
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
                    ? setCategory([...category, "duz-rechma"])
                    : setCategory(
                        category.filter((item) => item !== "duz-rechma")
                      )
                }
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                defaultChecked
              />
            </div>
          </Space>
        </div>
        <Button type="primary" onClick={showModal}>
          Mashina qo'shish
        </Button>
      </div>
      <Modal
        title="Mashina qo'shish"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form onFinish={handleSubmit(onsubmit)}>
          {/* <Controller
            control={control}
            name="id"
            render={({ field }) => <Input placeholder="Id" {...field} />}
          /> */}
          <Controller
            control={control}
            name="category"
            render={({ field }) => <Input placeholder="Nomi" {...field} />}
          />
          <Controller
            control={control}
            name="company"
            render={({ field }) => <Input placeholder="Firmasi" {...field} />}
          />
          <Controller
            control={control}
            name="model"
            render={({ field }) => <Input placeholder="Modeli" {...field} />}
          />
          {/* <Controller
            control={control}
            name="speed"
            render={({ field }) => (
              <Input placeholder="Maksimal tezlik" {...field} />
            )}
          /> */}
          <Controller
            control={control}
            name="location"
            render={({ field }) => <Input placeholder="Filial" {...field} />}
          />
          <Controller
            control={control}
            name="line"
            render={({ field }) => <Input placeholder="Liniyasi" {...field} />}
          />
          <Controller
            control={control}
            name="serialNumber"
            render={({ field }) => (
              <Input placeholder="Seria raqami" {...field} />
            )}
          />
          <Controller
            control={control}
            name="inventoryNumber"
            render={({ field }) => (
              <Input placeholder="Inventar raqami" {...field} />
            )}
          />
          <Button htmlType="submit">Submit</Button>
        </Form>
      </Modal>
      <Table dataSource={sewingMachines} columns={columns} />
      <Modal
        open={deleteMacine}
        onOk={onDeleteMachine}
        onCancel={() => {
          setDeleteMacine(null);
        }}
      >
        O'chirilsinmi?
      </Modal>
    </>
  );
};

export default Machines;
