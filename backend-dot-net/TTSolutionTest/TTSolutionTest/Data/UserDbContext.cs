using Microsoft.EntityFrameworkCore;
using TTSolutionTest.Model;


namespace TTSolutionTest.Data
{
    public class UserDbContext : DbContext
    /* UserDbContext.cs: เป็นคลาสที่สืบทอดมาจาก DbContext ใน Entity Framework Core ซึ่งเป็นส่วนที่เชื่อมต่อกับฐานข้อมูลและทำหน้าที่ในการจัดการข้อมูลของผู้ใช้(User) ในฐานข้อมูล คลาส UserDbContext นี้มี DbSet<User> Users เพื่อใช้ในการกำหนดและเข้าถึงตาราง Users ในฐานข้อมูล. */

    {

        public UserDbContext(DbContextOptions<UserDbContext> options) : base(options)
        {

        }

        public DbSet<User> Users { get; set; }
    }
}
