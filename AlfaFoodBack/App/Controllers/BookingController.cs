using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using AlfaFoodBack.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using Org.BouncyCastle.Asn1.Ocsp;
using Org.BouncyCastle.Crypto.Tls;

namespace AlfaFoodBack.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BookingController : Controller
    {
        [HttpGet("{restaurantId:Guid}")]
        public async void GetBooking(Guid restaurantId)
        {
            try
            {
                var filePath =
                    Path.GetFullPath(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "..\\..\\..\\")) + $"Images\\{restaurantId}.svg";
                await Response.SendFileAsync(filePath);
                using (var repo =new TableRepository())
                {
                    var tables = repo.GetByRestaurantId(restaurantId);
                    var tablesInfo = new List<(string id, string name, bool isFree)>();
                    foreach (var table in tables)
                    {
                        tablesInfo.Add((table.TableId, table.Name, table.IsFree));
                    }
                    var json = JsonConvert.SerializeObject(tablesInfo);
                    Console.WriteLine(json);
                    await Response.WriteAsync(json);
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