import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

interface IDraggabbleCard {
  toDo: string;
  index: number;
}

const Card = styled.div`
  background-color: ${(props) => props.theme.cardColor};
  margin-bottom: 5px;
`;

const DraggabbleCard = ({ toDo, index }: IDraggabbleCard) => {
  return (
    <div>
      <Draggable key={toDo} draggableId={toDo} index={index}>
        {(magic) => (
          <Card
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
