using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using Ninject;

namespace AlfaFoodBack
{
    public class Program
    {
        public static void Main(string[] args)
        {
            // var container = new StandardKernel(); // не нашел применения 
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args)
        {
            return Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder => { webBuilder.UseStartup<Startup>(); });
        }
    }
}