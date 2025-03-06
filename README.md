# Proyecto de Gestión de Productos en React

Este proyecto es una aplicación en React que permite registrar productos con cálculo automático del precio con IVA, la aplicación de descuentos y la generación dinámica de una tabla con los productos ingresados.

## Estructura del Proyecto

El proyecto está compuesto por los siguientes archivos principales:

### 1. `App.js`
Es el componente principal que renderiza el formulario y la tabla de productos.
```jsx
import React from 'react';
import Form from './components/Form';

function App() {
    return (
        <div>
            <Form />
        </div>
    );
}

export default App;
```

### 2. `Form.js`
Este componente maneja la entrada de datos de los productos y actualiza el estado global de la lista de productos.

#### Funcionalidades:
- Permite ingresar el nombre y precio del producto.
- Calcula automáticamente el precio con IVA.
- Permite activar/desactivar descuentos y calcular el valor del descuento.
- Envía los datos del producto a la lista de productos al hacer submit.

```jsx
import React, { useState } from 'react';
import Input from './Input';
import ListaProds from './ListaProds';

function Form() {
    const [productos, setProductos] = useState([]);
    const [prodData, setProdData] = useState({
        nombre: '',
        precio: 0,
        iva: 0.19,
        precio_iva: 0,
        descuento: false,
        descuento_porcentaje: 0,
        descuento_valor: 0,
        precio_final: 0,
    });

    const handleCheckboxChange = (e) => {
        const isChecked = e.target.checked;
        setProdData((prevData) => {
            const newData = { ...prevData, descuento: isChecked };
            if (!isChecked) {
                newData.descuento_porcentaje = 0;
                newData.descuento_valor = 0;
                newData.precio_final = newData.precio_iva;
            }
            return newData;
        });
    };

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        let newValue = type === 'number' ? parseFloat(value) || 0 : value;

        setProdData((prevData) => {
            const updatedData = { ...prevData, [name]: newValue };
            updatedData.precio_iva = updatedData.precio + updatedData.precio * updatedData.iva;

            if (updatedData.descuento) {
                updatedData.descuento_valor = updatedData.precio_iva * (updatedData.descuento_porcentaje / 100);
                updatedData.precio_final = updatedData.precio_iva - updatedData.descuento_valor;
            } else {
                updatedData.descuento_valor = 0;
                updatedData.precio_final = updatedData.precio_iva;
            }

            return updatedData;
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setProductos((prev) => [...prev, prodData]);
    };

    return (
        <div className='grid grid-cols-2'>
            <form className='w-1/3' onSubmit={handleSubmit}>
                <Input type='text' name='nombre' id='nombre' value={prodData.nombre} onChange={handleChange} />
                <Input type='number' name='precio' id='precio' value={prodData.precio} onChange={handleChange} />
                <div>
                    <label>Precio con IVA:</label>
                    <input type='number' value={prodData.precio_iva.toFixed(2)} disabled />
                </div>
                <div>
                    <label htmlFor='desc'>Incluir descuento</label>
                    <input type='checkbox' id='desc' checked={prodData.descuento} onChange={handleCheckboxChange} />
                </div>
                {prodData.descuento && (
                    <>
                        <Input type='number' name='descuento_porcentaje' id='descuento_porcentaje' value={prodData.descuento_porcentaje} onChange={handleChange} />
                        <div>
                            <label>Valor del Descuento:</label>
                            <input type='number' value={prodData.descuento_valor.toFixed(2)} disabled />
                        </div>
                    </>
                )}
                <div>
                    <label>Precio Final:</label>
                    <input type='number' value={prodData.precio_final.toFixed(2)} disabled />
                </div>
                <button type='submit'>Enviar</button>
            </form>
            <ListaProds productos={productos} />
        </div>
    );
}
export default Form;
```

### 3. `ListaProds.js`
Este componente muestra la lista de productos ingresados en una tabla.

```jsx
import React from 'react';
function ListaProds({ productos }) {
    return (
        <div className='w-full overflow-x-auto'>
            <table className='table-auto border-collapse border border-gray-300 w-full text-center'>
                <thead>
                    <tr className='bg-gray-200'>
                        <th>Nombre</th>
                        <th>Precio Compra</th>
                        <th>Precio con IVA</th>
                        <th>Descuento</th>
                        <th>% Descuento</th>
                        <th>Valor Descuento</th>
                        <th>Precio Final</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.length > 0 ? (
                        productos.map((prod, index) => (
                            <tr key={index}>
                                <td>{prod.nombre}</td>
                                <td>${prod.precio.toFixed(2)}</td>
                                <td>${prod.precio_iva.toFixed(2)}</td>
                                <td>{prod.descuento ? 'Sí' : 'No'}</td>
                                <td>{prod.descuento ? `${prod.descuento_porcentaje.toFixed(2)}%` : '-'}</td>
                                <td>{prod.descuento ? `$${prod.descuento_valor.toFixed(2)}` : '-'}</td>
                                <td>${prod.precio_final.toFixed(2)}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan='7'>Aún no hay productos</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
export default ListaProds;
```

¡Este proyecto es totalmente funcional y escalable! 🚀

