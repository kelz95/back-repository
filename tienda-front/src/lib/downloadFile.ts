const downloadFile = (data: any, filename: string) => {
  const url = window.URL.createObjectURL(data);
  // const url = window.URL.createObjectURL(new Blob([data], { type: "text/csv" }));

  const tempLink = document.createElement("a");
  tempLink.href = url;
  tempLink.setAttribute("download", `${filename}.xlsx`);

  document.body.appendChild(tempLink);
  tempLink.click();
  document.body.removeChild(tempLink);
};

export default downloadFile;
