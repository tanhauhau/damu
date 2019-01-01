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
      previewMode: 'both',
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

  onPreviewModeChange = event => {
    this.setState({
      previewMode: event.currentTarget.value,
    });
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
        if (this.iframe) {
          while (this.iframe.firstChild) {
            this.iframe.removeChild(this.iframe.firstChild);
          }
          //
          const iframe = document.createElement('iframe');
          this.iframe.appendChild(iframe);

          var previewIframe =
            iframe.contentDocument || iframe.contentWindow.document;
          previewIframe.open();
          previewIframe.write(codeToHtml(result.code));
          previewIframe.close();
        }
      })
      .catch(error => {
        this.setState({ transpiled: '', error: error.message });
        if (this.iframe) {
          while (this.iframe.firstChild) {
            this.iframe.removeChild(this.iframe.firstChild);
          }
        }
      });
  };

  onIframeRef = ref => {
    this.iframe = ref;
  };

  render() {
    const { previewMode } = this.state;
    return (
      <>
        <div className="navbar">
          <span>Damu Demo</span>
          <label>
            {'Demo: '}
            <select onChange={this.onChangeTemplate}>
              {demoList.map(demo => (
                <option key={demo} value={demo}>
                  {demo}
                </option>
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
          />
          <div className={`preview preview-${previewMode}`}>
            <div className="preview-dashboard">
              <div>
                <label>
                  <input
                    id="both"
                    value="both"
                    name="preview-mode"
                    type="radio"
                    checked={previewMode === 'both'}
                    onChange={this.onPreviewModeChange}
                  />
                  Both
                </label>
                <label>
                  <input
                    id="code"
                    value="code"
                    name="preview-mode"
                    type="radio"
                    checked={previewMode === 'code'}
                    onChange={this.onPreviewModeChange}
                  />
                  Code
                </label>
                <label>
                  <input
                    id="html"
                    value="html"
                    name="preview-mode"
                    type="radio"
                    checked={previewMode === 'html'}
                    onChange={this.onPreviewModeChange}
                  />
                  HTML
                </label>
              </div>
            </div>
            <AceEditor
              height={`calc(${previewMode === 'code' ? 100 : 50}vh - 80px)`}
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
            <div ref={this.onIframeRef} />
          </div>
        </div>
      </>
    );
  }
}

function simplePrettier(code) {
  return code
    .split('\n')
    .filter(line => line.trim() !== '')
    .map(line =>
      /^[\s\t]*(const|document|if)/.test(line) ? '\n' + line : line
    )
    .join('\n')
    .trim();
}

function codeToHtml(code) {
  return `<html>
    <body>
      <div id="app" />
    </body>
    <script type="text/javascript">${code}</script>
  </html>`;
}

export default App;
