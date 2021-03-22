using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
    [Table("Narudzbina")]
    public class Narudzbina 
    {
        [Key]
        [Column("ID")]
        public int ID { get; set; }

        [Column("Pica")]
        public virtual List<Pice> Pica { get; set; }
    }
}