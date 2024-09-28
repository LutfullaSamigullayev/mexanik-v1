import { useEffect, useState } from "react";
import { Axios } from "../lib/axios";
import { Button, Modal, Table } from "antd";

const Transfer = () => {
  // -----------  Data start ------------------

  const [tranferMachines, setTransferMachines] = useState([]);

  const [machineAdd, setMachineAdd] = useState(null);

  const [machineCancel, setMachineCancel] = useState(null);

  const [from, setFrom] = useState(null);

  const [location, setLocation] = useState(null);

  const [to, setTo] = useState(null);

  // -----------  Data end ------------------

  // -----------  Localstorage start ------------------

  const location2 = localStorage.getItem("location");

  const role = localStorage.getItem("role");

  // -----------  Localstorage end ------------------

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

  function onTransferMachine() {
    // console.log("data: ", data.id);
    Axios.patch(`sewing-machines/${machineAdd}`, { location: to, line: 0 })
      .then((res) => console.log(res))
      .then((err) => console.log(err));
    setMachineAdd(null);
    getTransferMachines();
  }
  function onCancelMachine() {
    Axios.patch(`sewing-machines/${machineCancel}`, { location: from, line: 0 })
      .then((res) => console.log(res))
      .then((err) => console.log(err));

    setMachineCancel(null);
    getTransferMachines();
  }

  // -----------  Axios end ------------------
  //   console.log()

  useEffect(() => {
    console.log(machineAdd);
    console.log(machineCancel);
    console.log("from: ", from, "location: ", location, "to: ", to);
    getTransferMachines();
  }, [machineAdd, machineCancel]);

  // -----------  Table start ------------------

  const columns = [
    {
      title: "№",
      render: (value, item, index) => index + 1,
    },
    {
      title: "Nomi",
      dataIndex: "category",
    },
    {
      title: "Firma",
      dataIndex: "company",
    },
    {
      title: "Modeli",
      dataIndex: "model",
    },
    {
      title: "Qayerdan",
      dataIndex: "from",
    },
    {
      title: "Qayerga",
      dataIndex: "to",
    },
    {
      title: "Seria raqami",
      dataIndex: "serialNumber",
    },
    {
      title: "Inv №",
      // render: (item) => `${String(item.inventory - number).padStart(8, "0")}`,
      dataIndex: "inventoryNumber",
    },
    {
      title: "Action",
      render: (item) => (
        <>
          <Button
            type="primary"
            onClick={() => {
              setMachineAdd(item.id);
              setFrom(item.from);
              setLocation(item.location);
              setTo(item.to);
            }}
          >
            Qabul qilish
          </Button>
          <Button
            type="primary"
            onClick={() => {
              setMachineCancel(item.id);
              setFrom(item.from);
              setLocation(item.location);
              setTo(item.to);
            }}
          >
            Bekor qilish
          </Button>
        </>
      ),
    },
  ];

  // -----------  Table end ------------------

  return (
    <>
      <Modal
        // className=""
        width={200}
        centered={true}
        open={machineAdd || machineCancel}
        okText="Ha"
        cancelText="Yo'q"
        onOk={
          machineAdd
            ? onTransferMachine
            : machineCancel
            ? onCancelMachine
            : null
        }
        onCancel={() => {
          setMachineAdd(null);
          setMachineCancel(null);
          setFrom(null);
          setLocation(null);
          setTo(null);
        }}
      >
        {machineAdd ? "Qabul qilish" : machineCancel ? "Bekor qilish" : null}
      </Modal>
      <Table
        columns={columns}
        dataSource={tranferMachines.map((item) => ({ ...item, key: item.id }))}
      />
      ;
    </>
  );
};

export default Transfer;
