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

        [Column("BrojStolova")]
        public int BrojStolova { get; set; }

        [Column("Naziv")]
        public string Naziv { get; set; }

        [Column("Stolovi")]
        public virtual List<Sto> Stolovi{get; set;}

        [Column("Meni")]
        public Meni Meni { get; set; }

    }
}