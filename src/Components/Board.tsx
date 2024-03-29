import { Draggable, Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { ITodo, toDoState } from "../store/atom";
import DraggabbleCard from "./DraggabbleCard";

const Wrapper = styled.div`
  padding-top: 30px;
  padding: 10px 0px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.boardColor};
  min-height: 350px;
  width: 300px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Title = styled.div`
  color: #485460;
  font-weight: 700;
  text-align: center;
  margin-bottom: 10px;
`;

const Area = styled.div<IAreaProps>`
  background-color: ${(props) =>
    props.isDraggingOver
      ? "#d2dae2"
      : props.isDraggingFromThis
      ? "#808e9b"
      : "transparent"};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
  padding: 20px;
`;

const Input = styled.input`
  width: 80%;
  height: 30px;
  border: none;
  border-radius: 5px;
  background-color: #9980fa;
  padding-left: 10px;
  color: white;
  &::placeholder {
    color: white;
  }
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
`;

const Delete = styled.div`
  position: absolute;
  right: 10px;
  top: 5px;
  font-size: 20px;
  color: red;
  cursor: pointer;
`;

interface IBoard {
  toDos: ITodo[];
  boardId: string;
  index: number;
}

interface IAreaProps {
  isDraggingOver: boolean;
  isDraggingFromThis: boolean;
}

interface IForm {
  toDo: string;
}

const Board = ({ toDos, boardId, index }: IBoard) => {
  const setToDos = useSetRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const onValid = ({ toDo }: IForm) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };
    setToDos((allBoards) => {
      return {
        ...allBoards,
        [boardId]: [newToDo, ...allBoards[boardId]],
      };
    });
    setValue("toDo", "");
  };

  const onDelete = () => {
    setToDos((todos) => {
      const copiedTodos = Object.entries(todos);
      const filterBoards = copiedTodos.filter(
        (entryBoard) => entryBoard[0] !== boardId
      );
      const newBoards = Object.fromEntries(filterBoards);
      return newBoards;
    });
  };

  return (
    <Draggable draggableId={boardId + ""} index={index}>
      {(magic, snapshot) => (
        <Wrapper
          ref={magic.innerRef}
          {...magic.dragHandleProps}
          {...magic.draggableProps}
        >
          <Title>{boardId}</Title>
          <Delete onClick={onDelete}>x</Delete>
          <Form onSubmit={handleSubmit(onValid)}>
            <Input
              {...register("toDo", { required: true })}
              type="text"
              placeholder={`Add task on ${boardId}`}
            ></Input>
          </Form>

          <Droppable droppableId={boardId}>
            {(magic, snapshot) => (
              <Area
                isDraggingOver={snapshot.isDraggingOver}
                isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
                ref={magic.innerRef}
                {...magic.droppableProps}
              >
                {toDos.map((toDo, index) => (
                  <DraggabbleCard
                    key={toDo.id}
                    index={index}
                    toDoId={toDo.id}
                    toDoText={toDo.text}
                    boardId={boardId}
                  />
                ))}
                {magic.placeholder}
              </Area>
            )}
          </Droppable>
        </Wrapper>
      )}
    </Draggable>
  );
};

export default Board;
