using Microsoft.EntityFrameworkCore;

namespace server.Models{

    public class KafeterijaContext : DbContext
    {
        public DbSet<Sto> Stolovi { get; set;} 

        public DbSet<Pice> Pica {get; set;} 

        public DbSet<Meni> Meni { get; set; }

        public DbSet<Kafeterija> Kafeterije { get; set; }

        public DbSet<PiceSto> PiceSto { get; set; }

        public KafeterijaContext(DbContextOptions options) :base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<PiceSto>().HasKey(x => new { x.PiceID, x.StoID });
        }

    }
}