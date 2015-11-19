using System.Collections.Generic;
using Microsoft.AspNet.Mvc;

namespace Settlr.Api.Controllers
{
    [Route("debates")]
    public class DebatesController : Controller
    {
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }
    }
}
