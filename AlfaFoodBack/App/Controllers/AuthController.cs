using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using AlfaFoodBack.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json.Serialization;

namespace AlfaFoodBack.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : Controller
    {
        private UserRepository repo;
        public AuthController(UserRepository repository)
        {
            repo = repository;
        }
        
        [HttpDelete("jur")]
        public async void LogOut()
        {
            try
            {
                if (Request.Cookies["token"] != null)
                {
                    Response.Cookies.Append("token", "", new CookieOptions() {Expires = DateTime.Now.AddDays(-1d)});
                }

                Response.StatusCode = 200;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                Response.StatusCode = 400;
            }
        }

        [HttpDelete("phys")]
        public async void LogOutPhys()
        {
            try
            {
                if (Request.Cookies["token"] != null)
                {
                    Response.Cookies.Append("token", "", new CookieOptions() {Expires = DateTime.Now.AddDays(-1d)});
                }

                Response.StatusCode = 200;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                Response.StatusCode = 400;
            }
        }

        [HttpPost("phys")]
        public async void AuthPhys(object data)
        {
            Console.WriteLine("helloooo");
            Response.Headers.Add("Access-Control-Allow-Origin", "*");
            var dict = JObject.Parse(data.ToString());
            var email = dict["email"].ToString();
            var password = dict["password"].ToString();
            try
            {
                var user = repo.IsAuth(email, password);

                if (user == null)
                {
                    Response.StatusCode = 400;
                    await Response.WriteAsync("Incorrect login or password");
                }
                else
                {
                    if (user.Role != "none")
                    {
                        Response.StatusCode = 403;
                        await Response.WriteAsync("You can't see this page");
                        return;
                    }

                    var now = DateTime.UtcNow;
                    var claims = new List<Claim>();
                    claims.Add(new Claim(ClaimsIdentity.DefaultNameClaimType, user.Email));
                    claims.Add(new Claim(ClaimsIdentity.DefaultRoleClaimType, user.Role));
                    var jwt = new JwtSecurityToken(
                        issuer: AuthOptions.ISSUER,
                        audience: AuthOptions.AUDIENCE,
                        notBefore: now,
                        claims: claims,
                        expires: now.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME)),
                        signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(),
                            SecurityAlgorithms.HmacSha256));
                    var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);
                    var serializerSettings = new JsonSerializerSettings();
                    serializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                    var json = JsonConvert.SerializeObject(user, serializerSettings);
                    Response.Cookies.Append("token", encodedJwt);
                    await Response.Body.WriteAsync(Encoding.UTF8.GetBytes(json));
                }
            }
            catch (Exception e)
            {
                Response.StatusCode = 400;
                await Response.WriteAsync(e.Message);
            }
        }

        [HttpPost("jur")]
        public async void AuthJur(object data)
        {
            Response.Headers.Add("Access-Control-Allow-Origin", "*");
            var dict = JObject.Parse(data.ToString());
            var email = dict["email"].ToString();
            var password = dict["password"].ToString();
            try
            {
                var user = repo.IsAuth(email, password);
                if (user == null)
                {
                    Response.StatusCode = 400;
                    await Response.WriteAsync("Incorrect login or password");
                }
                else
                {
                    Console.WriteLine((user.Role));
                    if (user.Role != "owner" && user.Role != "admin")
                    {
                        Response.StatusCode = 403;
                        await Response.WriteAsync("You can't see this page");
                        return;
                    }

                    var now = DateTime.UtcNow;
                    var claims = new List<Claim>();
                    claims.Add(new Claim(ClaimsIdentity.DefaultNameClaimType, user.Email));
                    claims.Add(new Claim(ClaimsIdentity.DefaultRoleClaimType, user.Role));
                    var jwt = new JwtSecurityToken(
                        issuer: AuthOptions.ISSUER,
                        audience: AuthOptions.AUDIENCE,
                        notBefore: now,
                        claims: claims,
                        expires: now.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME)),
                        signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(),
                            SecurityAlgorithms.HmacSha256));
                    var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);
                    var serializerSettings = new JsonSerializerSettings();
                    serializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                    var json = JsonConvert.SerializeObject(user, serializerSettings);
                    Response.Cookies.Append("token", encodedJwt);
                    await Response.Body.WriteAsync(Encoding.UTF8.GetBytes(json));
                }
            }
            catch (Exception e)
            {
                Response.StatusCode = 400;
                await Response.WriteAsync(e.Message);
            }
        }
    }
}