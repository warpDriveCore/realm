import React, { PureComponent } from 'react';
import { getFarms } from '../utils/api.service';
import Rig from '../components/Rig';
import PieChart from '../components/PieChart';

class Farm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      farm: [],
      loading: true,
      code: null
    };
  }

  componentDidMount() {
    getFarms()
      .then(({ data }) => {
        this.setState({ farm: data, loading: false });
      })
      .catch(err => console.log(err));
  }

  handleInput = ({ target: { value}}) => {
    this.setState({ code : value});
  }

  submitCode = () => {
    const { code } = this.state;
    getTokeng(code);
  };

  render() {
    const { farm, loading } = this.state;

    return (
      <section className="ui-block">
        <PieChart />
        {loading ? (
          <span>Loading ...</span>
        ) : (
          farm.map(rig => <Rig data={rig} />)
        )
        }
      </section>
    )
  }
}

export default Farm;
