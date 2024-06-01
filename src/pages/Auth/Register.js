import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import "../../styles/AuthStyle.css";

const Register = () => {

  const [ name, setName ] = useState("")
  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")
  const [ phone, setPhone ] = useState("")
  const [ address, setAddess ] = useState("")
  const [ answer, setAnswer ] = useState("")

  const navigate = useNavigate()
  /// 
  const handleSubmid = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/register", {
        name, email, password, phone, address, answer}
      );
      if(res && res.data.success) {
        toast.success(res.data && res.data.message)
        navigate('/login');
      }else{
        toast.error(res.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong")
    }
  }

  return (
    <Layout title="Register - Shop Pet">
      <div className="form-container">
      <img src="/images/banner5.png" alt="anh" style={{width: '100%'}} />
        <form onSubmit={handleSubmid}>
          <h4 className="title">Đăng ký tài khoản</h4>
          <div className="mb-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter your name"
              required
            />
          </div>
          
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter your phone"
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddess(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter your address"
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="What is your favorite pets?"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
