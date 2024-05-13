import { useDispatch } from "react-redux";
import { logout } from "../../actions/Login";
import { Button } from "@mui/material";
import { postLogout } from "../../services/AuthServices"
import { useNavigate } from "react-router-dom";

function Logout() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogout = () => {
        const Logout = async () => {
            const result = await postLogout();
            if (result.status === 200) {
                dispatch(logout());
                navigate("/");
            } else {
                console.error(result);
            }
        }
        Logout();
    };

    return (
        <Button color="inherit" onClick={handleLogout}>Log out</Button>
    );
}

export default Logout;