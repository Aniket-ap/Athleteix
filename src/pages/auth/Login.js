import React, {useState} from 'react'
import toast from 'react-hot-toast';
import axios from 'axios';
import Jumbotron from '../../components/cards/Jumbotron'
import { useAuth } from '../../context/auth';
import {useNavigate, useLocation} from "react-router-dom"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false)
  // custom hook
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate()
  const location = useLocation()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const {data} = await axios.post(`/login`, { email, password});
      if(data?.error){
        toast.error(data.error);
        setLoading(false)
      } else{
        localStorage.setItem('auth', JSON.stringify(data))
        setAuth({...auth, token: data.token, user: data.user})
        toast.success("Login Successful");
        setLoading(false)
        navigate(location.state || `/dashboard/${data?.user?.roll === 1 ? "admin" : "user"}`)
      }
    } catch (error) {
      console.log(error);
      toast.error("Login faild, Try again.")
      setLoading(false);
    }
  };

  return (
    <div>
      <Jumbotron title="Login" />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                className="form-control mb-4 p-2"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                className="form-control mb-4 p-2"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="btn btn-primary" type="submit" disabled={loading}>
                {loading ? "Please wait..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login