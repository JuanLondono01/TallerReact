import React from 'react';

function ListaProds({ productos }) {
    return (
        <div className='w-full overflow-x-auto'>
            <table className='table-auto border-collapse border border-gray-300 w-full text-center'>
                <thead>
                    <tr className='bg-gray-200'>
                        <th className='border border-gray-300 px-4 py-2'>Nombre</th>
                        <th className='border border-gray-300 px-4 py-2'>Precio de Compra</th>
                        <th className='border border-gray-300 px-4 py-2'>Precio con IVA</th>
                        <th className='border border-gray-300 px-4 py-2'>Descuento</th>
                        <th className='border border-gray-300 px-4 py-2'>Porcentaje de Descuento</th>
                        <th className='border border-gray-300 px-4 py-2'>Valor del Descuento</th>
                        <th className='border border-gray-300 px-4 py-2'>Precio Final</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.length > 0 ? (
                        productos.map((prod, index) => (
                            <tr key={index} className='hover:bg-gray-100'>
                                <td className='border border-gray-300 px-4 py-2'>{prod.nombre}</td>
                                <td className='border border-gray-300 px-4 py-2'>${prod.precio.toFixed(2)}</td>
                                <td className='border border-gray-300 px-4 py-2'>${prod.precio_iva.toFixed(2)}</td>
                                <td className='border border-gray-300 px-4 py-2'>{prod.descuento ? 'Sí' : 'No'}</td>
                                <td className='border border-gray-300 px-4 py-2'>
                                    {prod.descuento ? `${prod.descuento_porcentaje.toFixed(2)}%` : '-'}
                                </td>
                                <td className='border border-gray-300 px-4 py-2'>
                                    {prod.descuento ? `$${prod.descuento_valor.toFixed(2)}` : '-'}
                                </td>
                                <td className='border border-gray-300 px-4 py-2'>${prod.precio_final.toFixed(2)}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan='7' className='border border-gray-300 px-4 py-2 text-center'>
                                Aun no hay productos
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default ListaProds;
