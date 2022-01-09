using System;

namespace AlfaFoodBack.Models
{
    public class Dish:IDbEntity
    {
        public readonly int? Id;
        public readonly string Name;
        public readonly string Ingredients;
        public readonly decimal Price;
        public readonly decimal WeightInGrams;
        public readonly Guid RestaurantId;
        public byte[] Image;

        public Dish (string name, string ingredients, decimal price, decimal weightInGrams, Guid restaurantId, byte[] image = null, int? id = null)
        {
            Id = id;
            Name = name;
            Ingredients = ingredients;
            Price = price;
            WeightInGrams = weightInGrams;
            RestaurantId = restaurantId;
            Image = image;
        }
    }
}