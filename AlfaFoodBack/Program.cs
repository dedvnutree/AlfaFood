using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;

namespace AlfaFoodBack
{
    public class Program
    {
        // хз, должны ли контроллеры быть в папке App 
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args)
        {
            return Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder => { webBuilder.UseStartup<Startup>(); });
        }
    }
}