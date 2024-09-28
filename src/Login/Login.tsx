import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import login from "../Assests/login.jpg";
import { Form, Button, Col, Row, InputGroup } from 'react-bootstrap';
import eyeicon from "../Assests/view.png"; 
import password from "../Assests/person.png"; 
import padlock from "../Assests/padlock.png"; 
import mconnect from "../Assests/mconnect.png";
import classes from "./Login.module.css"
import { login1 } from "../axios/Services"; 
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import sha1 from 'sha1'; 
import { handleLogin } from "../redux/reducers/Authreducer"; 
import { message } from 'antd';

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const initialValues = {
    organizationCode: '',
    userName: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    organizationCode: Yup.string().required('Organization code is required'),
    userName: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = (values: typeof initialValues) => {
    const formData = new FormData();
    formData.append("userName" , values.userName);
    formData.append("password", values.password);
    
    formData.append("device_type", "3");
    formData.append(
      "authcode",
      sha1("A0322A@B&H@R!!akLLo012VSzXycAA1" + values.userName)
    );

    login1(formData)
    .then((response) => {
      dispatch(handleLogin(response.data.token));
      localStorage.setItem("userdata", response.data.token);
      message.success(response.data.msg);
      navigate("/dash");
    })
    .catch((error) => {
      console.error("Login error:", error.response || error.message);
    });}

  return (
    <Row className="login-container">
      <Col md={6} className="d-flex align-items-center justify-content-center bg-left">
        <img 
          src={login}
          alt="Login Illustration" 
          className="login-image" 
        />
      </Col>
  
      {/* Right Column with Login Form */}    
      <Col md={6} className="d-flex flex-column justify-content-start p-4 bg-white">
        <div className="text-center mb-4">
          <img src={mconnect} alt="Logo" />
          <h4 className={classes.login}>Login</h4>
        </div>
  
        {/* Centered Form with Formik */}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <Form onSubmit={handleSubmit} className="d-flex flex-column align-items-center">
              <Form.Group controlId="organizationCode" className={classes.organ}>
                <Form.Label className="form-label"><h6> Organization Code</h6></Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Enter organization code" 
                  className="form-control" 
                  name="organizationCode" 
                  onChange={handleChange} 
                  onBlur={handleBlur} 
                  value={values.organizationCode} 
                  isInvalid={touched.organizationCode && !!errors.organizationCode}
                />
                <Form.Control.Feedback type="invalid">{errors.organizationCode}</Form.Control.Feedback>
              </Form.Group>
  
              <Form.Group controlId="username" className={classes.username}>
  <Form.Label className="form-label"><h6> Username</h6></Form.Label>
  <InputGroup>
    <InputGroup.Text className="input-icon">
      <img src={password} alt="Username Icon" style={{ width: '20px', height: '20px' }} />
    </InputGroup.Text>
    <Form.Control
      type="text"
      placeholder="Enter an Username"
      className="form-control"
      name="userName"
      onChange={handleChange}
      onBlur={handleBlur}
      value={values.userName}
      isInvalid={touched.userName && !!errors.userName}
    />
    <Form.Control.Feedback type="invalid">{errors.userName}</Form.Control.Feedback>
  </InputGroup>
</Form.Group>

<Form.Group controlId="password" className={classes.password}>
  <Form.Label className="form-label"><h6> Password</h6></Form.Label>
  <InputGroup>
    <InputGroup.Text className="input-icon">
      <img src={padlock} alt="Password Icon" style={{ width: '20px', height: '20px' }} />
    </InputGroup.Text>
    <Form.Control
      type={showPassword ? "text" : "password"}
      placeholder="Enter password"
      className="form-control"
      name="password"
      onChange={handleChange}
      onBlur={handleBlur}
      value={values.password}
      isInvalid={touched.password && !!errors.password}
    />
    <InputGroup.Text onClick={togglePasswordVisibility} className="input-icon">
      <img src={eyeicon} alt="Toggle Password Visibility" style={{ width: '20px', height: '20px' }} />
    </InputGroup.Text>
    <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
  </InputGroup>
</Form.Group>

              <a href="#" className={classes.Forget}>Forget Password</a>
  
              <Button 
                type="submit" 
                className=" login-button w-50 mt-3" style={{backgroundColor:" #009d94"}} >
                  
                Login
              </Button>
            </Form>
          )}
        </Formik>
  
      
        <div className="text-center mt-3">
          <h6>Don't have an account? <a href="#" className="text-decoration-none">Sign up</a></h6>
        </div>
      </Col>
    </Row>
  );
};

export default Login;




