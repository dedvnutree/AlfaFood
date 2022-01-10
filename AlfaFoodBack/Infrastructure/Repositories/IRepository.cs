using System;
using Npgsql;

namespace AlfaFoodBack.Models
{
    public interface IRepository
    {
        public void Insert(IDbEntity entity);
        public void Update(IDbEntity entity);
        //public IDbEntity GetById(NpgsqlConnection dbCon, int id);
    }
}