import React from 'react';
import { Container, Badge, Alert } from 'react-bootstrap';

const Usermanual = () => {
    return (
        <Container className='mt-5'>
        <h2>
            <Badge bg="secondary">4.</Badge> Felhasználói bemutatás
        </h2>
        <hr></hr>
        <Alert variant='info'>
            <Alert.Heading as='h5'>Info</Alert.Heading>
        Ebben a részben a tanulmányozott webes felületek kerülnek tárgyalásra,
        mivel itt a felhasználók célcsoporja rendszermérnökök, DevOps mérnökök, így ilyen minőségben taglaljuk őket.
        
        </Alert>
        <h3>Kibana</h3>
        <p>...</p>
        <h3>Graylog</h3>
        <p>...</p>
    </Container>
    )
}
export default Usermanual