// TODO: Build an awesome garage!
const GARAGE = 'batcave';
const apiURL = `https://wagon-garage-api.herokuapp.com/${GARAGE}/cars`;
const carsList = document.querySelector('.cars-list');
const form = document.getElementById('new-car');

const renderCar = car => (
  `<div class="car">
    <div class="car-image">
      <img src="http://loremflickr.com/280/280/${car.brand} ${car.model}" />
    </div>
    <div class="car-info">
      <h4>${car.brand} ${car.model}</h4>
      <p><strong>Owner:</strong> ${car.owner}</p>
      <p><strong>Plate:</strong> ${car.plate}</p>
    </div>
  </div>`
);

const insertCar = (carHTML, options = {}) => {
  const position = options.position || 'beforeend';

  carsList.insertAdjacentHTML(position, carHTML);
};

// FETCHING ALL CARS
const fetchAllCars = () => {
  // Call the API (fetch GET)
  fetch(apiURL)
    // response - string (Promise)
    .then(response => response.json())
    // parse response and get data (.json())
    .then((data) => {
    // Iterate through list of cars (data)
      data.forEach((car) => {
        // Render individual car HTML string
        const carHTML = renderCar(car);
        // Insert/append car HTML into list
        insertCar(carHTML);
      });
    });
};

// CREATING A NEW CAR
const createNewCar = () => {
  // Gather new car attributes from form inputs
  const brand = form.querySelector('#brand').value;
  const model = form.querySelector('#model').value;
  const plate = form.querySelector('#plate').value;
  const owner = form.querySelector('#owner').value;
  // const attributes = {
  //   brand: brand,
  //   model: model,
  //   plate: plate,
  //   owner: owner
  // };
  return {
    brand,
    model,
    plate,
    owner
  };
};

// Submit to API (fetch POST w/ body)
const saveCar = (car) => {
  fetch(apiURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(car),
  })
    .then(response => response.json())
    .then((data) => {
      // Render individual car HTML string
      const carHTML = renderCar(data);
      // Insert/append car HTML into list
      insertCar(carHTML, { position: 'afterbegin' });
      // Clear Form
      form.reset();
    });
};

// Listen for submit action (addEventListener)
form.addEventListener('submit', (event) => {
// Prevent default form submit behaviour (preventDefault)
  event.preventDefault();
  const car = createNewCar();
  saveCar(car);
});

fetchAllCars();
