using Microsoft.EntityFrameworkCore;
using MiApi.Data;
using MiApi.Models;

namespace MiApi.Repositories;

public class ProductoRepository : IProductoRepository
{
    private readonly AppDbContext _context;

    public ProductoRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<Producto>> GetAllAsync() =>
        await _context.Productos.ToListAsync();

    public async Task<Producto?> GetByIdAsync(int id) =>
        await _context.Productos.FindAsync(id);

    public async Task<Producto> CreateAsync(Producto producto)
    {
        _context.Productos.Add(producto);
        await _context.SaveChangesAsync();
        return producto;
    }

    public async Task<Producto?> UpdateAsync(int id, Producto producto)
    {
        var existing = await _context.Productos.FindAsync(id);
        if (existing == null) return null;

        existing.Nombre = producto.Nombre;
        existing.Precio = producto.Precio;
        await _context.SaveChangesAsync();
        return existing;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var existing = await _context.Productos.FindAsync(id);
        if (existing == null) return false;

        _context.Productos.Remove(existing);
        await _context.SaveChangesAsync();
        return true;
    }
}
