
import { useNavigate } from "react-router-dom"; // Import useNavigate

import MessageCenter from "../components/MessageCenter";

export const WelcomePage = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  // Handle button click to navigate
  const handleLoginClick = () => {
    navigate('/app'); // Navigate to the desired path
  };

  //RETURN
  return (
    <MessageCenter />
  );
};
