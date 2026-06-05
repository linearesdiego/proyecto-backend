import { useEffect, useState } from 'react';
import { getProductos, createProducto, updateProducto, deleteProducto } from './api';
import './App.css';

export default function App() {
  const [productos, setProductos] = useState([]);
  const [form, setForm] = useState({ nombre: '', precio: '' });
  const [editId, setEditId] = useState(null);

  useEffect(() => { cargar(); }, []);

  async function cargar() {
    setProductos(await getProductos());
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const data = { nombre: form.nombre, precio: parseFloat(form.precio) };
    if (editId !== null) {
      await updateProducto(editId, data);
      setEditId(null);
    } else {
      await createProducto(data);
    }
    setForm({ nombre: '', precio: '' });
    cargar();
  }

  function handleEdit(p) {
    setEditId(p.id);
    setForm({ nombre: p.nombre, precio: p.precio });
  }

  async function handleDelete(id) {
    if (!confirm('¿Estás seguro de que querés eliminar este producto?')) return;
    await deleteProducto(id);
    cargar();
  }

  function cancelar() {
    setEditId(null);
    setForm({ nombre: '', precio: '' });
  }

  return (
    <div className="app">

      <header className="header">
        <p className="header-eyebrow">Gestión de inventario</p>
        <h1>ABM <span>Productos</span></h1>
        <div className="header-line" />
      </header>

      <div className="form-card">
        <p className="form-title">
          {editId !== null ? (
            <>Editar producto <span className="editing-badge">ID #{editId}</span></>
          ) : 'Nuevo producto'}
        </p>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="field">
              <label htmlFor="nombre">Nombre</label>
              <input
                id="nombre"
                name="nombre"
                placeholder="Ej: Teclado mecánico"
                value={form.nombre}
                onChange={handleChange}
                required
                autoComplete="off"
              />
            </div>
            <div className="field field-small">
              <label htmlFor="precio">Precio ($)</label>
              <input
                id="precio"
                name="precio"
                placeholder="0.00"
                type="number"
                step="0.01"
                min="0"
                value={form.precio}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                {editId !== null ? 'Actualizar' : '+ Agregar'}
              </button>
              {editId !== null && (
                <button type="button" className="btn btn-ghost" onClick={cancelar}>
                  Cancelar
                </button>
              )}
            </div>
          </div>
        </form>
      </div>

      <div>
        <div className="table-header">
          <span className="table-title">Listado</span>
          <span className="table-count">{productos.length} productos</span>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.length === 0 ? (
                <tr>
                  <td colSpan="4">
                    <div className="empty">
                      <span className="empty-icon">◻</span>
                      <p>Sin productos cargados</p>
                    </div>
                  </td>
                </tr>
              ) : (
                productos.map(p => (
                  <tr key={p.id}>
                    <td className="td-id">{p.id}</td>
                    <td className="td-nombre">{p.nombre}</td>
                    <td className="td-precio">${Number(p.precio).toFixed(2)}</td>
                    <td className="td-acciones">
                      <div className="td-acciones-inner">
                        <button className="btn btn-icon btn-edit" onClick={() => handleEdit(p)}>
                          Editar
                        </button>
                        <button className="btn btn-icon btn-delete" onClick={() => handleDelete(p.id)}>
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
