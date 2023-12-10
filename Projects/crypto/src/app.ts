//class Exchange
//properties: symbol, lastPrice, volume, priceChangePercent
//constructor method

class Exchange {
  symbol: string;
  lastPrice: number;
  volume: number;
  priceChangePercent: number;
  constructor(s: string, lP: number, v: number, pCp: number) {
    this.symbol = s;
    this.lastPrice = lP;
    this.volume = v;
    this.priceChangePercent = pCp;
  }
}

//getData function - send request to the api https://api2.binance.com/api/v3/ticker/24hr
function getData() {
  return new Promise((resolve, reject) => {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://api2.binance.com/api/v3/ticker/24hr");
    xhttp.onload = function () {
      if (xhttp.status == 200) {
        resolve(JSON.parse(xhttp.response));
      } else {
        reject(xhttp.status);
      }
    };
    xhttp.send();
  });
}

//create new Exchanges
let data: Exchange[];
function createDataArray() {
  getData()
    .then((value: any) => {
      data = value.map((exchange: any) => {
        return new Exchange(
          exchange.symbol,
          Number(exchange.lastPrice),
          Number(exchange.volume),
          Number(exchange.priceChangePercent)
        );
      });
      updatePage(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

//on page load getData()
window.addEventListener("load", (event) => {
  createDataArray();
});

//display Data function
function updatePage(data: Exchange[]): void {
  //get the table by id/class
  let tableBody = document.querySelector("#tbodyResult")!;
  tableBody.innerHTML = "";
  //run on all the data
  data.forEach((exchange) => {
    //create 1 tr element for the row
    let row = document.createElement("tr");
    //create 4 td elements for symbol,price,volume,precent
    let symboleTd = document.createElement("td");
    let lastPriceTd = document.createElement("td");
    let volumeTd = document.createElement("td");
    let precentTd = document.createElement("td");
    symboleTd.innerText = exchange.symbol;
    lastPriceTd.innerText = exchange.lastPrice.toString();
    volumeTd.innerText = exchange.volume.toString();
    precentTd.innerText = exchange.priceChangePercent.toString();
    //append all td to tr
    row.appendChild(symboleTd);
    row.appendChild(lastPriceTd);
    row.appendChild(volumeTd);
    row.appendChild(precentTd);
    //append tr to the table
    tableBody.appendChild(row);
  });
}

//onClick searchBtn => search

function search(): void {
  //get the input text
  let inputSearch = (
    document.querySelector("#currency-name") as HTMLInputElement
  ).value;
  //filter all the data just to the data that its symbol includes input text
  let filteredData = data.filter((exchange: Exchange) =>
    exchange.symbol.includes(inputSearch.toUpperCase())
  );
  //display data
  updatePage(filteredData);
}

let searchBtn = document.querySelector("#searchBtn") as HTMLButtonElement;
searchBtn.addEventListener("click", search);

//onClick filterByPrice => filter

function filterByPrice(): void {
  //get the text from the inputs
  let minInputValue = (document.querySelector("#min-price") as HTMLInputElement)
    .value;
  let maxInputValue = (document.querySelector("#max-price") as HTMLInputElement)
    .value;
  //cast to number
  let minPrice = -Infinity;
  let maxPrice = Infinity;
  if (minInputValue != "") {
    minPrice = Number(minInputValue);
  }
  if (maxInputValue != "") {
    maxPrice = Number(maxInputValue);
  }
  //filter the data according to the prices
  let filteredData = data.filter(
    (exchange: Exchange) =>
      exchange.lastPrice >= minPrice && exchange.lastPrice <= maxPrice
  );
  //display data
  updatePage(filteredData);
}
let filterByPriceBtn = document.querySelector(
  "#price-search-button"
) as HTMLButtonElement;
filterByPriceBtn.addEventListener("click", filterByPrice);

//onClick filterByVolume => filter

function filterByVolume(): void {
  //get the text from the inputs
  let minInputValue = (
    document.querySelector("#min-volume") as HTMLInputElement
  ).value;
  let maxInputValue = (
    document.querySelector("#max-volume") as HTMLInputElement
  ).value;
  //cast to number
  let minVolume = -Infinity;
  let maxVolume = Infinity;
  if (minInputValue != "") {
    minVolume = Number(minInputValue);
  }
  if (maxInputValue != "") {
    maxVolume = Number(maxInputValue);
  }
  //filter the data according to the prices
  let filteredData = data.filter(
    (exchange: Exchange) =>
      exchange.volume >= minVolume && exchange.volume <= maxVolume
  );
  //display data
  updatePage(filteredData);
}
let filterByVolumeBtn = document.querySelector(
  "#volume-search-button"
) as HTMLButtonElement;
filterByVolumeBtn.addEventListener("click", filterByVolume);

//onClick getTop10 =>getTop10()
function getTop10() {
  let sortedData = data.sort((a: Exchange, b: Exchange) => {
    return b.volume - a.volume;
  });
  let top10ByVolume = sortedData.slice(0, 10);
  updatePage(top10ByVolume);
}

let getTop10Btn = document.querySelector("#top-10-button") as HTMLButtonElement;
getTop10Btn.addEventListener("click", getTop10);

//onClick sortData => sort the data
function sortData() {
  let sortedData: Exchange[] = [];
  //get value of select element
  const selectSortBy = (document.querySelector("#sort-by") as HTMLSelectElement)
    .value;
  switch (selectSortBy) {
    case "volume":
      sortedData = data.sort((a: Exchange, b: Exchange) => {
        return b.volume - a.volume;
      });
      break;
    case "lastPrice":
      sortedData = data.sort((a: Exchange, b: Exchange) => {
        return b.lastPrice - a.lastPrice;
      });
      break;
    case "priceChangePercent":
      sortedData = data.sort((a: Exchange, b: Exchange) => {
        return b.priceChangePercent - a.priceChangePercent;
      });
      break;
    case "symbol":
      sortedData = data.sort((a: Exchange, b: Exchange) => {
        return b.symbol.localeCompare(a.symbol);
      });
      break;

    default:
      break;
  }

  //display data
  let checkBoxAsc = document.querySelector(
    "#sort-ascending"
  ) as HTMLInputElement;
  if (checkBoxAsc.checked) {
    sortedData.reverse();
  }
  updatePage(sortedData);
}

let sortBtn = document.querySelector("#sort-button") as HTMLButtonElement;

sortBtn.addEventListener("click", sortData);

// function updatePage2(data: Exchange[]): void {
//   const tableBody = document.querySelector("#exchange-rates-table tbody")!;
//   tableBody.innerHTML = "";
//   data.forEach((rate: any) => {
//     const row = document.createElement("tr");
//     row.innerHTML = `
//           <td>${rate.symbol}</td>
//           <td>${rate.lastPrice}</td>
//           <td>${rate.volume}</td>
//           <td>${rate.priceChangePercent}</td>
//         `;
//     tableBody.appendChild(row);
//   });
// }

//How to work with local storage

let arr = [1, 2, 3, 4, 5, 6];
//localStorage.clear();
localStorage.setItem("data", JSON.stringify(arr));

console.log(localStorage);
