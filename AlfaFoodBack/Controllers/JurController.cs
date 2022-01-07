using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO.Pipelines;
using System.Security.Claims;
using System.Text;
using System.Text.Json.Serialization;
using AlfaFoodBack.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

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
                using (var dbCon = PostgresConn.GetConn())
                {
                    var restaurants = new RestaurantRepository().GetByOwnerId(dbCon, userId);
                    var json = JsonConvert.SerializeObject(restaurants);
                    await Response.Body.WriteAsync(Encoding.UTF8.GetBytes(json));
                    Response.StatusCode = 200;

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