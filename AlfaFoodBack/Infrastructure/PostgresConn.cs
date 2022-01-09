using System;
using Microsoft.Extensions.Configuration;
using Npgsql;

namespace AlfaFoodBack
{
    public static class PostgresConn
    {
        public static NpgsqlConnection GetConn()
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