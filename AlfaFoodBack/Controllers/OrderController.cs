using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using AlfaFoodBack.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json.Serialization;

namespace AlfaFoodBack.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class OrderController : Controller
    {
        [HttpPost("create")]
        public async void CreateOrder(object data)
        {
            Response.Headers.Add("Access-Control-Allow-Origin", "*");
            Order order;
            var dict = JObject.Parse(data.ToString());
            var userId = int.Parse(dict["userId"].ToString());
            var restaurantId = dict["restaurantId"].ToString();
            var timeToGet = dict["timeToGet"].ToString();
            var tableId = dict["tableId"].ToString();
            var dishesIds = dict["dishesIds"].ToString().Trim('[').Trim(']').Split(", ");
            try
            {
                order = new Order(userId, restaurantId, tableId, timeToGet, dishesIds);
                Console.WriteLine(order);
                using (var dbCon = PostgresConn.GetConn())
                {
                    if(dbCon == null)
                        Console.WriteLine("null");
                    new OrderRepository().Insert(dbCon, order);
                    Console.WriteLine("insert");
                    Response.StatusCode = 201;
                }

                Console.WriteLine("insert");
            }
            catch (Exception e)
            {
                Response.StatusCode = 400;
                await Response.WriteAsync(e.Message);
            }
        }
    }
}