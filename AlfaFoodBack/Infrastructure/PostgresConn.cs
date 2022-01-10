using System;
using System.Data.Common;
using Microsoft.Extensions.Configuration;
using Npgsql;

namespace AlfaFoodBack
{
    public class PostgresConn:IDbConnections
    {
        public DbConnection GetConn()
        {
            var dbCon = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json")
                .Build()
                .GetSection("AppSettings")["DBcon"];
            bool boolfound = false;
            NpgsqlConnection conn =
                new NpgsqlConnection(
                    dbCon); //<ip> is an actual ip address
            conn.Open();
            return conn;
        }
    }
}