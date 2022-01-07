using Npgsql;

namespace AlfaFoodBack.Models
{
    public interface IRepository
    {
        public void Insert(NpgsqlConnection dbCon, IDbEntity entity);
        public void Update(NpgsqlConnection dbCon, IDbEntity entity);
        //public IDbEntity GetById(NpgsqlConnection dbCon, int id);
    }
}