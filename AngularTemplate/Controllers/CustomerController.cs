using AngularTemplate.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace AngularTemplate.Controllers
{
    [RoutePrefix ("api/customer")]
    public class CustomerController : ApiController
    {
        [Route("{customerId}")]
        public Customer Get(int customerId)
        {
            return Customer.Get(customerId);
        }    
        public List<Customer> GetAll()
        {
            return Customer.GetAll();
        }
        [Route("search")]
        public List<Customer> Post(CustomerSearchRequest req)
        {
            return Customer.GetAll(req);
        }
        [Route("save")]
        public Customer Post(Customer c)
        {
            c.Save();
            return c;
        }
        [Route("delete")]
        public bool PostDelete(Customer c)
        {
            c.Delete();
            return true;
        }
    }
}
