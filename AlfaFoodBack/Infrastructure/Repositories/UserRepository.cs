using System;
using System.Data;
using Npgsql;

namespace AlfaFoodBack.Models
{
    public class UserRepository : IRepository
    {
        private NpgsqlConnection dbCon;

        public UserRepository()
        {
            dbCon = PostgresConn.GetConn();
        }
        public void Insert(IDbEntity entity)
        {
            var user = entity as User;
            if (UserWithLoginExists(user.Email)) 
                throw new Exception("User exists");
            var command = dbCon.CreateCommand();
            command.CommandType = CommandType.Text;
            command.CommandText =
                $"INSERT INTO \"public\".\"users\"(username, role, phone, password, email) VALUES ('{user.Username}', '{user.Role}', '{user.Phone}', '{user.Password}', '{user.Email}')";
            command.ExecuteNonQuery();
        }

        public void Update(IDbEntity entity)
        {
            throw new NotImplementedException();
        }

        public IDbEntity GetById(int id)
        {
            throw new NotImplementedException();
        }

        public User IsAuth(string login, string password)
        {
            var passHash = Encryptor.GetHashString(password);
            var command = dbCon.CreateCommand();
            Console.WriteLine(passHash);
            command.CommandType = CommandType.Text;
            command.CommandText =
                $"select * from \"public\".\"users\" where email='{login}' and password='{passHash}'";
            var dataReader = command.ExecuteReader();
            if (!dataReader.HasRows)
                return null;
            dataReader.Read();
            var username = dataReader[0].ToString();
            var role = dataReader[1].ToString();
            var phone = dataReader[2].ToString();
            var id = int.Parse(dataReader[5].ToString());
            dataReader.Close();
            return new User(login, password, username, phone, role, id);
        }

        public bool UserWithLoginExists(string login)
        {
            var command = dbCon.CreateCommand();
            command.CommandType = CommandType.Text;
            command.CommandText = $"SELECT FROM \"public\".\"users\" Where email='{login}';";
            var result = command.ExecuteReader();
            return result.HasRows;
        }

        public void Dispose()
        {
            dbCon?.Dispose();
        }
    }
}