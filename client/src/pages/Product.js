import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Add, Remove } from "@material-ui/icons";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { mobile } from '../responsive';
import { useLocation } from 'react-router-dom';
import { publicRequest } from '../requestMethod';

const Container = styled.div``;

const Wrapper = styled.div`
    padding: 50px;
    display: flex;
    ${mobile({ padding: "10px", flexDirection:"column" })}
`;

const ImgContainer = styled.div`
    flex: 1;
`;

const Image = styled.img`
    width: 100%;
    height: 90vh;
    object-fit: cover;
    ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
    flex: 1;
    padding: 0 50px;
    ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
    font-weight: 200;
`;

const Desc = styled.p`
    margin: 20px 0;
`;

const Price = styled.span`
    font-weight: 100;
    font-size: 40px;
`;

const FilterContainer = styled.div`
    width: 50%;
    margin: 30px 0;
    display: flex;
    justify-content: space-between;
    ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
    display: flex;
    align-items: center;
`;

const FilterTitle = styled.span`
    font-size: 20px;
    font-weight: 200;
`;

const FilterColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${props => props.color};
    margin: 0 5px;
    cursor: pointer;
`;

const FilterSize = styled.select`
    margin-left: 10px;
    padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
    display: flex;
    font-weight: 700;
    align-items: center;
    cursor: pointer;
`;

const Amount = styled.span`
    width: 30px;
    height: 30px;
    border-radius: 10px;
    border: 1px solid teal;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 5px;
`;

const Button = styled.button`
    padding: 15px;
    border: 2px solid teal;
    background-color: #fff;
    cursor: pointer;
    font-weight: 500;

    &:hover {
        background-color: #f8f4f4;
    }
`;

const Product = () => {

    const location = useLocation();
    const id = location.pathname.split("/")[2];

    const [products, setProducts] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [color, setColor] = useState("");
    const [size, setSize] = useState("");   

    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await publicRequest.get("/products/find/" + id);
                setProducts(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        getProduct();
    }, [id]);

    const handleQuantity = (quan) => {
        if (quan === "dec") {
            setQuantity(quantity <= 1 ? quantity : quantity - 1);
        } else if (quan === "inc") {
            setQuantity(quantity  + 1);
        }
    }

    return (
        <Container>
            <Navbar />
            <Announcement />
            <Wrapper>
                <ImgContainer>
                    <Image src={products.img} />
                </ImgContainer>
                <InfoContainer>
                    <Title>{products.title}</Title>
                    <Desc>
                        {products.desc}
                    </Desc>
                    <Price>{products.price} đ</Price>
                    <FilterContainer>
                        <Filter>
                            <FilterTitle>Color</FilterTitle>
                            {
                                products.color?.map(item => (
                                    <FilterColor 
                                        color={item} 
                                        key={item} 
                                        onClick={() => setColor(item)}
                                    />
                                ))
                            }
                        </Filter>
                        <Filter>
                            <FilterTitle>Size</FilterTitle>
                            <FilterSize onChange={(e) => setSize(e.target.value)}>
                                { 
                                    products.size?.map(item => 
                                        <FilterSizeOption key={item}>{item}</FilterSizeOption>
                                    )
                                }
                            </FilterSize>
                        </Filter>
                    </FilterContainer>
                    <AddContainer>
                        <AmountContainer>
                            <Remove onClick={() => handleQuantity("dec")} />
                            <Amount>{quantity}</Amount>
                            <Add onClick={() => handleQuantity("inc")} />
                        </AmountContainer>
                        <Button>ADD TO CART</Button>
                    </AddContainer>
                </InfoContainer>
            </Wrapper>
            <Newsletter />
            <Footer />
        </Container>
    )
}

export default Product
