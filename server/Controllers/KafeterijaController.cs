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

        [Route("UpisiPice/{ind}")]
        [HttpPost]
        public async Task<IActionResult> UpisiPice(int ind, [FromBody] Pice pice)
        {
            if(pice.Cena > 0 && pice.Naziv.Length-1 > 0)
            {
                Context.Pica.Add(pice);
                await Context.SaveChangesAsync();
                return Ok(pice.ID);
            }
            else
            {
                return BadRequest();
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

        [Route("PreuzmiKafeterije")]
        [HttpGet]
        public async Task<List<Kafeterija>> PreuzmiKafeterije()
        {
            return await Context.Kafeterije.Include(p => p.Meni).ThenInclude(q => q.Stavke)
            .Include(p => p.Stolovi)
            .ToListAsync();
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
            PiceSto ps = await Context.PiceSto.FindAsync(idPice, idSto); // redosled kljuceva je ovaj!
            if(ps == null) 
            {
                return StatusCode(406);
            }
            ps.BrojPica++;
            Context.PiceSto.Update(ps);
            await Context.SaveChangesAsync();
            return Ok();
        }

        [Route("PreuzmiPicaZaSto/{idSto}")]
        [HttpGet]
        public async Task<List<PiceSto>> PreuzmiPicaZaSto(int idSto)
        {
            List<PiceSto> p = await Context.PiceSto.Where(p => p.StoID == idSto).ToListAsync();
            return p;
        }

    }
}
