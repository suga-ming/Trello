import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

interface IDraggabbleCard {
  toDo: string;
  index: number;
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
`;

const DraggabbleCard = ({ toDo, index }: IDraggabbleCard) => {
  return (
    <div>
      <Draggable key={toDo} draggableId={toDo} index={index}>
        {(magic, snapshot) => (
          <Card
            isDragging={snapshot.isDragging}
            ref={magic.innerRef}
            {...magic.draggableProps}
            {...magic.dragHandleProps}
          >
            {toDo}
          </Card>
        )}
      </Draggable>
    </div>
  );
};

export default React.memo(DraggabbleCard);
