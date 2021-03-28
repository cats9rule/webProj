using Microsoft.EntityFrameworkCore.Migrations;

namespace server.Migrations
{
    public partial class V7 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Pice_Meni_MeniID",
                table: "Pice");

            migrationBuilder.AlterColumn<int>(
                name: "MeniID",
                table: "Pice",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Pice_Meni_MeniID",
                table: "Pice",
                column: "MeniID",
                principalTable: "Meni",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Pice_Meni_MeniID",
                table: "Pice");

            migrationBuilder.AlterColumn<int>(
                name: "MeniID",
                table: "Pice",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Pice_Meni_MeniID",
                table: "Pice",
                column: "MeniID",
                principalTable: "Meni",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
