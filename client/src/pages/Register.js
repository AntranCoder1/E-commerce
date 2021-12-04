import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { mobile } from '../responsive';
import { useHistory } from 'react-router-dom';
import { publicRequest } from '../requestMethod';

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(
        rgba(255, 255, 255, 0.5),
        rgba(255, 255, 255, 0.5)
        ),
        url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
        center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Wrapper = styled.div`
    width: 40%;
    padding: 20px;
    background-color: white;
    ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
`;

const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
`;

const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 20px 10px 0 0;
    padding: 10px;
`;

const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    background-color: teal;
    color: #fff;
    cursor: pointer;
    margin-bottom: 10px;
`;

const Agreement = styled.span`
    font-size: 12px;
     margin: 20px 0px;
`;

const Register = () => {

    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const history = useHistory();

    const nameRef = useRef();
    const lastNameRef = useRef();
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    const handleClick = async (e) => {
        e.preventDefault();
        setName(nameRef.current.value);
        setLastName(lastNameRef.current.value);
        setUserName(usernameRef.current.value);
        setEmail(emailRef.current.value);
        setPassword(passwordRef.current.value);
        setConfirmPassword(confirmPasswordRef.current.value);
        try {
            await publicRequest.post("/auth/register", { name, lastName, username, email, password, confirmPassword });
            history.push("/login")
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Container>
            <Wrapper>
                <Title>CREATE AN ACCOUNT</Title>
                <Form>
                    <Input 
                        placeholder="name"
                        ref={nameRef}
                    />
                    <Input 
                        placeholder="last name" 
                        ref={lastNameRef}
                    />
                    <Input 
                        placeholder="username" 
                        ref={usernameRef}
                    />
                    <Input 
                        placeholder="email" 
                        ref={emailRef}
                    />
                    <Input 
                        placeholder="password" 
                        ref={passwordRef}
                    />
                    <Input 
                        placeholder="confirm password" 
                        ref={confirmPasswordRef}
                    />
                    <Agreement>
                        By creating an account, I consent to the processing of my personal
                        data in accordance with the <b>PRIVACY POLICY</b>
                    </Agreement>
                    <Button onClick={handleClick}>CREATE</Button>
                </Form>
            </Wrapper>
        </Container>
    )
}

export default Register
