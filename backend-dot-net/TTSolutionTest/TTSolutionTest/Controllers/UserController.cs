using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TTSolutionTest.Data;
using TTSolutionTest.Model;

namespace TTSolutionTest.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [EnableCors("AllowSpecificOrigins")] // Enable CORS for UserController
    public class UserController : Controller
    {
        private readonly UserDbContext userContext;
        public UserController(UserDbContext userContext)
        {
            this.userContext = userContext ?? throw new ArgumentNullException(nameof(userContext));
        }

        [HttpGet]
        public async Task<IActionResult> GetUser()
        {
            return Ok(await userContext.Users.ToListAsync());
        }

        [HttpPost]
        public async Task<IActionResult> AddUser(AddUserRequest addUserContract)
        {
            var user = MapUser(addUserContract);
            await userContext.Users.AddAsync(user);
            await userContext.SaveChangesAsync();
            return Ok(user);
        }

        [HttpPut]
        [Route("{id:guid}")]
        public async Task<IActionResult> UpdateUser([FromRoute] Guid id, UpdateUserRequest updateUserRequest)
        {
            var user = await userContext.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            user.HN = updateUserRequest.HN;
            user.PhoneNumber = updateUserRequest.PhoneNumber;
            user.Name = updateUserRequest.Name;
            user.Email = updateUserRequest.Email;
            await userContext.SaveChangesAsync();
            return Ok(user);

        }

        [HttpGet]
        [Route("{id:guid}")]
        public async Task<IActionResult> GetUser([FromRoute] Guid id)
        {
            var user = await userContext.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpDelete]
        [Route("{id:guid}")]
        public async Task<IActionResult> DeleteUser([FromRoute] Guid id)
        {
            var user = await userContext.Users.FindAsync(id);
            if (user == null)
            {
                return BadRequest();
            }
            userContext.Users.Remove(user);
            await userContext.SaveChangesAsync();

            return Ok();
        }

        private User MapUser(AddUserRequest addUserRequest)
        {
            var user = new User();
            user.Id = Guid.NewGuid();
            user.HN = addUserRequest.HN;
            user.Name = addUserRequest.Name;
            user.PhoneNumber = addUserRequest.PhoneNumber;
            user.Email = addUserRequest.Email;

            return user;
        }
    }
}
