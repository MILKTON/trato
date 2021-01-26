import React, {useContext} from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { Row } from "reactstrap";
import { Button } from "reactstrap";
import { UserContext } from "../../userContext";

const Login = () => {
  const history = useHistory();
  const { setUser } = useContext(UserContext);
  const { register, handleSubmit, formState, errors } = useForm({
    mode: "onChange"
  });

  const onSubmit = data => {
    history.push({
      pathname: "/",
    });
    setUser(data.name)
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

  const sequence = s => {
    for(let i in s) {
      if (+s[+i+1] === +s[i]+1 && +s[+i+2] === +s[i]+2) return false;
    }
    for(let j in s){
      if (String.fromCharCode(s.charCodeAt(j)+1) === s[+j+1] && String.fromCharCode(s.charCodeAt(j)+2) === s[+j+2]) return false;
    }
    return true;
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
                  message: "Password must have max 20 characters"
                },
                minLength: {
                  value: 8,
                  message: "Username shall have a minimum length of 8 characters"
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
                <div className="error">Password must contain at least one uppercase</div>
              )}
              {errors.password && errors.password.type === "lowerCase" && (
                <div className="error">Password must contain at least one lowercase</div>
              )}
              {errors.password && errors.password.type === "specialChar" && (
                <div className="error">Password must contain at least one special char</div>
              )}
              {errors.password && errors.password.type === "sequence" && (
                <div className="error">Char sequence detected</div>
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
