using System;
using Microsoft.AspNetCore.Mvc;

namespace AlfaFoodBack.Models
{
    public class User : IDbEntity
    {
        public readonly string Email;

        //public int CurrentOrderId { get; }
        public readonly int? Id;

        // public Stack<Order> OrdersHistory;
        [NonSerialized]
        public readonly string Password;
        public readonly string Phone;
        public readonly string Role;
        public readonly string Username;

        public User(string email, string password, string username, string phone, string role = "none", int? id = null)
        {
            if (!IsLoginValid(email))
                throw new Exception("Invalid login");
            if (!IsPasswordValid(password))
                throw new Exception("Invalid password");
            if (!IsPhoneNumberValid(phone))
                throw new Exception("Invalid phone number");
            Email = email;
            Password = Encryptor.GetHashString(password);
            Username = username;
            Role = role;
            Phone = phone;
            Id = id;
        }
        

        private static bool IsPhoneNumberValid(string phoneNumber)
        {
            return true;
        }

        private static bool IsLoginValid(string login)
        {
            return true;
        }

        private static bool IsPasswordValid(string password)
        {
            return password.Length >= 6;
        }
    }
}