using System;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;

namespace AlfaFoodBack.Models
{
    public class Order:IDbEntity
    {
        public readonly string Id;
        public readonly int UserId;
        public readonly string RestaurantId;
        public readonly DateTime CreationDateTime;
        public readonly bool IsCompleted;
        public readonly string[] DishesIds;
        public readonly string TableId;
        public readonly string TimeToGet;

        public Order(int userId, string restaurantId, string tableId, string timeToGet, string[] dishesIds, bool isCompleted = false, string id = null)
        {
            UserId = userId;
            RestaurantId = restaurantId;
            DishesIds = dishesIds;
            CreationDateTime = DateTime.Now;
            IsCompleted = isCompleted;
            Id = id ?? new Guid().ToString();
            Console.WriteLine(Id);
            TableId = tableId;
            TimeToGet = timeToGet;
        }
    }
}

