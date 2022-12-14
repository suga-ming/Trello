import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import Board from "./Components/Board";
import DraggabbleCard from "./Components/DraggabbleCard";
import { toDoState } from "./store/atom";

const Wrapper = styled.div`
  display: flex;
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  width: 100%;
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
`;

function App() {
  const onDragEnd = (info: DropResult) => {
    console.log(info);
    const { destination, draggableId, source } = info;
    if (!destination) return;
    if (destination?.droppableId == source.droppableId) {
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        const taskObj = boardCopy[source.index];
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination?.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: boardCopy,
        };
      });
    }

    if (destination?.droppableId !== source.droppableId) {
      setToDos((allBoards) => {
        const destinationCopy = [...allBoards[destination.droppableId]];
        const sourceCopy = [...allBoards[source.droppableId]];
        const taskObj = sourceCopy[source.index];
        sourceCopy.splice(source.index, 1);
        destinationCopy.splice(destination?.index, 0, taskObj);
        return {
          ...allBoards,
          [destination?.droppableId]: destinationCopy,
          [source.droppableId]: sourceCopy,
        };
      });
    }
  };
  const [toDos, setToDos] = useRecoilState(toDoState);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="boards" direction="horizontal" type="board">
        {(magic) => (
          <Wrapper>
            <Boards ref={magic.innerRef} {...magic.droppableProps}>
              {Object.keys(toDos).map((boardId, index) => (
                <Board
                  boardId={boardId}
                  key={boardId}
                  toDos={toDos[boardId]}
                  index={index}
                />
              ))}
              {magic.placeholder}
            </Boards>
          </Wrapper>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default App;
