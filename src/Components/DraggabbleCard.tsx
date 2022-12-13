import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "../store/atom";

interface IDraggabbleCard {
  toDoId: number;
  toDoText: string;
  index: number;
  boardId: string;
}

const Card = styled.div<{ isDragging: boolean }>`
  background-color: ${(props) =>
    props.isDragging ? "#9980FA" : props.theme.cardColor};
  margin-bottom: 10px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${(props) =>
    props.isDragging ? "2px 0px 5px rgba(0,0,0,0.1)" : "none"};
  position: relative;
`;

const Delete = styled.div`
  position: absolute;
  right: 10px;
  top: 5px;
  font-size: 20px;
  color: red;
  cursor: pointer;
`;

const DraggabbleCard = ({
  toDoId,
  toDoText,
  index,
  boardId,
}: IDraggabbleCard) => {
  const [toDos, setToDos] = useRecoilState(toDoState);
  console.log(toDos);
  const DeleteButton = () => {
    setToDos((todos) => {
      const copiedTodos = [...todos[boardId]];
      const filteredTodos = copiedTodos.filter((todo) => todo.id !== toDoId);
      const result = { ...todos, [boardId]: filteredTodos };
      return result;
    });
  };
  return (
    <div>
      <Draggable draggableId={toDoId + ""} index={index}>
        {(magic, snapshot) => (
          <Card
            isDragging={snapshot.isDragging}
            ref={magic.innerRef}
            {...magic.draggableProps}
            {...magic.dragHandleProps}
          >
            {toDoText}
            <Delete onClick={DeleteButton}>x</Delete>
          </Card>
        )}
      </Draggable>
    </div>
  );
};

export default React.memo(DraggabbleCard);
