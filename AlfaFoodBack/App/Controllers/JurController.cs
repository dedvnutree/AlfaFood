using System;
using System.Text;
using AlfaFoodBack.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace AlfaFoodBack.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class JurController : Controller
    {
        [Authorize]
        [HttpGet("establishmentsList/{userId}")]
        public async void AuthPhys(int userId)
        {
            try
            {
                var repo = new RestaurantRepository();
                var restaurants = repo.GetByOwnerId(userId);
                var json = JsonConvert.SerializeObject(restaurants);
                await Response.Body.WriteAsync(Encoding.UTF8.GetBytes(json));
                Response.StatusCode = 200;
            }
            catch (Exception e)
            {
                Response.StatusCode = 400;
                await Response.Body.WriteAsync(Encoding.UTF8.GetBytes(e.Message));
            }
        }
    }
}