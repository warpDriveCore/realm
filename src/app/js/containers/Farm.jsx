import React, { PureComponent } from 'react';
import Rig from '../components/Rig';

class Farm extends PureComponent {
  render() {
    const { farm : { rigs, isLoading, failedToLoad }} = this.props;

    return (
      <section className="ui-block ui-block_blue ui-farm">
        <h2 className='ui-farm__header'>
          <img className='ui-farm__headerLogo' src='/assets/hiveLogo.png'></img>
          <span>HiveOS</span>
        </h2>
        <div className='ui-farm__content'>
          {!isLoading && (rigs.map(rig => <Rig data={rig} />))}
        </div>
        <div className="ui-farm__backLogo"/>
      </section>
    )
  }
}

export default Farm;
