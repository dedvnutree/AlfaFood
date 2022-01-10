using Npgsql;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;

namespace AlfaFoodBack.Models
{
    public class DishRepository:IRepository
    {
        private IDbConnections dbConnection;
        private DbConnection dbCon;

        public DishRepository(IDbConnections connection)
        {
            dbConnection = connection;
        }
        
        public void Insert(IDbEntity entity)
        {
            var dish = entity as Dish;
            using (var dbCon = dbConnection.GetConn())
            {
                var command = dbCon.CreateCommand();
                command.CommandType = CommandType.Text;
                command.CommandText =
                    $"INSERT INTO Dish (name, ingredients, price,  weightInGrams, restaurantId, image) " +
                    $"VALUES('{dish.Name}','{dish.Ingredients}','{dish.Price}','{dish.WeightInGrams}', '{dish.RestaurantId}', '{dish.Image}')";
                command.ExecuteNonQuery();
            }
        }

        public void Update(IDbEntity entity)
        {
            var dish = entity as Dish;
            using (dbCon = dbConnection.GetConn())
            {
                var command = dbCon.CreateCommand();
                command.CommandType = CommandType.Text;
                command.CommandText =
                    $"UPDATE Dish " +
                    $"SET " +
                    $"name = '{dish.Name}', ingredients='{dish.Ingredients}', price='{dish.Price}', weightInGrams='{dish.WeightInGrams}', restaurantId='{dish.RestaurantId}', image='{dish.Image}'" +
                    $"WHERE id = '{dish.Id}';";
                command.ExecuteNonQuery();
            }
        }

        public IDbEntity GetById(int id)
        {
            using (dbCon = dbConnection.GetConn())
            {
                var command = dbCon.CreateCommand();
                command.CommandType = CommandType.Text;
                command.CommandText = $"SELECT * FROM \"Dish\" WHERE \"id\" = '{id}'";
                var reader = command.ExecuteReader();
                if (!reader.HasRows)
                    return null;

                reader.Read();

                var name = reader.GetString("name");
                var ingredients = reader.GetString("ingredients");
                var price = reader.GetDecimal("price");
                var weightInGrams = reader.GetDecimal("weightInGrams");
                var restaurantId = reader.GetGuid("restaurantId");

                var image = default(byte[]);
                if (!reader.IsDBNull("image"))
                    image = reader.GetFieldValue<byte[]>("image");


                reader.Close();


                return new Dish(name, ingredients, price, weightInGrams, restaurantId, image, id);
            }
        }
    

        public IEnumerable<IDbEntity> GetInRestaurant(Guid restaurantId)
        {
            using (dbCon = dbConnection.GetConn())
            {
                var command = dbCon.CreateCommand();
                command.CommandType = CommandType.Text;
                command.CommandText = $"SELECT * FROM \"dish\" WHERE restaurantId = '{restaurantId}';";
                var reader = command.ExecuteReader();

                if (!reader.HasRows)
                    yield return null;

                while (reader.Read())
                {
                    var id = reader.GetInt32("id");
                    var name = reader.GetString("name");
                    var ingredients = reader.GetString("ingredients");
                    var price = reader.GetDecimal("price");
                    var weightInGrams = reader.GetDecimal("weightInGrams");

                    var image = default(byte[]);
                    if (!reader.IsDBNull("image"))
                        image = reader.GetFieldValue<byte[]>("image");

                    yield return new Dish(name, ingredients, price, weightInGrams, restaurantId, image, id);
                }

                reader.Close();
            }
        }

        public void Dispose()
        {
            dbCon?.Dispose();
        }
    }
}