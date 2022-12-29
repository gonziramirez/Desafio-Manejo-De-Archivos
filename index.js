const fs = require('fs');

class ProductManager {
    constructor() {
      this.products = [];
      this.nextId = 1; // autoincrementable ID para cada producto
    }
  
    addProduct(title, description, price, thumbnail, code, stock) {
      // Validar que todos los campos son obligatorios
      if (!title || !description || !price || !thumbnail || !code || !stock) {
        console.error('Todos los campos son requeridos');
        return;
      }
  
      // Validar que no se repita el campo "code"
      const existingProduct = this.products.find(product => product.code === code);
      if (existingProduct) {
        console.error('El codigo ya existe');
        return;
      }
  
      // Crear un nuevo producto con un ID autoincrementable
      const product = {
        id: this.nextId,
        title,
        description,
        price,
        thumbnail,
        code,
        stock
      };
      this.products.push(product);
      this.nextId++;
    }
  
    getProducts() {
      return this.products;
    }
  
    getProductById(id) {
      const product = this.products.find(product => product.id === id);
      if (!product) {
        console.error('Not found');
        return;
      }
      return product;
    }
    updateProduct(id, updates) {
        // Encontrar el producto con el ID especificado
        const productIndex = this.products.findIndex(product => product.id === id);
        if (productIndex === -1) {
          console.error('Producto no encontrado');
          return;
        }
    
        // Actualizar el producto con los cambios especificados
        this.products[productIndex] = { ...this.products[productIndex], ...updates };
      }
    
      deleteProduct(id) {
        // Encontrar el índice del producto con el ID especificado
        const productIndex = this.products.findIndex(product => product.id === id);
        if (productIndex === -1) {
          console.error('Producto no encontrado');
          return;
        }
    
        // Eliminar el producto del arreglo de productos
        this.products.splice(productIndex, 1);
      }
  // Método para cargar los productos desde un archivo JSON
  loadProducts() {
    try {
      const data = fs.readFileSync('products.json');
      this.products = JSON.parse(data);
      this.nextId = this.products.length + 1;
    } catch (error) {
      console.error(error);
    }
  }

  // Método para guardar los productos en un archivo JSON
  saveProducts() {
    try {
      const data = JSON.stringify(this.products);
      fs.writeFileSync('products.json', data);
    } catch (error) {
      console.error(error);
    }
  }
}


const productManager = new ProductManager();

//Creacion de productos
productManager.addProduct('Producto 1', 'Descripcion del producto 1', 9.99, 'img/product1.jpg', 'P1', 10);
productManager.addProduct('Producto 2', 'Descripcion del producto 2', 14.99, 'img/product2.jpg', 'P2', 5);
productManager.addProduct('Producto 2', 'Descripcion del producto 2', 14.99, 'img/product2.jpg', 'P2', 5);

console.log(productManager.getProducts()); // [{id: 1, title: 'Producto 1', ...}, {id: 2, title: 'Producto 2', ...}]
console.log(productManager.getProductById(1)); // {id: 1, title: 'Producto 1', ...}



productManager.updateProduct(2, { title: 'Producto actualizado', price: 12.99 });
productManager.deleteProduct(1);

productManager.saveProducts();



  