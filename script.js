async function descargarPDF() {
  const codigo = document.getElementById("codigo").value;
  const resultado = document.getElementById("resultado");

  if (codigo === "MWBnS1nau8D5ByLW") {
    try {
      // 1. Obtener fecha y hora
      const fechaHora = new Date().toLocaleString("es-CO", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      // 2. Cargar PDF original
      const pdfUrl = "copia12752153.pdf"; // Asegúrate de tener este archivo
      console.log("Cargando PDF...");
      const existingPdfBytes = await fetch(pdfUrl).then((res) =>
        res.arrayBuffer()
      );

      // 3. Modificar PDF
      console.log("Modificando PDF...");
      const pdfDoc = await PDFLib.PDFDocument.load(existingPdfBytes);
      const pages = pdfDoc.getPages();

      // Agregar fecha a todas las páginas
      pages.forEach((page) => {
        page.drawText(`Fecha de descarga: ${fechaHora}`, {
          x: 20,
          y: 15,
          size: 14,
          color: PDFLib.rgb(1, 1, 1),
        });
      });

      // 4. Generar y descargar
      console.log("Generando PDF modificado...");
      const modifiedPdfBytes = await pdfDoc.save();
      const blob = new Blob([modifiedPdfBytes], { type: "application/pdf" });

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `verificado_${fechaHora.replace(/[/:, ]/g, "-")}.pdf`;
      document.body.appendChild(link); // ¡Esto es crucial!
      link.click();
      document.body.removeChild(link);

      resultado.innerHTML = "<h3>✅ Validación exitosa</h3>";
      resultado.className = "resultado valido";
    } catch (error) {
      console.error("Error detectado:", error);
      resultado.innerHTML = "❌ Error al generar el PDF";
      resultado.className = "resultado invalido";
    }
  } else {
    resultado.innerHTML = "❌ Código inválido";
    resultado.className = "resultado invalido";
  }
  resultado.style.display = "block";
}
