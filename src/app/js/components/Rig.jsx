import React from 'react';
import PropTypes from 'prop-types';

const Rig = ({ data }) => {
  const { name, units, hashrate, powerDraw, gpus } = data;

  return (
    <div className='ui-rig'>
      <div className='ui-rig__header'>
        <span className='ui-rig__headerName'>{name}</span>
        <span className='ui-rig__headerUnits'>{`GPUs: ${units}`}</span>
        <span className='ui-rig__headerHashrate'>{`${hashrate}Mh/s`}</span>
        <span className='ui-rig__headerPower'>{`${powerDraw}W`}</span>
      </div>
      <div className='ui-rig__content'>
        {
          gpus.map(({ hash, temp, fan, power }, index) => (
            <div className='ui-gpu'>
              <div className='ui-gpu__stats'>
              <span className='ui-gpu__statsItem'>{`gpu${index}`}</span>
                <span className='ui-gpu__statsHash ui-gpu__statsItem'>{`${hash}Mh/s`}</span>
                <span className='ui-gpu__statsTemp ui-gpu__statsItem'>{`${temp}℃`}</span>
                <span className='ui-gpu__statsFan ui-gpu__statsItem'>{`${power}W`}</span>
                <span className='ui-gpu__statsPower ui-gpu__statsItem'>{`${fan}%`}</span>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
};


export default Rig;

Rig.PropTypes = {
  data: PropTypes.shape({
    name:  PropTypes.string.isRequired,
    units:  PropTypes.number.isRequired,
    active:  PropTypes.bool.isRequired,
  }) 
}