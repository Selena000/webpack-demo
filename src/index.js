// import logo from './logo.jpeg'
import logo from './test.png'
import './index.css'
// import './index.less'
// webpack只是把路径换一下

let image = new Image()

image.src = logo
image.classList.add('logo')

const root = document.getElementById('root')
root.append(image)

document.write('hello webpack.hahahahha.. 我在这里等着你回来webpack5aaaaa')