import React from 'react';

function Input({ type, id, name, disabled = false, setProdData }) {

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        let newValue = type === 'number' ? parseFloat(value) || 0 : value;

        setProdData((prevData) => {
            const newData = { ...prevData, [name]: newValue };

            newData.precio_iva = newData.precio + (newData.precio * newData.iva);

            if (newData.descuento) {
                newData.descuento_valor = newData.precio_iva * (newData.descuento_porcentaje / 100);
                newData.precio_final = newData.precio_iva - newData.descuento_valor;
            } else {
                newData.descuento_valor = 0;
                newData.precio_final = newData.precio_iva;
            }

            return newData;
        });
    };

    return (
        <div className='input-form'>
            <label htmlFor={id}>{name}</label>
            <input type={type} id={id} name={id} disabled={disabled} onChange={handleChange} />
        </div>
    );
}

export default Input;
