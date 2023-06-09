---
title: webgl
description: 如何使用webgl创建点线面，uv贴图等
date: 2022-06-08
cover: https://guohuiweb3site.oss-cn-beijing.aliyuncs.com/webgl.png

public: true

tags:
  - webgl
  - js
---

# Webgl

WebGL 每次绘制需要两个着色器， 一个**顶点着色器**和一个**片段着色器**，每一个着色器都是一个**方法**。 一个顶点着色器和一个片段着色器链接在一起放入一个着色程序中（或者只叫程序）。 一个典型的 WebGL 应用会有多个着色程序。

Shader 中的数据类型有`loat`, `vec2`, `vec3`, `vec4`, `mat2`, `mat3` 和 `mat4` 数据类型

## 如何给 shader 传递数据

```js
var numComponents = 3; // (x, y, z)
var type = gl.FLOAT; // 32位浮点数据
var normalize = false; // 不标准化
var offset = 0; // 从缓冲起始位置开始获取
var stride = 0; // 到下一个数据跳多少位内存
// 0 = 使用当前的单位个数和单位长度 （ 3 * Float32Array.BYTES_PER_ELEMENT ）

// 获取shader中的变量
var positionLoc = gl.getAttribLocation(gl.Program, 'a_position');
// 开始传递数据
gl.vertexAttribPointer(positionLoc, numComponents, type, false, stride, offset);
// 开启从缓冲中获取数据
gl.enableVertexAttribArray(positionLoc);
```

## Webgl 传值的 3 种方式

### attribute 只能在顶点作色器中使用

一般用 attribute 变量来表示一些顶点的数据，如：顶点坐标，法线，纹理坐标，顶点颜色等。

```javascript
let vertexShader = `
                attribute vec2 a_position;

                void main(){
                    gl_Position = vec4(a_position, 0.0 ,1.0);
                    gl_PointSize = 10.0; 
                }
            `;
let fragShader = `
                precision mediump float;
                void main(){
                    gl_FragColor = vec4(1.0, 1.0 , 1.0 , 1.0);
                }
            `;
let aPosition = gl.getAttribLocation(gl.program, 'a_position');
gl.vertexAttrib2f(aPosition, 0.5, 0.5);
```

### uniform ，顶点作色器 和 片源着色器 都可以使用,

### uniform 变量一般用来表示：变换矩阵，材质，光照参数和颜色等信息。

> uniform mat4 viewProjMatrix; //投影+视图矩阵
> uniform mat4 viewMatrix; //视图矩阵
> uniform vec3 lightPosition; //光源位置

```javascript
let vertexShader = `
                attribute vec2 a_position;

                void main(){
                    gl_Position = vec4(a_position, 0.0 ,1.0);
                    gl_PointSize = 10.0; 
                }
            `;
// 片段着色器没有默认精度，所以我们需要设置一个精度
// mediump是一个不错的默认值，代表“medium precision”（中等精度）
let fragShader = `
                precision mediump float;
                uniform vec3 u_color;
                void main(){
                    gl_FragColor = vec4(u_color, 1.0);
                }
            `;
let uColor = gl.getUniformLocation(gl.program, 'a_color');
gl.uniform3f(uColor, 0.0, 0.0, 0.0);
```

### varying ， 可以将顶点作色器的数据传入到片源着色器中

```javascript
let vertexShader = `
                attribute vec2 a_position;
                attribute vec3 a_color; 
                varying vec3 v_color;

                void main(){
                    v_color = a_color;
                    gl_Position = vec4(a_position, 0.0 ,1.0);
                    gl_PointSize = 10.0; 
                }
`;
let fragShader = `
                precision mediump float;
                varying vec3 v_color;
                void main(){
                    gl_FragColor = vec4(v_color, 1.0);
                }
`;
```

```javascript
// 第一种 （attribute）， 只能在顶点作色器中使用
let aPosition = gl.getAttribLocation(gl.program, 'a_position');
// 表示要传入2为为向量
gl.vertexAttrib2f(aPosition, 1.0, 1.0);
gl.vertexAttrib3f(aPosition, 1.0, 1.0, 1.0);

// 第二种 （uniform）, 顶点作色器 和 片源着色器 都可以使用
let uColor = gl.getUniformLocation(gl.program, 'a_color');
gl.uniform3f(uColor, 0.0, 0.0, 0.0);

// 第三种 （varying）, 可以将顶点作色器的数据传入到片源着色器中
```

## 将矩形点从像素转换为 0.0 到 1.0

```javascript
let vertexSource = `

        attribute vec2 a_position;
        uniform vec2 u_resolution;

        void main(){
            vec2 zeroToOne = a_position / u_resolution;
            vec2 zeroToTwo = zeroToOne * 2.0;
            vec2 clipSpace = zeroToTwo - 1.0;

            gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
        }
 `;

var resolutionLocation = gl.getUniformLocation(gl.program, 'u_resolution');
gl.uniform2f(resolutionLocation, gl.canvas.width, gl.canvas.height);
```

## 画一个三角形

```javascript
  <script>
        var gl;

        function initShaders(gl, vsSource, fsSource) {
            //创建程序对象
            const program = gl.createProgram();
            //建立着色对象
            const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
            const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);
            //把顶点着色对象装进程序对象中
            gl.attachShader(program, vertexShader);
            //把片元着色对象装进程序对象中
            gl.attachShader(program, fragmentShader);
            //连接webgl上下文对象和程序对象
            gl.linkProgram(program);
            //启动程序对象
            gl.useProgram(program);
            //将程序对象挂到上下文对象上
            gl.program = program;
            return true;
        }
        function loadShader(gl, type, source) {
            //根据着色类型，建立着色器对象
            const shader = gl.createShader(type);
            //将着色器源文件传入着色器对象中
            gl.shaderSource(shader, source);
            //编译着色器对象
            gl.compileShader(shader);
            //返回着色器对象
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                var info = gl.getShaderInfoLog(shader);
                throw "Could not compile WebGL program. \n\n" + info;
            }
            return shader;
        }
        window.onload = function () {
            let canvas = document.getElementById('canvas');
            gl = canvas.getContext('webgl');
            gl.viewport(0, 0, canvas.width, canvas.height)
            let vertexShader = `
                attribute vec2 a_position;
                attribute vec3 a_color;
                varying vec3 v_color;

                void main(){
                    v_color = a_color;
                    gl_Position = vec4(a_position, 0.0 ,1.0);
                    gl_PointSize = 10.0;
                }
            `;
            let fragShader = `
                precision mediump float;
                varying vec3 v_color;
                void main(){
                    gl_FragColor = vec4(v_color, 1.0);
                }
            `;
            initShaders(gl, vertexShader, fragShader);


            let arr = [
                //  x  y  r  g  b
                0.0, 0.5, 1.0, 0.0, 0.0,
                -0.5, -0.5, 0.0, 1.0, 0.0,
                0.5, -0.5, 0.0, 0.0, 1.0,
            ]

            let dataArr = new Float32Array(arr);
            let FSIZE = dataArr.BYTES_PER_ELEMENT;

            // 创建buffer
            let buffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
            gl.bufferData(gl.ARRAY_BUFFER, dataArr, gl.STATIC_DRAW);
            // 将数据传入 webgl
            // 获取webgl中的要获取的变量
            let aPosition = gl.getAttribLocation(gl.program, 'a_position');
            /**
             *  参数1：表示在webgl中要赋值的对象
             *  参数2：表示attribute变量的长度 （vec2 、 vec4）
             *  参数3：buffer里面数据的类型，表示要用浮点数
             *  参数4：normalized: 正交化 true/false
             *  参数5：每个点所占的BYTES， 表示每5个数据为一组
             *  参数6：从第几个BYTES开始数
             */
            gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 5 * FSIZE, 0);


            let aColor = gl.getAttribLocation(gl.program, 'a_color');
            /**
             *  参数1：表示在webgl中要赋值的对象
             *  参数2：表示每个颜色要占用数组中的3个数据
             *  参数3：表示要用浮点数
             *  参数4：normalized: 正交化 true/false
             *  参数5：每个点所占的BYTES， 表示每5个数据为一组
             *  参数6：从第几个BYTES开始数，从第下标为2的数据开始，占用3个字节
             */
            gl.vertexAttribPointer(aColor, 3, gl.FLOAT, false, 5 * FSIZE, 2 * FSIZE);


            // 确定把数据传入
            gl.enableVertexAttribArray(aPosition);
            gl.enableVertexAttribArray(aColor);


			gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
            gl.clearColor(0.0, 0.0, 0.0, 1.0);
            gl.clear(gl.COLOR_BUFFER_BIT);
            /**
             *  开始绘制
             *  参数1： 绘制类型
             *  参数2： 从哪个点开始绘制
             *  参数3： 绘制几个点
             **/
            gl.drawArrays(gl.POINTS, 0, 3);
            gl.drawArrays(gl.TRIANGLES, 0, 3);

        }

    </script>
```

## 绘制一个圆

```js
let arr = [];
let radius = 0.5; // 半径
let POINTS = 50;
for (let i = 0; i < POINTS; i++) {
  let deg = ((2 * Math.PI) / POINTS) * i;
  let x = Math.cos(deg) * radius;
  let y = Math.sin(deg) * radius;
  let r = (Math.random() - 0.5) * 2;
  let g = (Math.random() - 0.5) * 2;
  let b = (Math.random() - 0.5) * 2;
  arr.push(x, y, r, g, b);
}
```

## UV 贴图

WebGL 对纹理图片大小是有要求的，图片的宽度和高度必须是**2 的 N 次幂**，比如 16 x 16，32 x 32，32 x 64 等。实际上，不是这个尺寸的图片也能进行贴图，但是这样不仅会增加更多的处理，还会影响性能。

```javascript
import aaaJpg from "/imgs/cat_512x512.jpg";

const loadShader = (gl, type, source): WebGLShader | null => {
  const shader = gl.createShader(type) as WebGLShader;

  // 将源码发送到着色器中
  gl.shaderSource(shader, source);

  // 着色器编译源码
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
};

const createProgram = (gl, vertexShader, fragmentShader) => {
  const shaderProgram = gl.createProgram() as any;
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);
  gl.useProgram(shaderProgram);

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(shaderProgram));
    return null;
  }
  gl.program = shaderProgram;
  return shaderProgram;
};

export const initShader = (gl, vertexSource, fragmentSource) => {
  // 创建顶点着色器
  let vertexShader = loadShader(
    gl,
    gl.VERTEX_SHADER,
    vertexSource
  ) as WebGLShader;
  // 创建片源着色器
  let fragmentShader = loadShader(
    gl,
    gl.FRAGMENT_SHADER,
    fragmentSource
  ) as WebGLShader;
  return createProgram(gl, vertexShader, fragmentShader) as any;
};

export const initTextures = (gl: WEBGL, callBack) => {
  const texture = gl.createTexture();
  const uSampler = gl.getUniformLocation(gl.program, "u_sampler");

  let image = new Image();
  image.src = aaaJpg;
  image.onload = function () {
    // 异步的过程：图片加载完成之后执行这个函数里的任务
    // 翻转图片的Y轴,默认是不翻转
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

    gl.activeTexture(gl.TEXTURE0); //激活贴图，放在第0个单元上（最少可以支持8个单元）
    gl.bindTexture(gl.TEXTURE_2D, texture); //绑定贴图：哪种贴图和哪个贴图

    // 对贴图的参数进行设置gl.texParameteri(贴图的种类，参数的名称，具体值)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

    // 贴图用哪张图片，即用image作为texture
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

    gl.uniform1i(uSampler, 0);

    callBack();
  };
};

```

```javascript
  const gl = box.value!.getContext("webgl") as WEBGL;
    let vertexSource = `
    attribute vec3 a_position;

      attribute vec2 a_uv;
      varying vec2 v_uv;
      void main() {
          v_uv = a_uv;
          gl_Position = vec4(a_position, 1.0);
      }
    `;
    let fragmentSource = `
      precision mediump float;
      varying vec2 v_uv;
      uniform sampler2D u_sampler;
      void main() {
          vec4 color = texture2D(u_sampler, v_uv);
          gl_FragColor = color;
      }
    `;

    initShader(gl, vertexSource, fragmentSource);

    let arr = [-0.5, -0.5, 0.0, 0.5, -0.5, 0.0, 0.5, 0.5, 0.0, -0.5, 0.5, 0.0];

    let dataArr = new Float32Array(arr);
    let FSIZE = dataArr.BYTES_PER_ELEMENT;

    // 创建buffer
    let positionsBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionsBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, dataArr, gl.STATIC_DRAW);
    let a_position = gl.getAttribLocation(gl.program, "a_position");
    gl.vertexAttribPointer(a_position, 3, gl.FLOAT, false, FSIZE * 3, 0);
    gl.enableVertexAttribArray(a_position);

    // uv 贴图
    let uvs = new Float32Array([0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0]);
    let uvsBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, uvsBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, uvs, gl.STATIC_DRAW);
    let a_uv = gl.getAttribLocation(gl.program, "a_uv");
    gl.vertexAttribPointer(a_uv, 2, gl.FLOAT, false, FSIZE * 2, 0);
    gl.enableVertexAttribArray(a_uv);

    initTextures(gl, () => {
      console.error(11);
      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      /**
       *  开始绘制
       *  参数1： 绘制类型
       *  参数2： 从哪个点开始绘制
       *  参数3： 绘制几个点
       **/
      gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
      gl.drawArrays(gl.POINTS, 0, 4);
    });
```

## js-matrix 使用

### 缩放

```javascript
let vertexSource = `
        attribute vec3 a_position;

        uniform mat4 u_matrix; // 缩放矩阵
    
        void main() {
              gl_Position = u_matrix * vec4(a_position, 1.0);
          }
        `;
let fragmentSource = `
          precision mediump float;
          void main() {
              gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
          }
 `;

// 省略中间

const scaleMatrix = mat4.create();
mat4.fromScaling(scaleMatrix, [0.5, 0.5, 1]);
let uMatrix = gl.getUniformLocation(gl.program, 'u_matrix');
gl.uniformMatrix4fv(uMatrix, false, new Float32Array(scaleMatrix));
```

### 平移

```js
const translationMatrix = mat4.create();
// 向右移动0.5
mat4.fromTranslation(translationMatrix, [0.5, 0, 0]);
let uMatrix = gl.getUniformLocation(gl.program, 'u_matrix');
gl.uniformMatrix4fv(uMatrix, false, new Float32Array(translationMatrix));
```

### 旋转

```javascript
import { mat4, glMatrix } from 'gl-matrix';

// glMatrix.toRadian(180) ==  (45 * Math.PI) / 180
const rotationMatrix = mat4.create();
// z轴旋转45度
mat4.fromRotation(rotationMatrix, (45 * Math.PI) / 180, [0, 0, 1]);
let uMatrix = gl.getUniformLocation(gl.program, 'u_matrix');
gl.uniformMatrix4fv(uMatrix, false, new Float32Array(rotationMatrix));
```

### 多个矩阵变化

```js
let vertexSource = `
        attribute vec3 a_position;

        uniform mat4 t_matrix; // 平移矩阵
        uniform mat4 s_matrix; // 缩放矩阵
        uniform mat4 r_matrix; // 旋转矩阵

        void main() {
              gl_Position = s_matrix * t_matrix * r_matrix * vec4(a_position, 1.0);
          }
`;

const translationMatrix = mat4.create();
mat4.fromTranslation(translationMatrix, [0.5, -0.5, 0]);
let tMatrix = gl.getUniformLocation(gl.program, 't_matrix');
gl.uniformMatrix4fv(tMatrix, false, new Float32Array(translationMatrix));

const scaleMatrix = mat4.create();
mat4.fromScaling(scaleMatrix, [0.5, 0.5, 1]);
let sMatrix = gl.getUniformLocation(gl.program, 's_matrix');
gl.uniformMatrix4fv(sMatrix, false, new Float32Array(scaleMatrix));

const rotationMatrix = mat4.create();
mat4.fromRotation(rotationMatrix, glMatrix.toRadian(15), [0, 0, 1]);
let rMatrix = gl.getUniformLocation(gl.program, 'r_matrix');
gl.uniformMatrix4fv(rMatrix, false, new Float32Array(rotationMatrix));
```

## 全部代码

```javascript
const gl = box.value!.getContext("webgl") as WEBGL;
    let vertexSource = `
        attribute vec3 a_position;

        uniform mat4 t_matrix; // 平移矩阵
        uniform mat4 s_matrix; // 缩放矩阵
        uniform mat4 r_matrix; // 旋转矩阵

        void main() {
              gl_Position = s_matrix * t_matrix * r_matrix * vec4(a_position, 1.0);
          }
        `;
    let fragmentSource = `
          precision mediump float;
          void main() {
              gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
          }
        `;

    initShader(gl, vertexSource, fragmentSource);

    let arr = [-0.5, -0.5, 0.0, 0.5, -0.5, 0.0, 0.5, 0.5, 0.0, -0.5, 0.5, 0.0];

    let dataArr = new Float32Array(arr);
    let FSIZE = dataArr.BYTES_PER_ELEMENT;

    // 创建buffer
    let positionsBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionsBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, dataArr, gl.STATIC_DRAW);
    let a_position = gl.getAttribLocation(gl.program, "a_position");
    gl.vertexAttribPointer(a_position, 3, gl.FLOAT, false, FSIZE * 3, 0);
    gl.enableVertexAttribArray(a_position);

    const translationMatrix = mat4.create();
    mat4.fromTranslation(translationMatrix, [0.5, -0.5, 0]);
    let tMatrix = gl.getUniformLocation(gl.program, "t_matrix");
    gl.uniformMatrix4fv(tMatrix, false, new Float32Array(translationMatrix));

    const scaleMatrix = mat4.create();
    mat4.fromScaling(scaleMatrix, [0.5, 0.5, 1]);
    let sMatrix = gl.getUniformLocation(gl.program, "s_matrix");
    gl.uniformMatrix4fv(sMatrix, false, new Float32Array(scaleMatrix));

    const rotationMatrix = mat4.create();
    mat4.fromRotation(rotationMatrix, glMatrix.toRadian(15), [0, 0, 1]);
    let rMatrix = gl.getUniformLocation(gl.program, "r_matrix");
    gl.uniformMatrix4fv(rMatrix, false, new Float32Array(rotationMatrix));

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
    gl.drawArrays(gl.POINTS, 0, 4);
```
