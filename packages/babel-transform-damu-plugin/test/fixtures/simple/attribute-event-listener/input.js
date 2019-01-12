const React = require('react');
const ReactDOM = require('react-dom');

ReactDOM.render(
  <>
    <div
      onClick={onClick}
      onClickCapture={onClickCapture}
      onContextMenu={onContextMenu}
      onDoubleClick={onDoubleClick}
      onDrag={onDrag}
      onDragEnd={onDragEnd}
      onDragEnter={onDragEnter}
      onDragExit={onDragExit}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDragStart={onDragStart}
      onDrop={onDrop}
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseMove={onMouseMove}
      onMouseOut={onMouseOut}
      onMouseOver={onMouseOver}
      onMouseUp={onMouseUp}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
      onGotPointerCapture={onGotPointerCapture}
      onLostPointerCapture={onLostPointerCapture}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
      onTouchCancel={onTouchCancel}
      onTouchEnd={onTouchEnd}
      onTouchMove={onTouchMove}
      onTouchStart={onTouchStart}
      onScroll={onScroll}
      onSelect={onSelect}
      onWheel={onWheel}
    />
    <img onLoad={onLoad} onError={onError} />
    <input onChange={onChange} />
  </>,
  document.querySelector('#app')
);
