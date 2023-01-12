import GlobalStyle from "./styles/global";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Form from "./components/Form.js";
import Grid from "./components/Grid";
import axios from "axios";
import { domain } from "./domain";

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h1``;
const Title1 = styled.h3``;

function App() {
  const [users, setUsers] = useState([]);  
  const [onEdit, setOnEdit] = useState(null);

  const getUsers = async () => {
    try {
      const res = await axios.get(`http://${domain}:8800`);
      setUsers(res.data.sort((a, b) => (a.dia > b.dia ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, [setUsers]);

  return (
    <>
      <Container>
      <Title>Xreports</Title>
      <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers}/>
      <Title1>Berichte</Title1>
      <Grid setOnEdit={setOnEdit} users={users} setUsers={setUsers}  />
      </Container>
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
      <GlobalStyle />
    </>
  );
}

export default App;
