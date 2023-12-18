import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuth from "../../components/hook/useAuth";

const PrivatesRoutes = () => {
  const { user } = useAuth();
  const { userId } = useParams();
  const navigate = useNavigate();

  const [id, setId] = useState(null);
  const [statusConvert, setStatusConvert] = useState(false);

  const shouldRenderChild = !id || user.id === id;

  useEffect(() => {
    let ID = +userId;
    setId(ID);
    setStatusConvert(true);
  }, [userId]);

  useEffect(() => {
    if (statusConvert) {
      if (!shouldRenderChild) {
        navigate("/login");
      }
    }
  }, [shouldRenderChild, navigate, statusConvert]);

  return shouldRenderChild ? <div></div> : null;
};

export default PrivatesRoutes;
