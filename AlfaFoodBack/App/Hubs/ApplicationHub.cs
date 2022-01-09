using System;
using System.Collections.Generic;
using System.Data;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using AlfaFoodBack;
using AlfaFoodBack.Models;
using Newtonsoft.Json;

namespace SignalRApp
{
    public class ApplicationHub : Hub
    {
        public async Task ReceiveApplications()
        {
            var json = "";
            Console.WriteLine("Hub");
            using (var dbCon = PostgresConn.GetConn())
            {
                var command = dbCon.CreateCommand();
                command.CommandType = CommandType.Text; // я не знаю, зачем мы тут получаем неопубликованные рестораны
                command.CommandText = @"SELECT * FROM ""public"".""restaurants"" WHERE published=false";
                var reader = command.ExecuteReader();
                if (!reader.HasRows)
                    await this.Clients.All.SendAsync("ReceiveApplications", "");
                var restaurants = new List<(string, Guid)>();
                while (reader.Read())
                {
                    var name = reader.GetString("name");
                    var id = reader.GetGuid("id");
                    restaurants.Add((name, id));
                }
                json = JsonConvert.SerializeObject(restaurants);
                Console.WriteLine(json);
                await this.Clients.All.SendAsync("ReceiveApplications", json);
            }
        }
    }
}