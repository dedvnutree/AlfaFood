using Npgsql;
using System;
using System.Collections.Generic;
using System.Data;

namespace AlfaFoodBack.Models
{
    public class DishRepository:IRepository
    {
        public void Insert(NpgsqlConnection dbCon, IDbEntity entity)
        {
            var dish = entity as Dish;
            var command = dbCon.CreateCommand();
            command.CommandType = CommandType.Text;
            command.CommandText =
                $"INSERT INTO Dish (name, ingredients, price,  weightInGrams, restaurantId, image) " +
                $"VALUES('{dish.Name}','{dish.Ingredients}','{dish.Price}','{dish.WeightInGrams}', '{dish.RestaurantId}', '{dish.Image}')";
            command.ExecuteNonQuery();
        }

        public void Update(NpgsqlConnection dbCon, IDbEntity entity)
        {
            var dish = entity as Dish;
            var command = dbCon.CreateCommand();
            command.CommandType = CommandType.Text;
            command.CommandText =
                $"UPDATE Dish " +
                $"SET " +
                    $"name = '{dish.Name}', ingredients='{dish.Ingredients}', price='{dish.Price}', weightInGrams='{dish.WeightInGrams}', restaurantId='{dish.RestaurantId}', image='{dish.Image}'" +
                $"WHERE id = '{dish.Id}';";
            command.ExecuteNonQuery();
        }

        public IDbEntity GetById(NpgsqlConnection dbCon, int id)
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

        public IEnumerable<IDbEntity> GetInRestaurant(NpgsqlConnection dbCon, Guid restaurantId)
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
}