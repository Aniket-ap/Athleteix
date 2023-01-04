import React, { useState, useEffect } from "react";
import Jumbotron from "../../components/cards/Jumbotron";
import AdminMenu from "../../components/nav/AdminMenu";
import { useAuth } from "../../context/auth";
import axios from "axios";
import toast from "react-hot-toast";
import CategoryForm from "../../components/forms/CategoryForm";
import {Modal} from "antd"

const AdminCategory = () => {
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected ]= useState(null)
  const [UpdatingName, setUpdatingName] = useState("");



  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const { data } = await axios.get("/categories");
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/category", { name });
      if (data?.error) {
        toast.error(data.error);
      } else {
        loadCategories()
        setName("");
        toast.success(`${data?.name} is created.`);
      }
    } catch (err) {
      console.log(err);
      toast.error("Create category failed, Try again");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      const {data} = await axios.put(`/category/${selected._id}`, {name: UpdatingName})
      if(data?.error){
        toast.error(data.error)
      } else{
        toast.success(`${data.name} is updated`)
        setSelected(null)
        setUpdatingName("")
        loadCategories()
        setIsModalOpen(false);
      }
    } catch (error) {
      console.log(error)
      toast.error("Category may already exist")
    }
  }

  const handleDelete = async (e) => {
    e.preventDefault()
    try {
      const {data} = await axios.delete(`/category/${selected._id}`)
      if(data?.error){
        toast.error(data.error)
      } else{
        toast.success(`${data.name} is deleted`)
        setSelected(null)
        loadCategories()
        setIsModalOpen(false);
      }
    } catch (error) {
      console.log(error)
      toast.error("Category may already exist")
    }
  }

  return (
    <>
      <Jumbotron
        title={`Hello ${auth?.user?.name}`}
        subtitle="Admin Dashboard"
      />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="p-3 mt-2 mb-2 h4 bg-light">Manage Categories</div>

            <CategoryForm value={name} setValue = {setName} handleSubmit = {handleSubmit}  />

            <hr />
            <div className="col">
              {categories?.map((category) => (
                  <button key={category._id} className="btn btn-outline-primary m-3" onClick={() => {
                    showModal();
                    setSelected(category);
                    setUpdatingName(category.name)
                  }}>
                    {category.name}
                  </button>
              ))}
            </div>

                  <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null} >
                    <CategoryForm value={UpdatingName} setValue = {setUpdatingName} handleSubmit = {handleUpdate} buttonText="Update" handleDelete={handleDelete} />
                  </Modal>

          </div>
        </div>
      </div>
    </>
  );
};

export default AdminCategory;
