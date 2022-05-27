using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Limeyfy.API.Migrations.LimeyfyDb
{
    public partial class invoicecreatedby : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Invoices",
                newName: "CreatedBy");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "CreatedBy",
                table: "Invoices",
                newName: "UserId");
        }
    }
}
