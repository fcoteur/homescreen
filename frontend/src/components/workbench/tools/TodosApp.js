import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Box = styled.div`
  margin: 5px 5px;
  padding: 5px 5px;
  width: 300px;
  text-align: left;
  border: 1pt solid black;
`;

TodosApp.propTypes = {
  todos: PropTypes.array.isRequired
}

function TodosApp(props) {
  
  const { todos } = props;

  const TodosList = todos.map(element => {
    return (
      <React.Fragment key={element._id}>
        <span >
          {String.fromCharCode(0x2716)}
          {String.fromCharCode(0x270E)}
          {' '}
          {element.title}
          {' '}          
          {String.fromCharCode(0x2713)}
        </span>
        <br/>
      </React.Fragment>
    );
  })

  return (
    <Box>
      <span>
        <strong>Todos</strong>
        {' '}
        <strong>+</strong>
      </span><br/>
      {TodosList}
    </Box>
  )
}


export default TodosApp

