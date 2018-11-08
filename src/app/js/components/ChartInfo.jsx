import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const ChartInfo = ({ coin: { symbol, valueUsd }, highlighted }) => (
  <div className='ui-chartInfo'>
    <span className='ui-chartInfo__symbol'>{symbol}</span>
    <span className='ui-chartInfo__value'>
      <FontAwesomeIcon className='ui-chartInfo__icon' icon="dollar-sign"/>
      {valueUsd}
    </span>
  </div>
);

ChartInfo.PropTypes = {
	coin: PropTypes.shape({
		symbol: PropTypes.string.isRequired,
		valueUsd: PropTypes.number.isRequired,
	}),
};

export default ChartInfo;
