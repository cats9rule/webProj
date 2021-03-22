using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace server.Models
{

    [Table("Kafeterija")]
    public class Kafeterija
    {
        [Column("ID")]
        [Key]
        public int ID { get; set; }

        [Column("BrStolova")]
        public int BrStolova{get; set;}

    }
}