# WIP: Class Components

Initially what I had in mind is to convert:

```jsx
class Counter extends React.Component {
  state = {
    counter: 0
  };
  increment = () => this.setState({ counter: this.state.counter + 1 });
  decrement = () => this.setState({ counter: this.state.counter - 1 });
  render() {
    return (
      <>
        <div>{this.state.counter}</div>
        <button onClick={this.increment}>+</button>
        <button onClick={this.decrement}>-</button>
      </>
    );
  }
}
```

into 

```js
class Counter {
  counter = 0;
  increment = () => this.setCounter(this.counter + 1);
  decrement = () => this.setCounter(this.counter - 1);
  setCounter = (counter) => {
    this.counter = counter;
    this.div.textContent = this.counter;
  };
  render() {
    this.div = document.createElement('div');
    this.div.textContent = this.counter;
    ...
    return [this.div, ...]
  }
}
```

However, I realised this is not feasible.
