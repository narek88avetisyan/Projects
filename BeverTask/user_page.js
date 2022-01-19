const userName = document.getElementById("user");
const logoutBtn = document.getElementById("logout");
const userId = localStorage.getItem("userId");
const tableInvoices = document.getElementById("tableInvoices");
const tableInvoiceLines = document.getElementById("tableInvoiceLines");

userName.innerHTML = localStorage.getItem("userName");

logoutBtn.addEventListener("click", () => {
   document.location.href = "index.html";
   localStorage.removeItem("userName");
   localStorage.removeItem("userId");
})

function formatDate(paidDate) {
   const date = new Date(paidDate);
   let day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate(),
      month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1),
      year = date.getFullYear();
   return day + "." + month + "." + year;
}

async function getUserInfo() {
   const invoices = await fetch("https://invoicesapi20210913135422.azurewebsites.net/invoices")
                        .then(response => response.json())
                        .then(data => data.value.filter(invoice => invoice.UserId === userId));
   const invoiceIdes = invoices.map(invoice => invoice.InvoiceId);

   let productsId;

   getInvoiceLine(invoiceIdes[0]).then(invoiceLine => {
      productsId = invoiceLine.map(product => {
         return product.ProductId;
      })
      console.log(productsId);
   });

   drawUserInvoices(invoices);

   document.getElementById(invoiceIdes[0]).checked = true;
   const radios = document.getElementsByName("invName");

}

getUserInfo();

function drawUserInvoices(invoices) {
   invoices.forEach(invoice => {
      addRowForInvoices([invoice.InvoiceId, invoice.Name, formatDate(invoice.PaidDate)]);
   })
}

async function getInvoiceLine(invoiceId) {
   const invoiceLine = await fetch("https://invoicesapi20210913135422.azurewebsites.net/invoicelines")
                           .then(response => response.json())
                           .then(data => data.value.filter(invoiceLine => invoiceLine.InvoiceId === invoiceId));
   return invoiceLine;
}

function addProducts() {
   fetch("https://invoicesapi20210913135422.azurewebsites.net/products")
      .then(response => response.json())
      .then(data => {
         data.value.forEach(product => {
            addRowForInvoiceLines([product.Name, product.Price]);
         });
      })
}
addProducts();

function addRowForInvoices(data) {
   const row = document.createElement("tr");
   const input = document.createElement("input");
   input.type = "radio";
   input.name = "invName";
   input.id = data[0];
   row.appendChild(input);

   data.shift();
   data.forEach((dataItem) => {
      addData(row, dataItem);
   })

   tableInvoices.appendChild(row);
}

function addRowForInvoiceLines(data) {
   const row = document.createElement("tr");

   data.forEach((dataItem) => {
      addData(row, dataItem);
   })

   tableInvoiceLines.appendChild(row);
}

function addData(row, data) {
   let dataElem = document.createElement("td");
   let text = document.createTextNode(data);
   dataElem.appendChild(text);
   row.appendChild(dataElem);
}
