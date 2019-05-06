import React from 'react'
import PropTypes from 'prop-types'

import BookmarksApp from './tools/BookmarksApp';
import TodosApp from './tools/TodosApp';
import LocationsApp from './tools/LocationsApp';

Workbench.propTypes = {
  userData: PropTypes.object.isRequired
};

function Workbench(props) {
  
  const {userData} = props;
  
  return (
    <div>
      <BookmarksApp bookmarks={userData.bookmarks}/>
      <TodosApp todos={userData.todos}/>
      <LocationsApp locations={userData.locations} />
    </div>
  )
}

export default Workbench;
