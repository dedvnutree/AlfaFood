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
    public class RestaurantController : Controller
    {
        [HttpPost("add")]
        public async void AddRestaurant(object data)
        {
            Response.Headers.Add("Access-Control-Allow-Origin", "*");
            var dict = JObject.Parse(data.ToString());

            var businessId = int.Parse(dict["businessId"].ToString());
            var name = dict["name"].ToString();
            var description = dict["description"].ToString();
            var city = dict["city"].ToString();
            var address = dict["address"].ToString();
            var phoneNumber = dict["phone"].ToString();
            var workingTime = dict["workingTime"].ToString();
            var ownerId = int.Parse(dict["userId"].ToString());
            var email = dict["email"].ToString();

            try
            {
                var restaurant = new Restaurant(businessId, name, city, address, description, ownerId,  phoneNumber, workingTime, false, email); 
                using (var dbCon = PostgresConn.GetConn())
                {
                    new RestaurantRepository().Insert(dbCon, restaurant);
                }

                if (!Response.HasStarted) Response.StatusCode = 201;
                await Response.Body.WriteAsync(Encoding.UTF8.GetBytes(restaurant.Id.ToString()));
            }
            catch (Exception e)
            {
                if (!Response.HasStarted) Response.StatusCode = 400;
                await Response.WriteAsync(e.Message);
            }
        }

        [HttpPost("add/image/{id}")]
        public async void AddImage(string id, [FromForm] IFormFile image)
        {
            //byte[] fileBytes;
            //using (var memoryStream = new MemoryStream())  // ЗАКОММЕНТИРОВАНО ПОТОМУ ЧТО решили сохранаять не в бд, а в файлах
            //{
            //    await image.CopyToAsync(memoryStream);
            //    fileBytes = memoryStream.ToArray();
            //}

            try
            {
                var filePath = Path.GetFullPath(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "..\\..\\..\\")) + $"Images\\MAP{id}.jpg";
                using (var stream = System.IO.File.Create(filePath)) // СОХРАНЕНИЕ КАРТИНКИ В ФАЙЛАХ
                {
                    await image.CopyToAsync(stream);
                }

                //using (var dbCon = PostgresConn.GetConn())
                //{
                //    var restaurant = new RestaurantRepository().GetById(dbCon, Guid.Parse(id)) as Restaurant;
                //    restaurant.ImageMap = fileBytes;
                //    new RestaurantRepository().Update(dbCon, restaurant);
                //}

                if (!Response.HasStarted) Response.StatusCode = 200; // кидает ошибку, в тело ничего не пишет, поэтому ексепш закомментирован
                //await Response.Body.WriteAsync(Encoding.UTF8.GetBytes(restaurant.Id.ToString()));
            }
            catch (Exception e)
            {
                //if (!Response.HasStarted) Response.StatusCode = 400;
                //await Response.WriteAsync(e.Message);
            }

        }


        [HttpGet("all")]
        public async void GetAllRestaurants()
        {
            try
            {
                using (var dbCon = PostgresConn.GetConn())
                {
                    var restaurants = new RestaurantRepository().GetAllRestaurants(dbCon);
                    var serializerSettings = new JsonSerializerSettings();
                    serializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                    var json = JsonConvert.SerializeObject(restaurants, serializerSettings);
                    
                    if (!Response.HasStarted) Response.StatusCode = 200;

                    if (json.Contains("[null]"))
                        await Response.Body.WriteAsync(new byte[] { });
                    else
                        await Response.Body.WriteAsync(Encoding.UTF8.GetBytes(json));
                }
            }
            catch (Exception e)
            {
                if (!Response.HasStarted) Response.StatusCode = 400;
                await Response.Body.WriteAsync(Encoding.UTF8.GetBytes(e.Message));
            }
        }

        [HttpGet("{restaurantId:Guid}")]
        public async void GetRestaurantById(Guid restaurantId)
        {
            try
            {
                using (var dbCon = PostgresConn.GetConn())
                {
                    var restaurantAsDBEntity = new RestaurantRepository().GetById(dbCon, restaurantId);
                    var serializerSettings = new JsonSerializerSettings();
                    serializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                    var json = JsonConvert.SerializeObject(restaurantAsDBEntity, serializerSettings);
                    if (!Response.HasStarted) Response.StatusCode = 200;

                    if (json.Contains("[null]"))
                        await Response.Body.WriteAsync(new byte[] { });
                    else
                        await Response.Body.WriteAsync(Encoding.UTF8.GetBytes(json));

                    var restaurant = restaurantAsDBEntity as Restaurant;
                    var filePath = Path.GetFullPath(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "..\\..\\..\\")) + $"Images\\MAP{restaurant.Id}.jpg";
                    await Response.SendFileAsync(filePath);
                }

            }
            catch (Exception e)
            {
                //if (!Response.HasStarted) Response.StatusCode = 400; //кидало ошибку, поэтому закомментил
                //await Response.Body.WriteAsync(Encoding.UTF8.GetBytes(e.Message));
            }
        }

        [HttpGet("owner/{ownerId:int}")]
        public async void GetRestaurantByOwnerId(int ownerId)
        {
            try
            {
                using (var dbCon = PostgresConn.GetConn())
                {
                    var restaurants = new RestaurantRepository().GetByOwnerId(dbCon, ownerId);
                    var serializerSettings = new JsonSerializerSettings();
                    serializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                    var json = JsonConvert.SerializeObject(restaurants, serializerSettings);
                    if (!Response.HasStarted) Response.StatusCode = 200;

                    if (json.Contains("[null]"))
                        await Response.Body.WriteAsync(new byte[] { });
                    else
                        await Response.Body.WriteAsync(Encoding.UTF8.GetBytes(json));
                }
            }
            catch (Exception e)
            {
                if (!Response.HasStarted) Response.StatusCode = 400;
                await Response.Body.WriteAsync(Encoding.UTF8.GetBytes(e.Message));
            }
        }

        [HttpDelete("{id:Guid}")]
        public async void Delete(Guid id)
        {
            try
            {
                using (var dbCon = PostgresConn.GetConn())
                {
                    new RestaurantRepository().Delete(dbCon, id);
                }
            }
            catch (Exception e)
            {
                if (!Response.HasStarted) Response.StatusCode = 400;
                await Response.Body.WriteAsync(Encoding.UTF8.GetBytes(e.Message));
                throw;
            }
        }
        

        [HttpGet("city/{cityName}")]
        public async void GetRestaurantsInCity(string cityName)
        {
            try
            {
                using (var dbCon = PostgresConn.GetConn())
                {
                    var restaurants = new RestaurantRepository().GetInCity(dbCon, cityName);
                    var serializerSettings = new JsonSerializerSettings();
                    serializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                    var json = JsonConvert.SerializeObject(restaurants, serializerSettings);
                    if (!Response.HasStarted) Response.StatusCode = 200;

                    if (json.Contains("[null]"))
                        await Response.Body.WriteAsync(new byte[] { });
                    else
                        await Response.Body.WriteAsync(Encoding.UTF8.GetBytes(json));
                }
            }
            catch (Exception e)
            {
                if (!Response.HasStarted) Response.StatusCode = 400;
                await Response.Body.WriteAsync(Encoding.UTF8.GetBytes(e.Message));
            }
        }

        [HttpGet("dishes/{restaurantId:Guid}")]
        public async void GetDishes(Guid restaurantId)
        {
            try
            {
                using (var dbCon = PostgresConn.GetConn())
                {
                    var dishes = new DishRepository().GetInRestaurant(dbCon, restaurantId);
                    var serializerSettings = new JsonSerializerSettings();
                    serializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                    var json = JsonConvert.SerializeObject(dishes, serializerSettings);
                    if (!Response.HasStarted) Response.StatusCode = 200;


                    if (json.Contains("[null]"))
                        await Response.Body.WriteAsync(new byte[] { });
                    else
                        await Response.Body.WriteAsync(Encoding.UTF8.GetBytes(json));
                }
            }
            catch (Exception e)
            {
                if (!Response.HasStarted) Response.StatusCode = 400;
                await Response.Body.WriteAsync(Encoding.UTF8.GetBytes(e.Message));
            }
        }
    }
}