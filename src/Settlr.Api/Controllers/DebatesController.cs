using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNet.Mvc;

namespace Settlr.Api.Controllers
{
    [Route("debates")]
    public class DebatesController : Controller
    {
        private static readonly IList<Debate> debates = new List<Debate>()
        {
            new Debate()
            {
                Id = 1,
                Title = "Toilet paper in front or back?",
                AnswerLeft = "Front",
                AnswerRight = "Back"
            }
        };

        [HttpGet]
        [Route("")]
        public IEnumerable<Debate> Get()
        {
            return debates;
        }

        [HttpPost]
        [Route("")]
        public Debate Post([FromBody]Debate debate)
        {
            debate.Id = debates.Max(x => x.Id) + 1;
            debates.Add(debate);
            return debate;
        }

        [HttpGet]
        [Route("{id}")]
        public Debate Get(int id)
        {
            var debate = debates.FirstOrDefault(x => x.Id == id);
            if (debate == null)
            {
                // Should return 404;
                throw new Exception("404 not found");
            }

            return debate;
        }
    }
}
