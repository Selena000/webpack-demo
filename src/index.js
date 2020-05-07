// import logo from './logo.jpeg'
// import logo from './test.png'
// import './index.css'
// import './index.less'
// webpack只是把路径换一下
// import axios from 'axios'

// let image = new Image()

// image.src = logo
// image.classList.add('logo')

// const root = document.getElementById('root')
// root.append(image)

// document.write('hello webpack.hahahahha.. 我在a这里等着你回来awebpack5aaaaa')

// axios.get('/api/info').then(res => {
//   console.log('res', res)
// })

// var btn = document.createElement("button"); btn.innerHTML = "新增"; document.body.appendChild(btn);
// btn.onclick = function() {
//   var div = document.createElement("div");
//   div.innerHTML = "item";
//   document.body.appendChild(div);
// };

// let btn = document.createElement('button')
// btn.innerHTML = '新增'
// document.body.appendChild(btn)

// btn.onclick = function() {
//   const div = document.createElement('div')
//   div.innerHTML = 'item'
//   document.body.appendChild(div)
// }
// const arr = [new Promise(() => {}), new Promise(() => {})];
// arr.map(item => {
//   console.log(item);
// });

import React, { Component } from "react";
import ReactDom from "react-dom";
class App extends Component {
  render() {
    return <div>hello world</div>
  }
}
ReactDom.render(<App />, document.getElementById("app"));