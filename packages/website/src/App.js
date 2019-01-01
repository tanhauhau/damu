import React, { Component } from 'react';

import AceEditor from 'react-ace';
import 'brace';
import 'brace/mode/jsx';
import 'brace/mode/javascript';
import 'brace/theme/tomorrow';

import * as babel from '@babel/core';
import damuPlugin from '@damu/babel-transform-damu-plugin';
import demos from './demos';

import './App.css';

const demoList = Object.keys(demos);
const EDITOR_PROPS = { $blockScrolling: true };
const ACE_PREVIEW_OPTIONS = { useWorker: false };

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: demos.simple,
      transpiled: '',
      error: null,
    };
  }
  onChange = value => {
    this.setState({ value, error: null });
    this.transpile(value);
  };

  onChangeTemplate = event => {
    const value = demos[event.currentTarget.value];
    this.setState({
      value,
      error: null,
    });
    this.transpile(value);
  };

  componentDidMount() {
    this.transpile(this.state.value);
  }

  transpile = code => {
    babel
      .transformAsync(code, {
        plugins: [damuPlugin],
      })
      .then(result => {
        this.setState({ transpiled: simplePrettier(result.code) });
      })
      .catch(error => {
        this.setState({ transpiled: '', error: error.message });
      });
  };

  render() {
    return (
      <>
        <div className="navbar">
          <span>Damu Demo</span>
          <label>
            {'Demo: '}
            <select onChange={this.onChangeTemplate}>
              {demoList.map(demo => (
                <option value={demo}>{demo}</option>
              ))}
            </select>
          </label>
          <a
            target="_blank"
            rel="noreferrer noopener"
            href="https://github.com/tanhauhau/damu"
          >
            View it on Github
          </a>
        </div>
        <div className="App">
          <AceEditor
            height="calc(100vh - 50px)"
            width="50vw"
            mode="jsx"
            theme="tomorrow"
            fontSize={14}
            onChange={this.onChange}
            showGutter={true}
            name="editor"
            value={this.state.value}
            editorProps={EDITOR_PROPS}
            tabSize={2}
            enableBasicAutocompletion={true}
            enableLiveAutocompletion={true}
            showLineNumbers={true}
            debounceChangePeriod={100}
          />

          <AceEditor
            height="calc(100vh - 50px)"
            width="50vw"
            mode="javascript"
            theme="tomorrow"
            readOnly={true}
            fontSize={14}
            showGutter={true}
            name="preview"
            value={this.state.error || this.state.transpiled}
            editorProps={EDITOR_PROPS}
            tabSize={2}
            showLineNumbers={true}
            setOptions={ACE_PREVIEW_OPTIONS}
          />
        </div>
      </>
    );
  }
}

function simplePrettier(code) {
  return code
    .split('\n')
    .filter(line => line.trim() !== '')
    .map(line => (/^(const|document)/.test(line) ? '\n' + line : line))
    .join('\n')
    .trim();
}

export default App;
