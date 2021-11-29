import React from 'react';
import Styled from 'styled-components';
import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";

const Container = Styled.div`
    height: 60px;
`;

const Wrapper = Styled.div`
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Left = Styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`;

const Language = Styled.span`
    font-size: 14px;
    cursor: pointer;
`;

const SearchContainer = Styled.div`
    border: 0.5px solid lightgray;
    display: flex;
    align-items: center;
    margin-left: 25px;
    padding: 5px;
`;

const Input = Styled.input`
    border: none;
`;

const Center = Styled.div`
    flex: 1;
    text-align: center;
`;

const Logo = Styled.h1`
    font-weight: bold;
`;

const Right = Styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;

const MenuItem = Styled.div`
    font-size: 14px;
    cursor: pointer;
    margin-left: 25px;
`;

const Navbar = () => {
    return (
        <Container >
            <Wrapper>
                <Left>
                    <Language>EN</Language>
                    <SearchContainer>
                        <Input placeholder="Search" />
                        <Search style={{ color: "gray", fontSize: 16 }} />
                    </SearchContainer>
                </Left>
                <Center>
                    <Logo>ANTRAN.</Logo>
                </Center>
                <Right>
                    <MenuItem>REGISTER</MenuItem>
                    <MenuItem>LOGIN</MenuItem>
                    <MenuItem>
                        <Badge badgeContent={4} color="primary">
                            <ShoppingCartOutlined />
                        </Badge>
                    </MenuItem>
                </Right>
            </Wrapper>
        </Container>
    )
}

export default Navbar
