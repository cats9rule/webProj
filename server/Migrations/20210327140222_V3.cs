using Microsoft.EntityFrameworkCore.Migrations;

namespace server.Migrations
{
    public partial class V3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Broj",
                table: "Sto");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Broj",
                table: "Sto",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
