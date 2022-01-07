using System.Data;
using Microsoft.AspNetCore.Mvc;

namespace AlfaFoodBack.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LoginController : Controller
    {
        [HttpPost("phys")]
        public IActionResult LoginPhys(string login, string password)
        {
            using (var dbCon = DBUtils.GetDBConnection())
            {
                var command = dbCon.CreateCommand();
                command.CommandType = CommandType.Text;
                command.CommandText = "SELECT name" +
                                      "FROM User" +
                                      $"WHERE login = {login} AND password={password}";


                var reader = command.ExecuteReader();
                if (reader.HasRows)
                    return StatusCode(400);
            }

            return StatusCode(200); // надо определиться с тем, как мы будем авторизовать сессию
        }
    }
}