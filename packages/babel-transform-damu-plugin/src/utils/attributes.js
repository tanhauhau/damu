import * as t from '@babel/types';
import { DOM_EVENTS } from './event-listeners';
const handler = new Map();
handler.set('className', _className);
handler.set('style', _style);
handler.set(/^on[A-Z]\S+$/, _eventListener);

export function setAttribute(identifier, key, value, path) {
  let _value =
    value.type === 'JSXExpressionContainer' ? value.expression : value;

  for (const matchKey of handler.keys()) {
    if (typeof matchKey === 'string' && key === matchKey) {
      return handler.get(matchKey)(identifier, _value);
    } else if (typeof matchKey.test === 'function' && matchKey.test(key)) {
      return handler.get(matchKey)(identifier, key, _value);
    }
  }
  return _setAttribute(identifier, key, _value);
}

function _setAttribute(identifier, key, value) {
  return t.expressionStatement(
    t.callExpression(
      t.memberExpression(identifier, t.identifier('setAttribute')),
      [t.stringLiteral(key), value]
    )
  );
}

function _className(element, className) {
  // elem.className = className;
  return t.expressionStatement(
    t.assignmentExpression(
      '=',
      t.memberExpression(element, t.identifier('className')),
      className
    )
  );
}

function _style(element, stringOrObject) {
  switch (stringOrObject.type) {
    case 'ObjectExpression':
      return _styleObject(element, stringOrObject);
    case 'StringLiteral':
      return _styleString(element, stringOrObject);
  }
}

function _styleString(element, styleString) {
  return _setAttribute(element, 'style', styleString);
}

function _styleObject(element, styleObject) {
  return styleObject.properties.map(({ key, value }) => {
    return t.expressionStatement(
      t.assignmentExpression(
        '=',
        t.memberExpression(
          t.memberExpression(element, t.identifier('style')),
          key
        ),
        appendPx(value)
      )
    );
  });
}

function appendPx(node) {
  if (node.type === 'NumericLiteral') {
    return t.stringLiteral(node.value + 'px');
  }
  return node;
}

function _eventListener(element, key, value) {
  let useCapture = false;
  let eventName = key.slice(2).toLowerCase();
  if (!DOM_EVENTS.includes(eventName)) {
    if (DOM_EVENTS.includes(eventName.replace('capture', ''))) {
      eventName = eventName.replace('capture', '');
      useCapture = true;
    } else {
      return _setAttribute(element, key, value);
    }
  }

  return t.expressionStatement(
    t.callExpression(
      t.memberExpression(element, t.identifier('addEventListener')),
      [
        t.stringLiteral(eventName),
        value,
        useCapture && t.booleanLiteral(useCapture),
      ].filter(Boolean)
    )
  );
}
