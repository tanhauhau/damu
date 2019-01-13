import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import MediaQuery from 'react-responsive';

import AceEditor from 'react-ace';
import 'brace';
import 'brace/mode/jsx';
import 'brace/mode/javascript';
import 'brace/theme/tomorrow';

import * as babel from '@babel/core';
import damuPreset from '@damu/babel-preset-damu';
import demos from './demos';

import styles from './Demo.scss';

const demoList = Object.keys(demos);
const EDITOR_PROPS = { $blockScrolling: true };
const ACE_PREVIEW_OPTIONS = { useWorker: false };

function getSelectedFromHash(hash) {
  hash = decodeURIComponent(hash.slice(1));
  if (demoList.includes(hash)) {
    return hash;
  }
  return '01 simple';
}

class Demo extends Component {
  constructor(props) {
    super(props);
    const selectedDemo = getSelectedFromHash(props.location.hash);
    this.state = {
      value: demos[selectedDemo],
      selectedDemo,
      transpiled: '',
      error: null,
      previewMode: 'code',
    };
  }
  onChange = value => {
    this.setState({ value, error: null });
    this.transpile(value);
  };

  onChangeTemplate = event => {
    this.props.history.replace(
      this.props.location.pathname + '#' + event.currentTarget.value
    );
  };

  onChangeDemo = selectedDemo => {
    const value = demos[selectedDemo];
    this.setState({
      selectedDemo,
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

  componentDidUpdate(prevProps) {
    if (prevProps.location.hash !== this.props.location.hash) {
      this.onChangeDemo(getSelectedFromHash(this.props.location.hash));
    }
  }

  transpile = code => {
    babel
      .transformAsync(code, {
        presets: [damuPreset],
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
        console.error(error);
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
      <MediaQuery minWidth={600}>
        {match => (
          <>
            <div className={styles.navbar}>
              <Link to="/" className={styles.brand}>
                Damu
              </Link>
              <label>
                {'Demo: '}
                <select
                  onChange={this.onChangeTemplate}
                  value={this.state.selectedDemo}
                >
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
            <div className={styles.App}>
              <AceEditor
                height={match ? 'calc(100vh - 50px)' : '80vh'}
                width={match ? '50vw' : '100vw'}
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
              <div
                className={
                  styles.preview + ' ' + styles['preview-' + previewMode]
                }
              >
                <div className={styles.previewDashboard}>
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
                  width={match ? '50vw' : '100vw'}
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
        )}
      </MediaQuery>
    );
  }
}

function simplePrettier(code) {
  return code
    .split('\n')
    .filter(line => line.trim() !== '')
    .map(line =>
      /^[\s\t]*(const|document|if|function)/.test(line) ? '\n' + line : line
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

export default withRouter(Demo);
