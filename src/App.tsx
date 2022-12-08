import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Board = styled.div`
  background-color: ${(props) => props.theme.boardColor};
`;
const Card = styled.div`
  background-color: ${(props) => props.theme.cardColor};
`;

function App() {
  const onDragEnd = () => {};
  return (
    <Wrapper>
      <DragDropContext onDragEnd={onDragEnd}>
        <div>
          <Droppable droppableId="one">
            {(magic) => (
              <Board ref={magic.innerRef} {...magic.droppableProps}>
                <Draggable draggableId="first" index={0}>
                  {(magic) => (
                    <Card
                      ref={magic.innerRef}
                      {...magic.draggableProps}
                      //   <span>불</span>
                    >
                      <span {...magic.dragHandleProps}>👿</span>
                      One
                    </Card>
                  )}
                </Draggable>
                <Draggable draggableId="second" index={1}>
                  {(magic) => (
                    <Card ref={magic.innerRef} {...magic.draggableProps}>
                      <span {...magic.dragHandleProps}>👿</span>
                      Two
                    </Card>
                  )}
                </Draggable>
              </Board>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </Wrapper>
  );
}

export default App;
