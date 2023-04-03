import React from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "../store/atom";

const Form = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Text = styled.div`
  font-size: 30px;
  margin-bottom: 15px;
  color: #9980fa;
  font-weight: 500;
`;

const Input = styled.input`
  width: 300px;
  height: 40px;
  border: none;
  border-radius: 5px;
  padding-left: 10px;
`;

interface INew {
  text: string;
}

const AddBoard = () => {
  const [toDo, setToDo] = useRecoilState(toDoState);
  const { register, handleSubmit, setValue } = useForm<INew>();

  const onSubmit = ({ text }: INew) => {
    setToDo((oldToDo) => {
      return {
        ...oldToDo,
        [text]: [],
      };
    });
    setValue("text", "");
  };

  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Text>New Board</Text>
        <Input
          {...register("text")}
          placeholder="여기에 입력해주세요"
          type="text"
        ></Input>
      </Form>
    </div>
  );
};

export default AddBoard;
