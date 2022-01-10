using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using Npgsql;

namespace AlfaFoodBack.Models
{
    public class RestaurantRepository : IRepository
    {
        private IDbConnections dbConnection;
        private DbConnection dbCon;

        public RestaurantRepository(IDbConnections connection)
        {
            dbConnection = connection;
        }
        public void Insert(IDbEntity entity)
        {
            var restaurant = entity as Restaurant;
            using (dbCon = dbConnection.GetConn())
            {
                var command = dbCon.CreateCommand();
                command.CommandType = CommandType.Text;
                command.CommandText =
                    $"INSERT INTO restaurants (id, businessId, name, city, address, description, ownerId, phoneNumber, workingTime, published, email) " +
                    $"VALUES('{restaurant.Id}', '{restaurant.BusinessId}', '{restaurant.Name}','{restaurant.City}', '{restaurant.Address}', " +
                    $"'{restaurant.Description}', '{restaurant.OwnerId}', '{restaurant.PhoneNumber}',  '{restaurant.WorkingTime}', " +
                    $"'{restaurant.Published}', '{restaurant.Email}')";
                command.ExecuteNonQuery();
            }
        }

        public void Delete(Guid id)
        {
            using (dbCon = dbConnection.GetConn())
            {
                var command = dbCon.CreateCommand();
                command.CommandType = CommandType.Text;
                command.CommandText = $"DELETE FROM public.restaurants WHERE id='{id}';";
                command.ExecuteNonQuery();
            }
        }
        
        public void Update(IDbEntity entity)
        {
            var restaurant = entity as Restaurant;
            using (dbCon = dbConnection.GetConn())
            {
                var command = dbCon.CreateCommand();
                command.CommandType = CommandType.Text;
                command.CommandText =
                    $"UPDATE restaurants " +
                    $"SET " +
                    $"businessId = '{restaurant.BusinessId}', name = '{restaurant.Name}', city = '{restaurant.City}', " +
                    $"address = '{restaurant.Address}', description = '{restaurant.Description}', ownerId = '{restaurant.OwnerId}', " +
                    $"phoneNumber = '{restaurant.PhoneNumber}',  workingTime = '{restaurant.WorkingTime}', published = '{restaurant.Published}', " +
                    $"email = '{restaurant.Email}', imagemap='{restaurant.ImageMap}' " +
                    $"WHERE id = '{restaurant.Id}';";
                command.ExecuteNonQuery();
            }
        }

        public IDbEntity GetById(Guid id)
        {
            using (dbCon = dbConnection.GetConn())
            {
                var command = dbCon.CreateCommand();
                command.CommandType = CommandType.Text;
                command.CommandText = $"SELECT * FROM \"restaurants\" WHERE \"id\" = '{id}'";
                var reader = command.ExecuteReader();
                if (!reader.HasRows)
                    return null;

                reader.Read();


                var name = reader.GetString("name");
                var city = reader.GetString("city");
                var address = reader.GetString("address");
                var description = reader.GetString("description");
                var ownerId = reader.GetInt32("ownerId");
                var businessId = reader.GetInt32("businessId");
                var published = reader.GetBoolean("published");
                var phone = reader.GetString("phoneNumber");
                var workingTime = default(string);
                if (!reader.IsDBNull("workingTime"))
                    workingTime = reader.GetString("workingTime");

                var email = default(string);
                if (!reader.IsDBNull("email"))
                    email = reader.GetString("email");

                var imageMap = default(byte[]);
                if (!reader.IsDBNull("imageMap"))
                    imageMap = reader.GetFieldValue<byte[]>("imageMap");

                reader.Close();
                return new Restaurant(businessId, name, city, address, description, ownerId, phone, workingTime,
                    published, id, email, imageMap);
            }
        }

        public IEnumerable<IDbEntity> GetByOwnerId(int ownerId)
        {
            using (dbCon = dbConnection.GetConn())
            {
                var command = dbCon.CreateCommand();
                command.CommandType = CommandType.Text;
                command.CommandText = $"SELECT * FROM \"restaurants\" WHERE \"ownerid\" = {ownerId}";
                var reader = command.ExecuteReader();
                if (!reader.HasRows)
                    yield return null;

                while (reader.Read())
                {
                    var name = reader.GetString("name");
                    var city = reader.GetString("city");
                    var address = reader.GetString("address");
                    var description = reader.GetString("description");
                    var ownerIdResponce = reader.GetInt32("ownerId");
                    var businessId = reader.GetInt32("businessId");
                    var published = reader.GetBoolean("published");
                    var phone = reader.GetString("phoneNumber");
                    var workingTime = default(string);
                    if (!reader.IsDBNull("workingTime"))
                        workingTime = reader.GetString("workingTime");
                    var email = default(string);
                    if (!reader.IsDBNull("email"))
                        email = reader.GetString("email");

                    var imageMap = default(byte[]);
                    if (!reader.IsDBNull("imageMap"))
                        imageMap = reader.GetFieldValue<byte[]>("imageMap");

                    var id = reader.GetGuid("id");
                    yield return new Restaurant(businessId, name, city, address, description, ownerIdResponce, phone,
                        workingTime, published, id, email, imageMap);
                }

                reader.Close();
            }
        }

        public IEnumerable<IDbEntity> GetAllRestaurants()
        {
            using (dbCon = dbConnection.GetConn())
            {
                var command = dbCon.CreateCommand();
                command.CommandType = CommandType.Text;
                command.CommandText = "SELECT * FROM \"restaurants\" ";
                var reader = command.ExecuteReader();
                if (!reader.HasRows)
                    yield return null;

                while (reader.Read())
                {
                    var name = reader.GetString("name");
                    var city = reader.GetString("city");
                    var address = reader.GetString("address");
                    var description = reader.GetString("description");
                    var ownerId = reader.GetInt32("ownerId");
                    var businessId = reader.GetInt32("businessId");
                    var published = reader.GetBoolean("published");
                    var phone = reader.GetString("phoneNumber");
                    var workingTime = default(string);
                    if (!reader.IsDBNull("workingTime"))
                        workingTime = reader.GetString("workingTime");

                    var email = default(string);
                    if (!reader.IsDBNull("email"))
                        email = reader.GetString("email");
                    var id = reader.GetGuid("id");

                    var imageMap = default(byte[]);
                    if (!reader.IsDBNull("imageMap"))
                        imageMap = reader.GetFieldValue<byte[]>("imageMap");

                    yield return new Restaurant(businessId, name, city, address, description, ownerId, phone,
                        workingTime, published, id, email, imageMap);
                }

                reader.Close();
            }
        }

        public IEnumerable<IDbEntity> GetInCity(string cityName)
        {
            using (dbCon = dbConnection.GetConn())
            {
                var command = dbCon.CreateCommand();
                command.CommandType = CommandType.Text;
                command.CommandText = $"SELECT * FROM \"restaurants\" WHERE city = '{cityName}';";
                var reader = command.ExecuteReader();
                if (!reader.HasRows)
                    yield return null;

                while (reader.Read())
                {
                    var name = reader.GetString("name");
                    var city = reader.GetString("city");
                    var address = reader.GetString("address");
                    var description = reader.GetString("description");
                    var ownerId = reader.GetInt32("ownerId");
                    var businessId = reader.GetInt32("businessId");
                    var published = reader.GetBoolean("published");
                    var phone = reader.GetString("phoneNumber");
                    var workingTime = default(string);
                    if (!reader.IsDBNull("workingTime"))
                        workingTime = reader.GetString("workingTime");

                    var email = default(string);
                    if (!reader.IsDBNull("email"))
                        email = reader.GetString("email");
                    var id = reader.GetGuid("id");

                    var imageMap = default(byte[]);
                    if (!reader.IsDBNull("imageMap"))
                        imageMap = reader.GetFieldValue<byte[]>("imageMap");

                    yield return new Restaurant(businessId, name, city, address, description, ownerId, phone,
                        workingTime, published, id, email, imageMap);
                }
            }
        }

        public List<(string, Guid)> GetUnpublishedRestNamesAndIds()
        {
            var restaurants = new List<(string, Guid)>();
            using (var dbCon = dbConnection.GetConn())
            {
                var command = dbCon.CreateCommand();
                command.CommandType = CommandType.Text; // я не знаю, зачем мы тут получаем неопубликованные рестораны
                command.CommandText = @"SELECT * FROM ""public"".""restaurants"" WHERE published=false";
                var reader = command.ExecuteReader();
                while (reader.Read())
                {
                    var name = reader.GetString("name");
                    var id = reader.GetGuid("id");
                    restaurants.Add((name, id));
                }
            }

            return restaurants;
        }
    }
}