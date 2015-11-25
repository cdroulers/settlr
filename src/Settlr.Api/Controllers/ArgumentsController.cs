using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNet.Mvc;
using Settlr.Api.Domain;

namespace Settlr.Api.Controllers
{
    [Route("arguments")]
    public class ArgumentsController : Controller
    {
        private static readonly IList<Argument> arguments = new List<Argument>()
        {
            new Argument()
            {
                Id = 1,
                Title = "Toilet paper in front or back?",
                AnswerLeft = "Front",
                AnswerRight = "Back"
            }
        };

        [HttpGet]
        [Route("")]
        public IEnumerable<Argument> Get()
        {
            return arguments;
        }

        [HttpPost]
        [Route("")]
        public Argument Post([FromBody]Argument argument)
        {
            argument.Id = arguments.Max(x => x.Id) + 1;
            arguments.Add(argument);
            return argument;
        }

        [HttpGet]
        [Route("{id}")]
        public Argument Get(int id)
        {
            var argument = arguments.FirstOrDefault(x => x.Id == id);
            if (argument == null)
            {
                // Should return 404;
                throw new Exception("404 not found");
            }

            return argument;
        }
    }
}
