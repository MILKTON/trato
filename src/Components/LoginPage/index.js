import * as React from "react";
import { useForm } from "react-hook-form";

import "../../index.css";

const Login = () => {
  const { register, handleSubmit, formState, errors } = useForm({
    mode: "onChange"
  });

  const onSubmit = (data) => {
    console.log(formState);
  };

  const upperCase = (value) => {
    const ret = /.*[A-Z]+.*/.test(value);
    console.log("upperCase", value, ret);
    return ret;
  };

  const lowerCase = (value) => {
    const ret = /.*[a-z]+.*/.test(value);
    console.log("lowerCase", value, ret);
    return ret;
  };

  const specialChar = (value) => {
    const ret = /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(value);
    console.log("sin caracteres", value, ret);
    return ret;
  };

  const sequence = (value) => {
    //const ret = false //Hay secuencia
    const ret = true; //No hay secuencia

    return ret;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      <label>Username</label>
      <input
        name="name"
        type="text"
        ref={register({ 
            required: true, 
            maxLength: {
              value: 20,
              message: "Password must have max 20 characters"
            }, 
            minLength: {
              value: 8,
              message: "Password must have at least 8 characters"
            },
          })}
      />
      {errors.name && errors.name.type === "required" && <span>This is required</span>}
      {errors.name && errors.name.type === "maxLength" && <span>Max length exceeded</span> }
      {errors.name && errors.name.type === "minLength" && <span>Min length exceeded</span> }
      <label>Password</label>
      <input
        name="lastName"
        id="lastName"
        type="password"
        ref={register({
          required: "You must specify a password",
          minLength: {
            value: 8,
            message: "Password must have at least 8 characters"
          },
          validate: {
            lowerCase,
            upperCase,
            specialChar,
            sequence
          }
        })}
      />
      {errors.lastName && errors.lastName.type === "upperCase" && (
        <div className="error">Mayuscula</div>
      )}

      {errors.lastName && errors.lastName.type === "lowerCase" && (
        <div className="error">Minuscula</div>
      )}

      {errors.lastName && errors.lastName.type === "specialChar" && (
        <div className="error">Caracter especial</div>
      )}

      {errors.lastName && errors.lastName.type === "sequence" && (
        <div className="error">Se detecto secuencia</div>
      )}
      <input type="submit" disabled={!formState.isValid} />
    </form>
  );
};

export default Login;