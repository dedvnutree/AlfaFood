using System;
using System.Collections.Generic;
using System.Data;
using Npgsql;

namespace AlfaFoodBack.Models
{
    public class TableRepository:IRepository
    {
        private NpgsqlConnection dbCon;

        public TableRepository()
        {
            dbCon = PostgresConn.GetConn();
        }
        
        public void Insert(IDbEntity entity)
        {
            var table = entity as Table;
            var command = dbCon.CreateCommand();
            command.CommandType = CommandType.Text;
            command.CommandText =
                @$"INSERT INTO public.tables(name, ""tableId"", ""isFree"", ""restaurantId"")
            VALUES ('{table.Name}', '{table.TableId}', {table.IsFree}, '{table.RestaurantId}');";
            command.ExecuteNonQuery();
        }

        public IEnumerable<Table> GetByRestaurantId(Guid restaurantId)
        {
            var command = dbCon.CreateCommand();
            command.CommandType = CommandType.Text;
            command.CommandText =
                @$"SELECT id,name, ""tableId"", ""isFree"", ""restaurantId""
            FROM public.tables WHERE restaurantId='{restaurantId}';";
            var reader = command.ExecuteReader();
            if (!reader.HasRows)
                yield return null;

            while (reader.Read())
            {
                var id = reader.GetInt32("id");
                var name = reader.GetString("name");
                var tableId = reader.GetString("tableId");
                var isFree = reader.GetBoolean("isFree");
                yield return new Table(restaurantId, isFree, tableId, name, id);
            }
        }
        
        public void Update(IDbEntity entity)
        {
            throw new System.NotImplementedException();
        }

        public void Dispose()
        {
            dbCon?.Dispose();
        }
    }
}