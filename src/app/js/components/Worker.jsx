import React from 'react';
import PropTypes from 'prop-types';

const Worker = ({ data }) => (
  <div className='ui-worker'>
    { data.worker }
  </div>
)

export default Worker;

Worker.PropTypes = {
  data: PropTypes.shape({
    worker:  PropTypes.string.isRequired,
  }) 
}