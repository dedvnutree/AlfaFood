using System;
using System.IO;
using System.Net.Http.Formatting;
using System.Text;
using AlfaFoodBack.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using Org.BouncyCastle.Ocsp;

namespace AlfaFoodBack.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ApplicationController : Controller
    {
        [HttpGet("{id:Guid}")]
        public async void GetApplication(Guid id)
        {
            try
            {
                using (var repo = new RestaurantRepository())
                {
                    var restaurant = repo.GetById(id);
                    var serializerSettings = new JsonSerializerSettings();
                    serializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                    var json = JsonConvert.SerializeObject(restaurant, serializerSettings);
                    Response.StatusCode = 200;

                    if (!(restaurant == null || json.Contains("[null]")))
                        await Response.Body.WriteAsync(Encoding.UTF8.GetBytes(json));
                }

            }
            catch (Exception e)
            {
                Response.StatusCode = 400;
                await Response.Body.WriteAsync(Encoding.UTF8.GetBytes(e.Message));
            } 
        }
        
        [HttpPost("confirm/{id:Guid}")]
        public async void ConfirmApplication(Guid id)
        {
            try
            {
                Restaurant restaurant = null;
                using (var repo = new RestaurantRepository())
                {
                    restaurant = repo.GetById(id) as Restaurant;
                    if (restaurant.Published)
                        throw new Exception("Restaurant has already published");
                    restaurant.Published = true;
                }

                using (var repo = new RestaurantRepository())
                {
                    repo.Update(restaurant);
                }
                
                var queryParams = Request.QueryString.Value.Trim('?').Split('&');
                foreach (var param in queryParams)
                {
                    var parts = param.Split('=');
                    var table = new Table(id, true, parts[1], parts[0]);
                    using (var repo = new TableRepository())
                    {
                        repo.Insert(table);
                    }
                }
                var files = Request.Form.Files;
                foreach (var formFile in files)
                {
                    if (formFile.Length > 0)
                    {
                        var filePath =
                            Path.GetFullPath(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "..\\..\\..\\")) + $"Images\\{id}.svg";
                        using (var stream = System.IO.File.Create(filePath))
                        {
                            await formFile.CopyToAsync(stream);
                        }
                    }
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