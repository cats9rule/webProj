using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace server.Models
{
    [Table("Sto")]
    public class Sto
    {
        [Key]
        public int Broj { get; set; }

        [Column("Narudzbina")]
        public Narudzbina Narudzbina { get; set; }

        [JsonIgnore]
        [Column("Meni")]
        public Meni Meni { get; set; }
    }
}