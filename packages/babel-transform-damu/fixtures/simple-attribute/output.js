const div = document.createElement('div');
div.setAttribute('id', 'foo');
div.setAttribute('foo', 'bar');
div.setAttribute('height', 54);
const app = document.querySelector('#app');
app.appendChild(div);
