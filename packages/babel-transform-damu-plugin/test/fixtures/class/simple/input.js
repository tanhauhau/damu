import React from 'react';
import ReactDOM from 'react-dom';

class CounterApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
    };
  }

  onIncrement = () => {
    this.setState({ counter: this.state.counter + 1 });
  };
  onDecrement = () => {
    this.setState({ counter: this.state.counter - 1 });
  };

  render() {
    return (
      <div>
        <div>counter: {this.state.counter}</div>
        <button onClick={this.onIncrement}>+</button>
        <button onClick={this.onDecrement}>-</button>
      </div>
    );
  }
}

ReactDOM.render(<CounterApp />, document.querySelector('#app'));
