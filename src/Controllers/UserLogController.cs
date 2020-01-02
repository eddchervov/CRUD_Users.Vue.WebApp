using CRUD_Users.Api.Models.UserLog;
using CRUD_Users.Api.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace CRUD_Users.WebApp.Controllers
{
    public class UserLogController : Controller
    {
        private readonly IUserLogRemoteCallService _userLogRemoteCallService;

        public UserLogController(IUserLogRemoteCallService userLogRemoteCallService)
        {
            _userLogRemoteCallService = userLogRemoteCallService;
        }

        [HttpPost]
        public async Task<IActionResult> GetAsync([FromBody]GetUserLogRequest request)
        {
            var response = await _userLogRemoteCallService.GetAsync(request);

            return Json(response);
        }
    }
}
