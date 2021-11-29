import React from 'react';
import Styled from 'styled-components';

const Container = Styled.div`
    height: 30px;
    background-color: teal;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    font-weight: 500;
`;

const Announcement = () => {
    return (
        <Container>
            Super Deal! Free Shipping on Orders Over &50
        </Container>
    )
}

export default Announcement
