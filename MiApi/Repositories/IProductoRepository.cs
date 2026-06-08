using MiApi.Models;

namespace MiApi.Repositories;

public interface IProductoRepository
{
    Task<List<Producto>> GetAllAsync(string? nombre = null);
    Task<Producto?> GetByIdAsync(int id);
    Task<Producto> CreateAsync(Producto producto);
    Task<Producto?> UpdateAsync(int id, Producto producto);
    Task<bool> DeleteAsync(int id);
}
