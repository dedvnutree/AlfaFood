using MySql.Data.MySqlClient;

namespace AlfaFoodBack
{
    public class DBUtils
    {
        public static MySqlConnection GetDBConnection()
        {
            var host = "127.0.0.1";
            var port = 3306;
            var database = "alfa-food";
            var username = "root";
            var password = "root";

            return DBMySQLUtils.GetDBConnection(host, port, database, username, password);
        }
    }
}