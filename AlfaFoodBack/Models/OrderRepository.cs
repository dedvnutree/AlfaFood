using System;
using System.Data;
using Npgsql;

namespace AlfaFoodBack.Models
{
    public class OrderRepository: IRepository
    {
        public void Insert(NpgsqlConnection dbCon, IDbEntity entity)
        {
            var order = entity as Order;
            var command = dbCon.CreateCommand();
            command.CommandType = CommandType.Text;
            command.CommandText =
                $"INSERT INTO public.orders (id, \"userId\", \"restaurantId\", \"tableId\", \"creationDateTime\", \"timeToGet\", \"isCompleted\") " +
                $"VALUES" +
                $" ('{order.Id}',{order.UserId}, '{order.RestaurantId}', '{order.TableId}', {order.CreationDateTime}, '{order.TimeToGet}', {order.IsCompleted} )";
            command.ExecuteNonQuery();
            foreach (var dishesId in order.DishesIds)
            {
                using (var con = PostgresConn.GetConn())
                {
                    command = con.CreateCommand();
                    command.CommandType = CommandType.Text;
                    command.CommandText =
                        $"INSERT INTO public.orderswithdishes (\"orderId\", \"dishId\") " +
                        $"VALUES" +
                        $" ('{order.Id}', '{dishesId}' )";
                    command.ExecuteNonQuery();
                }
            }
        }

        public void Update(NpgsqlConnection dbCon, IDbEntity entity)
        {
            throw new System.NotImplementedException();
        }
    }
}