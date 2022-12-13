import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggabbleCard from "./DraggabbleCard";

const Wrapper = styled.div`
  padding-top: 30px;
  padding: 10px 10px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.boardColor};
  min-height: 200px;
`;

const Title = styled.div`
  color: #485460;
  font-weight: 700;
  text-align: center;
  margin-bottom: 10px;
`;

interface IBoard {
  toDos: string[];
  boardId: string;
}

const Board = ({ toDos, boardId }: IBoard) => {
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Droppable droppableId={boardId}>
        {(magic) => (
          <div ref={magic.innerRef} {...magic.droppableProps}>
            {toDos.map((toDo, index) => (
              <DraggabbleCard key={toDo} toDo={toDo} index={index} />
            ))}
            {magic.placeholder}
          </div>
        )}
      </Droppable>
    </Wrapper>
  );
};

export default Board;
