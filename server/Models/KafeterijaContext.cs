using Microsoft.EntityFrameworkCore;

namespace server.Models{

    public class KafeterijaContext : DbContext
    {
        public DbSet<Sto> Stolovi { get; set;} 

        public DbSet<Pice> Pica {get; set;} 

        public DbSet<Meni> Meni { get; set; }

        public DbSet<Narudzbina> Narudzbine { get; set; }

        public DbSet<Kafeterija> Kafeterije { get; set; }

        public KafeterijaContext(DbContextOptions options) :base(options)
        {

        }

    }
}