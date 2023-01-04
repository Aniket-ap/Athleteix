import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { NavLink } from "react-router-dom";
import Jumbotron from "../../components/cards/Jumbotron";
import UserMenu from "../../components/nav/UserMenu";
import { useAuth } from "../../context/auth";

const Profile = () => {
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if(auth?.user){
      const {name, email, address} = auth.user;
      setAddress(address)
      setEmail(email)
      setName(name)
    }
  }, [auth?.user])

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true)
      const {data} = await axios.put(`/profile`, {name, password, address})
      if(data.error) {
        toast.error(data.error);
        setLoading(false)
      } else{
        setAuth({...auth, user: data})
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated")
        setLoading(false)
      }

    } catch (error) {
      console.log(error)
      setLoading(false)
    }

  }

  return (
    <>
      <Jumbotron title={`Hello ${auth?.user?.name}`} subtitle="Dashboard" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="p-3 mt-2 mb-2 h4 bg-light">Profile</div>

              <form onSubmit={handleSubmit}>
                  <input type="text" className="form-control mb-3" placeholder="Enter your name" value={name} onChange={e => setName(e.target.value)} autoFocus/>
                  <input type="email" className="form-control mb-3" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} disabled />
                  <input type="password" className="form-control mb-3" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)}/>
                  <textarea className="form-control mb-3" placeholder="Enter your address" value={address} onChange={e => setAddress(e.target.value)} />
                  <button type="submit" className="btn btn-primary" disabled={loading} >{loading ? "Please wait" : "Submit"}</button>
              </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
