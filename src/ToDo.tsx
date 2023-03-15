import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import AddBoard from "./Components/AddBoard";
import Board from "./Components/Board";
import { toDoState } from "./store/atom";

const Wrapper = styled.div`
  display: flex;
  max-width: 1000px;
  margin: 0 auto;
  justify-content: center;
  margin-top: 70px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  margin-bottom: 20px;
`;

const Boards = styled.div`
  width: 100%;
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(3, 1fr);
`;

const ToDo = () => {
  const onDragEnd = (info: DropResult) => {
    console.log(info);
    const { destination, source } = info;
    if (!destination) return;

    if (
      destination.droppableId === "boards" &&
      source.droppableId === "boards"
    ) {
      setToDos((boards) => {
        const arrs = Object.entries(boards);
        const before = arrs[source.index];
        arrs.splice(source.index, 1);
        arrs.splice(destination.index, 0, before);
        const editBoards = Object.fromEntries(arrs);
        return { ...editBoards };
      });
    }

    if (destination?.droppableId === source.droppableId) {
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
          <Container>
            <AddBoard />
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
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ToDo;
