using CRUD_Users.Api.Models.User;
using CRUD_Users.Api.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace CRUD_Users.Vue.WebApp.Controllers
{
    public class UserController : Controller
    {
        private readonly IUserRemoteCallService _userRemoteCallService;

        public UserController(IUserRemoteCallService userRemoteCallService)
        {
            _userRemoteCallService = userRemoteCallService;
        }

        [HttpGet]
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost("users/get")]
        public async Task<IActionResult> GetAsync([FromBody]GetUsersRequest request)
        {
            var response = await _userRemoteCallService.GetAsync(request);

            return Json(response);
        }

        [HttpPost("users/create")]
        public async Task<IActionResult> CreateAsync([FromBody]CreateUserRequest request)
        {
            var response = await _userRemoteCallService.CreateAsync(request);

            return Json(response);
        }

        [HttpPost("users/update")]
        public async Task<IActionResult> UpdateAsync([FromBody]UpdateUserRequest request)
        {
            var response = await _userRemoteCallService.UpdateAsync(request);

            return Json(response);
        }
    }
}
