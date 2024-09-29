import { useEffect, useState } from "react";
import { Button, Form, Input, Modal, Select, Space, Table } from "antd";
import { Axios } from "../lib/axios";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Categories } from "../components/Categories";
import { Selected } from "../components/Selected";
import { addCategory } from "../redux/slices/categorySlice";
import {
  ExportOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { setFilial } from "../redux/slices/machineSlice";

const Machines = () => {
  // -----------  Data start ------------------

  const [sewingMachines, setSewingMachines] = useState([]);

  const [deleteMacine, setDeleteMachine] = useState(null);
  const [editMacine, setEditMachine] = useState(null);
  const [transferMachine, setTransferMachine] = useState(null);

  // -----------  Data end ------------------

  // -----------  Redux start ------------------

  const filial = useSelector((state) => state.filial);

  console.log(filial);

  const category = useSelector((state) => state.category);

  const line = useSelector((state) => state.line);

  const search = useSelector((state) => state.search);

  // console.log("search: ", search);

  // -----------  Redux end ------------------

  // -----------  Localstorage start ------------------

  const location2 = localStorage.getItem("location");

  const role = localStorage.getItem("role");

  // -----------  Localstorage end ------------------

  // -----------  Table Page start ------------------

  const [page, setPage] = useState(1);

  const [paginationSize, setPaginationSize] = useState(10); //your current default pagination size 25

  // -----------  Table Page end ------------------

  // -----------  Modal start ------------------

  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  const showModal = () => {
    reset();
    setIsModalOpen(true);
  };

  async function getCategories() {
    const res = await Axios.get("/categories");
    for (let item of res.data) {
      dispatch(addCategory(item.category));
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  const handleCancel = () => {
    reset();
    setTransferMachine(null);
    setIsModalOpen(false);
    setEditMachine(null);
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

      if (!line.length) {
        url += ``;
      } else {
        for (let item of line) {
          url += `&line[]=${item}`;
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

      if (!line.length) {
        url += ``;
      } else {
        for (let i = 0; i < line.length; i++) {
          if (i === 0) {
            url += `?line[]=${line[i]}`;
          } else {
            url += `&line[]=${line[i]}`;
          }
        }
      }

      const res = await Axios.get(url);
      setSewingMachines(res.data);
    }
  }

  useEffect(() => {
    dispatch(
      setFilial(filial ? filial : location2 == "admin" ? "katqala" : location2)
    );
    getMacines();
  }, [location2, filial, category, line]);

  function onsubmit(data) {
    console.log(data);
    if (editMacine) {
      Axios.patch(`/sewing-machines/${editMacine}`, { ...data })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    } else if (transferMachine) {
      Axios.patch(`/sewing-machines/${transferMachine}`, {
        ...data,
        to: data.location,
        location: "transfer",
      })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    } else {
      Axios.post("/sewing-machines", { ...data, checked: false })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
    reset();
    handleCancel(false);
    setEditMachine(null);
    getMacines();
  }

  function onDeleteMachine() {
    Axios.delete(`sewing-machines/${deleteMacine}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    reset();
    setDeleteMachine(null);
    getMacines();
  }

  // function onTransferMachine(data) {
  //   Axios.patch(`sewing-machines/${transferMachine}`, { ...data })
  //     .then((res) => console.log(res))
  //     .then((err) => console.log(err));

  //   setTransferMachine(null);
  //   getMacines();
  //   console.log(transferMachine);
  // }

  // -----------  Axios end ------------------

  // -----------  Table start ------------------

  const columns = [
    {
      title: "№",
      render: (value, item, index) => (page - 1) * paginationSize + index + 1,
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
    // {
    //   title: "Filial",
    //   dataIndex: "location",
    // },
    {
      title: "Liniya",
      // dataIndex: "line",
      render: (item) =>
        item.line == 0
          ? "Xonada"
          : item.line == 17
          ? "Chetda"
          : `${item.line} - liniya`,
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
    role == "admin"
      ? {
          title: "Action",
          render: (item) => (
            <>
              <Button
                className="mx-1 rounded-full"
                type="primary"
                onClick={() => {
                  setTransferMachine(item.id);
                  setIsModalOpen(true);
                  setValue("location", item.location);
                  setValue("from", filial);
                  setValue("to", item.location);
                  console.log(item.location);
                }}
              >
                <ExportOutlined />
              </Button>
              <Button
                className="mx-1 rounded-full"
                type="primary"
                onClick={() => {
                  setEditMachine(item.id);
                  setIsModalOpen(true);
                  setValue("category", item.category);
                  setValue("company", item.company);
                  setValue("model", item.model);
                  setValue("location", item.location);
                  setValue("line", item.line);
                  setValue("serialNumber", item.serialNumber);
                  setValue("inventoryNumber", item.inventoryNumber);
                }}
              >
                <EditOutlined />
              </Button>

              <Button
                className="mx-1 rounded-full"
                type="primary"
                onClick={() => setDeleteMachine(item.id)}
              >
                <DeleteOutlined />
              </Button>
            </>
          ),
        }
      : {},
  ];

  // -----------  Table end ------------------

  // -----------  Modal Select start ------------------

  const [categoriesModal, setCategoriesModal] = useState([]);

  const [modelModal, setModelModal] = useState([]);

  const [filialModal, setFilialModal] = useState([]);

  const lineModal = [
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
    lineModal.push({
      value: i,
      label: `${i} - liniya`,
    });
  }

  async function getCategoriesModal() {
    const res = await Axios.get("/categories");
    setCategoriesModal(res.data);
  }

  async function getModelModal() {
    const res = await Axios.get("/model");
    setModelModal(res.data);
  }

  async function getFilialModal() {
    const res = await Axios.get("/filial");
    setFilialModal(res.data);
  }

  useEffect(() => {
    getCategoriesModal();
    getModelModal();
    getFilialModal();
  }, []);

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  // -----------  Modal Select end ------------------

  return (
    <>
      <div className=" flex items-center justify-between p-3">
        <Categories />
        <Selected />
        {role == "admin" ? (
          <Button className="rounded-full" type="primary" onClick={showModal}>
            <PlusCircleOutlined />
          </Button>
        ) : null}
      </div>
      {/*------------------- O'zgartirish modal --------------------- */}

      <Modal
        title={
          editMacine
            ? "Tahrirlash"
            : transferMachine
            ? `Jo'natish`
            : "Mashina qo'shish"
        }
        // reset
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form className="w-96" onFinish={handleSubmit(onsubmit)}>
          {transferMachine ? null : (
            <Controller
              control={control}
              name="category"
              render={({ field }) => (
                <Space className="flex flex-col items-start">
                  <Select
                    className="w-96"
                    placeholder="Nomini tanlang"
                    // defaultValue="odnosrochka"
                    onChange={handleChange}
                    options={categoriesModal.map((i) => ({
                      label: i.name,
                      value: i.category,
                    }))}
                    {...field}
                  />
                </Space>
              )}
            />
          )}

          {transferMachine ? null : (
            <Controller
              control={control}
              name="company"
              render={({ field }) => (
                <Space className="flex flex-col items-start">
                  <Select
                    className="w-96"
                    placeholder="Firmasini tanlang"
                    // defaultValue="Juki"
                    onChange={handleChange}
                    options={[
                      { value: "juki", label: "Juki" },
                      { value: "siruba", label: "Siruba" },
                      { value: "yamato", label: "Yamato" },
                    ]}
                    {...field}
                  />
                </Space>
              )}
            />
          )}

          {transferMachine ? null : (
            <Controller
              control={control}
              name="model"
              render={({ field }) => (
                <Space className="flex flex-col items-start">
                  <Select
                    className="w-96"
                    placeholder="Modelini tanlang"
                    // defaultValue="model"
                    onChange={handleChange}
                    options={modelModal.map((i) => ({
                      label: i.model,
                      value: i.model,
                    }))}
                    {...field}
                  />
                </Space>
              )}
            />
          )}

          <Controller
            control={control}
            name="location"
            render={({ field }) => (
              <Space className="flex flex-col items-start">
                <Select
                  className="w-96"
                  placeholder="Filialni tanlang"
                  // defaultValue="Shovot"
                  onChange={handleChange}
                  options={filialModal.map((i) => ({
                    label: i.name,
                    value: i.filial,
                  }))}
                  {...field}
                />
              </Space>
            )}
          />

          {transferMachine ? null : (
            <Controller
              control={control}
              name="line"
              render={({ field }) => (
                <Space className="flex flex-col items-start">
                  <Select
                    placeholder="Liniyani tanlang"
                    className="w-96"
                    // defaultValue="0"
                    onChange={handleChange}
                    // options={[...Array(18).keys()].map((i) => ({
                    //   label: `${i}-liniya`,
                    //   value: i,
                    // }))}
                    options={lineModal}
                    {...field}
                  />
                </Space>
              )}
            />
          )}

          {transferMachine ? null : (
            <Controller
              className="w-96"
              control={control}
              name="serialNumber"
              render={({ field }) => (
                <Input
                  className="w-96"
                  placeholder="Seria raqamini kiriting"
                  {...field}
                />
              )}
            />
          )}
          {transferMachine ? null : (
            <Controller
              control={control}
              name="inventoryNumber"
              render={({ field }) => (
                <Input
                  className="w-96"
                  placeholder="Inventar raqamini kiriting"
                  {...field}
                />
              )}
            />
          )}
          <Button htmlType="submit" type="primary">
            {editMacine
              ? "Tahrirlash"
              : transferMachine
              ? `Jo'natish`
              : "Mashina qo'shish"}
          </Button>
        </Form>
      </Modal>
      <Table
        pagination={{
          defaultPageSize: 10,
          pageSize: paginationSize,
          onChange: (page, pageSize) => {
            setPage(page);
            setPaginationSize(pageSize);
          },
          showSizeChanger: true,
        }}
        dataSource={sewingMachines
          .filter((item) => {
            return search === ""
              ? item
              : item.serialNumber.toLowerCase().includes(search) ||
                  item.inventoryNumber.toString().includes(search);
          })
          .map((item) => ({ ...item, key: item.id }))}
        columns={columns}
      />
      {/*------------------- O'chirish modal --------------------- */}
      {console.log(sewingMachines)}
      <Modal
        // className=""
        width={200}
        centered={true}
        open={deleteMacine}
        okText="Ha"
        cancelText="Yo'q"
        onOk={onDeleteMachine}
        onCancel={() => {
          setDeleteMachine(null);
        }}
      >
        O'chirilsinmi?
      </Modal>
      {/*------------------- Jo'natish modal --------------------- */}
      {/* <Modal
        title="Jo'natish"
        width={200}
        centered={true}
        open={transferMachine}
        okText="Jo'natish"
        cancelText="Bekor qilish"
        // onOk={onTransferMachine}
        onCancel={() => {
          setTransferMachine(null);
        }}
      >
        <Form className="w-96" onFinish={handleSubmit(onTransferMachine)}>
          <Controller
            control={control}
            name="location"
            render={({ field }) => (
              <Space className="flex flex-col items-start">
                <Select
                  className="w-96"
                  placeholder="Filialni tanlang"
                  // defaultValue="Shovot"
                  onChange={handleChange}
                  options={filialModal.map((i) => ({
                    label: i.name,
                    value: i.filial,
                  }))}
                  {...field}
                />
              </Space>
            )}
          />
        </Form>
      </Modal> */}
    </>
  );
};

export default Machines;
