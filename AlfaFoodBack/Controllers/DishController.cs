using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using AlfaFoodBack.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json.Serialization;

namespace AlfaFoodBack.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DishController : Controller
    {
        [HttpPost("add")]
        public async void AddDish()
        {
            Request.Form.TryGetValue("name", out var nameField);
            Request.Form.TryGetValue("ingredients", out var ingredientsField);
            Request.Form.TryGetValue("price", out var priceField);
            Request.Form.TryGetValue("weightInGrams", out var weightInGramsField);
            Request.Form.TryGetValue("restaurantId", out var restaurantIdField);

            var name = nameField.ToString();
            var ingredients = ingredientsField.ToString();
            var price = decimal.Parse(priceField.ToString());
            var weightInGrams = decimal.Parse(weightInGramsField.ToString());
            var restaurantId = restaurantIdField.ToString();

            var image = Request.Form.Files.GetFile("image");

            //byte[] fileBytes; преобразование картинки в массив байтов
            //using (var memoryStream = new MemoryStream())
            //{
            //    await image.CopyToAsync(memoryStream);
            //    fileBytes = memoryStream.ToArray();
                
            //}

            try
            {
                var dish = new Dish(name, ingredients, price, weightInGrams, Guid.Parse(restaurantId.ToString()));
                using (var dbCon = PostgresConn.GetConn())
                {
                    new DishRepository().Insert(dbCon, dish);
                }

                var filePath = Path.GetFullPath(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "..\\..\\..\\")) + $"Images\\DISH{restaurantId + name}.jpg";
                using (var stream = System.IO.File.Create(filePath)) // СОХРАНЕНИЕ КАРТИНКИ В ФАЙЛАХ
                {
                    await image.CopyToAsync(stream);
                }

                //Response.StatusCode = 201;
            }
            catch (Exception e)
            {
                Response.StatusCode = 400;
                await Response.WriteAsync(e.Message);
            }
        }

        [HttpGet("{dishId:int}")]
        public async void GetDishById(int dishId)
        {
            try
            {
                using (var dbCon = PostgresConn.GetConn())
                {
                    var dishAsDBEntity = new DishRepository().GetById(dbCon, dishId);
                    var serializerSettings = new JsonSerializerSettings();
                    serializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                    var json = JsonConvert.SerializeObject(dishAsDBEntity, serializerSettings);
                    Response.StatusCode = 200;

                    if (!(dishAsDBEntity == null || json.Contains("[null]")))
                        await Response.Body.WriteAsync(Encoding.UTF8.GetBytes(json));

                    var dish = dishAsDBEntity as Dish;
                    var filePath = Path.GetFullPath(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "..\\..\\..\\")) + $"Images\\DISH{dish.RestaurantId + dish.Name}.jpg";
                    await Response.SendFileAsync(filePath);
                }

            }
            catch (Exception e)
            {
                Response.StatusCode = 400;
                await Response.Body.WriteAsync(Encoding.UTF8.GetBytes(e.Message));
            }
        }
    }
}