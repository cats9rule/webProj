using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace server.Models
{
    public class PiceSto
    {
        [Column("PiceID")]
        public int PiceID { get; set; }

        [Column("Pice")]
        public Pice Pice { get; set; }

        [Column("StoID")]
        public int StoID { get; set; }

        [Column("Sto")]
        public Sto Sto { get; set; }

        [Column("BrojPica")]
        public int BrojPica { get; set; }
    }
}