// ClickedPints.js (c) 2012 matsuda
// Vertex shader program
var VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
  'attribute float a_Dimension;\n' +
  'void main() {\n' +
  '  gl_Position = a_Position;\n' +
  '  gl_PointSize = a_Dimension;\n' +
  '}\n';

// Fragment shader program
var FSHADER_SOURCE =
  'void main() {\n' +
  '  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' +
  '}\n';

function main() {
  // Retrieve <canvas> element
  var canvas = document.getElementById('webgl');

  // Get the rendering context for WebGL
  var gl = getWebGLContext(canvas);
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }

  // Initialize shaders
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to intialize shaders.');
    return;
  }

  //set positions of vertices
  var n= initVertexBuffers(gl);
  if(n<0) {
      console.log('Failed to set the position of vertices');
      return;
  }


  // Specify the color for clearing <canvas>
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.drawArrays(gl.POINTS, 0, n);
}

function initVertexBuffers(gl){
    var vertices = new Float32Array([
        0.0, 0.0,   0.5, 0.5,   -0.5, -0.5
    ]);
    var n= 3;

    // point sizes
    var sizes = new Float32Array([
        30.0, 10.0, 10.0
    ]);

    //create buffer object
    var vertexBuffer = gl.createBuffer();
    var sizeBuffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    // // Get the storage location of a_Position
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    if (a_Position < 0) {
      console.log('Failed to get the storage location of a_Position');
      return;
  }

    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray(a_Position);

    gl.bindBuffer(gl.ARRAY_BUFFER, sizeBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, sizes, gl.STATIC_DRAW);

    // // Get the storage location of a_Position
    var a_Dimension = gl.getAttribLocation(gl.program, 'a_Dimension');
    if (a_Dimension < 0) {
      console.log('Failed to get the storage location of a_Dimension');
      return;
    }

    gl.vertexAttribPointer(a_Dimension, 1, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray(a_Dimension);


    return n;

}
