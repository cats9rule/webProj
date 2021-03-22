using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using server.Models;

namespace server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class KafeterijaController : ControllerBase
    {

        public KafeterijaContext Context { get; set; }

        public KafeterijaController(KafeterijaContext context)
        {
            Context = context;
        }

        [Route("PreuzmiKafeteriju")]
        [HttpGet]
        public async Task<List<Kafeterija>> PreuzmiKafeteriju()
        {
            return await Context.Kafeterije.ToListAsync();
        }

        [Route("UpisiKafeteriju/{id}")]
        [HttpPost]
        public async Task UpisiKafeteriju(int id, [FromBody] Kafeterija kafeterija)
        {
            Context.Kafeterije.Add(kafeterija);
            await Context.SaveChangesAsync();
        }

        [Route("UpisiPice/{id}")]
        [HttpPost]
        public async Task<IActionResult> UpisiPice(int id, [FromBody] Pice pice)
        {
            if(pice.Cena > 0)
            {
                Context.Pica.Add(pice);
                await Context.SaveChangesAsync();
                return Ok();
            }
            else
            {
                return StatusCode(406);
            }
        }

        [Route("IzbrisiPice/{id}")]
        [HttpDelete]
        public async Task<IActionResult> IzbrisiPice(int id)
        {
            var pice = await Context.Pica.FindAsync(id);
            Context.Remove(pice);
            await Context.SaveChangesAsync();
            return Ok();
        }

        [Route("IzmeniPice/{id}")]
        [HttpPut]
        public async Task IzmeniPice(int id, [FromBody] Pice pice)
        {
            var p = await Context.Pica.FindAsync(id);
            p.Naziv = pice.Naziv;
            p.Cena = pice.Cena;
            Context.Pica.Update(p);
            await Context.SaveChangesAsync();
        }

        [Route("PreuzmiPica")]
        [HttpGet]
        public async Task<List<Pice>> PreuzmiPica()
        {
            return await Context.Pica.ToListAsync();
        }

        [Route("UpisiMeni")]
        [HttpPost]
        public async Task UpisiMeni([FromBody] Meni meni)
        {
            Context.Meni.Add(meni);
            await Context.SaveChangesAsync();
        }

        [Route("PreuzmiMeni")]
        [HttpGet]
        public async Task<List<Meni>> PreuzmiMeni()
        {
            return await Context.Meni.Include(p => p.Stavke).ToListAsync();
        }

        [Route("UpisiNarudzbinu")]
        [HttpPost]
        public async Task UpisiNarudzbinu(Narudzbina nar)
        {
            Context.Narudzbine.Add(nar);
            await Context.SaveChangesAsync();
        }

        [Route("ObrisiNarudzbinu")]
        [HttpGet]
        public async Task ObrisiNarudzbinu(int id)
        {
            var nar = await Context.Narudzbine.FindAsync(id);
            Context.Remove(nar);
            await Context.SaveChangesAsync();
        }

        [Route("IzmeniNarudzbinu")]
        [HttpGet]
        public async Task IzmeniNarudzbinu(Narudzbina narudzbina)
        {
            var nar = await Context.Narudzbine.FindAsync(narudzbina.ID);
            nar.Pica = narudzbina.Pica;
            await Context.SaveChangesAsync();
        }

        [Route("PreuzmiNarudzbine")]
        [HttpGet]
        public async Task<List<Narudzbina>> PreuzmiNarudzbine()
        {
            return await Context.Narudzbine.ToListAsync();
        }

        [Route("UpisiSto/{broj}")]
        [HttpPost]
        public async Task UpisiSto(int id, Sto sto)
        {
            Context.Stolovi.Add(sto);
            await Context.SaveChangesAsync();
        }

        [Route("PreuzmiStolove")]
        [HttpGet]
        public async Task<List<Sto>> PreuzmiStolove()
        {
            return await Context.Stolovi.ToListAsync();
        }
    }
}
