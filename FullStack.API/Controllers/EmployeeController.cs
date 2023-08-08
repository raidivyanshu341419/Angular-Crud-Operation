using FullStack.API.Data;
using FullStack.API.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FullStack.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly FullStackDbContext _context;

        public EmployeeController(FullStackDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllEmployee()
        {
            var data = await _context.Employees.ToListAsync();
            return Ok(data);
        }

        [HttpPost]
        public async Task<IActionResult> AddNewEmployee([FromBody] Employee employee)
        {
            employee.Id = new Guid();
            await _context.Employees.AddAsync(employee);
            await _context.SaveChangesAsync();
            return Ok(employee);
        }

        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetEmployee([FromRoute] Guid id)
        {
            var employeeData = await _context.Employees.FirstOrDefaultAsync(x => x.Id == id);
            if (employeeData == null)
            {
                return NotFound();
            }
            return Ok(employeeData);
        }

        [HttpPut]
        [Route("{id:Guid}")]
        public async Task<IActionResult> UpdateEmployee([FromRoute] Guid id, Employee updateEmployeeModel)
        {
            var employeeData = await _context.Employees.FindAsync(id);
            if (employeeData == null)
            {
                return NotFound();
            }
            employeeData.Name = updateEmployeeModel.Name;
            employeeData.Phone = updateEmployeeModel.Phone;
            employeeData.Email = updateEmployeeModel.Email;
            employeeData.Phone = updateEmployeeModel.Phone;
            employeeData.Salary = updateEmployeeModel.Salary;
            employeeData.Department = updateEmployeeModel.Department;
            await _context.SaveChangesAsync();
            return Ok(employeeData);
        }

        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> DeleteEmployee([FromRoute] Guid id, Employee updateEmployeeModel)
        {
            var employeeData = await _context.Employees.FindAsync(id);
            if (employeeData == null)
            {
                return NotFound();
            }
            _context.Employees.Remove(employeeData);
            await _context.SaveChangesAsync();
            return Ok(employeeData);
        }
    }
}
