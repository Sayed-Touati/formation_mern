import {Button, Form, Input, message} from "antd";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { AuthContext } from "../contexts/AuthContext";

function Login() {
    const {setToken} = useContext(AuthContext);
    const navigate = useNavigate();

    async function onFinish(values) {
        try {
            const response = await axios.post('http://localhost:3000/auth/login', values);

            setToken(response.data.token);
            message.success(response.data.message);

            navigate("/");
        } catch (error) {
            message.error(error.response.data.message);
        }
    };
    return (
        <div>
            <Form 
                onFinish={onFinish}
            >
                <Form.Item
                    label='Email'
                    name='email'
                    rules={[
                        {required: true, message: "Email required"}
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label='Password'
                    name='password'
                    rules={[
                        {required: true, message: "Password required"}
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Button type="primary" htmlType="submit">
                    Login
                </Button>
            </Form>
        </div>
    )
}

export default Login;