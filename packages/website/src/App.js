import React, { Component } from 'react';

import AceEditor from 'react-ace';
import 'brace';
import 'brace/mode/jsx';
import 'brace/theme/tomorrow';

import * as babel from '@babel/core';
// import damuPlugin from '@damu/babel-transform-damu-plugin';
import damuPlugin from '@damu/babel-transform-damu-plugin';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'function asdf() { return 1234; }',
      transpiled: '',
    };
  }
  onChange = value => {
    this.setState({ value });
    babel
      .transformAsync(value, {
        plugins: [damuPlugin],
      })
      .then(result => {
        console.log(result);
      });
  };

  render() {
    return (
      <div className="App">
        <AceEditor
          mode="jsx"
          theme="tomorrow"
          fontSize={14}
          onChange={this.onChange}
          showGutter={true}
          name="editor"
          value={this.state.value}
          editorProps={{ $blockScrolling: true }}
          tabSize={2}
          enableBasicAutocompletion={true}
          enableLiveAutocompletion={true}
          showLineNumbers={true}
          debounceChangePeriod={100}
        />
      </div>
    );
  }
}

export default App;
