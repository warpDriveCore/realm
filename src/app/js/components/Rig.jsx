import React from 'react';
import PropTypes from 'prop-types';

const Rig = ({ data }) => (
  <div className='ui-rig'>
    { data.name }
    { data.units }
    { data.active }
  </div>
)

export default Rig;

Rig.PropTypes = {
  data: PropTypes.shape({
    name:  PropTypes.string.isRequired,
    units:  PropTypes.number.isRequired,
    active:  PropTypes.bool.isRequired,
  }) 
}