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

        [Route("UpisiPice/{id}")]
        [HttpPost]
        public async Task<IActionResult> UpisiPice(int id, [FromBody] Pice pice)
        {
            if(pice.Cena > 0 && pice.Naziv.Length-1 > 0)
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
        public async Task<IActionResult> IzmeniPice(int id, [FromBody] Pice pice)
        {
            var p = await Context.Pica.FindAsync(id);
            
            if(pice.Cena > 0 && pice.Naziv.Length-1 > 0)
            {
                p.Naziv = pice.Naziv;
                p.Cena = pice.Cena;
                Context.Pica.Update(p);
                await Context.SaveChangesAsync();
                return Ok();
            }
            else
            {
                return StatusCode(406);
            }
        }

        [Route("PreuzmiPica")]
        [HttpGet]
        public async Task<List<Pice>> PreuzmiPica()
        {
            return await Context.Pica.ToListAsync();
        }


        [Route("PreuzmiKafeterije")]
        [HttpGet]
        public async Task<List<Kafeterija>> PreuzmiKafeterije()
        {
            return await Context.Kafeterije.Include(p => p.Meni).ThenInclude(q => q.Stavke)
            .Include(p => p.Stolovi).ThenInclude(q => q.Veza).ThenInclude(r => r.Pice)
            .ToListAsync();
        }



        [Route("PreuzmiMenije")]
        [HttpGet]
        public async Task<List<Meni>> PreuzmiMenije()
        {
            return await Context.Meni.Include(p => p.Stavke).ToListAsync();
        }

        [Route("PreuzmiMeni/{id}")]
        [HttpGet]
        public async Task<Meni> PreuzmiMeni(int id)
        {
            List<Meni> lista =  await Context.Meni.Include(p => p.Stavke).ToListAsync();
            foreach(Meni m in lista)
            {
                if(m.ID == id)
                {
                    return m;
                }
            }
            return null;
        }



        [Route("PreuzmiStolove")]
        [HttpGet]
        public async Task<List<Sto>> PreuzmiStolove()
        {
            return await Context.Stolovi.ToListAsync();
        }

        [Route("PreuzmiStoloveZaKafeteriju/{id}")]
        [HttpGet]
        public async Task<List<Sto>> PreuzmiStoloveZaKafeteriju(int id)
        {
            List<Sto> lista = await Context.Stolovi.ToListAsync();
            return lista.Where(Sto => Sto.Kafeterija.ID == id).ToList();
        }



        [Route("DodajPiceNaSto/{idPice}/{idSto}")]
        [HttpPost]
        public async Task<IActionResult> DodajPiceNaSto(int idPice, int idSto, [FromBody] PiceSto ps)
        {
            if(idPice > 0 && idSto > 0)
            {
                Context.PiceSto.Add(ps);
                await Context.SaveChangesAsync();
                return Ok();
            }
            else
            {
                return StatusCode(400);
            }
        }

        [Route("IzbrisiPicaSaStola/{idSto}")]
        [HttpDelete]
        public async Task<IActionResult> IzbrisiPicaSaStola(int idSto)
        {
            var p = await Context.PiceSto.ToListAsync();
            foreach(PiceSto ps in p)
            {
                if(ps.StoID == idSto)
                {
                    Context.PiceSto.Remove(ps);
                }
            }
            await Context.SaveChangesAsync();
            return Ok();
        }

        [Route("DodajJosJednoPice/{idSto}/{idPice}")]
        [HttpPut]
        public async Task<IActionResult> DodajJosJednoPice(int idSto, int idPice)
        {
            PiceSto ps = await Context.PiceSto.FindAsync(idSto, idPice);
            if(ps == null) 
            {
                return StatusCode(406);
            }
            ps.BrojPica++;
            Context.PiceSto.Update(ps);
            return Ok();
        }

        [Route("PreuzmiPicaZaSto/{idSto}")]
        [HttpGet]
        public async Task<List<Pice>> PreuzmiPicaZaSto(int idSto)
        {
            var p = await Context.PiceSto.ToListAsync();
            List<Pice> pica = new List<Pice>(); 
            foreach(PiceSto ps in p)
            {
                if(ps.StoID == idSto)
                {
                    pica.Add(await Context.Pica.FindAsync(ps.PiceID));
                }
            }
            return pica;
        }

    }
}
