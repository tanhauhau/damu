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

However, I realised this is not feasible, because:
1. In React's render function, the actual "DOM" output can be depends on a derivative of `state`'s and `props`'s. I will have to do the logic if you want to directly modify DOM in the `setXXX()` function.
2. It is possible in React's code to call `setState()` multiple times, but the actual "render" phase happens only once, because there's a "debounce" for `setState()`

So, it will be easier to implement a simplified version of `React.Component` that will call `render()` during the "render" phase.
In the render function, I'll keep track of every element, if it is not created, it will be created. and if the `props` or `state` it dependes has changed, it will modify the dom. for example:

```js
render() {
  if (!this.div) {
    // create if not avaiable
    this.div = document.createElement('div');
    this.div.textContent = this.state.counter;
  } else if (this.state.counter !== this.prevState.Counter) {
    // update if changed
    // React.Component will need to keep track of state and prevState
    this.div.textContent = this.state.counter;
  }
}
```
