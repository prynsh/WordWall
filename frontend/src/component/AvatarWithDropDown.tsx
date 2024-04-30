
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

export const AvatarWithDropDown=()=>{
    const navigate = useNavigate();

return  <Button onClick={()=>{
    localStorage.clear();   
    navigate("/signup");
}} danger>Sign Out</Button>
}