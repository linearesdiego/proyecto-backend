using MiApi.Models;

namespace MiApi.Services;

public interface IProductoService
{
    Task<List<Producto>> GetAllAsync(string? nombre = null);
    Task<Producto?> GetByIdAsync(int id);
    Task<Producto> CreateAsync(Producto producto);
    Task<Producto?> UpdateAsync(int id, Producto producto);
    Task<bool> DeleteAsync(int id);
}
