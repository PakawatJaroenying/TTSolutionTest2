using System.ComponentModel.DataAnnotations;

namespace TTSolutionTest.Model
{
    public class User
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        public string HN { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string PhoneNumber { get; set; }
        [Required]
        public string Email { get; set; }
    }
}
