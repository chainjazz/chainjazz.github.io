<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:recepti="http://www.example.org/recepti" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="/">
				
		<html>
		<head>
		<link href="csi.css" rel="stylesheet" type="text/css"></link>
		<meta name="viewport" content="width=device-width"></meta>
		<title>Recepti</title>
		
		<style>
		
		</style>
		</head>
		
		<body>
		
		<xsl:for-each select="recepti:recepti/recepti:proizvod">
		
		<div>
			<xsl:value-of select="@naziv"></xsl:value-of>
		</div>
		</xsl:for-each>
		
		
		</body>
		
		</html>
	</xsl:template>
</xsl:stylesheet>