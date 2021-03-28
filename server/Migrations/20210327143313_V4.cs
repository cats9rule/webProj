using Microsoft.EntityFrameworkCore.Migrations;

namespace server.Migrations
{
    public partial class V4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Pice_Sto_StoID",
                table: "Pice");

            migrationBuilder.DropIndex(
                name: "IX_Pice_StoID",
                table: "Pice");

            migrationBuilder.DropColumn(
                name: "StoID",
                table: "Pice");

            migrationBuilder.CreateTable(
                name: "PiceSto",
                columns: table => new
                {
                    PicaID = table.Column<int>(type: "int", nullable: false),
                    StoloviID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PiceSto", x => new { x.PicaID, x.StoloviID });
                    table.ForeignKey(
                        name: "FK_PiceSto_Pice_PicaID",
                        column: x => x.PicaID,
                        principalTable: "Pice",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PiceSto_Sto_StoloviID",
                        column: x => x.StoloviID,
                        principalTable: "Sto",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PiceSto_StoloviID",
                table: "PiceSto",
                column: "StoloviID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PiceSto");

            migrationBuilder.AddColumn<int>(
                name: "StoID",
                table: "Pice",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Pice_StoID",
                table: "Pice",
                column: "StoID");

            migrationBuilder.AddForeignKey(
                name: "FK_Pice_Sto_StoID",
                table: "Pice",
                column: "StoID",
                principalTable: "Sto",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
