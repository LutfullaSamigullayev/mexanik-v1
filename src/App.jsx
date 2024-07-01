import { useEffect, useState } from "react";
import { Button, Form, Input, Modal, Table } from "antd";
import { Axios } from "./lib/axios";
import { Controller, useForm } from "react-hook-form";

function App() {
  // -----------  Data start ------------------

  const [sewingMachines, setSewingMachines] = useState([]);

  const [deleteMacine, setDeleteMacine] = useState(null);
  const [editMacine, setEditMacine] = useState(null);

  // -----------  Data end ------------------

  // -----------  Modal start ------------------

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
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
    const res = await Axios.get("/sewing-machines");
    setSewingMachines(res.data);
  }

  useEffect(() => {
    getMacines();
    console.log(sewingMachines);
  }, []);

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
      title: "Firmasi",
      dataIndex: "company",
    },
    {
      title: "Modeli",
      dataIndex: "model",
    },
    {
      title: "Maksimal tezlik",
      dataIndex: "speed",
    },
    {
      title: "Filial",
      dataIndex: "location",
    },
    {
      title: "Liniyasi",
      dataIndex: "line",
    },
    {
      title: "Seria raqami",
      dataIndex: "serialNumber",
    },
    {
      title: "Inventar raqami",
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
              setValue("speed", item.speed);
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

  // -----------  Table end ------------------

  return (
    <>
      <Button onClick={showModal}>Mashina qo'shish</Button>
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
          <Controller
            control={control}
            name="speed"
            render={({ field }) => (
              <Input placeholder="Maksimal tezlik" {...field} />
            )}
          />
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
}

export default App;
