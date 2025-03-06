import React, { useState } from 'react';
import Input from './Input';
import ListaProds from './ListaProds';

function Form() {
    const [productos, setProductos] = useState([]);
    const [prodData, setProdData] = useState({
        nombre: '',
        precio: 0,
        iva: 0.19, // IVA del 19%
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

            // Calcular precio con IVA
            updatedData.precio_iva = updatedData.precio + updatedData.precio * updatedData.iva;

            // Calcular el descuento si está activado
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProductos((prev) => [...prev, prodData]);
    };

    return (
        <div className='grid grid-cols-2'>
            <form className='w-1/3' onSubmit={handleSubmit}>
                <Input
                    type='text'
                    name='nombre'
                    id='nombre'
                    value={prodData.nombre}
                    onChange={handleChange}
                    setProdData={setProdData}
                />
                <Input
                    type='number'
                    name='precio'
                    id='precio'
                    value={prodData.precio}
                    onChange={handleChange}
                    setProdData={setProdData}
                />

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
                        <Input
                            type='number'
                            name='descuento_porcentaje'
                            id='descuento_porcentaje'
                            value={prodData.descuento_porcentaje}
                            onChange={handleChange}
                            setProdData={setProdData}
                        />
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
            <ListaProds productos={productos}/>
        </div>
    );
}

export default Form;
