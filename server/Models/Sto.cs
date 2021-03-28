using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace server.Models
{
    [Table("Sto")]
    public class Sto
    {
        [Key]
        [Column("ID")]
        public int ID { get; set; }


        [Column("Pica")]
        public virtual List<PiceSto> Veza { get; set; }

        [JsonIgnore]
        [Column("Meni")]
        public Meni Meni { get; set; }

        [JsonIgnore]
        [Column("Kafeterija")]
        public Kafeterija Kafeterija { get; set; }
    }
}