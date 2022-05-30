USE [Corporerm_Homolog]
GO





ALTER VIEW [dbo].[_Fluig_SECAO_Grp] AS

SELECT 
REPLACE(REPLACE('Grp_'+CAST(PSECAOCOMPL.SIGLA as varchar(12)),' ',''),'-','_') as groupId,
CAST(PSECAOCOMPL.SIGLA AS VARCHAR(12))+' - '+PSECAO.DESCRICAO as groupDescription


FROM PSECAOCOMPL JOIN PSECAO ON (PSECAOCOMPL.CODIGO=PSECAO.CODIGO)
WHERE PSECAO.SECAODESATIVADA = 0 /* ATIVA */
AND  LEN(PSECAO.CODIGO) = 8 /* TAMANHO */
AND PSECAOCOMPL.SIGLA IS NOT NULL

GO


