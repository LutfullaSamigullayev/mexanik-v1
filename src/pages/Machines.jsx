import { useEffect, useState } from "react";
import { Button, Form, Input, Modal, Select, Space, Table } from "antd";
import { Axios } from "../lib/axios";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Categories } from "../components/Categories";
import { Selected } from "../components/Selected";
import { addCategory } from "../redux/slices/categorySlice";

const Machines = () => {
  // -----------  Data start ------------------

  const [sewingMachines, setSewingMachines] = useState([]);

  const [deleteMacine, setDeleteMacine] = useState(null);
  const [editMacine, setEditMacine] = useState(null);

  // -----------  Data end ------------------

  // -----------  Redux start ------------------

  const filial = useSelector((state) => state.filial);

  const category = useSelector((state) => state.category);

  const line = useSelector((state) => state.line);

  // -----------  Redux end ------------------

  // -----------  Table Page start ------------------

  const [page, setPage] = useState(1);

  const [paginationSize, setPaginationSize] = useState(10); //your current default pagination size 25

  // -----------  Table Page end ------------------

  // -----------  Modal start ------------------

  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  const showModal = () => {
    setIsModalOpen(true);
    reset();
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

      const res = await Axios.get();
      setSewingMachines(res.data);
    }
  }

  useEffect(() => {
    getMacines();
  }, [filial, category, line]);

  function onsubmit(data) {
    console.log(data);
    if (editMacine) {
      Axios.patch(`/sewing-machines/${editMacine}`, { ...data })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    } else {
      Axios.post("/sewing-machines", { ...data, checked: false })
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
              setValue("category", item.category);
              setValue("company", item.company);
              setValue("model", item.model);
              setValue("needles", item.needles);
              setValue("line", item.line);
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

  // -----------  Modal Select start ------------------

  const [categoriesModal, setCategoriesModal] = useState([]);

  const [modelModal, setModelModal] = useState([]);

  const [filialModal, setFilialModal] = useState([]);

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
        <Form className="w-96" onFinish={handleSubmit(onsubmit)}>
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
                  options={[...Array(18).keys()].map((i) => ({
                    label: `line-${i}`,
                    value: i,
                  }))}
                  {...field}
                />
              </Space>
            )}
          />

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
          <Button htmlType="submit" type="primary">
            Qo'shish
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
        dataSource={sewingMachines}
        columns={columns}
      />
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
