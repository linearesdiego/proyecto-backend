using MiApi.Models;
using MiApi.Repositories;

namespace MiApi.Services;

public class ProductoService : IProductoService
{
    private readonly IProductoRepository _repository;

    public ProductoService(IProductoRepository repository)
    {
        _repository = repository;
    }

    public Task<List<Producto>> GetAllAsync() => _repository.GetAllAsync();

    public Task<Producto?> GetByIdAsync(int id) => _repository.GetByIdAsync(id);

    public Task<Producto> CreateAsync(Producto producto) => _repository.CreateAsync(producto);

    public Task<Producto?> UpdateAsync(int id, Producto producto) => _repository.UpdateAsync(id, producto);

    public Task<bool> DeleteAsync(int id) => _repository.DeleteAsync(id);
}
