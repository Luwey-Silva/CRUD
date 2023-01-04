import React from "react";
import axios from "axios";
import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import reportPDF from "../Reports/Relatorio/report";

const Table = styled.table`
  width: 100%;
  background-color: #fff;
  padding: 40px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  max-width: 800px;
  margin: 20px auto;
  word-break: break-all;  
  font-size: 14px;
`;

export const Thead = styled.thead``;

export const Tbody = styled.tbody``;

export const Tr = styled.tr``;

export const Th = styled.th`
  text-align: start;
  border-bottom: inset;
  padding-bottom: 5px;

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

export const Td = styled.td`
  padding-top: 15px;
  text-align: ${(props) => (props.alignCenter ? "center" : "start")};
  width: ${(props) => (props.width ? props.width : "auto")};

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: rgb(255, 0, 0);
  color: white;
  height: 42px;
`;

const Grid = ({ users, setUsers, setOnEdit }) => {
    const handleEdit = (item) => {
      setOnEdit(item);
    };

const handleDelete = async (id) => {
    await axios
      .delete("http://localhost:8800/" + id)
      .then(({ data }) => {
        const newArray = users.filter((user) => user.id !== id);

        setUsers(newArray);
        toast.success(data);
      })
      .catch(({ data }) => toast.error(data));

    setOnEdit(null);
  };

  return (<>
    <Table>
      <Thead>
        <Tr>
          <Th>Dia de Semana</Th>
          <Th>Tempo</Th>
          <Th>Descrição</Th>
          <Th>Data</Th>                  
        </Tr>
      </Thead>   
      <Tbody>
        {users.map((item, i) => (
          <Tr key={i}>
            <Td width="30%">{item.dia}</Td>
            <Td width="30%">{item.tempo}</Td>
            <Td width="30%">{item.descricao}</Td>
            <Td width="30%">{item.data}</Td>           
            
            <Td alignCenter width="10%">
              <FaEdit onClick={() => handleEdit(item)}/>
            </Td>
            <Td alignCenter width="10%">
              <FaTrash onClick={() => handleDelete(item.id)}/>
            </Td>
          </Tr>
        ))}
      </Tbody>   
    </Table>
    <Button onClick={(e) => reportPDF(users)} type="button">Converter PDF</Button>
    </>
  );
};

export default Grid;
