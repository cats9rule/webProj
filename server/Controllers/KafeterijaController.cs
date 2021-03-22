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


    }
}
