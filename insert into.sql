SET IDENTITY_INSERT [dbo].[Kafeterija] ON
INSERT INTO [dbo].[Kafeterija] ( [ID], [BrojStolova], [MeniID], [Naziv] )
VALUES (1,5,1,'Prva kafeterija');
INSERT INTO [dbo].[Kafeterija] ( [ID], [BrojStolova], [MeniID], [Naziv] )
VALUES (2,8,2,'Druga kafeterija');
SET IDENTITY_INSERT [dbo].[Kafeterija] OFF

SET IDENTITY_INSERT [dbo].[Meni] ON
INSERT INTO [dbo].[Meni] ( [ID] )
VALUES (1);
INSERT INTO [dbo].[Meni] ( [ID] )
VALUES (2);
SET IDENTITY_INSERT [dbo].[Meni] OFF

SET IDENTITY_INSERT [dbo].[Sto] ON
INSERT INTO [dbo].[Sto] ( [ID], [MeniID], [KafeterijaID] ) 
VALUES (1,1,1);
INSERT INTO [dbo].[Sto] ( [ID], [MeniID], [KafeterijaID] ) 
VALUES (2,1,1);
INSERT INTO [dbo].[Sto] ( [ID], [MeniID], [KafeterijaID] ) 
VALUES (3,1,1);
INSERT INTO [dbo].[Sto] ( [ID], [MeniID], [KafeterijaID] ) 
VALUES (4,1,1);
INSERT INTO [dbo].[Sto] ( [ID], [MeniID], [KafeterijaID] ) 
VALUES (5,1,1);

INSERT INTO [dbo].[Sto] ( [ID], [MeniID], [KafeterijaID] )  
VALUES (6,2,2);
INSERT INTO [dbo].[Sto] ( [ID], [MeniID], [KafeterijaID] ) 
VALUES (7,2,2);
INSERT INTO [dbo].[Sto] ( [ID], [MeniID], [KafeterijaID] )  
VALUES (8,2,2);
INSERT INTO [dbo].[Sto] ( [ID], [MeniID], [KafeterijaID] )  
VALUES (9,2,2);
INSERT INTO [dbo].[Sto] ( [ID], [MeniID], [KafeterijaID] )  
VALUES (10,2,2);
INSERT INTO [dbo].[Sto] ( [ID], [MeniID], [KafeterijaID] )  
VALUES (11,2,2);
INSERT INTO [dbo].[Sto] ( [ID], [MeniID], [KafeterijaID] )  
VALUES (12,2,2);
INSERT INTO [dbo].[Sto] ( [ID], [MeniID], [KafeterijaID] )  
VALUES (13,2,2);
SET IDENTITY_INSERT [dbo].[Sto] OFF;