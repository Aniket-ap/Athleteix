import React, { useState, useEffect } from "react";
import Jumbotron from "../../components/cards/Jumbotron";
import AdminMenu from "../../components/nav/AdminMenu";
import { useAuth } from "../../context/auth";
import axios from "axios";
import toast from "react-hot-toast";
import {useNavigate, useParams} from 'react-router-dom'
import { Select } from "antd";
const { Option } = Select;

const ProductUpdate = () => {
  const [auth, setAuth] = useAuth();
  const [categories, setCategories] = useState([]);
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCatgory] = useState("");
  const [shipping, setShipping] = useState("");
  const [quantity, setQuantity] = useState("");
  const [id, setId] = useState("");

  const navigate = useNavigate();
  const params = useParams()

  useEffect(() => {
    loadProducts()
  }, [])
  

  useEffect(() => {
    loadCategories();
  }, []);

  const loadProducts = async () => {
    try {
        const {data} = await axios.get(`/product/${params.slug}`)
        setName(data.name)
        setDescription(data.description)
        setPrice(data.price)
        setCatgory(data.category._id)
        setShipping(data.shipping)
        setQuantity(data.quantity)
        setId(data._id)
    } catch (error) {
        console.log(error)
    }  
  }

  const loadCategories = async () => {
    try {
      const { data } = await axios.get("/categories");
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (value) => {
    setCatgory(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      photo && productData.append('photo', photo);
      productData.append('name', name);
      productData.append('description', description);
      productData.append('price', price);
      productData.append('category', category);
      productData.append('shipping', shipping);
      productData.append('quantity', quantity);

      const {data} = await axios.put(`/product/${id}`, productData)
      if(data?.error){
        toast.error(data.error)
      } else{
        toast.success(`${data.name} is updated`)
        navigate('/dashboard/admin/products')
      }

    } catch (error) {
      console.log(error)
      toast.error("Product create failed, try again")
    }
  }

  const handleDelete = async () => {
    try {
        let answer = window.confirm("Are you sure you want to delete this product ?")
        if(!answer) return;
        const {data} = await axios.delete(`/product/${id}`);
        toast.success(`${data.name} is deleted`)
        navigate('/dashboard/admin/products')
    } catch (error) {
        console.log(error)
        toast.error('Delete failed, try again')
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
            <div className="p-3 mt-2 mb-2 h4 bg-light">Update Prdouct</div>

            {photo ? (
              <div className="text-center">
                <img
                  src={URL.createObjectURL(photo)}
                  alt="PrductPhoto"
                  className="img img-responsive"
                  height="200px"
                />
              </div>
            ): <div className="text-center">
                    <img
                  src={`${process.env.REACT_APP_API}/product/photo/${id}?${new Date().getTime()}`}
                  alt="PrductPhoto"
                  className="img img-responsive"
                  height="200px"
                />
                </div>}

            <div className="pt-2">
              <label className="btn btn-outline-secondary col-12 mb-3">
                {photo ? photo.name : "Upload photo"}
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  hidden
                />
              </label>
            </div>

            <input
              type="text"
              className="form-control mb-3"
              placeholder="Write a name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <textarea
              type="text"
              className="form-control mb-3"
              placeholder="Write a description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              type="number"
              className="form-control mb-3"
              placeholder="Enter Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <Select
              size="large"
              className="w-100 mb-3"
              placeholder="Choose category"
              onChange={onChange}
              value={category}
            >
              {categories?.map((category) => (
                <Option key={category._id} value={category._id}>
                  {category.name}
                </Option>
              ))}
            </Select>

            
            <Select
              size="large"
              className="w-100 mb-3"
              placeholder="Choose Shipping"
              onChange={value => setShipping(value)}
              value={shipping ? "Yes" : "N0"}
            >
              <Option value="0">No</Option>
              <Option value="1">Yes</Option>
            </Select>

            <input
              type="number"
              className="form-control mb-3"
              min="1"
              placeholder="Enter quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />

            <div className="d-flex justify-content-between">

            <button className="btn btn-primary mb-5" onClick={handleSubmit} >Update</button>
            <button className="btn btn-danger mb-5" onClick={handleDelete} >Delete</button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default ProductUpdate;
