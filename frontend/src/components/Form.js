import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  margin-button: 20px;  
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: rgb(255, 0, 0);
  color: white;
  height: 42px;
`;

const Form = ({ getUsers, onEdit, setOnEdit }) => {   
    const ref = useRef();

    useEffect(() => {
      if (onEdit) {
        const user = ref.current;
   
        user.dia.value = onEdit.dia;
        user.tempo.value = onEdit.tempo;
        user.descriicao.value = onEdit.descricao;
        user.data.value = onEdit.data;        
      }
    }, [onEdit]);

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const user = ref.current;
  
      if (
        !user.dia.value ||
        !user.tempo.value ||
        !user.descricao.value ||
        !user.data.value 
             
      ) {
        return toast.warn("Preencha todos os campos!");
      }
  
      if (onEdit) {
        await axios
          .put("http://localhost:8800/" + onEdit.id, {

            dia: user.dia.value,
            tempo: user.tempo.value,
            descricao: user.descricao.value,
            data: user.data.value,
                     
          })
          .then(({ data }) => toast.success(data))
          .catch(({ data }) => toast.error(data));
      } else {
        await axios
          .post("http://localhost:8800", {

            dia: user.dia.value,
            tempo: user.tempo.value,
            descricao: user.descricao.value,
            data: user.data.value,  

          })
          .then(({ data }) => toast.success(data))
          .catch(({ data }) => toast.error(data));
      }
  
      user.dia.value = "";
      user.tempo.value = "";
      user.descricao.value = "";
      user.data.value = "";       
  
      setOnEdit(null);
      getUsers();
    };

    return(
        <FormContainer ref={ref} onSubmit={handleSubmit}>
             <InputArea>
                <Label>Dia de Semana</Label>                 
                <Input name="dia"></Input>                                           
             </InputArea>
             <InputArea>
                <Label>Tempo</Label>
                <Input name="tempo"></Input>             
             </InputArea>
             <InputArea>
                <Label>Descrição</Label>
                <Input name="descricao"></Input>             
             </InputArea>
             <InputArea>
                <Label>Data</Label>
                <Input name="data" type="date"></Input>    
              </InputArea>         
             
             <Button type="submit">ADICIONAR</Button>
        </FormContainer>
    )
}
export default Form;