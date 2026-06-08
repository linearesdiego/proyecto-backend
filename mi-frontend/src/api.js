const BASE_URL = "http://localhost:5148/api/productos";

export async function getProductos(nombre = '') {
  const url = nombre.trim()
    ? `${BASE_URL}?nombre=${encodeURIComponent(nombre.trim())}`
    : BASE_URL;
  const res = await fetch(url);
  return res.json();
}

export async function createProducto(producto) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(producto),
  });
  return res.json();
}

export async function updateProducto(id, producto) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(producto),
  });
  return res.json();
}

export async function deleteProducto(id) {
  await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
}
