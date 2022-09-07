import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { useContext, useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthContext";
import ToursDataService from "../../Services/tours";

const Register = () => {
  const [open, setOpen] = useState(true);
  const [credentials, setCredentials] = useState({
    email: undefined,
    username: undefined,
    password: undefined,
  });

  const { error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "REGISTER_START" });
    try {
      const res = await ToursDataService.register(credentials);
      dispatch({
        type: "REGISTER_SUCCESS",
        payload: [res.data.data.user, res.data.token],
      });
      navigate("/");
    } catch (err) {
      console.log(err);
      dispatch({ type: "REGISTER_FAILURE", payload: err });
    }
  };

  const onCloseModal = () => {
    setOpen(false);
    navigate("/");
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={onCloseModal}
        center
        classNames={{
          overlay: "customOverlay",
          modal: "customModal",
        }}
      >
        <div className="modal-body">
          <h3>Register</h3>
          <div className="mb-3 mt-4">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              className="form-control mt-2"
              id="email"
              placeholder="Enter email"
              name="email"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="username">Username</label>
            <input
              type="username"
              id="username"
              name="username"
              onChange={handleChange}
              className="form-control mt-2"
              placeholder="Enter username"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              className="form-control mt-2"
              placeholder="Enter password"
            />
          </div>

          <div className="d-grid">
            <button onClick={handleClick} className="btn btn-outline-dark m-3">
              Register
            </button>
            {error && <span>{error.response.data.error.message}</span>}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Register;
