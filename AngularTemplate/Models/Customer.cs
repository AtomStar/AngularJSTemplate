using PetaPoco;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AngularTemplate.Models
{
    public partial class Customer
    {
        public static Customer Get(int Id)
        {
            var sql = new Sql(@"SELECT * 
                             FROM Customer 
                             WHERE Id=@0", Id);
            return FirstOrDefault(sql);
        }
        public static List<Customer> GetAll()
        {
            var sql = new Sql(@"SELECT * 
                             FROM Customer");
            return Fetch(sql);
        }
        public static List<Customer> GetAll(CustomerSearchRequest req)
        {
            var sql = new Sql(@"SELECT c.* 
                             FROM Customer c
                             WHERE c.LastName=@0 
                             AND c.Age=@1", req.LastName, req.Age);
            return Fetch(sql);
        }
    }
    public class CustomerSearchRequest
    {
        public string LastName { get; set; }
        public int Age { get; set; }
    }
}