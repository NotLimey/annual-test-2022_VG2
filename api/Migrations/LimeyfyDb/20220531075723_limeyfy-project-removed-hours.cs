using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Limeyfy.API.Migrations.LimeyfyDb
{
    public partial class limeyfyprojectremovedhours : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Hours",
                table: "Projects");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "Hours",
                table: "Projects",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);
        }
    }
}
