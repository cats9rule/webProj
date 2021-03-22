using Microsoft.EntityFrameworkCore.Migrations;

namespace server.Migrations
{
    public partial class V1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Meni",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Meni", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Narudzbina",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Narudzbina", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Kafeterija",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MeniID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Kafeterija", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Kafeterija_Meni_MeniID",
                        column: x => x.MeniID,
                        principalTable: "Meni",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Pice",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Cena = table.Column<int>(type: "int", nullable: false),
                    MeniID = table.Column<int>(type: "int", nullable: true),
                    NarudzbinaID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pice", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Pice_Meni_MeniID",
                        column: x => x.MeniID,
                        principalTable: "Meni",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Pice_Narudzbina_NarudzbinaID",
                        column: x => x.NarudzbinaID,
                        principalTable: "Narudzbina",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Sto",
                columns: table => new
                {
                    Broj = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NarudzbinaID = table.Column<int>(type: "int", nullable: true),
                    MeniID = table.Column<int>(type: "int", nullable: true),
                    KafeterijaID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sto", x => x.Broj);
                    table.ForeignKey(
                        name: "FK_Sto_Kafeterija_KafeterijaID",
                        column: x => x.KafeterijaID,
                        principalTable: "Kafeterija",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Sto_Meni_MeniID",
                        column: x => x.MeniID,
                        principalTable: "Meni",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Sto_Narudzbina_NarudzbinaID",
                        column: x => x.NarudzbinaID,
                        principalTable: "Narudzbina",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Kafeterija_MeniID",
                table: "Kafeterija",
                column: "MeniID");

            migrationBuilder.CreateIndex(
                name: "IX_Pice_MeniID",
                table: "Pice",
                column: "MeniID");

            migrationBuilder.CreateIndex(
                name: "IX_Pice_NarudzbinaID",
                table: "Pice",
                column: "NarudzbinaID");

            migrationBuilder.CreateIndex(
                name: "IX_Sto_KafeterijaID",
                table: "Sto",
                column: "KafeterijaID");

            migrationBuilder.CreateIndex(
                name: "IX_Sto_MeniID",
                table: "Sto",
                column: "MeniID");

            migrationBuilder.CreateIndex(
                name: "IX_Sto_NarudzbinaID",
                table: "Sto",
                column: "NarudzbinaID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Pice");

            migrationBuilder.DropTable(
                name: "Sto");

            migrationBuilder.DropTable(
                name: "Kafeterija");

            migrationBuilder.DropTable(
                name: "Narudzbina");

            migrationBuilder.DropTable(
                name: "Meni");
        }
    }
}
