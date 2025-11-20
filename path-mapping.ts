// https://www.youtube.com/watch?v=nv1DygVAMC0

// path mapping es una forma de no usar import relativos, ya que pueden llegar a ser muy pocos legibles y dar paso a errores al mover archivos. Para usar path mapping hay que ir al tsconfig y crear la key 'paths' que recibe como valor un object con cuantas keys quiera  (la * es un wildcard), cada key es un alias y como valor es un arreglo de carpetas en las que buscará typescript
// por convención se pone una arroba y un name (@features, @src) que lo que va a hacer es sustituir esa primera parte de un import (ya no será ../../src/index.ts sino @src/index.ts) o sea solo sustituye la parte de la relatividad de la ruta por una 'wildcard' Interesante e imprescindible

/* {
  "paths": {
    "@module1/*": ["module1/*","test/module1/*"],
    "@module2/*": ["module2/*"]
  }
} */