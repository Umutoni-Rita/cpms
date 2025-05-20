// src/pages/Register.js
import parkingPicture from "../assets/cuate.svg";
import RegisterForm from "../components/RegisterForm";

const Register = () => {
  return (
    <div className="flex flex-col md:flex-row justify-around items-center min-h-screen bg-gray-100 p-5">
      <div className="hidden lg:block md:w-1/2 max-w-md">
        <img
          src={parkingPicture}
          alt="Illustration of a lady paying for parking"
          className="w-full"
        />
      </div>
      <RegisterForm />
    </div>
  );
};

export default Register;
