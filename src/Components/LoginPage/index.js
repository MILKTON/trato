import * as React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { Row } from "reactstrap";
import { Button } from "reactstrap";

const Login = () => {
  const history = useHistory();
  const { register, handleSubmit, formState, errors } = useForm({
    mode: "onChange"
  });

  const onSubmit = data => {
    history.push({
      pathname: "/",
      state: { name: data.name }
    });
  };

  const upperCase = value => {
    const ret = /.*[A-Z]+.*/.test(value);
    return ret;
  };

  const lowerCase = value => {
    const ret = /.*[a-z]+.*/.test(value);
    return ret;
  };

  const specialChar = value => {
    const ret = /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(value);
    return ret;
  };

  const sequence = value => {
    //const ret = false //Hay secuencia
    const ret = true; //No hay secuencia
    return ret;
  };

  return (
    <Row className="m-0 h-100">
      <div className="vertical-center mb-0">
        <form
          name="form"
          className="form-login"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className="text-center">Login</h2>
          <div className="form-content">
            <label>Username</label>
            <input
              className="mb-0"
              name="name"
              type="text"
              ref={register({
                required: "You must specify a username",
                maxLength: {
                  value: 20,
                  message: "Name must have max 20 characters"
                },
                minLength: {
                  value: 8,
                  message: "Name must have at least 8 characters"
                }
              })}
            />
            <small id="emailHelp" className="form-text text-muted">
              {errors.name && errors.name.type === "required" && (
                <span>This is required</span>
              )}
              {errors.name && errors.name.type === "maxLength" && (
                <span>Max length name exceeded</span>
              )}
              {errors.name && errors.name.type === "minLength" && (
                <span>Min length name exceeded</span>
              )}
            </small>
            <label>Password</label>
            <input
              name="password"
              id="password"
              type="password"
              className="mb-0"
              ref={register({
                required: "You must specify a password",
                minLength: {
                  value: 8,
                  message: "Password must have at least 8 characters"
                },
                maxLength: {
                  value: 20,
                  message: "Password must have max 20 characters"
                },
                validate: {
                  lowerCase,
                  upperCase,
                  specialChar,
                  sequence
                }
              })}
            />
            <small id="emailHelp" className="form-text text-muted">
              {errors.password && errors.password.type === "maxLength" && (
                <div className="error">longitud maxima alcanzada</div>
              )}
              {errors.password && errors.password.type === "upperCase" && (
                <div className="error">Mayuscula</div>
              )}
              {errors.password && errors.password.type === "lowerCase" && (
                <div className="error">Minuscula</div>
              )}
              {errors.password && errors.password.type === "specialChar" && (
                <div className="error">Caracter especial</div>
              )}
              {errors.password && errors.password.type === "sequence" && (
                <div className="error">Se detecto secuencia</div>
              )}
            </small>
            <Button
              color="primary"
              className="mt-4 mb-5"
              size="lg"
              block
              type="submit"
              disabled={!formState.isValid}
            >
              Enter
            </Button>{" "}
          </div>
        </form>
      </div>
    </Row>
  );
};

export default Login;
