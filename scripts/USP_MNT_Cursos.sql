USE [Examen]
GO
/****** Object:  StoredProcedure [dbo].[USP_MNT_Cursos]    Script Date: 08/06/2022 14:48:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[USP_MNT_Cursos]          
            
	@sOpcion VARCHAR(2) = '',   
	@pParametro VARCHAR(max)
                                                                                   
AS     

BEGIN

	BEGIN
		
		DECLARE @IdCurso	INT;
		
		DECLARE @sNombre	VARCHAR(MAX);		
		DECLARE @sDescripcion	VARCHAR(MAX);
		DECLARE @bObligatorio	BIT;
		DECLARE @bEstado	BIT;
					
	END
	
	--VARIABLE TABLA
	BEGIN

		DECLARE @tParametro TABLE (
			id int,
			valor varchar(max)
		);

	END

	--Descontena el parametro con split
	BEGIN
		IF(LEN(LTRIM(RTRIM(@pParametro))) > 0)
			BEGIN
			    INSERT INTO @tParametro (id, valor ) SELECT id, valor FROM dbo.Split(@pParametro, '|');
			END;
	END;
        		
	IF @sOpcion = '01'   --CONSULTAR REGISTRO DE CODIGOS
	BEGIN
			
			SELECT
				*
			FROM [AP_Murga_Jose_Curso]
			                                                                                 
	END;                         

  ELSE IF @sOpcion = '02'   --CONSULTAR REGISTRO DE CODIGOS
	BEGIN
    BEGIN
      SET @IdCurso	= (SELECT valor FROM @tParametro WHERE id = 1);
    END

    BEGIN
		SELECT
			IdCurso,
			TRIM(sNombre) AS 'sNombre',
			TRIM(sDescripcion) AS 'sDescripcion',
			bObligatorio,
			bEstado
		FROM [AP_Murga_Jose_Curso]
		WHERE
		IdCurso = @IdCurso
    END
						                                                                                 
	END;

	ELSE IF @sOpcion = '03'  --INSERT
	BEGIN
		  BEGIN
			SET @sNombre		= (SELECT valor FROM @tParametro WHERE id = 1);
			SET @sDescripcion  = (SELECT valor FROM @tParametro WHERE id = 2);
			SET @bObligatorio  = (SELECT valor FROM @tParametro WHERE id = 3);
			SET @bEstado  = (SELECT valor FROM @tParametro WHERE id = 4);
				
		  END	

		  BEGIN    	
		
				  INSERT INTO [AP_Murga_Jose_Curso]
							(sNombre, sDescripcion,  bObligatorio, bEstado)
				  VALUES	(@sNombre, @sDescripcion,  @bObligatorio, 1)

				  SELECT CONCAT('1|',@sNombre)
		  		
		  END
		
	  END
	   	   
	ELSE IF @sOpcion = '04'  -- ACTUALIZAR
	BEGIN
      BEGIN
			  
			SET @sNombre		= (SELECT valor FROM @tParametro WHERE id = 1);
			SET @sDescripcion  = (SELECT valor FROM @tParametro WHERE id = 2);
			SET @bObligatorio  = (SELECT valor FROM @tParametro WHERE id = 3);
			SET @bEstado  = (SELECT valor FROM @tParametro WHERE id = 4);
			SET @IdCurso	= (SELECT valor FROM @tParametro WHERE id = 5);

		  END	
		
			  BEGIN
			    UPDATE [AP_Murga_Jose_Curso]                           
				  SET 
					  sNombre = @sNombre,
					  sDescripcion = @sDescripcion,
					  bObligatorio = @bObligatorio,
					  bEstado = @bEstado
				  WHERE 
					  IdCurso = @IdCurso

				  SELECT CONCAT('1|El Curso ',@sNombre,' se registró con éxito')
			  END
	
        
	  END;

  ELSE IF @sOpcion = '05'  -- ELIMINAR/ACTIVAR
	BEGIN
      BEGIN
			SET @IdCurso	= (SELECT valor FROM @tParametro WHERE id = 1);
			SET @bEstado	= (SELECT valor FROM @tParametro WHERE id = 2);

		  END	
		
			  BEGIN

				  UPDATE [AP_Murga_Jose_Curso]                           
				  SET 					
					  bEstado = @bEstado
				  WHERE 
					  IdCurso = @IdCurso

          
				  SELECT CONCAT('1','|El Curso ha Sido Eliminado')

			  END
	        
	  END;
	
END
