using System;

namespace AlfaFoodBack.Models
{
    public class Table:IDbEntity
    {
        public readonly int? Id;
        public readonly Guid RestaurantId;
        public readonly bool IsFree;
        public readonly string TableId;
        public readonly string Name;

        public Table(Guid restaurantId, bool isFree, string tableId, string name, int? id = null)
        {
            Id = id;
            RestaurantId = restaurantId;
            IsFree = isFree;
            TableId = tableId;
            Name = name;
        }
        
    }
}