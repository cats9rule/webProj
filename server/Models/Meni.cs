using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace server.Models
{
    [Table("Meni")]
    public class Meni
    {
        [Key]
        [Column("ID")]
        public int ID { get; set; }

        [JsonIgnore]
        [Column("KafeterijaRef")]
        public Kafeterija kafeterija;

        [Column("Stavke")]
        public virtual List<Pice> Stavke { get; set; }
    }
}