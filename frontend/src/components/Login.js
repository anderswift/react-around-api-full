import { useState } from 'react';
import { Link } from 'react-router-dom';

import FormField from './FormField';



function Login({handleLogin, isLoading}) {

  const [values, setValues]= useState({ email: '', password: '' });
  const [errors, setErrors]= useState({});
  const [submitReady, setSubmitReady]= useState(false);



  function handleChange(e) {
    const name= e.target.name.split('-').pop();
    setValues({...values, [name]: e.target.value });
    
    if(e.target.validity.valid) {
      const updatedErrors= {...errors, [name]: '' };
      setErrors(updatedErrors);
      const errorValues= Object.values(updatedErrors);
      if(errorValues.length === 2) setSubmitReady(!errorValues.some(i => i)); // enable submit if both fields checked and no error messages
    } else {
      setErrors({...errors, [name]: e.target.validationMessage });
      setSubmitReady(false);
    }
  } 

  function handleSubmit(e) {
    e.preventDefault();
    handleLogin(values)
      .catch(() => {
        setValues({...values, password: '' });
        setSubmitReady(false);
      });
  }



  return (
    <form name="login-form" className="form" onSubmit={handleSubmit}>
        
      <h3 className="form__heading">Log in</h3>

      <FormField name="login-email" label="Email" handleChange={handleChange} 
        value={values.email} error={errors.email} />

      <FormField name="login-password" type="password" label="Password" handleChange={handleChange} 
        value={values.password} error={errors.password} />
      
      <button type="submit" className={`form__button${submitReady ? '' : ' form__button_disabled'}`} name="login-submit">
        {isLoading ? 'Loading...' : 'Log in'}
      </button>
      <Link to="/signup" className="form__text link">Not a member yet? Sign up here!</Link>

    </form>
  );
  
}

export default Login;
