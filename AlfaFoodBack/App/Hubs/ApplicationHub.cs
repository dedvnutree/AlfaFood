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
        private RestaurantRepository repo;

        public ApplicationHub(RestaurantRepository repository)
        {
            repo = repository;
        }

        public async Task ReceiveApplications()
        {
            var json = "";
            Console.WriteLine("Hub");
            var restaurants = repo.GetUnpublishedRestNamesAndIds();
            json = JsonConvert.SerializeObject(restaurants);
            Console.WriteLine(json);
            await this.Clients.All.SendAsync("ReceiveApplications", json);
        }
    }
}