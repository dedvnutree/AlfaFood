using System;
using Npgsql;

namespace AlfaFoodBack
{
    public static class PostgresConn
    {
        public static NpgsqlConnection GetConn()
        {
            bool boolfound = false;
            NpgsqlConnection conn =
                new NpgsqlConnection(
                    @"Server=dumbo.db.elephantsql.com; User Id=tgenvxvp; Password=9Rb_1TwOJ18nG9TEEwIGywMhDhlwOzBI; Database=tgenvxvp"); //<ip> is an actual ip address
            conn.Open();
            return conn;
        }
    }
}