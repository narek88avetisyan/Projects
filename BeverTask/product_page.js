const userName = document.querySelector("h2"),
      logoutBtn = document.getElementById("logout"),
      userId = localStorage.getItem("userId"),
      invoiceInfo = document.getElementById("invoiceInfo"),
      tableInvoices = document.getElementById("tableInvoices"),
      tableInvoiceLines = document.getElementById("tableInvoiceLines");

userName.innerHTML = localStorage.getItem("userName");

logoutBtn.addEventListener("click", () => {
   localStorage.removeItem("userName");
   localStorage.removeItem("userId");
   document.location.href = "index.html";
})

getUserInfo();

async function getUserInfo() {
   const invoices = await fetch("https://invoicesapi20210913135422.azurewebsites.net/invoices")
                           .then(response => response.json())
                           .then(data => data.value.filter(invoice => invoice.UserId === userId));
   const activeInvoiceId = invoices[0].InvoiceId;

   drawUserInvoices(invoices);
   drawUserInvoiceLines(activeInvoiceId);

   document.getElementById(activeInvoiceId).checked = true;
}

async function getInvoiceLines(id) {
   return await fetch("https://invoicesapi20210913135422.azurewebsites.net/invoicelines")
                  .then(response => response.json())
                  .then(data => data.value.filter(invoiceLines => invoiceLines.InvoiceId === id));
}

async function getProducts(id) {
   return await fetch("https://invoicesapi20210913135422.azurewebsites.net/products")
                  .then(response => response.json())
                  .then(data => data.value.filter(product => product.ProductId === id));
}

function drawUserInvoices(data) {
   data.forEach(invoice => {
      addRowForInvoices([invoice.InvoiceId, invoice.Name, formatDate(invoice.PaidDate)]);
   })
}

function drawUserInvoiceLines(id) {
   getInvoiceLines(id).then(invoiceLines => {
      let totalAmount = 0;
      let productIds = [];
      let quantitys = [];

      invoiceLines.forEach(invoiceLine => {
         productIds.push(invoiceLine.ProductId);
         quantitys.push(invoiceLine.Quantity);
      })

      productIds.forEach((productId, i) => {
         getProducts(productId).then(product => {
            const total = product[0].Price * quantitys[i];
            totalAmount += total;

            addRowForInvoiceLines([product[0].Name, product[0].Price, quantitys[i], total]);

            if(i === productIds.length-1) {
               showInvoiceTotalAmount(totalAmount);
            }
         })
      })
   });
}

function formatDate(paidDate) {
   const date = new Date(paidDate),
         day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate(),
         month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1),
         year = date.getFullYear();
   return day + "." + month + "." + year;
}

function addRowForInvoices(data) {
   const row = document.createElement("tr");
   const input = document.createElement("input");

   input.type = "radio";
   input.name = "invoiceName";
   input.id = data[0];
   input.addEventListener("change", () => changeRadio(input.id, data.length+1));
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
   const dataElem = document.createElement("td");
   const text = document.createTextNode(data);

   dataElem.appendChild(text);
   row.appendChild(dataElem);
}

function showInvoiceTotalAmount(totalAmount) {
   invoiceInfo.innerHTML = "Total Amount - " + totalAmount;
}

function deletePrevInvoiceRow(numOfRow) {
   for(let i = 0; i < numOfRow; i++) {
      tableInvoiceLines.deleteRow(1);
   }
}

function changeRadio(invoiceId, numOfRow) {
   drawUserInvoiceLines(invoiceId);
   deletePrevInvoiceRow(numOfRow);
}
