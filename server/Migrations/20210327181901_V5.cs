using Microsoft.EntityFrameworkCore.Migrations;

namespace server.Migrations
{
    public partial class V5 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PiceSto_Pice_PicaID",
                table: "PiceSto");

            migrationBuilder.DropForeignKey(
                name: "FK_PiceSto_Sto_StoloviID",
                table: "PiceSto");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PiceSto",
                table: "PiceSto");

            migrationBuilder.DropIndex(
                name: "IX_PiceSto_StoloviID",
                table: "PiceSto");

            migrationBuilder.RenameColumn(
                name: "StoloviID",
                table: "PiceSto",
                newName: "BrojPica");

            migrationBuilder.RenameColumn(
                name: "PicaID",
                table: "PiceSto",
                newName: "StoID");

            migrationBuilder.AddColumn<int>(
                name: "PiceID",
                table: "PiceSto",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_PiceSto",
                table: "PiceSto",
                columns: new[] { "PiceID", "StoID" });

            migrationBuilder.CreateIndex(
                name: "IX_PiceSto_StoID",
                table: "PiceSto",
                column: "StoID");

            migrationBuilder.AddForeignKey(
                name: "FK_PiceSto_Pice_PiceID",
                table: "PiceSto",
                column: "PiceID",
                principalTable: "Pice",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PiceSto_Sto_StoID",
                table: "PiceSto",
                column: "StoID",
                principalTable: "Sto",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PiceSto_Pice_PiceID",
                table: "PiceSto");

            migrationBuilder.DropForeignKey(
                name: "FK_PiceSto_Sto_StoID",
                table: "PiceSto");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PiceSto",
                table: "PiceSto");

            migrationBuilder.DropIndex(
                name: "IX_PiceSto_StoID",
                table: "PiceSto");

            migrationBuilder.DropColumn(
                name: "PiceID",
                table: "PiceSto");

            migrationBuilder.RenameColumn(
                name: "BrojPica",
                table: "PiceSto",
                newName: "StoloviID");

            migrationBuilder.RenameColumn(
                name: "StoID",
                table: "PiceSto",
                newName: "PicaID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PiceSto",
                table: "PiceSto",
                columns: new[] { "PicaID", "StoloviID" });

            migrationBuilder.CreateIndex(
                name: "IX_PiceSto_StoloviID",
                table: "PiceSto",
                column: "StoloviID");

            migrationBuilder.AddForeignKey(
                name: "FK_PiceSto_Pice_PicaID",
                table: "PiceSto",
                column: "PicaID",
                principalTable: "Pice",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PiceSto_Sto_StoloviID",
                table: "PiceSto",
                column: "StoloviID",
                principalTable: "Sto",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
